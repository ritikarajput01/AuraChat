export const executeCode = (code: string): string => {
  const sandbox = new Function(
    'console',
    `
    try {
      let log = '';
      const customConsole = {
        log: (...args) => {
          log += args.map(arg => 
            typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
          ).join(' ') + '\\n';
        }
      };
      ${code};
      return log;
    } catch (error) {
      throw error;
    }
    `
  );

  return sandbox({ log: console.log });
};