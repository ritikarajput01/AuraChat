# <div align="center">🌟 AuraChat</div>

<div align="center" class="logo-container">
  <div class="floating-logo">
    <img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/sparkles.svg" alt="AuraChat Logo" width="120" height="120">
  </div>

  <h3 class="gradient-text">Your Intelligent AI Code Assistant</h3>

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

<div align="center" class="badge-container">

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

</div>

<div class="showcase-container">
  <div class="showcase-image">
    <img src="https://images.unsplash.com/photo-1673187172822-2c7e80ccd8f4?q=80&w=2070" alt="AuraChat Interface" />
  </div>
</div>

## ✨ Features

<div class="features-grid">
  <div class="feature-card">
    <h4>🤖 Advanced AI Chat</h4>
    <p>Powered by Mistral AI for intelligent code assistance</p>
  </div>
  <div class="feature-card">
    <h4>💻 Live Code Execution</h4>
    <p>Run JavaScript code snippets directly in the chat</p>
  </div>
  <div class="feature-card">
    <h4>🎯 Multiple Sessions</h4>
    <p>Organize your conversations efficiently</p>
  </div>
  <div class="feature-card">
    <h4>🎨 Beautiful UI</h4>
    <p>Modern, cyberpunk-inspired design with neon accents</p>
  </div>
  <div class="feature-card">
    <h4>🗣️ Voice Interaction</h4>
    <p>Speak with your AI assistant naturally</p>
  </div>
  <div class="feature-card">
    <h4>📝 Markdown Support</h4>
    <p>Rich text formatting with syntax highlighting</p>
  </div>
</div>

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0.0 or higher
- A Mistral AI API key

### Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/tarunerror/AuraChat.git
cd AuraChat
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Create a \`.env\` file in the root directory:
\`\`\`env
VITE_MISTRAL_API_KEY=your_api_key_here
\`\`\`

4. Start the development server:
\`\`\`bash
npm run dev
\`\`\`

## 🎮 Usage

<div class="usage-container">
  <div class="usage-image">
    <img src="https://images.unsplash.com/photo-1675557009875-436f7a7a5ba4?q=80&w=2070" alt="AuraChat Demo" />
  </div>
</div>

### Chat Interface

- 💬 Type your message or click the microphone icon for voice input
- 📋 Copy code snippets with a single click
- ▶️ Execute JavaScript code directly in the chat
- 🔄 Create new chat sessions for different topics
- ⚙️ Customize voice settings for the AI assistant

### Code Execution

\`\`\`javascript
// Example: Calculate Fibonacci sequence
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10));
\`\`\`

## 🛠️ Technologies

<div class="tech-grid">
  <div class="tech-card">Frontend</div>
  <div class="tech-card">React, TypeScript, Tailwind CSS</div>
  <div class="tech-card">Build Tool</div>
  <div class="tech-card">Vite</div>
  <div class="tech-card">AI Integration</div>
  <div class="tech-card">Mistral AI</div>
  <div class="tech-card">Code Editor</div>
  <div class="tech-card">Monaco Editor</div>
  <div class="tech-card">Voice</div>
  <div class="tech-card">Web Speech API</div>
  <div class="tech-card">Icons</div>
  <div class="tech-card">Lucide React</div>
  <div class="tech-card">Styling</div>
  <div class="tech-card">Custom Cyberpunk Theme</div>
</div>

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch
3. Submit a pull request

For major changes, please open an issue first to discuss what you would like to change.

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center" class="footer">
  <p>Made with ❤️ and ⚡ by <a href="https://github.com/tarunerror">Tarun</a></p>
  
  <a href="https://github.com/tarunerror/AuraChat">
    <img src="https://img.shields.io/github/stars/tarunerror/AuraChat?style=social" alt="GitHub stars">
  </a>
</div>

<style>
/* 3D and Animation Styles */
.logo-container {
  perspective: 1000px;
  padding: 2rem;
}

.floating-logo {
  animation: float 6s ease-in-out infinite;
  transform-style: preserve-3d;
}

.floating-logo img {
  filter: drop-shadow(0 0 15px rgba(0, 243, 255, 0.6));
  transition: transform 0.3s ease;
}

.floating-logo:hover img {
  transform: rotateY(180deg);
}

@keyframes float {
  0%, 100% { transform: translateY(0) rotateY(0); }
  50% { transform: translateY(-20px) rotateY(10deg); }
}

.gradient-text {
  background: linear-gradient(135deg, #00f3ff, #bc13fe);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-size: 2.5rem;
  font-weight: bold;
  text-shadow: 0 0 20px rgba(0, 243, 255, 0.3);
  animation: glow 3s ease-in-out infinite;
}

@keyframes glow {
  0%, 100% { filter: brightness(100%); }
  50% { filter: brightness(150%); }
}

.badge-container {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin: 2rem 0;
  perspective: 1000px;
}

.badge-container img {
  transform-style: preserve-3d;
  transition: transform 0.3s ease;
}

.badge-container img:hover {
  transform: translateZ(20px);
}

.showcase-container {
  position: relative;
  margin: 4rem 0;
  perspective: 2000px;
}

.showcase-image {
  border-radius: 20px;
  overflow: hidden;
  transform: rotateX(5deg);
  box-shadow: 0 20px 40px rgba(0, 243, 255, 0.2);
  transition: transform 0.3s ease;
}

.showcase-image:hover {
  transform: rotateX(0);
}

.showcase-image img {
  width: 100%;
  height: auto;
  border-radius: 20px;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin: 3rem 0;
}

.feature-card {
  background: rgba(26, 26, 58, 0.8);
  border-radius: 15px;
  padding: 2rem;
  border: 1px solid rgba(0, 243, 255, 0.2);
  transform-style: preserve-3d;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.feature-card:hover {
  transform: translateZ(20px);
  box-shadow: 0 10px 30px rgba(0, 243, 255, 0.3);
}

.tech-grid {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1rem;
  margin: 2rem 0;
}

.tech-card {
  background: rgba(26, 26, 58, 0.8);
  padding: 1rem;
  border-radius: 10px;
  border: 1px solid rgba(0, 243, 255, 0.2);
  transition: transform 0.3s ease;
}

.tech-card:hover {
  transform: scale(1.05);
  background: rgba(0, 243, 255, 0.1);
}

.footer {
  margin-top: 4rem;
  padding: 2rem;
  background: linear-gradient(to top, rgba(26, 26, 58, 0.8), transparent);
  border-radius: 20px;
  transform-style: preserve-3d;
}

.footer a {
  color: #00f3ff;
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer a:hover {
  color: #bc13fe;
  text-shadow: 0 0 10px rgba(0, 243, 255, 0.5);
}

/* Responsive Design */
@media (max-width: 768px) {
  .gradient-text {
    font-size: 2rem;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
  }
  
  .tech-grid {
    grid-template-columns: 1fr;
  }
}
</style>