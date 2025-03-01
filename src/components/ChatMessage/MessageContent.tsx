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
    <div className="prose prose-invert max-w-none text-sm md:text-base overflow-hidden">
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
                  <div className="my-3 max-w-full overflow-x-auto">
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
              <div className="my-3 max-w-full overflow-x-auto">
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
          img: ({ node, ...props }) => (
            <img 
              {...props} 
              className="max-w-full h-auto rounded-lg my-4"
              style={{ maxHeight: '300px', objectFit: 'contain' }}
            />
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto my-4">
              <table className="border-collapse border border-[#00f3ff]/30 w-full">
                {children}
              </table>
            </div>
          ),
          th: ({ children }) => (
            <th className="border border-[#00f3ff]/30 bg-[#00f3ff]/10 p-2 text-left">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border border-[#00f3ff]/30 p-2">
              {children}
            </td>
          ),
          a: ({ children, href }) => (
            <a 
              href={href} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#00f3ff] hover:underline"
            >
              {children}
            </a>
          ),
        }}
      >
        {message.content}
      </ReactMarkdown>
    </div>
  );
};