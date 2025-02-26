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
      
      // Prepare messages for the API call - only include messages up to the last user message
      let apiMessages = [];
      const sessionMessages = [...currentSession.messages];
      
      // For regeneration, remove the last assistant message if it exists
      if (isRegeneration && sessionMessages.length > 0 && sessionMessages[sessionMessages.length - 1].role === 'assistant') {
        sessionMessages.pop();
      }
      
      // Format messages for the API - ensure we end with a user message
      for (let i = 0; i < sessionMessages.length; i++) {
        apiMessages.push({
          role: sessionMessages[i].role,
          content: sessionMessages[i].content
        });
      }
      
      // If we're not regenerating and there are no messages, add the current message
      if (apiMessages.length === 0 && !isRegeneration) {
        apiMessages.push({
          role: 'user',
          content
        });
      }
      
      // Ensure the last message is from the user
      if (apiMessages.length > 0 && apiMessages[apiMessages.length - 1].role !== 'user') {
        // If the last message isn't from a user, we need to fix this
        // For simplicity, we'll just add a system message at the end
        apiMessages.push({
          role: 'user',
          content: 'Please continue.'
        });
      }

      // Make the API call with the prepared messages
      const response = await mistralClient.current.chat({
        model: currentSession.model,
        messages: apiMessages,
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
                  messages: [...sessionMessages, assistantMessage],
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