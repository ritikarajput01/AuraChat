import React from 'react';
import { MessageSquare, Plus } from 'lucide-react';

interface SessionHeaderProps {
  onCreateNewChat: () => void;
}

export const SessionHeader: React.FC<SessionHeaderProps> = ({ onCreateNewChat }) => {
  return (
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
        onClick={onCreateNewChat}
        className="w-full py-3.5 px-4 bg-[#00f3ff]/20 text-[#00f3ff] rounded-xl cyber-border hover:bg-[#00f3ff]/30 transition-all flex items-center justify-center gap-2 font-medium shadow-lg shadow-[#00f3ff]/10"
      >
        <Plus size={20} />
        New Chat
      </button>
    </div>
  );
};