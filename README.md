# AuraChat - Your Intelligent Coding Companion

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

## Experience the Future of AI Coding Assistants

AuraChat transcends traditional AI chat applications, delivering a cyberpunk-inspired coding companion designed to revolutionize developer workflows. With its neon-infused UI and powerful capabilities, AuraChat stands at the intersection of cutting-edge AI and immersive user experience.

### Advanced AI Integration

Leveraging Mistral AI's powerful language models:

- **Specialized Models**: Choose between Mistral Large for general tasks and Codestral for programming
- **Context-Aware Responses**: AI remembers conversation history for coherent assistance
- **Alternative Solutions**: Generate and navigate between multiple solutions
- **Web-Enhanced Knowledge**: Optional web search integration for up-to-date information

### Live Code Execution

Write, edit, and run code directly in your chat:

- **Monaco Editor Integration**: VS Code's editor engine for familiar coding experience
- **Syntax Highlighting**: Support for 30+ programming languages
- **Real-time Execution**: Run JavaScript code and see results instantly
- **Error Handling**: Clear error messages and debugging assistance

<div align="center">
  <img src="https://i.postimg.cc/L8JnHJZD/code-execution.gif" alt="Code Execution Demo" width="80%">
</div>

### Voice Interaction

Hands-free coding assistance:

- **Speech Recognition**: Natural voice input for queries
- **Text-to-Speech**: Listen to AI responses while multitasking
- **Voice Customization**: Adjust pitch, rate, and volume
- **25+ Languages**: Voice interaction across multiple languages

### Multilingual Intelligence

Break down language barriers:

- **Auto-Detection**: Identifies your language automatically
- **Native Display**: Shows both English and native language names
- **25+ Languages**: From Spanish and French to Japanese and Arabic
- **Seamless Switching**: Change languages mid-conversation

<div align="center">
  <table>
    <tr>
      <td align="center"><img src="https://i.postimg.cc/QCZ3Rhwh/english.png" width="200px"><br><b>English</b></td>
      <td align="center"><img src="https://i.postimg.cc/QCZ3Rhwh/spanish.png" width="200px"><br><b>Español</b></td>
      <td align="center"><img src="https://i.postimg.cc/QCZ3Rhwh/japanese.png" width="200px"><br><b>日本語</b></td>
    </tr>
  </table>
</div>

### Web Search Integration

Enhance AI responses with real-time web data:

- **Live Search**: Access current information from the internet
- **Result Integration**: Seamlessly incorporate web data into responses
- **Source Attribution**: Clear citations for web-sourced information
- **Toggle Control**: Enable/disable web search as needed

### Document Processing

Extract and analyze text from various formats:

- **OCR Technology**: Extract text from images using Tesseract.js
- **PDF Support**: Parse and analyze PDF documents
- **Text Files**: Import and process plain text files
- **Context Preservation**: Maintain document structure in analysis

## Technical Architecture

```
AuraChat
├── AI Integration
│   ├── Mistral AI API (@mistralai/mistralai)
│   ├── LangChain Framework (@langchain/core)
│   └── RAG Implementation
├── Frontend
│   ├── React 18.3 with TypeScript 5.5
│   ├── Tailwind CSS 3.4
│   ├── Vite 5.4
│   └── Lucide React Icons
├── Core Features
│   ├── Monaco Editor
│   ├── Web Speech API
│   ├── Tesseract.js
│   ├── Language Detection
│   └── Markdown Rendering
└── Cross-Platform
    ├── Responsive Design
    ├── Mobile Optimization
    └── Touch Interface
```

## Component Architecture

```
src/
├── components/
│   ├── ChatContainer/     # Message display
│   ├── ChatInput/        # User input interface
│   ├── ChatMessage/      # Message rendering
│   ├── ChatSessions/     # Session management
│   ├── CodeBlock/        # Code execution
│   ├── Layout/           # Main layout
│   ├── SearchModal/      # Search interface
│   └── WebSearchModal/   # Web search
├── hooks/
│   ├── useChatState/     # State management
│   ├── useCodeExecution/ # Code execution
│   ├── useMessageHandler/# Message processing
│   ├── useMistralClient/ # AI client
│   └── useVoice/        # Voice interaction
└── utils/
    ├── codeUtils/       # Code handling
    ├── documentParser/  # File processing
    ├── languageUtils/   # Language support
    ├── ragUtils/        # RAG functionality
    └── webSearchUtils/  # Web search
```

## Quick Start

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

## AI Models

<div align="center">
  <table>
    <tr>
      <th>Model</th>
      <th>Best For</th>
      <th>Token Limit</th>
    </tr>
    <tr>
      <td>Mistral Large</td>
      <td>Complex reasoning, detailed explanations</td>
      <td>32,768</td>
    </tr>
    <tr>
      <td>Codestral</td>
      <td>Code generation, debugging, refactoring</td>
      <td>16,384</td>
    </tr>
  </table>
</div>

## State Management

- **Session Management**: Create, rename, and switch between chat sessions
- **Message History**: Persistent storage of conversations
- **Alternative Responses**: Store and navigate between AI responses
- **Model Selection**: Change AI models per session
- **Language Detection**: Automatic language handling

## Mobile Responsiveness

- **Adaptive Layout**: Automatically adjusts to any screen size
- **Touch-Optimized**: Large touch targets for easy interaction
- **Responsive Typography**: Text scales appropriately
- **Efficient Space Usage**: Compact layout on small screens
- **Gesture Support**: Swipe and touch gestures
- **Safe Area Support**: Respects device notches and home indicators

## Contributing

We welcome contributions from developers of all skill levels:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Check out our [Contributing Guide](CONTRIBUTING.md) for more details.

## License

Distributed under the [MIT License](./LICENSE). See `LICENSE` for more information.

---

<div align="center">
  <p>Made with dedication by <a href="https://github.com/tarunerror">Tarun Gautam</a></p>
  
  <a href="https://instagram.com/tan.error">
    <img src="https://img.shields.io/badge/Follow-%40tan.error-ff69b4?style=social&logo=instagram" alt="Instagram Follow">
  </a>
</div>