import { useState, useEffect } from 'react';
import { ChatState, ChatSession, Message, MistralModel } from '../types';

const STORAGE_KEY = 'ai-chat-state';

const generateSessionName = (message: string): string => {
  const cleanMessage = message.replace(/```[\s\S]*?```/g, '');
  const firstLine = cleanMessage.split('\n')[0].trim();
  const name = firstLine.slice(0, 40) + (firstLine.length > 40 ? '...' : '');
  return name || 'New Chat';
};

export function useChatState() {
  const [chatState, setChatState] = useState<ChatState>(() => {
    try {
      const savedState = localStorage.getItem(STORAGE_KEY);
      if (savedState) {
        const parsedState = JSON.parse(savedState);
        if (parsedState.sessions && parsedState.sessions.length > 0) {
          return parsedState;
        }
      }
    } catch (error) {
      console.error('Error loading chat state:', error);
    }

    const initialSession: ChatSession = {
      id: 'default',
      name: 'New Chat',
      createdAt: Date.now(),
      messages: [],
      model: 'mistral-tiny',
    };
    return {
      sessions: [initialSession],
      currentSessionId: initialSession.id,
      isLoading: false,
      error: null,
      isSpeaking: false,
    };
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(chatState));
    } catch (error) {
      console.error('Error saving chat state:', error);
    }
  }, [chatState]);

  const getCurrentSession = () => {
    return chatState.sessions.find(s => s.id === chatState.currentSessionId) || chatState.sessions[0];
  };

  const updateCurrentSession = (updater: (session: ChatSession) => ChatSession) => {
    setChatState(prev => ({
      ...prev,
      sessions: prev.sessions.map(s =>
        s.id === prev.currentSessionId ? updater(s) : s
      ),
    }));
  };

  const handleCreateSession = (name: string = 'New Chat', model: MistralModel = 'mistral-tiny') => {
    const newSession: ChatSession = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      createdAt: Date.now(),
      messages: [],
      model,
    };
    setChatState(prev => ({
      ...prev,
      sessions: [...prev.sessions, newSession],
      currentSessionId: newSession.id,
    }));
    return newSession.id;
  };

  const handleDeleteSession = (sessionId: string) => {
    setChatState(prev => {
      const newSessions = prev.sessions.filter(s => s.id !== sessionId);
      
      if (newSessions.length === 0) {
        const newSession: ChatSession = {
          id: Math.random().toString(36).substr(2, 9),
          name: 'New Chat',
          createdAt: Date.now(),
          messages: [],
          model: 'mistral-tiny',
        };
        return {
          ...prev,
          sessions: [newSession],
          currentSessionId: newSession.id,
        };
      }

      const newCurrentId = prev.currentSessionId === sessionId
        ? newSessions[newSessions.length - 1].id
        : prev.currentSessionId;

      return {
        ...prev,
        sessions: newSessions,
        currentSessionId: newCurrentId,
      };
    });
  };

  const handleRenameSession = (sessionId: string, newName: string) => {
    const trimmedName = newName.trim();
    if (!trimmedName) return;

    setChatState(prev => ({
      ...prev,
      sessions: prev.sessions.map(s =>
        s.id === sessionId 
          ? { ...s, name: trimmedName }
          : s
      ),
    }));
  };

  const handleChangeModel = (sessionId: string, model: MistralModel) => {
    setChatState(prev => ({
      ...prev,
      sessions: prev.sessions.map(s =>
        s.id === sessionId ? { ...s, model } : s
      ),
    }));
  };

  const addMessage = (message: Message) => {
    updateCurrentSession(session => {
      const updatedSession = {
        ...session,
        messages: [...session.messages],
      };

      if (message.role === 'assistant') {
        // Find the last user message and its corresponding regeneration history
        const lastUserMessageIndex = updatedSession.messages.map(m => m.role).lastIndexOf('user');
        
        if (lastUserMessageIndex !== -1) {
          const regenerationHistory = updatedSession.regenerationHistory || [];
          const existingHistory = regenerationHistory.find(h => h.messageIndex === lastUserMessageIndex);

          if (existingHistory) {
            // Add to existing history
            existingHistory.responses.push(message);
            message.regenerationIndex = existingHistory.responses.length - 1;
          } else {
            // Create new history entry
            regenerationHistory.push({
              messageIndex: lastUserMessageIndex,
              responses: [message],
            });
            message.regenerationIndex = 0;
          }

          updatedSession.regenerationHistory = regenerationHistory;
        }
      }

      updatedSession.messages.push(message);

      // Update session name if this is the first user message
      if (message.role === 'user' && session.messages.length === 0) {
        updatedSession.name = generateSessionName(message.content);
      }

      return updatedSession;
    });
  };

  const navigateResponse = (direction: 'prev' | 'next') => {
    updateCurrentSession(session => {
      const messages = [...session.messages];
      const lastAssistantIndex = messages.map(m => m.role).lastIndexOf('assistant');
      
      if (lastAssistantIndex === -1) return session;

      const lastUserMessageIndex = messages.slice(0, lastAssistantIndex).map(m => m.role).lastIndexOf('user');
      if (lastUserMessageIndex === -1) return session;

      const history = session.regenerationHistory?.find(h => h.messageIndex === lastUserMessageIndex);
      if (!history) return session;

      const currentIndex = messages[lastAssistantIndex].regenerationIndex || 0;
      const newIndex = direction === 'prev' ? currentIndex - 1 : currentIndex + 1;

      if (newIndex < 0 || newIndex >= history.responses.length) return session;

      messages[lastAssistantIndex] = {
        ...history.responses[newIndex],
        regenerationIndex: newIndex,
      };

      return {
        ...session,
        messages,
      };
    });
  };

  return {
    chatState,
    setChatState,
    getCurrentSession,
    updateCurrentSession,
    handleCreateSession,
    handleDeleteSession,
    handleRenameSession,
    handleChangeModel,
    addMessage,
    navigateResponse,
  };
}