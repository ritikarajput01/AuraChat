import React from 'react';
import { Bot } from 'lucide-react';

export const EmptyState: React.FC = () => {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">
        <Bot className="w-8 h-8 md:w-16 md:h-16 text-[#00f3ff]" />
      </div>
      <div className="space-y-3 md:space-y-4">
        <h2 className="empty-state-title">AuraChat</h2>
        <p className="empty-state-description">
          Your intelligent coding companion. Ask me anything about programming!
        </p>
      </div>
      <div className="feature-cards">
        <div className="feature-card">
          <h3>Code Generation</h3>
          <p>Get help with writing efficient and clean code</p>
        </div>
        <div className="feature-card">
          <h3>Voice Interaction</h3>
          <p>Speak your questions for a hands-free experience</p>
        </div>
      </div>
    </div>
  );
};