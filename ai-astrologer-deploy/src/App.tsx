import { useState } from 'react';
import { Stars, RotateCcw } from 'lucide-react';
import { BirthDetailsForm } from './components/BirthDetailsForm';
import { AstrologyReadingDisplay } from './components/AstrologyReadingDisplay';
import { QuestionInterface } from './components/QuestionInterface';
import { AstrologyEngine } from './utils/astrologyEngine';
import type { BirthDetails, AstrologyReading } from './types/astrology';
import type { LLMConfig } from './utils/llmService';
import './App.css';

function App() {
  const [birthDetails, setBirthDetails] = useState<BirthDetails | null>(null);
  const [reading, setReading] = useState<AstrologyReading | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentView, setCurrentView] = useState<'form' | 'reading' | 'questions'>('form');

  // Initialize LLM config from environment variables and create engine
  const [astrologyEngine] = useState(() => {
    const config: LLMConfig = {
      provider: (import.meta.env.VITE_LLM_PROVIDER as any) || 'local',
      apiKey: import.meta.env.VITE_LLM_API_KEY,
      model: import.meta.env.VITE_LLM_MODEL || 'gemini-1.5-flash',
      endpoint: import.meta.env.VITE_LLM_ENDPOINT
    };
    
    console.log('Initializing LLM with config:', {
      provider: config.provider,
      hasApiKey: !!config.apiKey,
      model: config.model
    });
    
    return new AstrologyEngine(config);
  });

  const handleBirthDetailsSubmit = async (details: BirthDetails) => {
    setLoading(true);
    setBirthDetails(details);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const generatedReading = astrologyEngine.generateReading(details);
      setReading(generatedReading);
      setCurrentView('reading');
    } catch (error) {
      console.error('Error generating reading:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAskQuestion = async (question: string) => {
    if (!birthDetails) throw new Error('Birth details not available');
    return await astrologyEngine.answerQuestionWithLLM(question, birthDetails);
  };

  const handleReset = () => {
    setBirthDetails(null);
    setReading(null);
    setCurrentView('form');
  };

  const handleViewChange = (view: 'reading' | 'questions') => {
    setCurrentView(view);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <header className="header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Stars className="w-8 h-8 text-yellow-400" />
              <h1 className="header-title text-3xl">AI Astrologer</h1>
            </div>
            
            {birthDetails && (
              <div className="flex items-center space-x-4">
                {reading && (
                  <div className="nav-tabs">
                    <button
                      onClick={() => handleViewChange('reading')}
                      className={`btn-tab ${currentView === 'reading' ? 'active' : ''}`}
                    >
                      Reading
                    </button>
                    <button
                      onClick={() => handleViewChange('questions')}
                      className={`btn-tab ${currentView === 'questions' ? 'active' : ''}`}
                    >
                      Ask Questions
                    </button>
                  </div>
                )}
                <button
                  onClick={handleReset}
                  className="btn-secondary flex items-center space-x-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>New Reading</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === 'form' && (
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-white mb-4">
              Discover Your Cosmic Blueprint
            </h2>
            <p className="text-xl text-purple-200 mb-8 max-w-2xl mx-auto">
              Enter your birth details to receive a personalized astrology reading powered by advanced AI insights
            </p>
            <BirthDetailsForm onSubmit={handleBirthDetailsSubmit} loading={loading} />
          </div>
        )}

        {currentView === 'reading' && reading && birthDetails && (
          <div className="space-y-8">
            <AstrologyReadingDisplay reading={reading} userName={birthDetails.name} />
          </div>
        )}

        {currentView === 'questions' && birthDetails && (
          <div className="space-y-8">
            <QuestionInterface 
              onAskQuestion={handleAskQuestion} 
              userName={birthDetails.name}
            />
          </div>
        )}
      </main>

      <footer className="header mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-purple-200">
            <p className="mb-2 font-medium">AI Astrologer - Your Personal Cosmic Guide</p>
            <p className="text-sm text-purple-300">
              Based on traditional astrology principles enhanced with AI insights
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
