import React, { useState } from 'react';
import { Editor } from '@monaco-editor/react';
import { Play, Copy, Check } from 'lucide-react';
import { CodeBlock as CodeBlockType } from '../types';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

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
  const [isEditing, setIsEditing] = useState(false);
  const [code, setCode] = useState(block.code);
  const [copied, setCopied] = useState(false);

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

      <div className="relative">
        {isEditing ? (
          <Editor
            height="200px"
            language={block.language}
            value={code}
            onChange={(value) => setCode(value || '')}
            theme="vs-dark"
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              lineNumbers: 'on',
              scrollBeyondLastLine: false,
              automaticLayout: true,
            }}
          />
        ) : (
          <SyntaxHighlighter
            language={block.language}
            style={vscDarkPlus}
            customStyle={{ margin: 0, borderRadius: 0 }}
          >
            {code}
          </SyntaxHighlighter>
        )}
      </div>

      {block.output && (
        <div className="p-3 bg-gray-900 text-gray-100 font-mono text-sm whitespace-pre-wrap">
          {block.output}
        </div>
      )}

      {block.error && (
        <div className="p-3 bg-red-100 text-red-700 font-mono text-sm whitespace-pre-wrap">
          {block.error}
        </div>
      )}
    </div>
  );
};