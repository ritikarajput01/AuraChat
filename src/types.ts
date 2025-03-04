export interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  isVoice?: boolean;
  codeBlocks?: CodeBlock[];
  language?: string;
  alternatives?: string[];
  currentAlternativeIndex?: number;
  originalContent?: string;
  webSearch?: boolean;
  analysis?: string; // Add this field for message analysis
}

export interface CodeBlock {
  id: string;
  language: string;
  code: string;
  isExecuting?: boolean;
  output?: string;
  error?: string;
}

export interface ChatSession {
  id: string;
  name: string;
  createdAt: number;
  messages: Message[];
  model: MistralModel;
  language?: string;
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
  | 'mistral-large'
  | 'codestral';

export const MISTRAL_MODELS: MistralModel[] = [
  'mistral-large',
  'codestral'
];

export const MODEL_CATEGORIES = [
  {
    name: 'Available Models',
    models: ['mistral-large', 'codestral']
  }
];

export const MODEL_INFO: Record<MistralModel, {
  name: string;
  description: string;
  capabilities: string[];
  bestFor: string[];
  tokenLimit: number;
}> = {
  'mistral-large': {
    name: 'Mistral Large',
    description: 'A powerful general-purpose model with strong reasoning capabilities.',
    capabilities: ['Complex Reasoning', 'Detailed Explanations', 'Advanced Coding'],
    bestFor: ['In-depth Analysis', 'Creative Writing', 'Technical Documentation'],
    tokenLimit: 32768
  },
  'codestral': {
    name: 'Codestral',
    description: 'Specialized for programming with enhanced code generation and understanding.',
    capabilities: ['Code Generation', 'Debugging', 'Technical Explanations'],
    bestFor: ['Software Development', 'Code Review', 'Learning Programming'],
    tokenLimit: 16384
  }
};

export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'es', name: 'Spanish', nativeName: 'Español' },
  { code: 'fr', name: 'French', nativeName: 'Français' },
  { code: 'de', name: 'German', nativeName: 'Deutsch' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português' },
  { code: 'nl', name: 'Dutch', nativeName: 'Nederlands' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский' },
  { code: 'zh', name: 'Chinese', nativeName: '中文' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語' },
  { code: 'ko', name: 'Korean', nativeName: '한국어' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe' },
  { code: 'pl', name: 'Polish', nativeName: 'Polski' },
  { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt' },
  { code: 'th', name: 'Thai', nativeName: 'ไทย' },
  { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia' },
  { code: 'sv', name: 'Swedish', nativeName: 'Svenska' },
  { code: 'fi', name: 'Finnish', nativeName: 'Suomi' },
  { code: 'no', name: 'Norwegian', nativeName: 'Norsk' },
  { code: 'da', name: 'Danish', nativeName: 'Dansk' },
  { code: 'cs', name: 'Czech', nativeName: 'Čeština' },
  { code: 'he', name: 'Hebrew', nativeName: 'עברית' }
];