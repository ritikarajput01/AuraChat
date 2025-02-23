import React, { useState } from 'react';
import { Plus, Trash2, MessageSquare, Edit2, Check, X, Code2 } from 'lucide-react';
import { ChatSession } from '../types';

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
  const [isCreating, setIsCreating] = useState(false);
  const [newSessionName, setNewSessionName] = useState('');
  const [editingSessionId, setEditingSessionId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');

  const handleCreateSession = () => {
    if (newSessionName.trim()) {
      onCreateSession(newSessionName.trim());
      setNewSessionName('');
      setIsCreating(false);
    }
  };

  const handleStartRename = (session: ChatSession) => {
    setEditingSessionId(session.id);
    setEditingName(session.name);
  };

  const handleRename = () => {
    if (editingSessionId && editingName.trim()) {
      onRenameSession(editingSessionId, editingName.trim());
      setEditingSessionId(null);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#1a1a3a]">
      <div className="p-6 border-b border-[#00f3ff]/20 bg-[#0a0a1f]/80">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-[#00f3ff]/20 cyber-border neon-glow">
            <Code2 className="w-7 h-7 text-[#00f3ff]" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-[#00f3ff] to-[#bc13fe] bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(0,243,255,0.5)]">
              AI Code Assistant
            </h1>
            <p className="text-[#00f3ff]/70 text-sm mt-1">Your intelligent coding companion</p>
          </div>
        </div>
        <button
          onClick={() => setIsCreating(true)}
          className="w-full py-3.5 px-4 bg-[#00f3ff]/20 text-[#00f3ff] rounded-xl cyber-border hover:bg-[#00f3ff]/30 transition-all flex items-center justify-center gap-2 font-medium shadow-lg shadow-[#00f3ff]/10"
        >
          <Plus size={20} />
          New Chat
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-1">
        {isCreating && (
          <div className="p-3 glass-panel rounded-xl mb-2">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={newSessionName}
                onChange={(e) => setNewSessionName(e.target.value)}
                placeholder="Session name..."
                className="flex-1 p-2.5 rounded-lg bg-[#0a0a1f] border border-[#00f3ff]/30 text-white placeholder-[#00f3ff]/50 focus:outline-none focus:ring-2 focus:ring-[#00f3ff]/50"
                autoFocus
              />
              <button
                onClick={handleCreateSession}
                className="p-2.5 bg-[#00f3ff]/10 text-[#00f3ff] rounded-lg hover:bg-[#00f3ff]/20 cyber-border"
              >
                <Check size={18} />
              </button>
              <button
                onClick={() => setIsCreating(false)}
                className="p-2.5 hover:bg-[#0a0a1f] rounded-lg text-[#00f3ff]"
              >
                <X size={18} />
              </button>
            </div>
          </div>
        )}

        <div className="space-y-1">
          {sessions.map((session) => (
            <div
              key={session.id}
              className={`flex items-center justify-between p-3.5 rounded-xl cursor-pointer transition-all group ${
                session.id === currentSessionId
                  ? 'bg-[#00f3ff]/20 text-[#00f3ff] cyber-border shadow-lg shadow-[#00f3ff]/5'
                  : 'hover:bg-[#0a0a1f] text-[#00f3ff]/70'
              }`}
              onClick={() => onSelectSession(session.id)}
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <MessageSquare size={18} className={session.id === currentSessionId ? 'text-[#00f3ff]' : 'text-[#00f3ff]/60'} />
                {editingSessionId === session.id ? (
                  <div className="flex items-center gap-2 flex-1">
                    <input
                      type="text"
                      value={editingName}
                      onChange={(e) => setEditingName(e.target.value)}
                      className="flex-1 p-2 rounded bg-[#0a0a1f] border border-[#00f3ff]/30 text-white text-sm"
                      autoFocus
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRename();
                      }}
                      className="p-1.5 text-[#00f3ff] hover:bg-[#00f3ff]/10 rounded-lg"
                    >
                      <Check size={14} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingSessionId(null);
                      }}
                      className="p-1.5 text-[#00f3ff]/60 hover:bg-[#0a0a1f] rounded-lg"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <span className="truncate text-sm font-medium">{session.name}</span>
                )}
              </div>
              {session.id === currentSessionId && !editingSessionId && (
                <div className="flex items-center gap-1 ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStartRename(session);
                    }}
                    className="p-1.5 text-[#00f3ff]/60 hover:bg-[#0a0a1f] rounded-lg"
                  >
                    <Edit2 size={14} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteSession(session.id);
                    }}
                    className="p-1.5 text-red-400 hover:bg-red-500/10 rounded-lg"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};