import { useState } from 'react';
import { VoiceConfig } from '../types';

export function useVoice(setChatState: (updater: (prev: any) => any) => void) {
  const [voiceConfig, setVoiceConfig] = useState<VoiceConfig>({
    voice: null,
    pitch: 1,
    rate: 1,
    volume: 1,
  });

  const synth = window.speechSynthesis;

  const initializeVoice = () => {
    const voices = synth.getVoices();
    setVoiceConfig(prev => ({
      ...prev,
      voice: voices.find(voice => voice.lang === 'en-US') || voices[0],
    }));

    synth.onvoiceschanged = () => {
      const updatedVoices = synth.getVoices();
      setVoiceConfig(prev => ({
        ...prev,
        voice: updatedVoices.find(voice => voice.lang === 'en-US') || updatedVoices[0],
      }));
    };
  };

  const speakMessage = (text: string) => {
    if (synth.speaking) {
      synth.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = voiceConfig.voice;
    utterance.pitch = voiceConfig.pitch;
    utterance.rate = voiceConfig.rate;
    utterance.volume = voiceConfig.volume;

    utterance.onstart = () => setChatState(prev => ({ ...prev, isSpeaking: true }));
    utterance.onend = () => setChatState(prev => ({ ...prev, isSpeaking: false }));

    synth.speak(utterance);
  };

  return {
    voiceConfig,
    setVoiceConfig,
    initializeVoice,
    speakMessage,
  };
}