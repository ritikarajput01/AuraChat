import React, { useState } from 'react';
import { MessageSquare, Edit2, Trash2, Check, X, Globe } from 'lucide-react';
import { ChatSession } from '../../types';
import { getLanguageName } from '../../utils/languageUtils';

interface SessionItemProps {
  session: ChatSession;
  isActive: boolean;
  onSelect: () => void;
  onRename: (newName: string) => void;
  onDelete: () => void;
}

export const SessionItem: React.FC<SessionItemProps> = ({
  session,
  isActive,
  onSelect,
  onRename,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingName, setEditingName] = useState(session.name);

  const handleStartRename = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
    setEditingName(session.name);
  };

  const handleRename = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (editingName.trim()) {
      onRename(editingName.trim());
      setIsEditing(false);
    }
  };

  const handleCancelRename = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(false);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete();
  };

  const handleInputClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      className={`flex flex-col p-3.5 rounded-xl cursor-pointer transition-all group ${
        isActive
          ? 'bg-[#00f3ff]/20 text-[#00f3ff] cyber-border shadow-lg shadow-[#00f3ff]/5'
          : 'hover:bg-[#0a0a1f] text-[#00f3ff]/70'
      }`}
      onClick={onSelect}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <MessageSquare size={18} className={isActive ? 'text-[#00f3ff]' : 'text-[#00f3ff]/60'} />
          {isEditing ? (
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
        {!isEditing && (
          <div className="flex items-center gap-1 ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={handleStartRename}
              className="p-1.5 text-[#00f3ff]/60 hover:bg-[#0a0a1f] rounded-lg"
            >
              <Edit2 size={14} />
            </button>
            <button
              onClick={handleDelete}
              className="p-1.5 text-red-400 hover:bg-red-500/10 rounded-lg"
            >
              <Trash2 size={14} />
            </button>
          </div>
        )}
      </div>
      
      {session.language && !isEditing && (
        <div className="mt-2 flex items-center gap-1 text-xs text-[#00f3ff]/60">
          <Globe size={12} />
          <span>{getLanguageName(session.language)}</span>
        </div>
      )}
    </div>
  );
};