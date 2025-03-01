# 🌟 AuraChat - Your Intelligent Coding Companion

<div align="center">
  <img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/sparkles.svg" alt="AuraChat Logo" width="120" height="120">
  
  <h3>Where AI meets cyberpunk aesthetics for the ultimate coding experience</h3>

  [![Made with React](https://img.shields.io/badge/React-18.3-blue?logo=react&logoColor=white)](https://reactjs.org)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Powered by Mistral AI](https://img.shields.io/badge/AI-Mistral-purple?logo=openai&logoColor=white)](https://mistral.ai)
  [![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-blue?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
  [![Vite](https://img.shields.io/badge/Vite-5.4-blue?logo=vite&logoColor=white)](https://vitejs.dev)

  [Live Demo](https://aurachat.netlify.app) • [Report Bug](https://github.com/tarunerror/AuraChat/issues) • [Request Feature](https://github.com/tarunerror/AuraChat/issues)

  ![AuraChat Demo](https://i.postimg.cc/ncv1C0Cf/Screenshot-2025-02-24-112701.png)
</div>

## 🚀 Experience the Future of AI Coding Assistants

AuraChat isn't just another AI chat application—it's your cyberpunk-inspired coding companion designed to revolutionize how developers interact with AI. With its neon-infused UI and powerful capabilities, AuraChat stands at the intersection of cutting-edge AI and immersive user experience.

### 🤖 Advanced AI Integration

AuraChat leverages the power of Mistral AI to deliver intelligent, context-aware responses:

- **15+ Specialized Models**: From the lightweight Mistral Small to the powerful Mixtral 8x22B
- **Domain-Specific Intelligence**: Specialized models for code (Codestral), mathematics (Mathstral), and visual content (Pixtral)
- **Alternative Responses**: Generate multiple solutions to the same problem with our unique response navigation system
- **Contextual Understanding**: The AI remembers your conversation history and builds upon previous exchanges

### 💻 Live Code Execution

Write, edit, and run code directly in your chat:

- **Monaco Editor Integration**: The same editor that powers VS Code, right in your chat
- **Syntax Highlighting**: Support for 30+ programming languages
- **Real-time Execution**: Run JavaScript code and see results instantly
- **Error Handling**: Clear error messages and debugging assistance

<div align="center">
  <img src="https://i.postimg.cc/L8JnHJZD/code-execution.gif" alt="Code Execution Demo" width="80%">
</div>

### 🎙️ Voice Interaction

Hands-free coding assistance when you need it:

- **Speech Recognition**: Talk to your AI assistant naturally
- **Text-to-Speech**: Listen to AI responses while multitasking
- **Voice Customization**: Adjust pitch, rate, and volume to your preference
- **25+ Language Support**: Voice interaction in multiple languages

### 🌐 Multilingual Intelligence

Break down language barriers with automatic language detection and response:

- **Auto-Detection**: AuraChat identifies your language and responds accordingly
- **Native Language Display**: See both English and native language names
- **25+ Languages**: From Spanish and French to Japanese and Arabic
- **Seamless Switching**: Change languages mid-conversation without missing a beat

<div align="center">
  <table>
    <tr>
      <td align="center"><img src="https://i.postimg.cc/QCZ3Rhwh/english.png" width="200px"><br><b>English</b></td>
      <td align="center"><img src="https://i.postimg.cc/QCZ3Rhwh/spanish.png" width="200px"><br><b>Español</b></td>
      <td align="center"><img src="https://i.postimg.cc/QCZ3Rhwh/japanese.png" width="200px"><br><b>日本語</b></td>
    </tr>
  </table>
</div>

### 🔍 Web Search & Knowledge Base

Extend your AI's knowledge with integrated search capabilities:

- **Web Search**: Find information from across the internet
- **Knowledge Base**: Search within your conversation history
- **RAG Integration**: Retrieve and generate answers based on relevant context
- **Citation Support**: Track where information comes from

### 📄 Document Processing

Extract and analyze text from various file formats:

- **OCR Technology**: Extract text from images using Tesseract.js
- **PDF Support**: Parse and analyze PDF documents
- **Text Files**: Import and process plain text files
- **Context Preservation**: Maintain document structure in AI analysis

## 🎨 Cyberpunk-Inspired UI/UX

Immerse yourself in a futuristic interface:

- **Neon Aesthetics**: Vibrant cyan and purple accents against a dark backdrop
- **Glass Morphism**: Translucent panels with subtle blur effects
- **Dynamic Animations**: Smooth transitions and responsive feedback
- **Cyber Grid**: Subtle background patterns reminiscent of digital landscapes

<div align="center">
  <img src="https://i.postimg.cc/L8JnHJZD/ui-showcase.gif" alt="UI Showcase" width="80%">
</div>

## 📱 Responsive Design

A beautiful experience on any device:

- **Mobile-First Approach**: Optimized for smartphones and tablets
- **Adaptive Layout**: Seamlessly adjusts to any screen size
- **Touch Optimization**: Large touch targets and intuitive gestures
- **PWA Support**: Install as a standalone app on mobile devices

## 🛠️ Technical Architecture

AuraChat is built with a modern tech stack:

```
AuraChat
├── 🧠 AI Integration
│   ├── Mistral AI API (@mistralai/mistralai)
│   ├── LangChain Framework (@langchain/core, @langchain/community)
│   └── RAG Implementation (Vector Search)
├── 🎨 Frontend
│   ├── React 18.3 with TypeScript 5.5
│   ├── Tailwind CSS 3.4
│   ├── Vite 5.4 (Build Tool)
│   └── Lucide React (Icon System)
├── 🔧 Core Features
│   ├── Monaco Editor (@monaco-editor/react)
│   ├── Web Speech API (Voice Recognition & Synthesis)
│   ├── Tesseract.js (OCR for Images)
│   ├── Language Detection (franc, ISO-639-1)
│   └── Markdown Rendering (react-markdown)
├── 📊 Data Management
│   ├── Local Storage (Session Persistence)
│   ├── Context-Based Memory
│   └── Alternative Response Management
└── 📱 Cross-Platform
    ├── Responsive Design
    ├── Mobile Optimization
    └── Touch-Friendly Interface
```

## 🧩 Component Architecture

AuraChat follows a modular component architecture:

```
src/
├── components/
│   ├── ChatContainer/       # Message display and management
│   ├── ChatInput/           # User input with voice and file upload
│   ├── ChatMessage/         # Individual message rendering
│   ├── ChatSessions/        # Session management
│   ├── CodeBlock/           # Code execution and display
│   ├── Layout/              # Main application layout
│   ├── SearchModal/         # Knowledge search interface
│   └── WebSearchModal/      # Web search interface
├── hooks/
│   ├── useChatState/        # Chat state management
│   ├── useCodeExecution/    # Code execution logic
│   ├── useMessageHandler/   # Message processing
│   ├── useMistralClient/    # AI client initialization
│   └── useVoice/            # Voice interaction
├── utils/
│   ├── codeUtils/           # Code parsing and execution
│   ├── documentParser/      # File and image processing
│   ├── languageUtils/       # Language detection and translation
│   ├── ragUtils/            # Retrieval-augmented generation
│   └── webSearchUtils/      # Web search functionality
└── types.ts                 # TypeScript type definitions
```

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/tarunerror/AuraChat

# Navigate to project directory
cd aurachat

# Install dependencies
npm install

# Add your Mistral AI API key
echo "VITE_MISTRAL_API_KEY=your_key_here" > .env

# Start the development server
npm run dev
```

## 🧠 AI Models

AuraChat gives you access to Mistral AI's full range of models:

<div align="center">
  <table>
    <tr>
      <th>Model</th>
      <th>Best For</th>
      <th>Token Limit</th>
    </tr>
    <tr>
      <td>Mistral Small</td>
      <td>Everyday coding tasks, quick responses</td>
      <td>16,384</td>
    </tr>
    <tr>
      <td>Mistral Large</td>
      <td>Complex reasoning, detailed explanations</td>
      <td>32,768</td>
    </tr>
    <tr>
      <td>Mixtral 8x22B</td>
      <td>Advanced problem-solving, research</td>
      <td>65,536</td>
    </tr>
    <tr>
      <td>Codestral</td>
      <td>Code generation, debugging, refactoring</td>
      <td>16,384</td>
    </tr>
    <tr>
      <td>Mathstral</td>
      <td>Mathematical reasoning, algorithms</td>
      <td>8,192</td>
    </tr>
  </table>
</div>

## 🔄 State Management

AuraChat uses a custom state management system:

- **Session Management**: Create, rename, and switch between chat sessions
- **Message History**: Persistent storage of all conversations
- **Alternative Responses**: Store and navigate between different AI responses
- **Model Selection**: Change AI models on a per-session basis
- **Language Detection**: Automatically detect and store the language of each session

## 🌐 Web Search Integration

AuraChat can search the web to enhance its responses:

1. **Query Processing**: Analyze user questions to determine search intent
2. **Web Search**: Retrieve relevant information from the internet
3. **Result Integration**: Incorporate search results into AI responses
4. **Citation**: Properly attribute information sources
5. **Context Preservation**: Maintain conversation context with search results

## 📊 RAG (Retrieval-Augmented Generation)

AuraChat implements RAG for improved knowledge retrieval:

1. **Text Chunking**: Split documents into manageable pieces
2. **Embedding Generation**: Create vector representations of text
3. **Similarity Search**: Find relevant information based on user queries
4. **Context Integration**: Incorporate retrieved information into responses
5. **Knowledge Base**: Build a personalized knowledge base from conversations

## 🔮 Future Roadmap

We're constantly improving AuraChat with new features:

- **Collaborative Coding**: Real-time code sharing and collaboration
- **AI Personas**: Specialized assistants for different programming domains
- **GitHub Integration**: Commit, PR, and issue management directly from chat
- **Advanced Visualization**: Generate and display charts, diagrams, and graphs
- **Custom Training**: Fine-tune models on your codebase for personalized assistance

## 🧪 Advanced Features

### Code Execution Engine

The code execution system uses a sandboxed environment to safely run JavaScript:

```javascript
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
```

### Language Detection System

AuraChat automatically detects and adapts to the user's language:

```typescript
export const detectLanguage = (text: string): string => {
  try {
    // Use franc for language detection
    const langCode = franc.franc(text, { minLength: 3 });
    
    // Convert 3-letter code to 2-letter ISO code
    if (langCode && langCode !== 'und') {
      const iso2Code = ISO6391.getCode(ISO6391.getName(langCode));
      
      // Check if the language is in our supported languages
      if (iso2Code && SUPPORTED_LANGUAGES.some(lang => lang.code === iso2Code)) {
        return iso2Code;
      }
    }
    
    // Default to English if detection fails or language not supported
    return 'en';
  } catch (error) {
    console.error('Language detection error:', error);
    return 'en';
  }
};
```

### Alternative Response Navigation

AuraChat can generate multiple alternative responses to the same query:

```typescript
const navigateResponse = (direction: 'prev' | 'next') => {
  updateCurrentSession(session => {
    const updatedMessages = [...session.messages];
    const lastAssistantMessageIndex = updatedMessages.findIndex(
      (msg, idx) => msg.role === 'assistant' && 
      (idx === updatedMessages.length - 1 || updatedMessages[idx + 1]?.role === 'user')
    );
    
    if (lastAssistantMessageIndex === -1) return session;
    
    const lastAssistantMessage = updatedMessages[lastAssistantMessageIndex];
    
    if (!lastAssistantMessage.alternatives || lastAssistantMessage.alternatives.length === 0) {
      return session;
    }
    
    const currentIndex = lastAssistantMessage.currentAlternativeIndex || 0;
    const totalAlternatives = lastAssistantMessage.alternatives.length;
    
    let newIndex;
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % (totalAlternatives + 1);
    } else {
      newIndex = (currentIndex - 1 + totalAlternatives + 1) % (totalAlternatives + 1);
    }
    
    // Update the message content based on the new index
    if (newIndex === 0) {
      // Show original response
      updatedMessages[lastAssistantMessageIndex] = {
        ...lastAssistantMessage,
        content: lastAssistantMessage.originalContent || lastAssistantMessage.content,
        currentAlternativeIndex: 0
      };
    } else {
      // Show alternative response
      updatedMessages[lastAssistantMessageIndex] = {
        ...lastAssistantMessage,
        content: lastAssistantMessage.alternatives[newIndex - 1],
        currentAlternativeIndex: newIndex
      };
    }
    
    return {
      ...session,
      messages: updatedMessages
    };
  });
};
```

## 🤝 Contributing

We welcome contributions from developers of all skill levels:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Check out our [Contributing Guide](CONTRIBUTING.md) for more details.

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 🌟 Show Your Support

If you find AuraChat helpful, please give it a star! ⭐️

---

<div align="center">
  <p>Made with ❤️ by <a href="https://github.com/tarunerror">Tarun Gautam</a></p>
  
  <a href="https://instagram.com/tan.error">
    <img src="https://img.shields.io/badge/Follow-%40tan.error-ff69b4?style=social&logo=instagram" alt="Instagram Follow">
  </a>
</div>