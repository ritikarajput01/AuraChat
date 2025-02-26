import React, { useState } from 'react';
import { RotateCcw, Copy, Check } from 'lucide-react';

interface MessageActionsProps {
  content: string;
  onRegenerate?: () => void;
  isRegenerating: boolean;
}

export const MessageActions: React.FC<MessageActionsProps> = ({ 
  content, 
  onRegenerate, 
  isRegenerating 
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