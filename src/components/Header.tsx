import React from 'react';
import { Settings } from 'lucide-react';

interface HeaderProps {
  sessionsCount: number;
  onToggleSessions: () => void;
  onToggleSettings: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onToggleSettings,
}) => {
  return (
    <div className="py-4">
      <div className="flex items-center justify-end">
        <button
          onClick={onToggleSettings}
          className="p-2 hover:bg-[#00f3ff]/10 rounded-lg transition-colors text-[#00f3ff]/70 hover:text-[#00f3ff]"
        >
          <Settings className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};