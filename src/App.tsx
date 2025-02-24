import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { useChatState } from './hooks/useChatState';
import { useVoice } from './hooks/useVoice';
import { useMistralClient } from './hooks/useMistralClient';
import { useMessageHandler } from './hooks/useMessageHandler';
import { useCodeExecution } from './hooks/useCodeExecution';
import { parseDocument } from './utils/documentParser';

function App() {
  const {
    chatState,
    setChatState,
    getCurrentSession,
    updateCurrentSession,
    handleCreateSession,
    handleDeleteSession,
    handleRenameSession,
    handleChangeModel,
    addMessage,
  } = useChatState();

  const [showSettings, setShowSettings] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProcessingFile, setIsProcessingFile] = useState(false);

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

  const handleUploadDocument = async (file: File) => {
    try {
      setIsProcessingFile(true);
      setChatState(prev => ({ ...prev, isLoading: true }));
      
      const text = await parseDocument(file);
      
      // Create a message with the file content
      const fileType = file.type.startsWith('image/') ? 'image' : 'document';
      const message = `I've uploaded ${fileType === 'image' ? 'an image' : 'a document'} named "${file.name}". Please analyze its contents:\n\n${text}`;
      
      handleSendMessage(message);
    } catch (error) {
      setChatState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Failed to parse file. Please try again with a supported format.',
      }));
    } finally {
      setIsProcessingFile(false);
    }
  };

  // Initialize voice when the app loads
  useEffect(() => {
    initializeVoice();
  }, [initializeVoice]);

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
      onUploadDocument={handleUploadDocument}
      onChangeModel={handleChangeModel}
      isProcessingFile={isProcessingFile}
    />
  );
}

export default App;