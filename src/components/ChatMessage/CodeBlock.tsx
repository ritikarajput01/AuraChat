import React, { useState } from 'react';
import { Play, Copy, Check } from 'lucide-react';
import { CodeBlock as CodeBlockType } from '../../types';
import { CodeBlockContent } from './CodeBlockContent';

interface CodeBlockProps {
  block: CodeBlockType;
  onExecute: (id: string, code: string) => void;
  isEditable?: boolean;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  block,
  onExecute,
  isEditable = false,
}) => {
  const [code, setCode] = useState(block.code);
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExecute = () => {
    onExecute(block.id, code);
  };

  return (
    <div className="relative group rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
      <div className="flex items-center justify-between p-2 bg-gray-100">
        <div className="text-sm text-gray-600">{block.language}</div>
        <div className="flex items-center gap-2">
          {isEditable && (
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="text-gray-600 hover:text-gray-800 text-sm"
            >
              {isEditing ? 'Preview' : 'Edit'}
            </button>
          )}
          <button
            onClick={handleCopy}
            className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors"
            title="Copy code"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
          </button>
          {block.language === 'javascript' && (
            <button
              onClick={handleExecute}
              className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors"
              disabled={block.isExecuting}
              title="Run code"
            >
              <Play size={16} className={block.isExecuting ? 'animate-pulse' : ''} />
            </button>
          )}
        </div>
      </div>

      <CodeBlockContent 
        block={block} 
        onExecute={onExecute} 
        isEditable={isEditable} 
      />
    </div>
  );
};