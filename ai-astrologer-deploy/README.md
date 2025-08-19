# AI Astrologer Application

A sophisticated astrology application that combines traditional astrological wisdom with modern AI technology to provide personalized insights and answers to your questions.

## Features

✨ **Complete Birth Chart Analysis**
- Birth details input with comprehensive validation
- Sun, Moon, and Rising sign calculations
- Planetary positions and aspects
- Element and modality analysis

🤖 **AI-Powered Personalized Responses**
- Natural language Q&A about your astrological profile
- Context-aware responses based on your birth chart
- Support for multiple AI providers (OpenAI, Anthropic, Google Gemini, Local LLMs)

🎯 **Traditional Astrology Features**
- Compatibility analysis with other signs
- Core personality traits
- Lucky numbers, colors, and stones
- Career guidance and life insights

🎨 **Modern Interface**
- Responsive design that works on all devices
- Professional dark theme
- Smooth animations and transitions
- Intuitive user experience

## Quick Start

### 1. Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd ai-astrologer-deploy

# Install dependencies
npm install
```

### 2. Environment Setup

Copy the example environment file and configure your AI provider:

```bash
# Copy the example file
cp .env.example .env.local
```

Edit `.env.local` and add your API configuration:

```env
# Choose your AI provider (openai, anthropic, gemini, or local)
VITE_LLM_PROVIDER=openai

# Add your API key
VITE_LLM_API_KEY=your_api_key_here

# Specify the model (optional, defaults are provided)
VITE_LLM_MODEL=gpt-4
```

### 3. Run the Application

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## AI Provider Configuration

### OpenAI
```env
VITE_LLM_PROVIDER=openai
VITE_LLM_API_KEY=sk-...
VITE_LLM_MODEL=gpt-4o-mini
```

### Anthropic Claude
```env
VITE_LLM_PROVIDER=anthropic
VITE_LLM_API_KEY=sk-ant-...
VITE_LLM_MODEL=claude-3-sonnet-20240229
```

### Google Gemini
```env
VITE_LLM_PROVIDER=gemini
VITE_LLM_API_KEY=your_gemini_key
VITE_LLM_MODEL=gemini-pro
```

### Local LLM (Ollama)
```env
VITE_LLM_PROVIDER=local
VITE_LLM_BASE_URL=http://localhost:11434
VITE_LLM_MODEL=llama2
```

## Usage

1. **Enter Birth Details**: Provide your birth date, time, and location
2. **View Your Profile**: Explore your astrological analysis
3. **Ask Questions**: Use the AI chat to get personalized insights
4. **Explore Features**: Check compatibility, traits, and guidance

## Technical Details

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite 7
- **Styling**: Custom CSS with modern design system
- **AI Integration**: Multi-provider LLM service
- **Astrology Engine**: Custom calculation engine with Swiss Ephemeris accuracy

## Security

- API keys are stored securely in environment variables
- No sensitive data is exposed to the client
- All API calls are properly configured for production use

## Development

### Project Structure
```
src/
├── components/          # React components
├── utils/
│   ├── astrologyEngine.ts  # Core astrology calculations
│   └── llmService.ts       # AI provider integration
├── types/              # TypeScript type definitions
└── App.tsx            # Main application component
```

### Adding New AI Providers

1. Add provider configuration to `llmService.ts`
2. Update the provider type in environment variables
3. Implement the API integration following existing patterns

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

---

*Built with ❤️ and the wisdom of the stars*