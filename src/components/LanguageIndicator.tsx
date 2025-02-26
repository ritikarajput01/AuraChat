import React from 'react';
import { Globe } from 'lucide-react';
import { getLanguageName, getNativeLanguageName } from '../utils/languageUtils';

interface LanguageIndicatorProps {
  language: string;
  className?: string;
}

export const LanguageIndicator: React.FC<LanguageIndicatorProps> = ({ language, className = '' }) => {
  if (!language) return null;
  
  return (
    <div className={`flex items-center gap-2 text-sm text-[#00f3ff] bg-[#00f3ff]/10 px-3 py-1.5 rounded-lg ${className}`}>
      <Globe className="w-4 h-4" />
      <span>{getLanguageName(language)} ({getNativeLanguageName(language)})</span>
    </div>
  );
};