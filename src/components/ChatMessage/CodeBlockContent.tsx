import React, { useState } from 'react';
import { Editor } from '@monaco-editor/react';
import { Play, Copy, Check } from 'lucide-react';
import { CodeBlock as CodeBlockType } from '../../types';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeBlockContentProps {
  block: CodeBlockType;
  onExecute: (id: string, code: string) => void;
  isEditable?: boolean;
}

export const CodeBlockContent: React.FC<CodeBlockContentProps> = ({
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