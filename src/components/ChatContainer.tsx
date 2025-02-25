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
  const lastAssistantMessageIndex = [...messages].reverse().findIndex(m => m.role === 'assistant');
  const lastAssistantMessage = lastAssistantMessageIndex !== -1 
    ? messages.length - 1 - lastAssistantMessageIndex 
    : -1;

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      <div className="flex-1 overflow-y-auto rounded-lg md:rounded-2xl bg-[#1a1a3a]/90 backdrop-blur-xl border border-[#00f3ff]/20 shadow-lg shadow-[#00f3ff]/5">
        <div className="min-h-full p-3 md:p-6 space-y-3 md:space-y-4 max-w-none">
          {messages.length === 0 && (
            <div className="empty-state">
              <div className="empty-state-icon">
                <Bot className="w-8 h-8 md:w-16 md:h-16 text-[#00f3ff]" />
              </div>
              <div className="space-y-3 md:space-y-4">
                <h2 className="empty-state-title">AuraChat</h2>
                <p className="empty-state-description">
                  Your intelligent coding companion. Ask me anything about programming!
                </p>
              </div>
              <div className="feature-cards">
                <div className="feature-card">
                  <h3>Code Generation</h3>
                  <p>Get help with writing efficient and clean code</p>
                </div>
                <div className="feature-card">
                  <h3>Voice Interaction</h3>
                  <p>Speak your questions for a hands-free experience</p>
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
              <div className="relative w-8 h-8 md:w-12 md:h-12">
                <div className="absolute inset-0 rounded-full border-2 border-[#00f3ff]/20"></div>
                <div className="absolute inset-0 rounded-full border-t-2 border-[#00f3ff] animate-spin"></div>
              </div>
            </div>
          )}
          
          {error && (
            <div className="p-3 md:p-4 glass-panel rounded-lg md:rounded-xl border border-red-500/40 text-red-400">
              <p className="text-sm md:text-base">{error}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};