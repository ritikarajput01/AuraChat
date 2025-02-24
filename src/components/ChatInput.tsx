import React, { useState, useRef, useEffect } from 'react';
import { Mic, Send, Square, Plus, Loader2 } from 'lucide-react';
import { MistralModel, MISTRAL_MODELS } from '../types';

interface ChatInputProps {
  onSend: (message: string, isVoice?: boolean) => void;
  onUploadDocument: (file: File) => void;
  disabled?: boolean;
  isSpeaking: boolean;
  currentModel: MistralModel;
  onChangeModel: (model: MistralModel) => void;
  isProcessingFile?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ 
  onSend, 
  onUploadDocument,
  disabled, 
  isSpeaking,
  currentModel,
  onChangeModel,
  isProcessingFile = false,
}) => {
  const [message, setMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const [isRecognitionSupported, setIsRecognitionSupported] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    setIsRecognitionSupported(!!SpeechRecognition);
  }, []);

  const handleSend = (isVoice: boolean = false) => {
    if (message.trim()) {
      onSend(message, isVoice);
      setMessage('');
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onUploadDocument(file);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

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
          setMessage(transcript);
        };

        recognitionRef.current.onend = () => {
          if (isListening) {
            handleSend(true);
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

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  return (
    <div className="p-2.5 md:p-4 glass-panel rounded-xl md:rounded-2xl border border-[#00f3ff]/20">
      <div className="flex gap-2 md:gap-3">
        <select
          value={currentModel}
          onChange={(e) => onChangeModel(e.target.value as MistralModel)}
          className="w-40 px-3 py-2.5 md:p-4 rounded-lg md:rounded-xl bg-[#0a0a1f] border border-[#00f3ff]/30 text-[#00f3ff] text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-[#00f3ff]/50"
        >
          {MISTRAL_MODELS.map(model => (
            <option key={model} value={model}>
              {model}
            </option>
          ))}
        </select>

        <div className="relative flex-1 flex items-center">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept=".txt,.pdf,.doc,.docx,.png,.jpg,.jpeg"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="absolute left-3 text-[#00f3ff]/70 hover:text-[#00f3ff] transition-colors"
            title="Upload document or image"
            disabled={isProcessingFile}
          >
            {isProcessingFile ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Plus className="w-5 h-5" />
            )}
          </button>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
            placeholder={isRecognitionSupported ? "Upload file or type/speak your message..." : "Upload file or type your message..."}
            className="flex-1 pl-12 pr-3 py-2.5 md:p-4 md:pl-12 rounded-lg md:rounded-xl chat-input text-sm md:text-base"
            disabled={disabled || isListening}
          />
        </div>

        {isRecognitionSupported && (
          <button
            onClick={toggleSpeechRecognition}
            className={`p-2.5 md:p-4 rounded-lg md:rounded-xl transition-all cyber-border ${
              isListening 
                ? 'bg-red-500/20 border-red-500/50 text-red-400 neon-glow animate-pulse' 
                : 'bg-[#1a1a3a]/50 border-[#00f3ff]/30 text-[#00f3ff] hover:bg-[#1a1a3a]'
            }`}
            type="button"
            disabled={disabled || isSpeaking}
            title={isListening ? "Stop listening" : "Start voice input"}
          >
            {isListening ? <Square className="w-4 h-4 md:w-5 md:h-5" /> : <Mic className="w-4 h-4 md:w-5 md:h-5" />}
          </button>
        )}
        <button
          onClick={() => handleSend()}
          disabled={disabled || !message.trim()}
          className="p-2.5 md:p-4 rounded-lg md:rounded-xl bg-[#00f3ff]/10 text-[#00f3ff] border border-[#00f3ff]/30 hover:bg-[#00f3ff]/20 transition-all disabled:opacity-50 disabled:hover:bg-[#00f3ff]/10 cyber-border"
          type="button"
        >
          <Send className="w-4 h-4 md:w-5 md:h-5" />
        </button>
      </div>
      {(isSpeaking || isListening) && (
        <div className="mt-2 text-xs md:text-sm text-[#00f3ff]/60 flex items-center gap-2">
          <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-[#00f3ff] rounded-full animate-soft-pulse"></div>
          <span>{isListening ? "Listening..." : "AI is speaking..."}</span>
        </div>
      )}
    </div>
  );
};