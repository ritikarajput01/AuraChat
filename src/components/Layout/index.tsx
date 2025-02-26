import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { MainContent } from './MainContent';
import { ChatSession, VoiceConfig, MistralModel } from '../../types';

interface LayoutProps {
  sessions: ChatSession[];
  currentSessionId: string;
  showSettings: boolean;
  isMobileMenuOpen: boolean;
  voiceConfig: VoiceConfig;
  isLoading: boolean;
  error: string | null;
  isSpeaking: boolean;
  currentSession: ChatSession;
  isProcessingFile: boolean;
  onSelectSession: (id: string) => void;
  onCreateSession: (name: string) => void;
  onDeleteSession: (id: string) => void;
  onRenameSession: (id: string, name: string) => void;
  onToggleSettings: () => void;
  setVoiceConfig: React.Dispatch<React.SetStateAction<VoiceConfig>>;
  onCloseSettings: () => void;
  setIsMobileMenuOpen: (open: boolean) => void;
  onExecuteCode: (blockId: string, code: string) => void;
  onSendMessage: (message: string, isVoice?: boolean, isRegeneration?: boolean) => void;
  onUploadDocument: (file: File) => void;
  onChangeModel: (sessionId: string, model: MistralModel) => void;
  onSpeak: (text: string) => void;
  onNavigateResponse: (direction: 'prev' | 'next') => void;
}

export const Layout: React.FC<LayoutProps> = ({
  sessions,
  currentSessionId,
  showSettings,
  isMobileMenuOpen,
  voiceConfig,
  isLoading,
  error,
  isSpeaking,
  currentSession,
  isProcessingFile,
  onSelectSession,
  onCreateSession,
  onDeleteSession,
  onRenameSession,
  onToggleSettings,
  setVoiceConfig,
  onCloseSettings,
  setIsMobileMenuOpen,
  onExecuteCode,
  onSendMessage,
  onUploadDocument,
  onChangeModel,
  onSpeak,
  onNavigateResponse
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleRegenerate = () => {
    const lastUserMessage = [...currentSession.messages]
      .reverse()
      .find(message => message.role === 'user');
    
    if (lastUserMessage) {
      onSendMessage(lastUserMessage.content, lastUserMessage.isVoice, true);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="h-screen flex bg-[#0a0a1f] cyber-grid overflow-hidden">
      <Sidebar 
        sessions={sessions}
        currentSessionId={currentSessionId}
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        onSelectSession={onSelectSession}
        onCreateSession={onCreateSession}
        onDeleteSession={onDeleteSession}
        onRenameSession={onRenameSession}
      />

      <MainContent 
        currentSession={currentSession}
        showSettings={showSettings}
        voiceConfig={voiceConfig}
        isLoading={isLoading}
        error={error}
        isSpeaking={isSpeaking}
        isProcessingFile={isProcessingFile}
        onToggleSettings={onToggleSettings}
        setVoiceConfig={setVoiceConfig}
        onCloseSettings={onCloseSettings}
        onExecuteCode={onExecuteCode}
        onSendMessage={onSendMessage}
        onUploadDocument={onUploadDocument}
        onChangeModel={(model) => onChangeModel(currentSession.id, model)}
        onSpeak={onSpeak}
        onRegenerate={handleRegenerate}
        onNavigateResponse={onNavigateResponse}
      />
    </div>
  );
};