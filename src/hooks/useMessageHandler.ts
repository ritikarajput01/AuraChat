import { Message } from '../types';
import { extractCodeBlocks } from '../utils/codeUtils';
import { MistralClient } from '@mistralai/mistralai';
import { detectLanguage, getLanguageSystemPrompt } from '../utils/languageUtils';
import { performWebSearch } from '../utils/webSearchUtils';

export function useMessageHandler(
  mistralClient: React.RefObject<MistralClient>,
  addMessage: (message: Message) => void,
  setChatState: (updater: (prev: any) => any) => void,
  getCurrentSession: () => any,
  speakMessage: (text: string) => void,
  isWebSearchActive: boolean = false
) {
  const handleSendMessage = async (content: string, isVoice: boolean = false, isRegeneration: boolean = false) => {
    if (!mistralClient.current) {
      setChatState(prev => ({
        ...prev,
        error: 'API key not configured. Please add VITE_MISTRAL_API_KEY to your environment variables.',
      }));
      return;
    }

    // If web search is active, use the web search handler
    if (isWebSearchActive) {
      return handleWebSearchMessage(content, isVoice);
    }

    // Detect language of the user message
    const detectedLanguage = detectLanguage(content);

    // Add the user message first if it's not a regeneration
    if (!isRegeneration) {
      const newMessage: Message = {
        role: 'user',
        content,
        isVoice,
        timestamp: Date.now(),
        language: detectedLanguage
      };
      addMessage(newMessage);
    }

    setChatState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const currentSession = getCurrentSession();
      const modelId = currentSession.model;
      
      // Map our internal model names to Mistral API model names
      const apiModelName = mapToApiModelName(modelId);
      
      // Get all previous messages to maintain conversation context
      const sessionMessages = [...currentSession.messages];
      let apiMessages = [];
      
      // For regeneration, remove the last assistant message if it exists
      if (isRegeneration && sessionMessages.length > 0 && sessionMessages[sessionMessages.length - 1].role === 'assistant') {
        const lastAssistantMessage = sessionMessages.pop();
        
        // Store the current response as an alternative if it's not already stored
        if (lastAssistantMessage) {
          // Save the original content if this is the first regeneration
          const originalContent = lastAssistantMessage.originalContent || lastAssistantMessage.content;
          const alternatives = lastAssistantMessage.alternatives || [];
          
          // If we're showing an alternative, add it to the alternatives array
          if (lastAssistantMessage.currentAlternativeIndex !== 0 && 
              lastAssistantMessage.currentAlternativeIndex !== undefined) {
            // We're already showing an alternative, so we'll regenerate from that
            // No need to add to alternatives as we're replacing the current view
          } else {
            // We're showing the original, so add it to alternatives
            if (!alternatives.includes(lastAssistantMessage.content)) {
              alternatives.push(lastAssistantMessage.content);
            }
          }
        }
      }
      
      // Add a system message with clear instructions
      apiMessages.push({
        role: 'system',
        content: `You are an intelligent AI assistant named AuraChat, specialized in providing accurate, helpful, and detailed responses. 
        ${getLanguageSystemPrompt(detectedLanguage)}
        
        Important guidelines:
        1. Analyze the user's question carefully and provide a direct, relevant answer
        2. If the user asks about code, provide working, well-commented code examples
        3. If the user asks for explanations, be thorough but concise
        4. Always maintain the conversation context and refer to previous messages when relevant
        5. If you're unsure about something, acknowledge it rather than making up information
        6. Format your responses using markdown for readability
        
        Your primary goal is to be as helpful and accurate as possible.`
      });
      
      // Add conversation history to maintain context
      // Only include the last 10 messages to avoid token limits
      const historyLimit = 10;
      const startIdx = Math.max(0, sessionMessages.length - historyLimit);
      
      for (let i = startIdx; i < sessionMessages.length; i++) {
        apiMessages.push({
          role: sessionMessages[i].role,
          content: sessionMessages[i].content
        });
      }
      
      // If we're not regenerating and there are no user messages, add the current message
      if (apiMessages.length === 1 && !isRegeneration) { // Only system message
        apiMessages.push({
          role: 'user',
          content
        });
      }
      
      // Ensure the last message is from the user
      if (apiMessages.length > 1 && apiMessages[apiMessages.length - 1].role !== 'user') {
        // If the last message isn't from a user, we need to fix this
        apiMessages.push({
          role: 'user',
          content: 'Please continue based on our conversation so far.'
        });
      }

      // Make the API call with the prepared messages
      const response = await mistralClient.current.chat({
        model: apiModelName,
        messages: apiMessages,
        temperature: 0.7,
        top_p: 0.95,
        max_tokens: 2048,
      });

      // Get the response content
      const responseContent = response.choices[0].message.content;

      // Generate analysis for the response
      const analysis = await generateAnalysis(responseContent, mistralClient.current);

      const { text, blocks } = extractCodeBlocks(responseContent);

      // Get the last assistant message if we're regenerating
      let lastAssistantMessage: Message | undefined;
      let alternatives: string[] = [];
      let originalContent: string | undefined;
      
      if (isRegeneration) {
        const lastMessageIndex = sessionMessages.length - 1;
        if (lastMessageIndex >= 0 && sessionMessages[lastMessageIndex].role === 'user') {
          // Find the previous assistant message
          for (let i = lastMessageIndex - 1; i >= 0; i--) {
            if (sessionMessages[i].role === 'assistant') {
              lastAssistantMessage = sessionMessages[i];
              alternatives = lastAssistantMessage.alternatives || [];
              originalContent = lastAssistantMessage.originalContent || lastAssistantMessage.content;
              break;
            }
          }
        }
      }

      const assistantMessage: Message = {
        role: 'assistant',
        content: text,
        codeBlocks: blocks,
        timestamp: Date.now(),
        language: detectedLanguage,
        alternatives: isRegeneration ? alternatives : [],
        currentAlternativeIndex: 0,
        originalContent: isRegeneration ? originalContent : text,
        analysis: analysis // Add the analysis to the message
      };

      if (isRegeneration) {
        setChatState(prev => ({
          ...prev,
          sessions: prev.sessions.map(s =>
            s.id === currentSession.id
              ? {
                  ...s,
                  messages: [...sessionMessages, assistantMessage],
                  language: detectedLanguage
                }
              : s
          ),
        }));
      } else {
        addMessage(assistantMessage);
        
        // Update session language
        setChatState(prev => ({
          ...prev,
          sessions: prev.sessions.map(s =>
            s.id === currentSession.id
              ? {
                  ...s,
                  language: detectedLanguage
                }
              : s
          ),
        }));
      }

      if (isVoice) {
        setTimeout(() => {
          speakMessage(text);
        }, 100);
      }

      setChatState(prev => ({ ...prev, isLoading: false }));
    } catch (error) {
      console.error('AI response error:', error);
      setChatState(prev => ({
        ...prev,
        isLoading: false,
        error: `Failed to get response from AI: ${getErrorMessage(error)}`,
      }));
    }
  };

  // Function to generate analysis for a message
  const generateAnalysis = async (content: string, client: MistralClient): Promise<string> => {
    try {
      const analysisPrompt = `Please analyze the following message and provide a brief summary of its key points, tone, and any notable characteristics:

${content}

Focus on:
1. Main topics covered
2. Key arguments or explanations
3. Technical complexity level
4. Writing style and tone
5. Notable features (code examples, citations, etc.)`;

      const response = await client.chat({
        model: "mistral-large-latest",
        messages: [
          {
            role: "system",
            content: "You are an expert at analyzing and summarizing content. Provide concise, insightful analysis."
          },
          {
            role: "user",
            content: analysisPrompt
          }
        ],
        temperature: 0.3,
        max_tokens: 500
      });

      return response.choices[0].message.content;
    } catch (error) {
      console.error("Error generating analysis:", error);
      return "Analysis generation failed";
    }
  };

  const handleWebSearchMessage = async (content: string, isVoice: boolean = false) => {
    if (!mistralClient.current) {
      setChatState(prev => ({
        ...prev,
        error: 'API key not configured. Please add VITE_MISTRAL_API_KEY to your environment variables.',
      }));
      return;
    }

    // Detect language of the user message
    const detectedLanguage = detectLanguage(content);

    // Add the user message
    const newMessage: Message = {
      role: 'user',
      content,
      isVoice,
      timestamp: Date.now(),
      language: detectedLanguage
    };
    addMessage(newMessage);

    setChatState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const apiKey = import.meta.env.VITE_MISTRAL_API_KEY;
      if (!apiKey) {
        throw new Error("API key not configured");
      }

      // Perform web search
      const searchResults = await performWebSearch(content, apiKey);
      
      // Create a prompt that asks the AI to use the search results
      const prompt = `
I need to answer the following question: "${content}"

Here are some search results from the web that might help:

${searchResults}

Please provide a comprehensive answer to the question based on these search results. 
Include relevant information from the search results and cite your sources.
Format your response in markdown with proper headings, lists, and citations.
Be specific and directly address the user's question without going off-topic.
`;

      // Get AI response with improved parameters
      const response = await mistralClient.current.chat({
        model: "mistral-large-latest",
        messages: [
          {
            role: 'system',
            content: `You are an intelligent AI assistant named AuraChat, specialized in providing accurate, helpful, and detailed responses based on web search results.
            ${getLanguageSystemPrompt(detectedLanguage)}
            
            Important guidelines:
            1. Analyze the user's question carefully and provide a direct, relevant answer
            2. Use the provided web search results to inform your response
            3. Cite sources properly when using information from search results
            4. Format your response using markdown for readability
            5. If the search results don't contain relevant information, acknowledge this
            
            Your primary goal is to be as helpful and accurate as possible.`
          },
          { 
            role: "user", 
            content: prompt 
          }
        ],
        temperature: 0.5,
        top_p: 0.9,
        max_tokens: 2048,
      });

      const { text, blocks } = extractCodeBlocks(response.choices[0].message.content);

      // Generate analysis for the response
      const analysis = await generateAnalysis(text, mistralClient.current);

      const assistantMessage: Message = {
        role: 'assistant',
        content: text,
        codeBlocks: blocks,
        timestamp: Date.now(),
        language: detectedLanguage,
        alternatives: [],
        currentAlternativeIndex: 0,
        originalContent: text,
        webSearch: true,
        analysis: analysis
      };

      addMessage(assistantMessage);
      
      // Update session language
      const currentSession = getCurrentSession();
      setChatState(prev => ({
        ...prev,
        sessions: prev.sessions.map(s =>
          s.id === currentSession.id
            ? {
                ...s,
                language: detectedLanguage
              }
            : s
        ),
      }));

      if (isVoice) {
        setTimeout(() => {
          speakMessage(text);
        }, 100);
      }

      setChatState(prev => ({ ...prev, isLoading: false }));
    } catch (error) {
      console.error('Web search error:', error);
      setChatState(prev => ({
        ...prev,
        isLoading: false,
        error: `Failed to search the web: ${getErrorMessage(error)}`,
      }));
    }
  };

  // Map our internal model names to Mistral API model names
  const mapToApiModelName = (modelId: string): string => {
    const modelMapping: Record<string, string> = {
      'mistral-large': 'mistral-large-latest',
      'codestral': 'codestral-latest',
    };
    
    return modelMapping[modelId] || 'mistral-large-latest';
  };

  const getErrorMessage = (error: any): string => {
    if (error.response) {
      return `Server error: ${error.response.status} - ${error.response.data?.error || 'Unknown error'}`;
    } else if (error.request) {
      return 'No response from server. Please check your internet connection.';
    } else {
      return error.message || 'Unknown error occurred';
    }
  };

  return { handleSendMessage, handleWebSearchMessage };
}