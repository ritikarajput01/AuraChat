import React from 'react';

interface ErrorMessageProps {
  error: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => {
  return (
    <div className="p-3 md:p-4 glass-panel rounded-lg md:rounded-xl border border-red-500/40 text-red-400">
      <p className="text-sm md:text-base">{error}</p>
    </div>
  );
};