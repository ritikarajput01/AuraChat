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
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    setIsRecognitionSupported(!!SpeechRecognition);
  }, []);

  const handleSend = (isVoice: boolean = false) => {
    if (message.trim()) {
      onSend(message, isVoice);
      setMessage('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
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

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [message]);

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

  return (
    <div className="p-2 md:p-4 glass-panel rounded-lg md:rounded-xl">
      <div className="flex flex-col gap-2 md:gap-3">
        <select
          value={currentModel}
          onChange={(e) => onChangeModel(e.target.value as MistralModel)}
          className="w-full md:w-40 px-3 py-2 md:py-2.5 rounded-lg bg-[#0a0a1f] border border-[#00f3ff]/30 text-[#00f3ff] text-sm focus:outline-none focus:ring-2 focus:ring-[#00f3ff]/50"
        >
          {MISTRAL_MODELS.map(model => (
            <option key={model} value={model}>
              {model}
            </option>
          ))}
        </select>

        <div className="flex gap-2 md:gap-3">
          <div className="relative flex-1">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept=".txt,.pdf,.doc,.docx,.png,.jpg,.jpeg"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#00f3ff]/70 hover:text-[#00f3ff] transition-colors"
              title="Upload document or image"
              disabled={isProcessingFile}
            >
              {isProcessingFile ? (
                <Loader2 className="w-4 h-4 md:w-5 md:h-5 animate-spin" />
              ) : (
                <Plus className="w-4 h-4 md:w-5 md:h-5" />
              )}
            </button>
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={isRecognitionSupported ? "Type or speak your message..." : "Type your message..."}
              className="w-full pl-10 pr-3 py-2 md:py-3 rounded-lg chat-input text-sm md:text-base min-h-[40px] max-h-[120px] resize-none"
              disabled={disabled || isListening}
              rows={1}
            />
          </div>

          {isRecognitionSupported && (
            <button
              onClick={toggleSpeechRecognition}
              className={`p-2 md:p-3 rounded-lg transition-all cyber-border ${
                isListening 
                  ? 'bg-red-500/20 border-red-500/50 text-red-400 neon-glow animate-pulse' 
                  : 'bg-[#1a1a3a]/50 border-[#00f3ff]/30 text-[#00f3ff] hover:bg-[#1a1a3a]'
              }`}
              type="button"
              disabled={disabled || isSpeaking}
              title={isListening ? "Stop listening" : "Start voice input"}
            >
              {isListening ? <Square className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>
          )}
          <button
            onClick={() => handleSend()}
            disabled={disabled || !message.trim()}
            className="p-2 md:p-3 rounded-lg bg-[#00f3ff]/10 text-[#00f3ff] border border-[#00f3ff]/30 hover:bg-[#00f3ff]/20 transition-all disabled:opacity-50 disabled:hover:bg-[#00f3ff]/10 cyber-border"
            type="button"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
      {(isSpeaking || isListening) && (
        <div className="mt-2 text-xs text-[#00f3ff]/60 flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-[#00f3ff] rounded-full animate-soft-pulse"></div>
          <span>{isListening ? "Listening..." : "AI is speaking..."}</span>
        </div>
      )}
    </div>
  );
};