import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Message } from '../types';
import { Bot, User, Volume2 } from 'lucide-react';
import { CodeBlock } from './CodeBlock';

interface ChatMessageProps {
  message: Message;
  isSpeaking?: boolean;
  onExecuteCode: (blockId: string, code: string) => void;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ 
  message, 
  isSpeaking,
  onExecuteCode,
}) => {
  const isBot = message.role === 'assistant';

  return (
    <div className={`flex gap-3 md:gap-6 p-3 md:p-6 rounded-xl md:rounded-2xl transition-all message-bubble ${
      isBot ? 'assistant' : ''
    }`}>
      <div className={`shrink-0 w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-xl flex items-center justify-center cyber-border ${
        isBot ? 'bg-[#00f3ff]/10 text-[#00f3ff]' : 'bg-[#bc13fe]/10 text-[#bc13fe]'
      }`}>
        {isBot ? <Bot className="w-4 h-4 md:w-6 md:h-6" /> : <User className="w-4 h-4 md:w-6 md:h-6" />}
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-medium mb-2 md:mb-3 flex items-center gap-2 md:gap-3 text-sm md:text-base">
          <span className={isBot ? 'text-[#00f3ff]' : 'text-[#bc13fe]'}>
            {isBot ? 'AI Assistant' : 'You'}
          </span>
          {message.isVoice && (
            <Volume2 className={`w-3.5 h-3.5 md:w-4 md:h-4 ${isBot ? 'text-[#00f3ff]/60' : 'text-[#bc13fe]/60'}`} />
          )}
          {isSpeaking && (
            <div className="flex gap-1 items-center">
              <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-[#00f3ff] rounded-full animate-soft-pulse"></div>
              <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-[#00f3ff] rounded-full animate-soft-pulse delay-75"></div>
              <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-[#00f3ff] rounded-full animate-soft-pulse delay-150"></div>
            </div>
          )}
        </div>
        <div className="prose prose-invert max-w-none text-sm md:text-base">
          <ReactMarkdown
            components={{
              p: ({ children }) => <div className="mb-3 last:mb-0">{children}</div>,
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                const language = match ? match[1] : 'text';
                const code = String(children).replace(/\n$/, '');

                if (!inline && match) {
                  const codeBlock = message.codeBlocks?.find(block => 
                    block.code === code && block.language === language
                  );

                  if (codeBlock) {
                    return (
                      <div className="my-3">
                        <CodeBlock
                          block={codeBlock}
                          onExecute={onExecuteCode}
                          isEditable={isBot}
                        />
                      </div>
                    );
                  }
                }

                return inline ? (
                  <code className="bg-[#0a0a1f]/80 text-[#00f3ff] px-1.5 py-0.5 rounded text-xs md:text-sm" {...props}>
                    {children}
                  </code>
                ) : (
                  <div className="my-3">
                    <CodeBlock
                      block={{
                        id: Math.random().toString(36).substr(2, 9),
                        language,
                        code,
                      }}
                      onExecute={onExecuteCode}
                      isEditable={isBot}
                    />
                  </div>
                );
              },
            }}
          >
            {message.content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};