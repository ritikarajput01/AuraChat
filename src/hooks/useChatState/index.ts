import { useState, useEffect } from 'react';
import { ChatState, ChatSession, Message, MistralModel } from '../../types';
import { generateSessionName } from './generateSessionName';

const STORAGE_KEY = 'ai-chat-state';

export function useChatState() {
  const [chatState, setChatState] = useState<ChatState>(() => {
    try {
      const savedState = localStorage.getItem(STORAGE_KEY);
      if (savedState) {
        const parsedState = JSON.parse(savedState);
        if (parsedState.sessions && parsedState.sessions.length > 0) {
          // Update any existing sessions to use valid models
          const updatedSessions = parsedState.sessions.map((session: ChatSession) => {
            // If the model is not in our current list, default to mistral-large
            if (session.model !== 'mistral-large' && session.model !== 'codestral') {
              return { ...session, model: 'mistral-large' };
            }
            return session;
          });
          return { ...parsedState, sessions: updatedSessions };
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
      model: 'mistral-large', // Default model
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

  const handleCreateSession = (name: string = 'New Chat', model: MistralModel = 'mistral-large') => {
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
          model: 'mistral-large', // Default model
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
        messages: [...session.messages, message],
      };

      // Update session name if this is the first user message
      if (message.role === 'user' && session.messages.length === 0) {
        updatedSession.name = generateSessionName(message.content);
      }

      return updatedSession;
    });
  };

  const navigateResponse = (direction: 'prev' | 'next') => {
    updateCurrentSession(session => {
      const updatedMessages = [...session.messages];
      const lastAssistantMessageIndex = updatedMessages.findIndex(
        (msg, idx) => msg.role === 'assistant' && 
        (idx === updatedMessages.length - 1 || updatedMessages[idx + 1]?.role === 'user')
      );
      
      if (lastAssistantMessageIndex === -1) return session;
      
      const lastAssistantMessage = updatedMessages[lastAssistantMessageIndex];
      
      if (!lastAssistantMessage.alternatives || lastAssistantMessage.alternatives.length === 0) {
        return session;
      }
      
      const currentIndex = lastAssistantMessage.currentAlternativeIndex || 0;
      const totalAlternatives = lastAssistantMessage.alternatives.length;
      
      let newIndex;
      if (direction === 'next') {
        newIndex = (currentIndex + 1) % (totalAlternatives + 1);
      } else {
        newIndex = (currentIndex - 1 + totalAlternatives + 1) % (totalAlternatives + 1);
      }
      
      // Update the message content based on the new index
      if (newIndex === 0) {
        // Show original response
        updatedMessages[lastAssistantMessageIndex] = {
          ...lastAssistantMessage,
          content: lastAssistantMessage.originalContent || lastAssistantMessage.content,
          currentAlternativeIndex: 0
        };
      } else {
        // Show alternative response
        updatedMessages[lastAssistantMessageIndex] = {
          ...lastAssistantMessage,
          content: lastAssistantMessage.alternatives[newIndex - 1],
          currentAlternativeIndex: newIndex
        };
      }
      
      return {
        ...session,
        messages: updatedMessages
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