import { executeCode } from '../utils/codeUtils';

export function useCodeExecution(updateCurrentSession: (updater: (session: any) => any) => void) {
  const handleExecuteCode = (blockId: string, code: string) => {
    updateCurrentSession(session => ({
      ...session,
      messages: session.messages.map(msg => ({
        ...msg,
        codeBlocks: msg.codeBlocks?.map(block =>
          block.id === blockId
            ? { ...block, isExecuting: true, output: undefined, error: undefined }
            : block
        ),
      })),
    }));

    try {
      const output = executeCode(code);
      updateCurrentSession(session => ({
        ...session,
        messages: session.messages.map(msg => ({
          ...msg,
          codeBlocks: msg.codeBlocks?.map(block =>
            block.id === blockId
              ? { ...block, isExecuting: false, output }
              : block
          ),
        })),
      }));
    } catch (error) {
      updateCurrentSession(session => ({
        ...session,
        messages: session.messages.map(msg => ({
          ...msg,
          codeBlocks: msg.codeBlocks?.map(block =>
            block.id === blockId
              ? { ...block, isExecuting: false, error: (error as Error).message }
              : block
          ),
        })),
      }));
    }
  };

  return { handleExecuteCode };
}