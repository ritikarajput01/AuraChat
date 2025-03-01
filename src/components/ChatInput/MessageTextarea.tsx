import React, { useRef, useEffect } from 'react';
import { Plus, Loader2 } from 'lucide-react';

interface MessageTextareaProps {
  message: string;
  onChange: (value: string) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  disabled: boolean;
  isListening: boolean;
  isRecognitionSupported: boolean;
  selectedFile: File | null;
  isProcessingFile: boolean;
  onFileButtonClick: () => void;
}

export const MessageTextarea: React.FC<MessageTextareaProps> = ({
  message,
  onChange,
  onKeyDown,
  disabled,
  isListening,
  isRecognitionSupported,
  selectedFile,
  isProcessingFile,
  onFileButtonClick,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [message]);

  return (
    <div className="relative flex-1">
      <button
        onClick={onFileButtonClick}
        className="absolute left-2 top-1/2 -translate-y-1/2 text-[#00f3ff] hover:text-white transition-colors p-1"
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
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder={selectedFile 
          ? "Add a message about your file (optional)..." 
          : isRecognitionSupported 
            ? "Type or speak your message..." 
            : "Type your message..."
        }
        className="w-full pl-8 pr-2 py-2 md:py-2.5 rounded-lg bg-[#2a2a4a] border-2 border-[#00f3ff]/60 text-white placeholder-[#00f3ff]/80 text-sm md:text-base min-h-[40px] md:min-h-[44px] max-h-[120px] resize-none focus:outline-none focus:ring-2 focus:ring-[#00f3ff]/50 focus:border-[#00f3ff] transition-all shadow-[0_0_20px_rgba(0,243,255,0.1)] hover:border-[#00f3ff]/80"
        disabled={disabled || isListening}
        rows={1}
      />
    </div>
  );
};