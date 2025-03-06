import { useRef, useEffect } from 'react';
import { ChatMistralAI } from '@langchain/mistralai';

export function useMistralClient() {
  const mistralClient = useRef<ChatMistralAI | null>(null);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_MISTRAL_API_KEY;
    if (apiKey) {
      try {
        mistralClient.current = new ChatMistralAI({
          apiKey,
          modelName: 'mistral-large-latest',
          temperature: 0.7,
        });
      } catch (error) {
        console.error('Error initializing Mistral client:', error);
        mistralClient.current = null;
      }
    } else {
      console.warn('No Mistral API key found in environment variables');
    }
  }, []);

  return mistralClient;
}