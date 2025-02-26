export interface Message {
  role: 'user' | 'assistant';
  content: string;
  isVoice?: boolean;
  codeBlocks?: CodeBlock[];
  timestamp: number;
  language?: string;
  alternatives?: string[]; // Array of alternative responses
  currentAlternativeIndex?: number; // Index of the currently displayed alternative
  originalContent?: string; // Original content before regeneration
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
  | 'mistral-7b'
  | 'mixtral-8x7b'
  | 'mistral-large'
  | 'mistral-small'
  | 'mixtral-8x22b'
  | 'codestral'
  | 'mathstral-7b'
  | 'mistral-large-2'
  | 'pixtral'
  | 'ministral-3b'
  | 'ministral-8b'
  | 'codestral-mamba-7b'
  | 'pixtral-large'
  | 'mistral-small-3'
  | 'mistral-saba';

export const MISTRAL_MODELS: MistralModel[] = [
  'mistral-7b',
  'mixtral-8x7b',
  'mistral-large',
  'mistral-small',
  'mixtral-8x22b',
  'codestral',
  'mathstral-7b',
  'mistral-large-2',
  'pixtral',
  'ministral-3b',
  'ministral-8b',
  'codestral-mamba-7b',
  'pixtral-large',
  'mistral-small-3',
  'mistral-saba'
];

// Model categories for better organization in UI
export interface ModelCategory {
  name: string;
  models: MistralModel[];
}

export const MODEL_CATEGORIES: ModelCategory[] = [
  {
    name: "General Purpose",
    models: [
      'mistral-7b',
      'mixtral-8x7b',
      'mistral-large',
      'mistral-small',
      'mistral-large-2',
      'mistral-small-3',
      'mistral-saba',
      'mixtral-8x22b',
      'ministral-3b',
      'ministral-8b'
    ]
  },
  {
    name: "Specialized",
    models: [
      'codestral',
      'codestral-mamba-7b',
      'mathstral-7b',
      'pixtral',
      'pixtral-large'
    ]
  }
];

// Model capabilities and descriptions
export interface ModelInfo {
  id: MistralModel;
  name: string;
  description: string;
  capabilities: string[];
  tokenLimit: number;
  bestFor: string[];
}

export const MODEL_INFO: Record<MistralModel, ModelInfo> = {
  'mistral-7b': {
    id: 'mistral-7b',
    name: 'Mistral 7B',
    description: 'The original foundation model with strong general capabilities.',
    capabilities: ['Text generation', 'Summarization', 'Q&A'],
    tokenLimit: 8192,
    bestFor: ['General purpose tasks', 'Efficient processing']
  },
  'mixtral-8x7b': {
    id: 'mixtral-8x7b',
    name: 'Mixtral 8x7B',
    description: 'A mixture-of-experts model with enhanced reasoning capabilities.',
    capabilities: ['Complex reasoning', 'Multi-language support', 'Knowledge tasks'],
    tokenLimit: 32768,
    bestFor: ['Complex tasks', 'Multilingual content']
  },
  'mistral-large': {
    id: 'mistral-large',
    name: 'Mistral Large',
    description: 'High-performance model for advanced reasoning and generation.',
    capabilities: ['Advanced reasoning', 'Nuanced responses', 'Creative writing'],
    tokenLimit: 32768,
    bestFor: ['Complex reasoning', 'Creative content', 'Professional applications']
  },
  'mistral-small': {
    id: 'mistral-small',
    name: 'Mistral Small',
    description: 'Balanced model offering good performance with efficiency.',
    capabilities: ['Efficient processing', 'General knowledge', 'Basic reasoning'],
    tokenLimit: 16384,
    bestFor: ['Everyday tasks', 'Cost-effective applications']
  },
  'mixtral-8x22b': {
    id: 'mixtral-8x22b',
    name: 'Mixtral 8x22B',
    description: 'Large mixture-of-experts model with exceptional capabilities.',
    capabilities: ['Advanced reasoning', 'Deep knowledge', 'Complex problem solving'],
    tokenLimit: 65536,
    bestFor: ['Research', 'Complex analysis', 'Enterprise applications']
  },
  'codestral': {
    id: 'codestral',
    name: 'Codestral',
    description: 'Specialized for code generation and understanding.',
    capabilities: ['Code generation', 'Debugging', 'Technical documentation'],
    tokenLimit: 16384,
    bestFor: ['Software development', 'Code explanation', 'Technical writing']
  },
  'mathstral-7b': {
    id: 'mathstral-7b',
    name: 'Mathstral 7B',
    description: 'Optimized for mathematical reasoning and problem-solving.',
    capabilities: ['Mathematical reasoning', 'Equation solving', 'Numerical analysis'],
    tokenLimit: 8192,
    bestFor: ['Math problems', 'Scientific computing', 'Data analysis']
  },
  'mistral-large-2': {
    id: 'mistral-large-2',
    name: 'Mistral Large 2',
    description: 'Next generation of the Large model with improved capabilities.',
    capabilities: ['Enhanced reasoning', 'Better factuality', 'Improved instruction following'],
    tokenLimit: 32768,
    bestFor: ['Mission-critical applications', 'Complex reasoning', 'Enterprise use']
  },
  'pixtral': {
    id: 'pixtral',
    name: 'Pixtral',
    description: 'Multimodal model capable of understanding images and text.',
    capabilities: ['Image understanding', 'Visual reasoning', 'Multimodal generation'],
    tokenLimit: 16384,
    bestFor: ['Visual content analysis', 'Image-based tasks', 'Design assistance']
  },
  'ministral-3b': {
    id: 'ministral-3b',
    name: 'Ministral 3B',
    description: 'Compact model optimized for efficiency and speed.',
    capabilities: ['Fast responses', 'Basic tasks', 'Efficient deployment'],
    tokenLimit: 4096,
    bestFor: ['Mobile applications', 'Edge computing', 'Real-time interactions']
  },
  'ministral-8b': {
    id: 'ministral-8b',
    name: 'Ministral 8B',
    description: 'Mid-sized model balancing performance and efficiency.',
    capabilities: ['Balanced performance', 'General knowledge', 'Reasonable speed'],
    tokenLimit: 8192,
    bestFor: ['Balanced applications', 'Mid-range devices', 'General use cases']
  },
  'codestral-mamba-7b': {
    id: 'codestral-mamba-7b',
    name: 'Codestral Mamba 7B',
    description: 'Code-specialized model using Mamba architecture for improved performance.',
    capabilities: ['Advanced code generation', 'Code understanding', 'Technical documentation'],
    tokenLimit: 16384,
    bestFor: ['Software development', 'Code optimization', 'Technical documentation']
  },
  'pixtral-large': {
    id: 'pixtral-large',
    name: 'Pixtral Large',
    description: 'Advanced multimodal model with enhanced visual understanding.',
    capabilities: ['Advanced image analysis', 'Complex visual reasoning', 'Detailed image descriptions'],
    tokenLimit: 32768,
    bestFor: ['Advanced visual tasks', 'Design professionals', 'Content creation']
  },
  'mistral-small-3': {
    id: 'mistral-small-3',
    name: 'Mistral Small 3',
    description: 'Third generation of the Small model with improved capabilities.',
    capabilities: ['Efficient processing', 'Improved reasoning', 'Better instruction following'],
    tokenLimit: 16384,
    bestFor: ['Everyday applications', 'Cost-effective deployment', 'General tasks']
  },
  'mistral-saba': {
    id: 'mistral-saba',
    name: 'Mistral Saba',
    description: 'Specialized model with unique capabilities for specific use cases.',
    capabilities: ['Specialized tasks', 'Domain-specific knowledge', 'Custom applications'],
    tokenLimit: 16384,
    bestFor: ['Specialized domains', 'Custom applications', 'Niche use cases']
  }
};

// Language support
export interface LanguageInfo {
  code: string;
  name: string;
  nativeName: string;
}

export const SUPPORTED_LANGUAGES: LanguageInfo[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'es', name: 'Spanish', nativeName: 'Español' },
  { code: 'fr', name: 'French', nativeName: 'Français' },
  { code: 'de', name: 'German', nativeName: 'Deutsch' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский' },
  { code: 'zh', name: 'Chinese', nativeName: '中文' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語' },
  { code: 'ko', name: 'Korean', nativeName: '한국어' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو' },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe' },
  { code: 'nl', name: 'Dutch', nativeName: 'Nederlands' },
  { code: 'sv', name: 'Swedish', nativeName: 'Svenska' },
  { code: 'fi', name: 'Finnish', nativeName: 'Suomi' },
  { code: 'pl', name: 'Polish', nativeName: 'Polski' },
  { code: 'cs', name: 'Czech', nativeName: 'Čeština' },
  { code: 'uk', name: 'Ukrainian', nativeName: 'Українська' },
  { code: 'el', name: 'Greek', nativeName: 'Ελληνικά' },
  { code: 'he', name: 'Hebrew', nativeName: 'עברית' },
  { code: 'th', name: 'Thai', nativeName: 'ไทย' },
  { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt' }
];