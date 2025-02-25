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
  const handleSendMessage = async (content: string, isVoice: boolean = false, isRegeneration: boolean = false) => {
    if (!mistralClient.current) {
      setChatState(prev => ({
        ...prev,
        error: 'API key not configured. Please add VITE_MISTRAL_API_KEY to your environment variables.',
      }));
      return;
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

    try {
      const currentSession = getCurrentSession();
      
      // Prepare messages for the API call
      let messages = [...currentSession.messages];
      
      // For regeneration, remove the last assistant message
      if (isRegeneration && messages.length > 0 && messages[messages.length - 1].role === 'assistant') {
        messages.pop();
      }

      // Ensure we have at least one message
      if (messages.length === 0 && !isRegeneration) {
        messages = [{
          role: 'user',
          content,
          timestamp: Date.now(),
        }];
      }

      // Make the API call with the prepared messages
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

      if (isRegeneration) {
        setChatState(prev => ({
          ...prev,
          sessions: prev.sessions.map(s =>
            s.id === currentSession.id
              ? {
                  ...s,
                  messages: [...messages, assistantMessage],
                }
              : s
          ),
        }));
      } else {
        addMessage(assistantMessage);
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
        error: 'Failed to get response from AI. Please try again.',
      }));
    }
  };

  return { handleSendMessage };
}