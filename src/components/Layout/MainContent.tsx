import React, { useState } from 'react';
import { Header } from '../Header';
import { VoiceSettings } from '../VoiceSettings';
import { ChatContainer } from '../ChatContainer';
import { ChatInput } from '../ChatInput';
import { ChatSession, VoiceConfig, MistralModel } from '../../types';
import { SearchModal } from '../SearchModal';

interface MainContentProps {
  currentSession: ChatSession;
  showSettings: boolean;
  voiceConfig: VoiceConfig;
  isLoading: boolean;
  error: string | null;
  isSpeaking: boolean;
  isProcessingFile: boolean;
  isWebSearchActive?: boolean;
  onToggleSettings: () => void;
  setVoiceConfig: React.Dispatch<React.SetStateAction<VoiceConfig>>;
  onCloseSettings: () => void;
  onExecuteCode: (blockId: string, code: string) => void;
  onSendMessage: (message: string, isVoice?: boolean) => void;
  onUploadDocument: (file: File) => void;
  onChangeModel: (model: MistralModel) => void;
  onSpeak: (text: string) => void;
  onRegenerate: () => void;
  onNavigateResponse?: (direction: 'prev' | 'next') => void;
  onToggleWebSearch?: () => void;
}

export const MainContent: React.FC<MainContentProps> = ({
  currentSession,
  showSettings,
  voiceConfig,
  isLoading,
  error,
  isSpeaking,
  isProcessingFile,
  isWebSearchActive = false,
  onToggleSettings,
  setVoiceConfig,
  onCloseSettings,
  onExecuteCode,
  onSendMessage,
  onUploadDocument,
  onChangeModel,
  onSpeak,
  onRegenerate,
  onNavigateResponse,
  onToggleWebSearch
}) => {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [searchContext, setSearchContext] = useState('');

  const handleSearchResults = (results: string) => {
    onSendMessage(`Please analyze these search results and provide insights:\n\n${results}`);
  };

  const handleOpenSearch = () => {
    // Get the last assistant message as context
    const lastAssistantMessage = [...currentSession.messages]
      .reverse()
      .find(message => message.role === 'assistant');
    
    if (lastAssistantMessage) {
      setSearchContext(lastAssistantMessage.content);
    } else {
      setSearchContext('');
    }
    
    setIsSearchModalOpen(true);
  };

  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden">
      <div className="flex-1 flex flex-col h-full max-w-none w-full">
        <div className="container mx-auto px-2 md:px-6 flex flex-col h-full max-w-none pt-12 md:pt-4 pb-2 md:pb-4">
          <Header
            sessionsCount={0}
            onToggleSessions={() => {}}
            onToggleSettings={onToggleSettings}
          />

          {showSettings && (
            <VoiceSettings
              voiceConfig={voiceConfig}
              setVoiceConfig={setVoiceConfig}
              onClose={onCloseSettings}
            />
          )}

          <div className="flex-1 flex flex-col overflow-hidden min-h-0 mt-2 md:mt-4">
            <div className="flex-1 min-h-0">
              <ChatContainer
                messages={currentSession.messages}
                isLoading={isLoading}
                error={error}
                isSpeaking={isSpeaking}
                onExecuteCode={onExecuteCode}
                onRegenerate={onRegenerate}
                onSpeak={onSpeak}
                onNavigateResponse={onNavig
                }
  )
}