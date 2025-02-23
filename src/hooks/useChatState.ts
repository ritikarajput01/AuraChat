import { useState, useEffect } from 'react';
import { ChatState, ChatSession, Message } from '../types';

const STORAGE_KEY = 'ai-chat-state';

const generateSessionName = (message: string): string => {
  // Remove code blocks
  const cleanMessage = message.replace(/```[\s\S]*?```/g, '');
  
  // Get first line or first X characters
  const firstLine = cleanMessage.split('\n')[0].trim();
  const name = firstLine.slice(0, 40) + (firstLine.length > 40 ? '...' : '');
  
  return name || 'New Chat';
};

export function useChatState() {
  const [chatState, setChatState] = useState<ChatState>(() => {
    const savedState = localStorage.getItem(STORAGE_KEY);
    if (savedState) {
      return JSON.parse(savedState);
    }
    const initialSession: ChatSession = {
      id: 'default',
      name: 'New Chat',
      createdAt: Date.now(),
      messages: [],
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
    localStorage.setItem(STORAGE_KEY, JSON.stringify(chatState));
  }, [chatState]);

  const getCurrentSession = () => {
    return chatState.sessions.find(s => s.id === chatState.currentSessionId)!;
  };

  const updateCurrentSession = (updater: (session: ChatSession) => ChatSession) => {
    setChatState(prev => ({
      ...prev,
      sessions: prev.sessions.map(s =>
        s.id === prev.currentSessionId ? updater(s) : s
      ),
    }));
  };

  const handleCreateSession = (name: string = 'New Chat') => {
    const newSession: ChatSession = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      createdAt: Date.now(),
      messages: [],
    };
    setChatState(prev => ({
      ...prev,
      sessions: [...prev.sessions, newSession],
      currentSessionId: newSession.id,
    }));
  };

  const handleDeleteSession = (sessionId: string) => {
    setChatState(prev => {
      const newSessions = prev.sessions.filter(s => s.id !== sessionId);
      return {
        ...prev,
        sessions: newSessions,
        currentSessionId: newSessions[0]?.id || '',
      };
    });
  };

  const handleRenameSession = (sessionId: string, newName: string) => {
    setChatState(prev => ({
      ...prev,
      sessions: prev.sessions.map(s =>
        s.id === sessionId ? { ...s, name: newName } : s
      ),
    }));
  };

  const addMessage = (message: Message) => {
    updateCurrentSession(session => {
      const updatedSession = {
        ...session,
        messages: [...session.messages, message],
      };

      // Update session name if this is the first user message
      if (message.role === 'user' && session.messages.length === 0) {
        updatedSession.name = generateSessionName(message.content);
      }

      return updatedSession;
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
    addMessage,
  };
}