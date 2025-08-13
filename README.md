# Llama Coder

<p align="center">
  <img alt="Llama Coder" src="./public/og-image.png" width="600">
</p>

<p align="center">
  An open source Claude Artifacts alternative – generate complete applications with a single prompt. Powered by Llama 3.1 405B and multiple AI providers.
</p>

<p align="center">
  <a href="https://www.llamacoder.io">🌐 Live Demo</a> •
  <a href="#features">✨ Features</a> •
  <a href="#quick-start">🚀 Quick Start</a> •
  <a href="#tech-stack">🛠️ Tech Stack</a>
</p>

## Features

- **Multi-Model Support** - Choose from 12+ AI models including GPT-4o, Claude 3.5 Sonnet, Llama 3.3 70B, and DeepSeek V3
- **Real-time Code Generation** - Stream responses with live code preview using Sandpack
- **Chat History** - Persistent chat storage with SQLite/Prisma
- **Multiple Providers** - Support for OpenRouter, OpenAI, Anthropic, and Mistral APIs
- **Suggested Prompts** - 20+ curated examples across different categories
- **Dark Mode** - Beautiful UI with theme switching
- **Responsive Design** - Works seamlessly on desktop and mobile

## Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/kdkiss/llamacoder
   cd llamacoder
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .example.env .env
   ```
   
   Add your API keys to `.env`:
   ```env
   OPENROUTER_API_KEY=your_openrouter_key_here
   OPENAI_API_KEY=your_openai_key_here  # Optional
   ANTHROPIC_API_KEY=your_anthropic_key_here  # Optional
   MISTRAL_API_KEY=your_mistral_key_here  # Optional
   ```

4. **Initialize the database**
   ```bash
   npm run db:generate
   npm run db:migrate
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:3000`

## Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript, Tailwind CSS
- **AI Integration**: OpenRouter, OpenAI, Anthropic, Mistral APIs
- **Code Sandbox**: Sandpack by CodeSandbox
- **Database**: SQLite with Prisma ORM
- **UI Components**: Radix UI, Lucide Icons
- **Styling**: Tailwind CSS with custom animations
- **Analytics**: Plausible (optional)

## API Keys Setup

### OpenRouter (Recommended)
1. Sign up at [OpenRouter](https://openrouter.ai)
2. Get your API key from the dashboard
3. Add `OPENROUTER_API_KEY=your_key` to `.env`

### Other Providers (Optional)
- **OpenAI**: Get key from [OpenAI Platform](https://platform.openai.com)
- **Anthropic**: Get key from [Anthropic Console](https://console.anthropic.com)
- **Mistral**: Get key from [Mistral Platform](https://console.mistral.ai)

## Available Models

| Provider | Model | Description |
|----------|-------|-------------|
| OpenRouter | Qwen Coder (Free) | Fast coding model |
| OpenRouter | Llama 3.1 405B (Free) | Most capable free model |
| OpenAI | GPT-4o | Latest GPT model |
| Anthropic | Claude 3.5 Sonnet | Best reasoning model |
| Mistral | Codestral | Specialized for code |
| DeepSeek | DeepSeek V3 | Advanced reasoning |

## Project Structure

```
llamacoder/
├── app/                    # Next.js app directory
│   ├── (main)/            # Main application routes
│   ├── api/               # API endpoints
│   └── share/             # Shared chat links
├── components/            # React components
├── lib/                   # Utility functions
├── prisma/               # Database schema & migrations
├── public/               # Static assets
└── data/                 # Configuration files
```

## Contributing

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md) for details.

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push

### Docker
```bash
docker build -t llamacoder .
docker run -p 3000:3000 llamacoder
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Meta AI](https://ai.meta.com) for Llama models
- [OpenRouter](https://openrouter.ai) for model access
- [CodeSandbox](https://codesandbox.io) for Sandpack
- [Vercel](https://vercel.com) for hosting platform

---

<p align="center">
  Made with ❤️ by the open source community
</p>