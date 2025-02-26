import React from 'react';
import ReactMarkdown from 'react-markdown';
import { CodeBlock } from './CodeBlock';
import { Message } from '../../types';

interface MessageContentProps {
  message: Message;
  onExecuteCode: (blockId: string, code: string) => void;
  isBot: boolean;
}

export const MessageContent: React.FC<MessageContentProps> = ({ 
  message, 
  onExecuteCode,
  isBot
}) => {
  return (
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
  );
};