import React from 'react';
import { Volume2, Globe } from 'lucide-react';
import { getLanguageName, getNativeLanguageName } from '../../utils/languageUtils';

interface MessageHeaderProps {
  isBot: boolean;
  isVoice?: boolean;
  isSpeaking?: boolean;
  onSpeak?: () => void;
  language?: string;
  isWebSearchResult?: boolean;
}

export const MessageHeader: React.FC<MessageHeaderProps> = ({
  isBot,
  isVoice,
  isSpeaking,
  onSpeak,
  language,
  isWebSearchResult = false,
}) => {
  const displayLanguage = language ? `${getLanguageName(language)} (${getNativeLanguageName(language)})` : null;

  return (
    <div className="font-medium mb-2 md:mb-3 flex flex-wrap items-center gap-1 md:gap-3 text-xs md:text-base">
      <span className={isBot ? 'text-[#00f3ff]' : 'text-[#bc13fe]'}>
        {isBot ? 'AI Assistant' : 'You'}
      </span>
      
      {isWebSearchResult && (
        <span className="bg-[#00f3ff]/20 text-[#00f3ff] px-1.5 py-0.5 rounded-md text-xs">
          Web Search
        </span>
      )}
      
      {language && (
        <div className="flex items-center gap-1 text-xs md:text-sm text-[#00f3ff]/70">
          <Globe className="w-3 h-3 md:w-3.5 md:h-3.5" />
          <span className="truncate max-w-[100px] md:max-w-none">{displayLanguage}</span>
        </div>
      )}
      
      {isVoice && (
        <Volume2 className={`w-3 h-3 md:w-4 md:h-4 ${isBot ? 'text-[#00f3ff]/60' : 'text-[#bc13fe]/60'}`} />
      )}
      
      {isBot && onSpeak && (
        <button
          onClick={onSpeak}
          className={`relative p-1 rounded-lg transition-all duration-300 overflow-hidden group ${
            isSpeaking 
              ? 'bg-[#00f3ff]/30 text-[#00f3ff] shadow-[0_0_15px_rgba(0,243,255,0.4)]' 
              : 'hover:bg-[#00f3ff]/20 text-[#00f3ff]/60 hover:text-[#00f3ff]'
          }`}
          title={isSpeaking ? "Stop speaking" : "Listen to response"}
        >
          <div className="megaphone-icon">
            <svg viewBox="0 0 24 24" width="16" height="16" className="relative z-10">
              <path 
                d="M3,14h3c0.55,0,1-0.45,1-1v-2c0-0.55-0.45-1-1-1H3c-0.55,0-1,0.45-1,1v2C2,13.55,2.45,14,3,14z" 
                fill={isSpeaking ? "#00f3ff" : "#00f3ff99"}
                className="transition-colors duration-300"
              />
              <path 
                d="M16.59,5.59L16.59,5.59c-0.38-0.38-0.89-0.59-1.42-0.59H12c-0.55,0-1,0.45-1,1v12c0,0.55,0.45,1,1,1h3.17 c0.53,0,1.04-0.21,1.42-0.59l3.41-3.41c0.38-0.38,0.59-0.89,0.59-1.42V10.41c0-0.53-0.21-1.04-0.59-1.41L16.59,5.59z" 
                fill={isSpeaking ? "#00f3ff" : "#00f3ff99"}
                className="transition-colors duration-300"
              />
              <circle 
                cx="14" 
                cy="12" 
                r="1.5" 
                fill="#FFCC00" 
                className={`${isSpeaking ? 'animate-pulse' : ''}`}
              />
            </svg>
          </div>
          
          {isSpeaking && (
            <div className="absolute right-0 top-1/2 -translate-y-1/2 -translate-x-1 flex items-center">
              <div className="sound-wave w-0.5 h-2 bg-[#00f3ff] rounded-full animate-sound-wave mx-0.5"></div>
              <div className="sound-wave w-0.5 h-3 bg-[#00f3ff] rounded-full animate-sound-wave animation-delay-100 mx-0.5"></div>
              <div className="sound-wave w-0.5 h-2 bg-[#00f3ff] rounded-full animate-sound-wave animation-delay-200 mx-0.5"></div>
            </div>
          )}
        </button>
      )}
      
      {isSpeaking && !onSpeak && (
        <div className="flex gap-1 items-center ml-1">
          <div className="w-0.5 h-2 md:w-1 md:h-3 bg-[#00f3ff] rounded-full animate-sound-wave"></div>
          <div className="w-0.5 h-3 md:w-1 md:h-4 bg-[#00f3ff] rounded-full animate-sound-wave animation-delay-100"></div>
          <div className="w-0.5 h-1 md:w-1 md:h-2 bg-[#00f3ff] rounded-full animate-sound-wave animation-delay-200"></div>
        </div>
      )}
    </div>
  );
};