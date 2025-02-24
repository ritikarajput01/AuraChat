import { useState, useCallback, useEffect } from 'react';
import { VoiceConfig } from '../types';

export function useVoice(setChatState: (updater: (prev: any) => any) => void) {
  const [voiceConfig, setVoiceConfig] = useState<VoiceConfig>({
    voice: null,
    pitch: 1,
    rate: 1,
    volume: 1,
  });

  // Initialize speech synthesis
  useEffect(() => {
    const synth = window.speechSynthesis;
    
    // Load available voices
    const loadVoices = () => {
      const voices = synth.getVoices();
      // Prefer English voices, fallback to the first available voice
      const englishVoice = voices.find(voice => 
        voice.lang.startsWith('en-') && !voice.name.includes('Microsoft')
      ) || voices[0];
      
      if (englishVoice) {
        setVoiceConfig(prev => ({
          ...prev,
          voice: englishVoice,
        }));
      }
    };

    // Load voices immediately if available
    loadVoices();

    // Set up event listener for when voices are loaded
    synth.onvoiceschanged = loadVoices;

    return () => {
      synth.onvoiceschanged = null;
    };
  }, []);

  const speakMessage = useCallback((text: string) => {
    const synth = window.speechSynthesis;

    // Cancel any ongoing speech
    synth.cancel();

    // Clean up the text for better speech
    const cleanText = text
      .replace(/```[\s\S]*?```/g, '') // Remove code blocks
      .replace(/\[.*?\]/g, '') // Remove markdown links
      .replace(/[*_~`]/g, '') // Remove markdown formatting
      .replace(/\n\n/g, '. ') // Replace double newlines with period and space
      .replace(/\n/g, ' ') // Replace single newlines with space
      .trim();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    
    // Apply voice configuration
    if (voiceConfig.voice) {
      utterance.voice = voiceConfig.voice;
    }
    utterance.pitch = voiceConfig.pitch;
    utterance.rate = voiceConfig.rate;
    utterance.volume = voiceConfig.volume;

    // Handle speech events
    utterance.onstart = () => {
      setChatState(prev => ({ ...prev, isSpeaking: true }));
    };

    utterance.onend = () => {
      setChatState(prev => ({ ...prev, isSpeaking: false }));
    };

    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
      setChatState(prev => ({ ...prev, isSpeaking: false }));
    };

    // Start speaking
    synth.speak(utterance);
  }, [voiceConfig, setChatState]);

  const initializeVoice = useCallback(() => {
    // This is now handled by the useEffect hook
  }, []);

  return {
    voiceConfig,
    setVoiceConfig,
    initializeVoice,
    speakMessage,
  };
}