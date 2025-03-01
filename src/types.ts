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
  | 'mistral-small'
  | 'mistral-large'
  | 'mistral-large-2'
  | 'mixtral-8x7b'
  | 'mixtral-8x22b'
  | 'codestral'
  | 'mathstral-7b'
  | 'pixtral'
  | 'pixtral-large'
  | 'ministral-3b'
  | 'ministral-8b'
  | 'codestral-mamba-7b'
  | 'mistral-small-3'
  | 'mistral-saba';

export const MISTRAL_MODELS: MistralModel[] = [
  'mistral-small',
  'mistral-large',
  'mistral-large-2',
  'mixtral-8x7b',
  'mixtral-8x22b',
  'codestral',
  'mathstral-7b',
  'pixtral',
  'pixtral-large',
  'ministral-3b',
  'ministral-8b',
  'codestral-mamba-7b',
  'mistral-small-3',
  'mistral-saba'
];

export const MODEL_CATEGORIES = [
  {
    name: 'General Purpose',
    models: ['mistral-small', 'mistral-large', 'mistral-large-2', 'mixtral-8x7b', 'mixtral-8x22b']
  },
  {
    name: 'Specialized',
    models: ['codestral', 'mathstral-7b', 'pixtral', 'pixtral-large', 'codestral-mamba-7b']
  },
  {
    name: 'Lightweight',
    models: ['ministral-3b', 'ministral-8b', 'mistral-small-3', 'mistral-saba']
  }
];

export const MODEL_INFO: Record<MistralModel, {
  name: string;
  description: string;
  capabilities: string[];
  bestFor: string[];
  tokenLimit: number;
}> = {
  'mistral-small': {
    name: 'Mistral Small',
    description: 'A lightweight model for everyday tasks with good performance and speed.',
    capabilities: ['Text Generation', 'Summarization', 'Basic Coding'],
    bestFor: ['Quick Responses', 'Simple Tasks', 'Mobile Applications'],
    tokenLimit: 16384
  },
  'mistral-large': {
    name: 'Mistral Large',
    description: 'A powerful general-purpose model with strong reasoning capabilities.',
    capabilities: ['Complex Reasoning', 'Detailed Explanations', 'Advanced Coding'],
    bestFor: ['In-depth Analysis', 'Creative Writing', 'Technical Documentation'],
    tokenLimit: 32768
  },
  'mistral-large-2': {
    name: 'Mistral Large 2',
    description: 'The latest version of Mistral Large with improved reasoning and knowledge.',
    capabilities: ['Enhanced Reasoning', 'Improved Knowledge', 'Better Context Understanding'],
    bestFor: ['Complex Problem Solving', 'Research Assistance', 'Detailed Analysis'],
    tokenLimit: 32768
  },
  'mixtral-8x7b': {
    name: 'Mixtral 8x7B',
    description: 'A mixture-of-experts model combining 8 different 7B models for diverse capabilities.',
    capabilities: ['Versatile Knowledge', 'Multi-domain Expertise', 'Balanced Performance'],
    bestFor: ['Varied Tasks', 'General Knowledge', 'Balanced Responses'],
    tokenLimit: 32768
  },
  'mixtral-8x22b': {
    name: 'Mixtral 8x22B',
    description: 'The largest mixture-of-experts model with exceptional reasoning and knowledge.',
    capabilities: ['Superior Reasoning', 'Extensive Knowledge', 'Nuanced Understanding'],
    bestFor: ['Complex Research', 'Advanced Problem Solving', 'Expert-level Assistance'],
    tokenLimit: 65536
  },
  'codestral': {
    name: 'Codestral',
    description: 'Specialized for programming with enhanced code generation and understanding.',
    capabilities: ['Code Generation', 'Debugging', 'Technical Explanations'],
    bestFor: ['Software Development', 'Code Review', 'Learning Programming'],
    tokenLimit: 16384
  },
  'mathstral-7b': {
    name: 'Mathstral 7B',
    description: 'Focused on mathematical reasoning and problem-solving.',
    capabilities: ['Mathematical Reasoning', 'Equation Solving', 'Algorithmic Thinking'],
    bestFor: ['Math Problems', 'Data Analysis', 'Scientific Computing'],
    tokenLimit: 8192
  },
  'pixtral': {
    name: 'Pixtral',
    description: 'Designed for visual content understanding and generation.',
    capabilities: ['Image Understanding', 'Visual Descriptions', 'Creative Visualization'],
    bestFor: ['Image Analysis', 'Visual Content Creation', 'Design Assistance'],
    tokenLimit: 16384
  },
  'pixtral-large': {
    name: 'Pixtral Large',
    description: 'Enhanced version of Pixtral with more advanced visual understanding capabilities.',
    capabilities: ['Advanced Image Analysis', 'Detailed Visual Descriptions', 'Complex Scene Understanding'],
    bestFor: ['Detailed Image Analysis', 'Visual Content Creation', 'Design Consultation'],
    tokenLimit: 32768
  },
  'ministral-3b': {
    name: 'Ministral 3B',
    description: 'Ultra-lightweight model for basic tasks and resource-constrained environments.',
    capabilities: ['Basic Text Generation', 'Simple Questions', 'Fast Responses'],
    bestFor: ['Mobile Apps', 'Edge Devices', 'Quick Interactions'],
    tokenLimit: 4096
  },
  'ministral-8b': {
    name: 'Ministral 8B',
    description: 'Compact yet capable model balancing performance and resource efficiency.',
    capabilities: ['Efficient Text Generation', 'Balanced Performance', 'Reasonable Context Length'],
    bestFor: ['Balanced Applications', 'Mid-range Devices', 'Everyday Assistance'],
    tokenLimit: 8192
  },
  'codestral-mamba-7b': {
    name: 'Codestral Mamba 7B',
    description: 'Code-specialized model using the Mamba architecture for improved efficiency.',
    capabilities: ['Efficient Code Generation', 'Fast Processing', 'Long Context Understanding'],
    bestFor: ['Real-time Coding Assistance', 'IDE Integration', 'Code Documentation'],
    tokenLimit: 16384
  },
  'mistral-small-3': {
    name: 'Mistral Small 3',
    description: 'The third generation of Mistral Small with improved capabilities.',
    capabilities: ['Enhanced Text Generation', 'Better Reasoning', 'Improved Knowledge'],
    bestFor: ['Everyday Tasks', 'General Assistance', 'Balanced Performance'],
    tokenLimit: 16384
  },
  'mistral-saba': {
    name: 'Mistral Saba',
    description: 'Specialized model for conversational AI with enhanced dialogue capabilities.',
    capabilities: ['Natural Conversations', 'Contextual Understanding', 'Personality Consistency'],
    bestFor: ['Chatbots', 'Virtual Assistants', 'Customer Service'],
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