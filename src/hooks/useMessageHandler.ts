import { Message } from '../types';
import { extractCodeBlocks } from '../utils/codeUtils';
import { MistralClient } from '@mistralai/mistralai';

export function useMessageHandler(
  mistralClient: React.RefObject<MistralClient>,
  addMessage: (message: Message) => void,
  setChatState: (updater: (prev: any) => any) => void,
  getCurrentSession: () => any,
  speakMessage: (text: string) => void
) {
  const handleSendMessage = async (content: string, isVoice: boolean = false) => {
    if (!mistralClient.current) {
      setChatState(prev => ({
        ...prev,
        error: 'API key not configured. Please add VITE_MISTRAL_API_KEY to your environment variables.',
      }));
      return;
    }

    const newMessage: Message = {
      role: 'user',
      content,
      isVoice,
      timestamp: Date.now(),
    };
    
    addMessage(newMessage);
    setChatState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const currentSession = getCurrentSession();
      const messages = [...currentSession.messages, newMessage];
      
      const response = await mistralClient.current.chat({
        model: currentSession.model,
        messages: messages.map(msg => ({
          role: msg.role,
          content: msg.content,
        })),
      });

      const { text, blocks } = extractCodeBlocks(response.choices[0].message.content);

      const assistantMessage: Message = {
        role: 'assistant',
        content: text,
        codeBlocks: blocks,
        timestamp: Date.now(),
      };

      addMessage(assistantMessage);

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
        error: 'Failed to get response from AI. Please try again.',
      }));
    }
  };

  return { handleSendMessage };
}