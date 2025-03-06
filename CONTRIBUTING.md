# Contributing to AuraChat

Welcome to the AuraChat contributing guide. We're excited to have you join our community of developers working to enhance this cyberpunk-inspired AI coding companion.

## Development Environment

### Prerequisites

- Node.js 18.0.0 or higher
- npm 9.0.0 or higher
- A Mistral AI API key

### Setting Up the Project

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/your-username/AuraChat.git
   ```
3. Install dependencies:
   ```bash
   cd AuraChat
   npm install
   ```
4. Create a `.env` file:
   ```bash
   VITE_MISTRAL_API_KEY=your_api_key_here
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
AuraChat
├── src/
│   ├── components/        # React components
│   │   ├── ChatContainer/  # Message display
│   │   ├── ChatInput/     # User input
│   │   ├── ChatMessage/   # Message rendering
│   │   └── ...
│   ├── hooks/            # Custom React hooks
│   │   ├── useChatState/  # State management
│   │   ├── useVoice/     # Voice features
│   │   └── ...
│   ├── utils/            # Utility functions
│   │   ├── codeUtils/    # Code handling
│   │   ├── languageUtils/ # Language support
│   │   └── ...
│   └── styles/           # CSS styles
│       ├── base.css      # Base styles
│       ├── components.css # Component styles
│       └── ...
└── ...
```

## Development Guidelines

### Code Style

- Use TypeScript for all new files
- Follow the existing code style
- Use meaningful variable and function names
- Add comments for complex logic
- Keep functions focused and concise

### Component Guidelines

1. **File Organization**
   - One component per file
   - Place related components in a shared directory
   - Include index.ts files for clean exports

2. **Naming Conventions**
   - PascalCase for component names
   - camelCase for functions and variables
   - kebab-case for CSS classes

3. **Component Structure**
   ```typescript
   import React from 'react';
   import { ComponentProps } from './types';
   
   export const Component: React.FC<ComponentProps> = ({
     prop1,
     prop2,
   }) => {
     // Component logic
     
     return (
       <div className="component">
         {/* Component JSX */}
       </div>
     );
   };
   ```

### Styling Guidelines

1. **Use Tailwind CSS**
   - Prefer utility classes over custom CSS
   - Follow the cyberpunk theme
   - Maintain consistent spacing

2. **Color Scheme**
   ```css
   :root {
     --neon-blue: #00f3ff;
     --neon-purple: #bc13fe;
     --dark-bg: #0a0a1f;
     --panel-bg: #1a1a3a;
   }
   ```

3. **Responsive Design**
   - Mobile-first approach
   - Use Tailwind breakpoints
   - Test on multiple devices

### Git Workflow

1. **Branch Naming**
   - `feature/description` for new features
   - `fix/description` for bug fixes
   - `refactor/description` for refactoring
   - `docs/description` for documentation

2. **Commit Messages**
   ```
   type(scope): description
   
   [optional body]
   [optional footer]
   ```
   Types: feat, fix, docs, style, refactor, test, chore

3. **Pull Requests**
   - Create a branch for each PR
   - Keep PRs focused and small
   - Include tests when applicable
   - Update documentation as needed

### Testing

1. **Component Testing**
   - Write tests for new components
   - Test edge cases and error states
   - Use React Testing Library

2. **Integration Testing**
   - Test component interactions
   - Verify state management
   - Check API integrations

### Documentation

1. **Code Documentation**
   - Document complex functions
   - Explain non-obvious solutions
   - Update README.md when needed

2. **Component Documentation**
   - Document props and types
   - Include usage examples
   - Note any limitations

## Making Contributions

1. **Before Starting**
   - Check existing issues and PRs
   - Discuss major changes first
   - Read the code of conduct

2. **Development Process**
   - Create a new branch
   - Make your changes
   - Add tests if applicable
   - Update documentation
   - Run tests locally
   - Push changes
   - Create a pull request

3. **Pull Request Process**
   - Fill out the PR template
   - Link related issues
   - Add screenshots if relevant
   - Respond to feedback
   - Keep commits clean

## Best Practices

### Performance

- Optimize component renders
- Lazy load when appropriate
- Monitor bundle size
- Use proper memoization

### Accessibility

- Use semantic HTML
- Add ARIA labels
- Ensure keyboard navigation
- Test with screen readers

### Security

- Validate user input
- Sanitize content
- Use secure dependencies
- Follow security best practices

## Getting Help

- Check the documentation
- Search existing issues
- Join our community
- Ask questions in discussions

## Code of Conduct

We are committed to providing a welcoming and inclusive experience for everyone. Please read our [Code of Conduct](CODE_OF_CONDUCT.md) before contributing.

## License

By contributing to AuraChat, you agree that your contributions will be licensed under the MIT License.