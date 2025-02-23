# 🌟 AuraChat

<div align="center">
  <img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/sparkles.svg" alt="AuraChat Logo" width="120" height="120" style="filter: drop-shadow(0 0 0.75rem #00f3ff);">

  <h3 align="center">Your Intelligent AI Code Assistant</h3>

  <p align="center">
    A beautiful, modern AI chat application with code execution capabilities and voice interaction
    <br />
    <a href="#features">View Features</a>
    ·
    <a href="#getting-started">Quick Start</a>
    ·
    <a href="#usage">Usage Guide</a>
  </p>
</div>

<div align="center">

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

</div>

## ✨ Features

<div align="center">
  <img src="https://images.unsplash.com/photo-1673187172822-2c7e80ccd8f4?q=80&w=2070" width="600" style="border-radius: 10px; margin: 20px 0;">
</div>

- 🤖 **Advanced AI Chat** - Powered by Mistral AI for intelligent code assistance
- 💻 **Live Code Execution** - Run JavaScript code snippets directly in the chat
- 🎯 **Multiple Chat Sessions** - Organize your conversations efficiently
- 🎨 **Beautiful UI** - Modern, cyberpunk-inspired design with neon accents
- 🗣️ **Voice Interaction** - Speak with your AI assistant naturally
- 📝 **Markdown Support** - Rich text formatting with syntax highlighting
- 🌓 **Code Editor** - Built-in Monaco editor for code editing
- 💾 **Persistent Storage** - Your conversations are saved locally
- 📱 **Responsive Design** - Works seamlessly on all devices

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0.0 or higher
- A Mistral AI API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/aurachat.git
cd aurachat
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
VITE_MISTRAL_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm run dev
```

## 🎮 Usage

<div align="center">
  <img src="https://images.unsplash.com/photo-1675557009875-436f7a7a5ba4?q=80&w=2070" width="600" style="border-radius: 10px; margin: 20px 0;">
</div>

### Chat Interface

- 💬 Type your message or click the microphone icon for voice input
- 📋 Copy code snippets with a single click
- ▶️ Execute JavaScript code directly in the chat
- 🔄 Create new chat sessions for different topics
- ⚙️ Customize voice settings for the AI assistant

### Code Execution

```javascript
// Example: Calculate Fibonacci sequence
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10));
```

### Voice Commands

1. Click the microphone icon
2. Speak your question or command
3. The AI will respond with voice and text

## 🛠️ Technologies

- **Frontend**: React, TypeScript, Tailwind CSS
- **Build Tool**: Vite
- **AI Integration**: Mistral AI
- **Code Editor**: Monaco Editor
- **Voice**: Web Speech API
- **Icons**: Lucide React
- **Styling**: Custom Cyberpunk Theme

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch
3. Submit a pull request

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌟 Acknowledgments

- Mistral AI for the powerful language model
- The React community for amazing tools
- All contributors and users of AuraChat

---

<div align="center">
  Made with ❤️ and ⚡ by the AuraChat Team
</div>

<style>
  /* Add some animation to the README */
  img[alt="AuraChat Logo"] {
    animation: float 6s ease-in-out infinite;
  }
  
  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
    100% { transform: translateY(0px); }
  }
  
  .shields img {
    transition: transform 0.3s ease;
  }
  
  .shields img:hover {
    transform: translateY(-5px);
  }
</style>