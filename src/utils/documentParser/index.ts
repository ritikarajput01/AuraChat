import { readPdfText } from './pdfParser';
import { parseImage } from './imageParser';

export async function parseDocument(file: File): Promise<string> {
  const text = await readFileContent(file);
  return text;
}

async function readFileContent(file: File): Promise<string> {
  if (file.type === 'text/plain') {
    return await file.text();
  } else if (file.type === 'application/pdf') {
    return await readPdfText(file);
  } else if (file.type.includes('word')) {
    return 'Word document parsing would be implemented here';
  } else if (file.type.startsWith('image/')) {
    return await parseImage(file);
  }
  
  throw new Error('Unsupported file type');
}