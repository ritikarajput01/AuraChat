import { CodeBlock } from '../../types';

export const extractCodeBlocks = (content: string): { text: string, blocks: CodeBlock[] } => {
  const codeBlockRegex = /```(\w+)\n([\s\S]*?)```/g;
  const blocks: CodeBlock[] = [];
  let lastIndex = 0;
  let text = '';

  let match;
  while ((match = codeBlockRegex.exec(content)) !== null) {
    const [fullMatch, language, code] = match;
    text += content.slice(lastIndex, match.index);
    const id = Math.random().toString(36).substr(2, 9);
    blocks.push({
      id,
      language,
      code: code.trim(),
    });
    text += `\`\`\`${language}\n${code.trim()}\n\`\`\``;
    lastIndex = match.index + fullMatch.length;
  }

  text += content.slice(lastIndex);
  return { text, blocks };
};