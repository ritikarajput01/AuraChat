import { createWorker } from 'tesseract.js';

let worker: Tesseract.Worker | null = null;

async function initializeWorker() {
  if (!worker) {
    worker = await createWorker('eng');
  }
  return worker;
}

export async function parseImage(file: File): Promise<string> {
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