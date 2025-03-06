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
          p: ({ children }) => (
            <div className="mb-4 last:mb-0 leading-relaxed">{children}</div>
          ),
          h1: ({ children }) => (
            <h1 className="text-xl md:text-2xl font-bold text-[#00f3ff] mb-4 mt-6 first:mt-0">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-lg md:text-xl font-semibold text-[#00f3ff] mb-3 mt-5">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-base md:text-lg font-medium text-[#00f3ff] mb-3 mt-4">{children}</h3>
          ),
          ul: ({ children }) => (
            <ul className="mb-4 space-y-2 list-disc list-inside pl-4">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="mb-4 space-y-2 list-decimal list-inside pl-4">{children}</ol>
          ),
          li: ({ children }) => (
            <li className="text-white/90 leading-relaxed">{children}</li>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-[#00f3ff]/40 pl-4 my-4 italic text-white/80">
              {children}
            </blockquote>
          ),
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
                  <div className="my-4 max-w-full overflow-x-auto rounded-lg border-2 border-[#00f3ff]/20 bg-[#1a1a3a]">
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
              <code className="px-1.5 py-0.5 rounded text-xs md:text-sm font-mono bg-[#1a1a3a] text-[#00f3ff] border border-[#00f3ff]/20" {...props}>
                {children}
              </code>
            ) : (
              <div className="my-4 max-w-full overflow-x-auto rounded-lg border-2 border-[#00f3ff]/20 bg-[#1a1a3a]">
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
          table: ({ children }) => (
            <div className="my-4 w-full overflow-x-auto">
              <table className="w-full border-collapse">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-[#00f3ff]/10 border-b-2 border-[#00f3ff]/20">
              {children}
            </thead>
          ),
          th: ({ children }) => (
            <th className="p-3 text-left font-semibold text-[#00f3ff]">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="p-3 border-b border-[#00f3ff]/10">
              {children}
            </td>
          ),
          a: ({ children, href }) => (
            <a 
              href={href} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#00f3ff] hover:underline hover:text-[#00f3ff]/80 transition-colors"
            >
              {children}
            </a>
          ),
          hr: () => (
            <hr className="my-6 border-t-2 border-[#00f3ff]/20" />
          ),
          img: ({ src, alt }) => (
            <img 
              src={src} 
              alt={alt} 
              className="my-4 rounded-lg max-w-full h-auto max-h-[300px] object-contain border-2 border-[#00f3ff]/20"
            />
          ),
        }}
      >
        {message.content}
      </ReactMarkdown>
    </div>
  );
};