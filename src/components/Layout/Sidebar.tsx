import React from 'react';
import { X, Menu } from 'lucide-react';
import { ChatSessions } from '../ChatSessions';
import { ChatSession } from '../../types';

interface SidebarProps {
  sessions: ChatSession[];
  currentSessionId: string;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  onSelectSession: (id: string) => void;
  onCreateSession: (name: string) => void;
  onDeleteSession: (id: string) => void;
  onRenameSession: (id: string, name: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  sessions,
  currentSessionId,
  isSidebarOpen,
  toggleSidebar,
  onSelectSession,
  onCreateSession,
  onDeleteSession,
  onRenameSession,
}) => {
  return (
    <>
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 p-2.5 bg-[#1a1a3a] cyber-border rounded-xl neon-glow hover:bg-[#1a1a3a]/80 transition-colors md:hidden"
      >
        {isSidebarOpen ? (
          <X className="w-5 h-5 text-[#00f3ff]" />
        ) : (
          <Menu className="w-5 h-5 text-[#00f3ff]" />
        )}
      </button>

      <div
        className={`fixed inset-y-0 left-0 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out z-40 w-[280px] bg-[#1a1a3a] border-r border-[#00f3ff]/30 shadow-2xl shadow-[#00f3ff]/10 md:relative md:translate-x-0`}
      >
        <ChatSessions
          sessions={sessions}
          currentSessionId={currentSessionId}
          onSelectSession={(id) => {
            onSelectSession(id);
            toggleSidebar();
          }}
          onCreateSession={onCreateSession}
          onDeleteSession={onDeleteSession}
          onRenameSession={onRenameSession}
        />
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};