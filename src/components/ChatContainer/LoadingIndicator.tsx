import React from 'react';

export const LoadingIndicator: React.FC = () => {
  return (
    <div className="flex items-center justify-center p-3 md:p-4">
      <div className="relative w-8 h-8 md:w-12 md:h-12">
        <div className="absolute inset-0 rounded-full border-2 border-[#00f3ff]/20"></div>
        <div className="absolute inset-0 rounded-full border-t-2 border-[#00f3ff] animate-spin"></div>
      </div>
    </div>
  );
};