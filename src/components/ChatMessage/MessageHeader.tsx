import React from 'react';
import { Bot, User, Volume2, Volume } from 'lucide-react';

interface MessageHeaderProps {
  isBot: boolean;
  isVoice?: boolean;
  isSpeaking?: boolean;
  onSpeak?: () => void;
}

export const MessageHeader: React.FC<MessageHeaderProps> = ({
  isBot,
  isVoice,
  isSpeaking,
  onSpeak,
}) => {
  return (
    <div className="font-medium mb-2 md:mb-3 flex items-center gap-2 md:gap-3 text-sm md:text-base">
      <span className={isBot ? 'text-[#00f3ff]' : 'text-[#bc13fe]'}>
        {isBot ? 'AI Assistant' : 'You'}
      </span>
      {isVoice && (
        <Volume2 className={`w-3.5 h-3.5 md:w-4 md:h-4 ${isBot ? 'text-[#00f3ff]/60' : 'text-[#bc13fe]/60'}`} />
      )}
      {isBot && onSpeak && (
        <button
          onClick={onSpeak}
          className={`p-1.5 rounded-lg transition-colors ${
            isSpeaking 
              ? 'bg-[#00f3ff]/20 text-[#00f3ff]' 
              : 'hover:bg-[#00f3ff]/10 text-[#00f3ff]/60 hover:text-[#00f3ff]'
          }`}
          title={isSpeaking ? "Stop speaking" : "Listen to response"}
        >
          {isSpeaking ? (
            <Volume2 className="w-3.5 h-3.5 md:w-4 md:h-4 animate-pulse" />
          ) : (
            <Volume className="w-3.5 h-3.5 md:w-4 md:h-4" />
          )}
        </button>
      )}
      {isSpeaking && (
        <div className="flex gap-1 items-center">
          <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-[#00f3ff] rounded-full animate-soft-pulse"></div>
          <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-[#00f3ff] rounded-full animate-soft-pulse delay-75"></div>
          <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-[#00f3ff] rounded-full animate-soft-pulse delay-150"></div>
        </div>
      )}
    </div>
  );
};