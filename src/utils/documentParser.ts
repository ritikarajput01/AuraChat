import { readPdfText } from './pdfParser';
import { createWorker } from 'tesseract.js';

let worker: Tesseract.Worker | null = null;

async function initializeWorker() {
  if (!worker) {
    worker = await createWorker('eng');
  }
  return worker;
}

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

async function parseImage(file: File): Promise<string> {
  try {
    const imageUrl = URL.createObjectURL(file);
    const tesseractWorker = await initializeWorker();
    
    const { data: { text } } = await tesseractWorker.recognize(imageUrl);
    
    URL.revokeObjectURL(imageUrl);
    return text;
  } catch (error) {
    console.error('Error parsing image:', error);
    throw new Error('Failed to extract text from image');
  }
}

// Cleanup worker when the app is closed
window.addEventListener('beforeunload', () => {
  if (worker) {
    worker.terminate();
    worker = null;
  }
});