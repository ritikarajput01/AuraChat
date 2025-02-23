import React, { useState, useRef } from 'react';
import { Mic, Send, Square } from 'lucide-react';

interface ChatInputProps {
  onSend: (message: string, isVoice?: boolean) => void;
  disabled?: boolean;
  isSpeaking: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSend, disabled, isSpeaking }) => {
  const [message, setMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const handleSend = (isVoice: boolean = false) => {
    if (message.trim()) {
      onSend(message, isVoice);
      setMessage('');
    }
  };

  const toggleSpeechRecognition = () => {
    if (!isListening) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = true;
        
        recognitionRef.current.onresult = (event) => {
          const transcript = Array.from(event.results)
            .map(result => result[0].transcript)
            .join('');
          setMessage(transcript);
        };

        recognitionRef.current.onend = () => {
          if (isListening) {
            handleSend(true);
            setIsListening(false);
          }
        };

        recognitionRef.current.start();
        setIsListening(true);
      }
    } else {
      recognitionRef.current?.stop();
      setIsListening(false);
    }
  };

  return (
    <div className="p-2.5 md:p-4 glass-panel rounded-xl md:rounded-2xl border border-[#00f3ff]/20">
      <div className="flex gap-2 md:gap-3">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
          placeholder="Type your message..."
          className="flex-1 px-3 py-2.5 md:p-4 rounded-lg md:rounded-xl chat-input text-sm md:text-base"
          disabled={disabled}
        />
        <button
          onClick={toggleSpeechRecognition}
          className={`p-2.5 md:p-4 rounded-lg md:rounded-xl transition-all cyber-border ${
            isListening 
              ? 'bg-red-500/20 border-red-500/50 text-red-400 neon-glow' 
              : 'bg-[#1a1a3a]/50 border-[#00f3ff]/30 text-[#00f3ff] hover:bg-[#1a1a3a]'
          }`}
          type="button"
          disabled={disabled || isSpeaking}
        >
          {isListening ? <Square className="w-4 h-4 md:w-5 md:h-5" /> : <Mic className="w-4 h-4 md:w-5 md:h-5" />}
        </button>
        <button
          onClick={() => handleSend()}
          disabled={disabled || !message.trim()}
          className="p-2.5 md:p-4 rounded-lg md:rounded-xl bg-[#00f3ff]/10 text-[#00f3ff] border border-[#00f3ff]/30 hover:bg-[#00f3ff]/20 transition-all disabled:opacity-50 disabled:hover:bg-[#00f3ff]/10 cyber-border"
          type="button"
        >
          <Send className="w-4 h-4 md:w-5 md:h-5" />
        </button>
      </div>
      {isSpeaking && (
        <div className="mt-2 text-xs md:text-sm text-[#00f3ff]/60 flex items-center gap-2">
          <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-[#00f3ff] rounded-full animate-soft-pulse"></div>
          <span>AI is speaking...</span>
        </div>
      )}
    </div>
  );
};