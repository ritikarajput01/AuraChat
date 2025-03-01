import React from 'react';
import { Message } from '../../types';
import { ChatMessage } from '../ChatMessage';
import { EmptyState } from './EmptyState';
import { LoadingIndicator } from './LoadingIndicator';
import { ErrorMessage } from './ErrorMessage';

interface ChatContainerProps {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  isSpeaking: boolean;
  onExecuteCode: (blockId: string, code: string) => void;
  onRegenerate?: () => void;
  onSpeak?: (text: string) => void;
  onNavigateResponse?: (direction: 'prev' | 'next') => void;
  onSendMessage?: (message: string) => void;
}

export const ChatContainer: React.FC<ChatContainerProps> = ({
  messages,
  isLoading,
  error,
  isSpeaking,
  onExecuteCode,
  onRegenerate,
  onSpeak,
  onNavigateResponse,
  onSendMessage
}) => {
  const lastAssistantMessageIndex = [...messages].reverse().findIndex(m => m.role === 'assistant');
  const lastAssistantMessage = lastAssistantMessageIndex !== -1 
    ? messages.length - 1 - lastAssistantMessageIndex 
    : -1;

  const handleSearchResults = (results: string) => {
    if (onSendMessage) {
      onSendMessage(`Please analyze these search results and provide insights:\n\n${results}`);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      <div className="flex-1 overflow-y-auto rounded-lg md:rounded-2xl bg-[#1a1a3a]/90 backdrop-blur-xl border border-[#00f3ff]/20 shadow-lg shadow-[#00f3ff]/5">
        <div className="min-h-full p-2 md:p-6 space-y-2 md:space-y-4 max-w-none">
          {messages.length === 0 && <EmptyState />}
          
          <div className="space-y-2 md:space-y-4">
            {messages.map((message, index) => (
              <ChatMessage 
                key={index} 
                message={message}
                isSpeaking={isSpeaking && index === messages.length - 1}
                onExecuteCode={onExecuteCode}
                onRegenerate={index === lastAssistantMessage ? onRegenerate : undefined}
                isLastAssistantMessage={index === lastAssistantMessage}
                onSpeak={onSpeak}
                onNavigate={index === lastAssistantMessage ? onNavigateResponse : undefined}
                onSearchResults={index === lastAssistantMessage && message.role === 'assistant' ? handleSearchResults : undefined}
              />
            ))}
          </div>
          
          {isLoading && <LoadingIndicator />}
          
          {error && <ErrorMessage error={error} />}
        </div>
      </div>
    </div>
  );
};