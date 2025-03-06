import React, { useState } from 'react';
import { Bot, User } from 'lucide-react';
import { Message } from '../../types';
import { MessageHeader } from './MessageHeader';
import { MessageContent } from './MessageContent';
import { MessageActions } from './MessageActions';

interface ChatMessageProps {
  message: Message;
  isSpeaking?: boolean;
  onExecuteCode: (blockId: string, code: string) => void;
  onRegenerate?: () => void;
  isLastAssistantMessage?: boolean;
  onSpeak?: (text: string) => void;
  onNavigate?: (direction: 'prev' | 'next') => void;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ 
  message, 
  isSpeaking,
  onExecuteCode,
  onRegenerate,
  isLastAssistantMessage,
  onSpeak,
  onNavigate
}) => {
  const isBot = message.role === 'assistant';
  const [isRegenerating, setIsRegenerating] = useState(false);

  const handleRegenerate = () => {
    if (onRegenerate && !isRegenerating) {
      setIsRegenerating(true);
      onRegenerate();
      setTimeout(() => setIsRegenerating(false), 10000);
    }
  };

  return (
    <div 
      className={`
        flex gap-3 md:gap-4 p-4 md:p-6 rounded-xl md:rounded-2xl transition-all
        ${isBot 
          ? 'bg-[#1a1a3a]/95 border-2 border-[#00f3ff]/30 shadow-lg shadow-[#00f3ff]/5' 
          : 'bg-[#2a2a4a]/80 border-2 border-[#bc13fe]/30'
        }
        ${message.webSearch ? 'border-[#00f3ff] shadow-[0_0_20px_rgba(0,243,255,0.2)]' : ''}
      `}
    >
      <div className={`
        shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl 
        flex items-center justify-center
        ${isBot 
          ? 'bg-[#00f3ff]/10 text-[#00f3ff] border-2 border-[#00f3ff]/30' 
          : 'bg-[#bc13fe]/10 text-[#bc13fe] border-2 border-[#bc13fe]/30'
        }
      `}>
        {isBot ? <Bot className="w-4 h-4 md:w-5 md:h-5" /> : <User className="w-4 h-4 md:w-5 md:h-5" />}
      </div>

      <div className="flex-1 min-w-0 space-y-3">
        <MessageHeader 
          isBot={isBot}
          isVoice={message.isVoice}
          isSpeaking={isSpeaking}
          onSpeak={isBot ? onSpeak : undefined}
          language={message.language}
          isWebSearch={message.webSearch}
        />

        <MessageContent 
          message={message}
          onExecuteCode={onExecuteCode}
          isBot={isBot}
        />

        {isBot && isLastAssistantMessage && (
          <MessageActions 
            content={message.content}
            onRegenerate={handleRegenerate}
            isRegenerating={isRegenerating}
            onNavigate={onNavigate}
            hasAlternatives={!!message.alternatives?.length}
            currentAlternativeIndex={message.currentAlternativeIndex}
            totalAlternatives={message.alternatives?.length || 0}
          />
        )}
      </div>
    </div>
  );
};