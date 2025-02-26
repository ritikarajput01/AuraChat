import React from 'react';
import { Header } from '../Header';
import { VoiceSettings } from '../VoiceSettings';
import { ChatContainer } from '../ChatContainer';
import { ChatInput } from '../ChatInput';
import { ChatSession, VoiceConfig, MistralModel } from '../../types';

interface MainContentProps {
  currentSession: ChatSession;
  showSettings: boolean;
  voiceConfig: VoiceConfig;
  isLoading: boolean;
  error: string | null;
  isSpeaking: boolean;
  isProcessingFile: boolean;
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
}

export const MainContent: React.FC<MainContentProps> = ({
  currentSession,
  showSettings,
  voiceConfig,
  isLoading,
  error,
  isSpeaking,
  isProcessingFile,
  onToggleSettings,
  setVoiceConfig,
  onCloseSettings,
  onExecuteCode,
  onSendMessage,
  onUploadDocument,
  onChangeModel,
  onSpeak,
  onRegenerate,
  onNavigateResponse
}) => {
  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden">
      <div className="flex-1 flex flex-col h-full max-w-none w-full">
        <div className="container mx-auto px-3 md:px-6 flex flex-col h-full max-w-none pt-16 md:pt-4 pb-3 md:pb-4">
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

          <div className="flex-1 flex flex-col overflow-hidden min-h-0 mt-3 md:mt-4">
            <div className="flex-1 min-h-0">
              <ChatContainer
                messages={currentSession.messages}
                isLoading={isLoading}
                error={error}
                isSpeaking={isSpe
                }
  )
}