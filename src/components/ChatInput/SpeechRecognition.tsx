import React, { useRef, useState, useEffect } from 'react';
import { Mic, Square } from 'lucide-react';

interface SpeechRecognitionProps {
  onSpeechResult: (text: string) => void;
  disabled: boolean;
  isSpeaking: boolean;
}

export const SpeechRecognition: React.FC<SpeechRecognitionProps> = ({
  onSpeechResult,
  disabled,
  isSpeaking,
}) => {
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const [isRecognitionSupported, setIsRecognitionSupported] = useState(false);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    setIsRecognitionSupported(!!SpeechRecognition);
  }, []);

  const toggleSpeechRecognition = () => {
    if (!isListening) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = true;
        
        recognitionRef.current.onstart = () => {
          setIsListening(true);
        };
        
        recognitionRef.current.onresult = (event) => {
          const transcript = Array.from(event.results)
            .map(result => result[0].transcript)
            .join('');
          onSpeechResult(transcript);
        };

        recognitionRef.current.onend = () => {
          if (isListening) {
            setIsListening(false);
          }
        };

        recognitionRef.current.onerror = () => {
          setIsListening(false);
        };

        recognitionRef.current.start();
      }
    } else {
      recognitionRef.current?.stop();
      setIsListening(false);
    }
  };

  if (!isRecognitionSupported) return null;

  return (
    <button
      onClick={toggleSpeechRecognition}
      className={`p-2 md:p-3 rounded-lg transition-all ${
        isListening 
          ? 'bg-red-500/80 border-2 border-red-400 text-white shadow-[0_0_15px_rgba(239,68,68,0.5)] animate-pulse' 
          : 'bg-[#2a2a4a] border-2 border-[#00f3ff] text-[#00f3ff] hover:bg-[#3a3a5a] hover:border-[#00f3ff] hover:text-white shadow-[0_0_15px_rgba(0,243,255,0.2)]'
      }`}
      type="button"
      disabled={disabled || isSpeaking}
      title={isListening ? "Stop listening" : "Start voice input"}
    >
      {isListening ? <Square className="w-4 h-4 md:w-5 md:h-5" /> : <Mic className="w-4 h-4 md:w-5 md:h-5" />}
    </button>
  );
};