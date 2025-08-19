#  AI Astrologer Application

A sophisticated web application that combines traditional astrological wisdom with modern AI technology to provide personalized insights and guidance based on your birth chart.

![AI Astrologer](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript) ![Vite](https://img.shields.io/badge/Vite-7-purple?style=for-the-badge&logo=vite) ![AI Powered](https://img.shields.io/badge/AI-Powered-green?style=for-the-badge)

## ✨ Features

###  **Core Functionality**
- **Birth Chart Analysis**: Complete astrological profile generation
- **AI-Powered Q&A**: Personalized responses using advanced language models
- **Zodiac Compatibility**: Detailed compatibility analysis with other signs
- **Personality Insights**: Core traits, strengths, and challenges
- **Life Guidance**: Career advice, relationship insights, and future predictions

###  **AI Integration**
- **Multi-Provider Support**: OpenAI GPT, Google Gemini, Anthropic Claude, Local LLMs
- **Personalized Responses**: Context-aware answers based on your birth chart
- **Real-time Q&A**: Interactive chat interface for astrological guidance
- **Fallback Protection**: Graceful handling of API failures

###  **User Experience**
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Professional Dark Theme**: Modern, mystical interface
- **Smooth Animations**: Engaging transitions and loading states
- **Intuitive Navigation**: Easy-to-use interface for all experience levels

##  Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- AI API key (Google Gemini, OpenAI, or Anthropic)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ai-astrologer.git
   cd ai-astrologer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```

4. **Configure your AI provider**
   
   Edit `.env.local` with your API credentials:
   
   **For Google Gemini (Recommended - Free tier available):**
   ```env
   VITE_LLM_PROVIDER=gemini
   VITE_LLM_API_KEY=your-google-ai-studio-key
   VITE_LLM_MODEL=gemini-1.5-flash
   ```
   
   **For OpenAI:**
   ```env
   VITE_LLM_PROVIDER=openai
   VITE_LLM_API_KEY=your-openai-api-key
   VITE_LLM_MODEL=gpt-3.5-turbo
   ```
   
   **For Anthropic Claude:**
   ```env
   VITE_LLM_PROVIDER=anthropic
   VITE_LLM_API_KEY=your-anthropic-api-key
   VITE_LLM_MODEL=claude-3-haiku-20240307
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open in browser**
   
   Navigate to `http://localhost:5173`

##  Getting API Keys

### Google Gemini (Free Tier Available)
1. Visit [Google AI Studio](https://makersuite.google.com/)
2. Sign in with your Google account
3. Create a new API key
4. Copy the key to your `.env.local` file

### OpenAI
1. Visit [OpenAI Platform](https://platform.openai.com/)
2. Create an account and add billing information
3. Go to API Keys section
4. Create a new secret key

### Anthropic Claude
1. Visit [Anthropic Console](https://console.anthropic.com/)
2. Create an account
3. Navigate to API Keys
4. Generate a new key

## 📱 Usage

1. **Enter Birth Details**
   - Fill in your birth date, time, and location
   - The app calculates your complete astrological profile

2. **Explore Your Reading**
   - View your zodiac sign, traits, and characteristics
   - Learn about strengths, challenges, and life advice
   - Check compatibility with other signs

3. **Ask Questions**
   - Use the AI chat interface for personalized guidance
   - Ask about career, relationships, future predictions
   - Get unique, contextual responses based on your chart

##  Tech Stack

- **Frontend**: React 19 with TypeScript
- **Build Tool**: Vite 7
- **Styling**: Custom CSS with modern design system
- **AI Integration**: Multi-provider LLM service
- **Astrology Engine**: Custom calculations with Swiss Ephemeris accuracy
- **Icons**: Lucide React

##  Project Structure

```
src/
├── components/
│   ├── AstrologyReadingDisplay.tsx    # Main reading display
│   ├── BirthDetailsForm.tsx           # Birth information input
│   └── QuestionInterface.tsx          # AI chat interface
├── utils/
│   ├── astrologyEngine.ts             # Core astrology logic
│   ├── llmService.ts                  # AI provider integration
│   ├── astrology.ts                   # Calculation utilities
│   └── zodiac.ts                      # Zodiac data and definitions
├── types/
│   └── astrology.ts                   # TypeScript type definitions
├── App.tsx                            # Main application component
├── App.css                            # Application styles
└── main.tsx                           # React entry point
```

##  Deployment

### Vercel (Recommended)

1. **Deploy to Vercel**
   ```bash
   npm i -g vercel
   vercel
   ```

2. **Set Environment Variables**
   - Go to your Vercel dashboard
   - Navigate to Settings → Environment Variables
   - Add your `VITE_LLM_*` variables

3. **Auto-deploy**
   - Connect your GitHub repository
   - Every push to main branch auto-deploys

### Netlify

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Drag and drop the `dist` folder to Netlify
   - Or connect your GitHub repository

3. **Configure Environment Variables**
   - Go to Site Settings → Environment Variables
   - Add your API configuration

### Manual Build

```bash
npm run build
```

The built files will be in the `dist/` directory, ready for any static hosting service.

## 🔒Security & Privacy

- **API Keys**: Stored securely as environment variables
- **Client-Side**: No sensitive data exposed to the browser
- **Privacy**: Birth details are not stored or transmitted to third parties
- **HTTPS**: All API communications are encrypted

##  Features Roadmap

- [ ] **Extended Birth Chart**: Houses, aspects, and planetary positions
- [ ] **Daily Horoscopes**: AI-generated daily predictions
- [ ] **Transit Tracking**: Current planetary influences
- [ ] **Relationship Synastry**: Compatibility analysis between two charts
- [ ] **PDF Reports**: Downloadable comprehensive readings
- [ ] **Multiple Languages**: Internationalization support

##  Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- **Swiss Ephemeris**: For accurate astronomical calculations
- **AI Providers**: OpenAI, Google, and Anthropic for language models
- **Astrology Community**: For traditional wisdom and knowledge
- **Open Source**: Built with amazing open-source tools


---

⭐ **Star this repository if you found it helpful!**

*Built with ❤️ and the wisdom of the stars*

