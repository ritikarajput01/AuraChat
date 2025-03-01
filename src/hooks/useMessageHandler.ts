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
      
      // Prepare messages for the API call - only include messages up to the last user message
      let apiMessages = [];
      const sessionMessages = [...currentSession.messages];
      
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
      
      // Add a system message to instruct the model to respond in the detected language
      apiMessages.push({
        role: 'system',
        content: getLanguageSystemPrompt(detectedLanguage)
      });
      
      // Format messages for the API - ensure we end with a user message
      for (let i = 0; i < sessionMessages.length; i++) {
        apiMessages.push({
          role: sessionMessages[i].role,
          content: sessionMessages[i].content
        });
      }
      
      // If we're not regenerating and there are no messages, add the current message
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
          content: 'Please continue.'
        });
      }

      // Make the API call with the prepared messages
      const response = await mistralClient.current.chat({
        model: apiModelName,
        messages: apiMessages,
      });

      const { text, blocks } = extractCodeBlocks(response.choices[0].message.content);

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
        originalContent: isRegeneration ? originalContent : text
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
`;

      // Get AI response
      const response = await mistralClient.current.chat({
        model: "mistral-small-latest",
        messages: [
          {
            role: 'system',
            content: getLanguageSystemPrompt(detectedLanguage)
          },
          { 
            role: "user", 
            content: prompt 
          }
        ],
      });

      const { text, blocks } = extractCodeBlocks(response.choices[0].message.content);

      const assistantMessage: Message = {
        role: 'assistant',
        content: text,
        codeBlocks: blocks,
        timestamp: Date.now(),
        language: detectedLanguage,
        alternatives: [],
        currentAlternativeIndex: 0,
        originalContent: text,
        webSearch: true
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
    // This mapping should be updated based on Mistral's actual API model names
    const modelMapping: Record<string, string> = {
      'mistral-7b': 'mistral-7b-v0.1',
      'mixtral-8x7b': 'mixtral-8x7b-v0.1',
      'mistral-large': 'mistral-large-latest',
      'mistral-small': 'mistral-small-latest',
      'mixtral-8x22b': 'mixtral-8x22b-latest',
      'codestral': 'codestral-latest',
      'mathstral-7b': 'mathstral-7b-latest',
      'mistral-large-2': 'mistral-large-2-latest',
      'pixtral': 'pixtral-latest',
      'ministral-3b': 'ministral-3b-latest',
      'ministral-8b': 'ministral-8b-latest',
      'codestral-mamba-7b': 'codestral-mamba-7b-latest',
      'pixtral-large': 'pixtral-large-latest',
      'mistral-small-3': 'mistral-small-3-latest',
      'mistral-saba': 'mistral-saba-latest',
    };
    
    return modelMapping[modelId] || 'mistral-small-latest'; // Fallback to small if mapping not found
  };

  const getErrorMessage = (error: any): string => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      return `Server error: ${error.response.status} - ${error.response.data?.error || 'Unknown error'}`;
    } else if (error.request) {
      // The request was made but no response was received
      return 'No response from server. Please check your internet connection.';
    } else {
      // Something happened in setting up the request that triggered an Error
      return error.message || 'Unknown error occurred';
    }
  };

  return { handleSendMessage, handleWebSearchMessage };
}