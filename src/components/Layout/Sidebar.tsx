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
        {isSidebarOpen
      }
  )
}