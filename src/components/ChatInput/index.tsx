import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { MistralModel } from '../../types';
import { ModelSelector } from './ModelSelector';
import { FileUpload } from './FileUpload';
import { MessageTextarea } from './MessageTextarea';
import { SpeechRecognition } from './SpeechRecognition';

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
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [isRecognitionSupported, setIsRecognitionSupported] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSpeechResult = (text: string) => {
    setMessage(text);
  };

  return (
    <div className="p-2 md:p-4 glass-panel rounded-lg md:rounded-xl bg-[#1a1a3a]/95 shadow-[0_0_30px_rgba(0,243,255,0.2)]">
      <div className="flex flex-col gap-2 md:gap-3">
        <ModelSelector 
          currentModel={currentModel} 
          onChangeModel={onChangeModel} 
        />

        <FileUpload 
          selectedFile={selectedFile} 
          onRemoveFile={handleRemoveFile} 
          isProcessingFile={isProcessingFile} 
        />

        <div className="flex gap-2 md:gap-3">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept=".txt,.pdf,.doc,.docx,.png,.jpg,.jpeg"
          />
          
          <MessageTextarea 
            message={message}
            onChange={setMessage}
            onKeyDown={handleKeyDown}
            disabled={disabled || false}
            isListening={isListening}
            isRecognitionSupported={isRecognitionSupported}
            selectedFile={selectedFile}
            isProcessingFile={isProcessingFile}
            onFileButtonClick={() => fileInputRef.current?.click()}
          />

          <SpeechRecognition 
            onSpeechResult={handleSpeechResult}
            disabled={disabled || false}
            isSpeaking={isSpeaking}
          />
          
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
      {isSpeaking && (
        <div className="mt-2 text-xs md:text-sm text-[#00f3ff] flex items-center gap-2 font-medium">
          <div className="w-1.5 h-1.5 bg-[#00f3ff] rounded-full animate-soft-pulse"></div>
          <span>AI is speaking...</span>
        </div>
      )}
    </div>
  );
};