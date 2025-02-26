export const generateSessionName = (message: string): string => {
  const cleanMessage = message.replace(/```[\s\S]*?```/g, '');
  const firstLine = cleanMessage.split('\n')[0].trim();
  const name = firstLine.slice(0, 40) + (firstLine.length > 40 ? '...' : '');
  return name || 'New Chat';
};