import React, { useState } from 'react';
import { RotateCcw, Copy, Check, ChevronLeft, ChevronRight } from 'lucide-react';

interface MessageActionsProps {
  content: string;
  onRegenerate?: () => void;
  isRegenerating: boolean;
  onNavigate?: (direction: 'prev' | 'next') => void;
  hasAlternatives?: boolean;
  currentAlternativeIndex?: number;
  totalAlternatives?: number;
}

export const MessageActions: React.FC<MessageActionsProps> = ({ 
  content, 
  onRegenerate, 
  isRegenerating,
  onNavigate,
  hasAlternatives = false,
  currentAlternativeIndex = 0,
  totalAlternatives = 0
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  return (
    <div className="mt-4 flex items-center justify-end">
      <div className="flex items-center gap-2">
        {isRegenerating && (
          <span className="text-sm text-[#00f3ff]/60 mr-2">
            Regenerating...
          </span>
        )}
        
        {hasAlternatives && totalAlternatives > 0 && (
          <div className="flex items-center mr-2">
            <button
              onClick={() => onNavigate?.('prev')}
              className="p-2 text-sm font-medium text-[#00f3ff] bg-[#00f3ff]/10 hover:bg-[#00f3ff]/20 rounded-l-lg transition-colors cyber-border border-r-0"
              title="Previous response"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            
            <div className="px-3 py-2 text-sm font-medium text-[#00f3ff] bg-[#00f3ff]/10 border-y-2 border-[#00f3ff]/40">
              {currentAlternativeIndex === 0 ? 'Original' : `${currentAlternativeIndex}/${totalAlternatives}`}
            </div>
            
            <button
              onClick={() => onNavigate?.('next')}
              className="p-2 text-sm font-medium text-[#00f3ff] bg-[#00f3ff]/10 hover:bg-[#00f3ff]/20 rounded-r-lg transition-colors cyber-border border-l-0"
              title="Next response"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
        
        <button
          onClick={handleCopy}
          className="p-2 text-sm font-medium text-[#00f3ff] bg-[#00f3ff]/10 hover:bg-[#00f3ff]/20 rounded-lg transition-colors cyber-border"
          title="Copy message"
        >
          {copied ? (
            <Check className="w-4 h-4" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </button>
        
        {onRegenerate && (
          <button
            onClick={onRegenerate}
            disabled={isRegenerating}
            className={`p-2 text-sm font-medium text-[#00f3ff] bg-[#00f3ff]/10 hover:bg-[#00f3ff]/20 rounded-lg transition-colors cyber-border ${
              isRegenerating ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            title="Regenerate response"
          >
            <RotateCcw className={`w-4 h-4 ${isRegenerating ? 'animate-spin' : ''}`} />
          </button>
        )}
      </div>
    </div>
  );
};