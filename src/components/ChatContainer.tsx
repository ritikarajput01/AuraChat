import React from 'react';
import { Message } from '../types';
import { ChatMessage } from './ChatMessage';
import { Bot } from 'lucide-react';

interface ChatContainerProps {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  isSpeaking: boolean;
  onExecuteCode: (blockId: string, code: string) => void;
  onRegenerate?: () => void;
}

export const ChatContainer: React.FC<ChatContainerProps> = ({
  messages,
  isLoading,
  error,
  isSpeaking,
  onExecuteCode,
  onRegenerate,
}) => {
  // Find the last assistant message
  const lastAssistantMessageIndex = [...messages].reverse().findIndex(m => m.role === 'assistant');
  const lastAssistantMessage = lastAssistantMessageIndex !== -1 
    ? messages.length - 1 - lastAssistantMessageIndex 
    : -1;

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      <div className="flex-1 overflow-y-auto rounded-xl md:rounded-2xl bg-[#1a1a3a]/90 backdrop-blur-xl border border-[#00f3ff]/20 shadow-lg shadow-[#00f3ff]/5">
        <div className="min-h-full p-3 md:p-6 space-y-3 md:space-y-4">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-240px)] text-center space-y-6 md:space-y-12 px-3 md:px-6">
              <div className="w-20 h-20 md:w-32 md:h-32 rounded-2xl flex items-center justify-center bg-[#00f3ff]/20 cyber-border animate-float neon-glow">
                <Bot size={32} className="text-[#00f3ff] md:w-16 md:h-16" />
              </div>
              <div className="max-w-2xl space-y-3 md:space-y-4">
                <h2 className="text-2xl md:text-5xl font-bold bg-gradient-to-r from-[#00f3ff] to-[#bc13fe] bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(0,243,255,0.5)]">
                  AuraChat
                </h2>
                <p className="text-lg md:text-2xl text-[#00f3ff] drop-shadow-[0_0_8px_rgba(0,243,255,0.3)]">
                  Your intelligent coding companion. Ask me anything about programming!
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-8 w-full max-w-4xl">
                <div className="p-4 md:p-8 glass-panel rounded-xl md:rounded-2xl hover:bg-[#00f3ff]/10 transition-colors cursor-pointer group shadow-lg shadow-[#00f3ff]/5">
                  <h3 className="font-semibold mb-2 md:mb-3 text-lg md:text-xl text-[#00f3ff] group-hover:neon-text">Code Generation</h3>
                  <p className="text-[#00f3ff]/80 group-hover:text-[#00f3ff] text-base md:text-lg">Get help with writing efficient and clean code in multiple languages</p>
                </div>
                <div className="p-4 md:p-8 glass-panel rounded-xl md:rounded-2xl hover:bg-[#00f3ff]/10 transition-colors cursor-pointer group shadow-lg shadow-[#00f3ff]/5">
                  <h3 className="font-semibold mb-2 md:mb-3 text-lg md:text-xl text-[#00f3ff] group-hover:neon-text">Voice Interaction</h3>
                  <p className="text-[#00f3ff]/80 group-hover:text-[#00f3ff] text-base md:text-lg">Speak your questions and get voice responses for a hands-free experience</p>
                </div>
              </div>
            </div>
          )}
          
          <div className="space-y-3 md:space-y-4">
            {messages.map((message, index) => (
              <ChatMessage 
                key={index} 
                message={message}
                isSpeaking={isSpeaking && index === messages.length - 1}
                onExecuteCode={onExecuteCode}
                onRegenerate={index === lastAssistantMessage ? onRegenerate : undefined}
                isLastAssistantMessage={index === lastAssistantMessage}
              />
            ))}
          </div>
          
          {isLoading && (
            <div className="flex items-center justify-center p-3 md:p-4">
              <div className="relative w-10 h-10 md:w-14 md:h-14">
                <div className="absolute inset-0 rounded-full border-2 md:border-3 border-[#00f3ff]/20"></div>
                <div className="absolute inset-0 rounded-full border-t-2 md:border-t-3 border-[#00f3ff] animate-spin"></div>
              </div>
            </div>
          )}
          
          {error && (
            <div className="p-3 md:p-6 glass-panel rounded-xl md:rounded-2xl border border-red-500/40 text-red-400 shadow-lg shadow-red-500/10">
              <p className="text-sm md:text-base font-medium">{error}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};