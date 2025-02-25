import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { ChatSessions } from './ChatSessions';
import { Header } from './Header';
import { VoiceSettings } from './VoiceSettings';
import { ChatContainer } from './ChatContainer';
import { ChatInput } from './ChatInput';
import { ChatSession, VoiceConfig, MistralModel } from '../types';

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
  onNavigateResponse,
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
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 p-2.5 bg-[#1a1a3a] cyber-border rounded-xl neon-glow hover:bg-[#1a1a3a]/80 transition-colors md:hidden"
      >
        {isSidebarOpen ? (
          <X className="w-5 h-5 text-[#00f3ff]" />
        ) : (
          <Menu className="w-5 h-5 text-[#00f3ff]" />
        )}
      </button>

      <div
        className={`fixed inset-y-0 left-0 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out z-40 w-[280px] bg-[#1a1a3a] border-r border-[#00f3ff]/30 shadow-2xl shadow-[#00f3ff]/10 md:relative md:translate-x-0`}
      >
        <ChatSessions
          sessions={sessions}
          currentSessionId={currentSessionId}
          onSelectSession={(id) => {
            onSelectSession(id);
            setIsSidebarOpen(false);
          }}
          onCreateSession={onCreateSession}
          onDeleteSession={onDeleteSession}
          onRenameSession={onRenameSession}
        />
      </div>

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <div className="flex-1 flex flex-col h-full max-w-none w-full">
          <div className="container mx-auto px-3 md:px-6 flex flex-col h-full max-w-none pt-16 md:pt-4 pb-3 md:pb-4">
            <Header
              sessionsCount={sessions.length}
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
                  isSpeaking={isSpeaking}
                  onExecuteCode={onExecuteCode}
                  onRegenerate={handleRegenerate}
                  onSpeak={onSpeak}
                  onNavigateResponse={onNavigateResponse}
                  regenerationHistory={currentSession.regenerationHistory}
                />
              </div>

              <div className="mt-3 md:mt-4">
                <ChatInput
                  onSend={onSendMessage}
                  onUploadDocument={onUploadDocument}
                  disabled={isLoading}
                  isSpeaking={isSpeaking}
                  currentModel={currentSession.model}
                  onChangeModel={(model) => onChangeModel(currentSession.id, model)}
                  isProcessingFile={isProcessingFile}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};