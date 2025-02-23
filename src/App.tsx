import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { useChatState } from './hooks/useChatState';
import { useVoice } from './hooks/useVoice';
import { useMistralClient } from './hooks/useMistralClient';
import { useMessageHandler } from './hooks/useMessageHandler';
import { useCodeExecution } from './hooks/useCodeExecution';

function App() {
  const {
    chatState,
    setChatState,
    getCurrentSession,
    updateCurrentSession,
    handleCreateSession,
    handleDeleteSession,
    handleRenameSession,
    addMessage,
  } = useChatState();

  const [showSettings, setShowSettings] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { voiceConfig, setVoiceConfig, initializeVoice, speakMessage } = useVoice(setChatState);
  const mistralClient = useMistralClient();
  const { handleSendMessage } = useMessageHandler(
    mistralClient,
    addMessage,
    setChatState,
    getCurrentSession,
    speakMessage
  );
  const { handleExecuteCode } = useCodeExecution(updateCurrentSession);

  const currentSession = getCurrentSession();

  return (
    <Layout
      sessions={chatState.sessions}
      currentSessionId={chatState.currentSessionId}
      showSettings={showSettings}
      isMobileMenuOpen={isMobileMenuOpen}
      voiceConfig={voiceConfig}
      isLoading={chatState.isLoading}
      error={chatState.error}
      isSpeaking={chatState.isSpeaking}
      currentSession={currentSession}
      onSelectSession={(id) => setChatState(prev => ({ ...prev, currentSessionId: id }))}
      onCreateSession={handleCreateSession}
      onDeleteSession={handleDeleteSession}
      onRenameSession={handleRenameSession}
      onToggleSettings={() => setShowSettings(!showSettings)}
      setVoiceConfig={setVoiceConfig}
      onCloseSettings={() => setShowSettings(false)}
      setIsMobileMenuOpen={setIsMobileMenuOpen}
      onExecuteCode={handleExecuteCode}
      onSendMessage={handleSendMessage}
    />
  );
}

export default App;