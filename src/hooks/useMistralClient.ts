import { useRef, useEffect } from 'react';
import MistralClient from '@mistralai/mistralai';

export function useMistralClient() {
  const mistralClient = useRef<MistralClient | null>(null);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_MISTRAL_API_KEY;
    if (apiKey) {
      mistralClient.current = new MistralClient(apiKey);
    }
  }, []);

  return mistralClient;
}