import React, { useState, useRef, useEffect } from 'react';
import { Mic, Send, Square, Plus, Loader2, X, Globe } from 'lucide-react';
import { MistralModel, MISTRAL_MODELS } from '../../types';
import { FileUpload } from './FileUpload';
import { MessageTextarea } from './MessageTextarea';
import { ModelSelector } from './ModelSelector';
import { SpeechRecognition } from './SpeechRecognition';

interface ChatInputProps {
  onSend: (message: string, isVoice?: boolean) => void;
  onUploadDocument: (file: File) => void;
  disabled?: boolean;
  isSpeaking: boolean;
  currentModel: MistralModel;
  onChangeModel: (model: MistralModel) => void;
  isProcessingFile?: boolean;
  isWebSearchActive?: boolean;
  onToggleWebSearch?: () => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({ 
  onSend, 
  onUploadDocument,
  disabled, 
  isSpeaking,
  currentModel,
  onChangeModel,
  isProcessingFile = false,
  isWebSearchActive = false,
  onToggleWebSearch
}) => {
  const [message, setMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
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
    if (message.trim() || selectedFile) {
      if (selectedFile) {
        onUploadDocument(selectedFile);
        setSelectedFile(null);
      }
      if (message.trim()) {
        onSend(message, isVoice);
      }
      setMessage('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
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

  const handleToggleWebSearch = () => {
    if (onToggleWebSearch) {
      onToggleWebSearch();
    }
  };

  return (
    <div className="p-2 md:p-4 glass-panel rounded-lg md:rounded-xl bg-[#1a1a3a]/95 shadow-[0_0_30px_rgba(0,243,255,0.2)]">
      <div className="flex flex-col gap-2 md:gap-3">
        <ModelSelector currentModel={currentModel} onChangeModel={onChangeModel} />

        {selectedFile && (
          <FileUpload 
            selectedFile={selectedFile} 
            onRemoveFile={handleRemoveFile} 
            isProcessingFile={isProcessingFile} 
          />
        )}

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
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#00f3ff] hover:text-white transition-colors"
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
              placeholder={selectedFile 
                ? "Add a message about your file (optional)..." 
                : isRecognitionSupported 
                  ? "Type or speak your message..." 
                  : "Type your message..."
              }
              className="w-full pl-10 pr-3 py-2.5 md:py-3 rounded-lg bg-[#2a2a4a] border-2 border-[#00f3ff]/60 text-white placeholder-[#00f3ff]/80 text-sm md:text-base min-h-[44px] md:min-h-[48px] max-h-[120px] resize-none focus:outline-none focus:ring-2 focus:ring-[#00f3ff]/50 focus:border-[#00f3ff] transition-all shadow-[0_0_20px_rgba(0,243,255,0.1)] hover:border-[#00f3ff]/80"
              disabled={disabled || isListening}
              rows={1}
            />
          </div>

          {/* Web Search Button */}
          {onToggleWebSearch && (
            <button
              onClick={handleToggleWebSearch}
              className={`p-2.5 md:p-3 rounded-lg transition-all ${
                isWebSearchActive 
                  ? 'bg-[#00f3ff]/40 border-2 border-[#00f3ff] text-white shadow-[0_0_15px_rgba(0,243,255,0.4)]' 
                  : 'bg-[#2a2a4a] border-2 border-[#00f3ff]/60 text-[#00f3ff] hover:bg-[#3a3a5a] hover:border-[#00f3ff] hover:text-white shadow-[0_0_20px_rgba(0,243,255,0.1)]'
              }`}
              type="button"
              title={isWebSearchActive ? "Web search active" : "Enable web search"}
            >
              <Globe className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          )}

          {isRecognitionSupported && (
            <button
              onClick={toggleSpeechRecognition}
              className={`p-2.5 md:p-3 rounded-lg transition-all ${
                isListening 
                  ? 'bg-red-500/40 border-2 border-red-500/80 text-red-400 neon-glow animate-pulse' 
                  : 'bg-[#2a2a4a] border-2 border-[#00f3ff]/60 text-[#00f3ff] hover:bg-[#3a3a5a] hover:border-[#00f3ff] hover:text-white shadow-[0_0_20px_rgba(0,243,255,0.1)]'
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
            disabled={disabled || (!message.trim() && !selectedFile)}
            className="p-2.5 md:p-3 rounded-lg bg-[#00f3ff]/30 text-[#00f3ff] border-2 border-[#00f3ff]/60 hover:bg-[#00f3ff]/40 hover:border-[#00f3ff] hover:text-white transition-all disabled:opacity-50 disabled:hover:bg-[#00f3ff]/30 shadow-[0_0_20px_rgba(0,243,255,0.1)]"
            type="button"
          >
            <Send className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        </div>
      </div>
      {(isSpeaking || isListening || isWebSearchActive) && (
        <div className="mt-2 text-xs md:text-sm text-[#00f3ff] flex items-center gap-2 font-medium">
          <div className="w-1.5 h-1.5 bg-[#00f3ff] rounded-full animate-soft-pulse"></div>
          <span>
            {isListening ? "Listening..." : 
             isWebSearchActive ? "Web search mode active" : 
             "AI is speaking..."}
          </span>
        </div>
      )}
    </div>
  );
};