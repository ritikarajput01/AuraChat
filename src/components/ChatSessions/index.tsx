import React from 'react';
import { ChatSession } from '../../types';
import { SessionHeader } from './SessionHeader';
import { SessionItem } from './SessionItem';

interface ChatSessionsProps {
  sessions: ChatSession[];
  currentSessionId: string;
  onSelectSession: (sessionId: string) => void;
  onCreateSession: (name: string) => void;
  onDeleteSession: (sessionId: string) => void;
  onRenameSession: (sessionId: string, newName: string) => void;
}

export const ChatSessions: React.FC<ChatSessionsProps> = ({
  sessions,
  currentSessionId,
  onSelectSession,
  onCreateSession,
  onDeleteSession,
  onRenameSession,
}) => {
  const handleCreateNewChat = () => {
    onCreateSession('New Chat');
  };

  return (
    <div className="flex flex-col h-full bg-[#1a1a3a]">
      <SessionHeader onCreateNewChat={handleCreateNewChat} />

      <div className="flex-1 overflow-y-auto p-3 space-y-1">
        <div className="space-y-1">
          {sessions.map((session) => (
            <SessionItem
              key={session.id}
              session={session}
              isActive={session.id === currentSessionId}
              onSelect={() => onSelectSession(session.id)}
              onRename={(newName) => onRenameSession(session.id, newName)}
              onDelete={() => onDeleteSession(session.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};