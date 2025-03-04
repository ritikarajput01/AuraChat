import { useRef, useEffect } from 'react';
import MistralClient from '@mistralai/mistralai';

export function useMistralClient() {
  const mistralClient = useRef<MistralClient | null>(null);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_MISTRAL_API_KEY;
    if (apiKey) {
      try {
        mistralClient.current = new MistralClient(apiKey);
        console.log('Mistral client initialized successfully');
      } catch (error) {
        console.error('Error initializing Mistral client:', error);
      }
    } else {
      console.warn('No Mistral API key found in environment variables');
    }
  }, []);

  return mistralClient;
}