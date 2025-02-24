import { useState, useEffect } from 'react';
import { ChatState, ChatSession, Message, MistralModel } from '../types';

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
      
      // If we deleted all sessions, create a new one
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

      // If we deleted the current session, switch to the last remaining session
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
    handleChangeModel,
    addMessage,
  };
}