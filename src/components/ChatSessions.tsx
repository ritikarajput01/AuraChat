import React, { useState } from 'react';
import { Plus, Trash2, MessageSquare, Edit2, Check, X } from 'lucide-react';
import { ChatSession, MistralModel } from '../types';

interface ChatSessionsProps {
  sessions: ChatSession[];
  currentSessionId: string;
  onSelectSession: (sessionId: string) => void;
  onCreateSession: (name: string, model: MistralModel) => void;
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
  const [editingSessionId, setEditingSessionId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');

  const handleStartRename = (e: React.MouseEvent, session: ChatSession) => {
    e.stopPropagation();
    setEditingSessionId(session.id);
    setEditingName(session.name);
  };

  const handleRename = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (editingSessionId && editingName.trim()) {
      onRenameSession(editingSessionId, editingName.trim());
      setEditingSessionId(null);
    }
  };

  const handleCancelRename = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingSessionId(null);
  };

  const handleCreateNewChat = () => {
    onCreateSession('New Chat', 'mistral-tiny');
  };

  const handleDelete = (e: React.MouseEvent, sessionId: string) => {
    e.preventDefault();
    e.stopPropagation();
    onDeleteSession(sessionId);
  };

  const handleInputClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className="flex flex-col h-full bg-[#1a1a3a]">
      <div className="p-6 border-b border-[#00f3ff]/20 bg-[#0a0a1f]/80">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-[#00f3ff]/20 cyber-border neon-glow">
            <MessageSquare className="w-7 h-7 text-[#00f3ff]" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-[#00f3ff] to-[#bc13fe] bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(0,243,255,0.5)]">
              AuraChat
            </h1>
            <p className="text-[#00f3ff]/70 text-sm mt-1">Your intelligent coding companion</p>
          </div>
        </div>
        <button
          onClick={handleCreateNewChat}
          className="w-full py-3.5 px-4 bg-[#00f3ff]/20 text-[#00f3ff] rounded-xl cyber-border hover:bg-[#00f3ff]/30 transition-all flex items-center justify-center gap-2 font-medium shadow-lg shadow-[#00f3ff]/10"
        >
          <Plus size={20} />
          New Chat
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-1">
        <div className="space-y-1">
          {sessions.map((session) => (
            <div
              key={session.id}
              className={`flex flex-col p-3.5 rounded-xl cursor-pointer transition-all group ${
                session.id === currentSessionId
                  ? 'bg-[#00f3ff]/20 text-[#00f3ff] cyber-border shadow-lg shadow-[#00f3ff]/5'
                  : 'hover:bg-[#0a0a1f] text-[#00f3ff]/70'
              }`}
              onClick={() => onSelectSession(session.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <MessageSquare size={18} className={session.id === currentSessionId ? 'text-[#00f3ff]' : 'text-[#00f3ff]/60'} />
                  {editingSessionId === session.id ? (
                    <div className="flex items-center gap-2 flex-1" onClick={handleInputClick}>
                      <input
                        type="text"
                        value={editingName}
                        onChange={(e) => setEditingName(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            handleRename(e as any);
                          } else if (e.key === 'Escape') {
                            handleCancelRename(e as any);
                          }
                        }}
                        className="flex-1 p-2 rounded bg-[#0a0a1f] border border-[#00f3ff]/30 text-white text-sm"
                        autoFocus
                      />
                      <button
                        onClick={handleRename}
                        className="p-1.5 text-[#00f3ff] hover:bg-[#00f3ff]/10 rounded-lg"
                      >
                        <Check size={14} />
                      </button>
                      <button
                        onClick={handleCancelRename}
                        className="p-1.5 text-[#00f3ff]/60 hover:bg-[#0a0a1f] rounded-lg"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ) : (
                    <span className="truncate text-sm font-medium">{session.name}</span>
                  )}
                </div>
                {!editingSessionId && (
                  <div className="flex items-center gap-1 ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={(e) => handleStartRename(e, session)}
                      className="p-1.5 text-[#00f3ff]/60 hover:bg-[#0a0a1f] rounded-lg"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      onClick={(e) => handleDelete(e, session.id)}
                      className="p-1.5 text-red-400 hover:bg-red-500/10 rounded-lg"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};