import { Message, MODEL_INFO } from '../types';
import { extractCodeBlocks } from '../utils/codeUtils';
import { ChatMistralAI } from '@langchain/mistralai';
import { detectLanguage, getLanguageSystemPrompt } from '../utils/languageUtils';
import { performWebSearch } from '../utils/webSearchUtils';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';

export function useMessageHandler(
  mistralClient: React.RefObject<ChatMistralAI>,
  addMessage: (message: Message) => void,
  setChatState: (updater: (prev: any) => any) => void,
  getCurrentSession: () => any,
  speakMessage: (text: string) => void,
  isWebSearchActive: boolean = false
) {
  const validateApiKey = () => {
    const mistralKey = import.meta.env.VITE_MISTRAL_API_KEY;
    if (!mistralKey) {
      throw new Error('Mistral API key not configured. Please check your environment variables.');
    }
  };

  const handleSendMessage = async (content: string, isVoice: boolean = false, isRegeneration: boolean = false) => {
    try {
      validateApiKey();

      if (!mistralClient.current) {
        throw new Error('AI service is not ready. Please try again in a moment.');
      }

      if (!content.trim()) {
        throw new Error('Please enter a message before sending.');
      }

      // Add the user message first if it's not a regeneration
      if (!isRegeneration) {
        const newMessage: Message = {
          role: 'user',
          content,
          isVoice,
          timestamp: Date.now(),
        };
        addMessage(newMessage);
      }

      setChatState(prev => ({ ...prev, isLoading: true, error: null }));

      let responseContent = '';
      let webSearchResults = '';

      // If web search is active, perform web search first
      if (isWebSearchActive) {
        try {
          webSearchResults = await performWebSearch(content, import.meta.env.VITE_MISTRAL_API_KEY);
          
          // Add web search results as a system message
          const searchMessage: Message = {
            role: 'assistant',
            content: webSearchResults,
            timestamp: Date.now(),
            webSearch: true
          };
          addMessage(searchMessage);
        } catch (error) {
          console.error('Web search error:', error);
          // Continue without web search results if there's an error
        }
      }

      try {
        const messages = [
          new SystemMessage(
            isWebSearchActive
              ? "You are an intelligent AI assistant named AuraChat. Use the provided web search results to give accurate, up-to-date information. Always cite your sources when using information from the web search results."
              : "You are an intelligent AI assistant named AuraChat, specialized in providing accurate, helpful, and detailed responses."
          ),
          ...(webSearchResults ? [
            new HumanMessage(`Here are some relevant web search results:\n\n${webSearchResults}\n\nBased on these results, please answer: ${content}`)
          ] : [
            new HumanMessage(content)
          ])
        ];

        const response = await mistralClient.current.invoke(messages);
        
        if (!response) {
          throw new Error('No response received from Mistral API');
        }

        if (typeof response.content !== 'string') {
          throw new Error('Invalid response format from Mistral API');
        }
        
        responseContent = response.content;

      } catch (error: any) {
        console.error('Mistral API error:', error);
        
        if (error.response?.status === 401) {
          throw new Error('Invalid Mistral API key. Please check your configuration.');
        } else if (error.response?.status === 429) {
          throw new Error('Rate limit exceeded. Please try again in a moment.');
        } else if (error.message) {
          throw new Error(`Error: ${error.message}`);
        } else {
          throw new Error('An unexpected error occurred while communicating with Mistral AI');
        }
      }

      if (!responseContent) {
        throw new Error('No response content received from AI service');
      }

      const { text, blocks } = extractCodeBlocks(responseContent);

      const assistantMessage: Message = {
        role: 'assistant',
        content: text,
        codeBlocks: blocks,
        timestamp: Date.now(),
        webSearch: isWebSearchActive
      };

      addMessage(assistantMessage);

      if (isVoice) {
        setTimeout(() => {
          speakMessage(text);
        }, 100);
      }

      setChatState(prev => ({ ...prev, isLoading: false, error: null }));
    } catch (error: any) {
      console.error('AI response error:', error);
      setChatState(prev => ({
        ...prev,
        isLoading: false,
        error: error.message || 'An unexpected error occurred while getting the AI response'
      }));
    }
  };

  return { handleSendMessage };
}