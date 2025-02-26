# 🌟 AuraChat - Your Intelligent Coding Companion

[![Made with React](https://img.shields.io/badge/React-18.3-blue?logo=react&logoColor=white)](https://reactjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Powered by Mistral AI](https://img.shields.io/badge/AI-Mistral-purple?logo=openai&logoColor=white)](https://mistral.ai)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-blue?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Vite](https://img.shields.io/badge/Vite-5.4-blue?logo=vite&logoColor=white)](https://vitejs.dev)

<div align="center">
  <img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/sparkles.svg" alt="AuraChat Logo" width="120" height="120">

  ### Your Intelligent Coding Companion

  [Live Demo](https://aurachat.netlify.app) • [Report Bug](https://github.com/tarunerror/AuraChat/issues) • [Request Feature](https://github.com/tarunerror/AuraChat/issues)

  ![AuraChat Demo](https://i.postimg.cc/ncv1C0Cf/Screenshot-2025-02-24-112701.png)
</div>

## ✨ Features

### 🤖 Advanced AI Integration
- Powered by Mistral AI for intelligent responses
- 15+ model options (tiny to large, specialized models)
- Context-aware conversations with alternatives
- Code generation and explanation

### 💻 Code Execution
- Live JavaScript code execution
- Syntax highlighting for multiple languages
- Interactive code editor with Monaco
- Real-time output display

### 🎙️ Voice Interaction
- Text-to-speech for AI responses
- Customizable voice settings
- Speech recognition for voice input
- Toggle speech on/off

### 🌐 Multilingual Support
- Automatic language detection
- Responses in the user's language
- Support for 25+ languages
- Native language display

### 📱 Responsive Design
- Mobile-first approach
- Adaptive layout for all screen sizes
- Touch-optimized interface
- Safe area support for modern devices

### 🎨 Modern UI/UX
- Cyberpunk-inspired design
- Glass morphism effects
- Smooth animations
- Dark mode optimized

### 📄 Document Processing
- Text file support
- Image OCR capabilities
- PDF text extraction
- Multi-format compatibility

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

## 💡 Usage Examples

### Chat Interface
```typescript
// Start a new chat
const chat = await aurachat.createSession({
  model: 'mistral-small',
  name: 'New Chat'
});

// Send a message
await chat.sendMessage('How do I implement a binary search tree in TypeScript?');
```

### Code Execution
```javascript
// Execute code directly in chat
function fibonacci(n) {
  return n <= 1 ? n : fibonacci(n-1) + fibonacci(n-2);
}

console.log(fibonacci(10)); // Output: 55
```

### Voice Commands
```typescript
// Configure voice settings
chat.setVoiceConfig({
  rate: 1.0,
  pitch: 1.0,
  volume: 1.0
});

// Toggle speech
chat.toggleSpeech();
```

## 🛠️ Technical Stack

### Frontend
- React 18.3
- TypeScript 5.5
- Tailwind CSS 3.4
- Vite 5.4

### AI Integration
- Mistral AI API
- WebSpeech API
- Tesseract.js for OCR

### Development
- ESLint 9.9
- Monaco Editor
- Lucide Icons

## 📱 Cross-Platform Support

AuraChat is thoroughly tested and optimized for:

### Desktop
- Windows 10/11
- macOS 10.15+
- Linux (modern distributions)

### Mobile
- iOS 13+
- Android 9+
- PWA support

### Browsers
- Chrome 90+
- Firefox 90+
- Safari 14+
- Edge 90+

## 🔧 Configuration

### Environment Variables
```env
VITE_MISTRAL_API_KEY=your_api_key_here
```

### Voice Settings
```typescript
{
  voice: null | SpeechSynthesisVoice,
  pitch: number, // 0.5 to 2
  rate: number,  // 0.5 to 2
  volume: number // 0 to 1
}
```

## 🧠 AI Models

AuraChat supports multiple Mistral AI models:

### General Purpose
- Mistral Small/Large/Saba
- Mixtral 8x7B/8x22B
- Ministral 3B/8B

### Specialized
- Codestral (code-focused)
- Mathstral (math-focused)
- Pixtral (image-focused)

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Maintain responsive design principles
- Write unit tests for new features
- Update documentation as needed

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