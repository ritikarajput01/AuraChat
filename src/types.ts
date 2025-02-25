export interface Message {
  role: 'user' | 'assistant';
  content: string;
  isVoice?: boolean;
  codeBlocks?: CodeBlock[];
  timestamp: number;
  regenerationIndex?: number; // Track regeneration version
}

export interface CodeBlock {
  id: string;
  language: string;
  code: string;
  output?: string;
  isExecuting?: boolean;
  error?: string;
}

export interface ChatSession {
  id: string;
  name: string;
  createdAt: number;
  messages: Message[];
  model: MistralModel;
  regenerationHistory?: { // Store regeneration history
    messageIndex: number;
    responses: Message[];
  }[];
}

export interface ChatState {
  sessions: ChatSession[];
  currentSessionId: string;
  isLoading: boolean;
  error: string | null;
  isSpeaking: boolean;
}

export interface VoiceConfig {
  voice: SpeechSynthesisVoice | null;
  pitch: number;
  rate: number;
  volume: number;
}

export type MistralModel = 
  | 'mistral-tiny'
  | 'mistral-small'
  | 'mistral-medium';

export const MISTRAL_MODELS: MistralModel[] = [
  'mistral-tiny',
  'mistral-small',
  'mistral-medium'
];