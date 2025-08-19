import React, { useState } from 'react';
import { Send, MessageCircle, Clock, Sparkles } from 'lucide-react';
import type { QuestionResponse } from '../types/astrology';

interface QuestionInterfaceProps {
  onAskQuestion: (question: string) => Promise<QuestionResponse>;
  userName: string;
}

export const QuestionInterface: React.FC<QuestionInterfaceProps> = ({ onAskQuestion, userName }) => {
  const [question, setQuestion] = useState('');
  const [responses, setResponses] = useState<QuestionResponse[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    setLoading(true);
    
    try {
      const response = await onAskQuestion(question);
      setResponses(prev => [response, ...prev]);
      setQuestion('');
    } catch (error) {
      console.error('Error getting response:', error);
      
      // More specific error message based on error type
      let errorMessage = "I apologize, but I'm having trouble generating a response right now.";
      
      if (error instanceof Error) {
        if (error.message.includes('API key')) {
          errorMessage = "❌ AI service configuration error. Please check your API key in the environment settings.";
        } else if (error.message.includes('OpenAI API error')) {
          errorMessage = "❌ OpenAI API error. Please check your API key and account status.";
        } else if (error.message.includes('AI service not configured')) {
          errorMessage = "❌ AI service not configured. Please add your API key to the .env.local file.";
        } else {
          errorMessage = `❌ AI Error: ${error.message}`;
        }
      }
      
      const errorResponse: QuestionResponse = {
        question,
        answer: errorMessage,
        timestamp: new Date()
      };
      setResponses(prev => [errorResponse, ...prev]);
      setQuestion('');
    } finally {
      setLoading(false);
    }
  };

  const suggestedQuestions = [
    "What does my future hold?",
    "How can I improve my career prospects?",
    "What should I know about love and relationships?",
    "What are my financial prospects?",
    "How can I improve my health and wellness?",
    "What challenges should I prepare for?"
  ];

  const handleSuggestedQuestion = (suggestedQuestion: string) => {
    if (loading) return;
    setQuestion(suggestedQuestion);
  };

  return (
    <div className="max-w-4xl mx-auto card">
      <div className="card-header">
        <div className="flex items-center justify-center mb-2">
          <div className="section-icon mr-2">
            <MessageCircle className="w-8 h-8 text-purple-600" />
          </div>
          <h2 className="card-title">Ask Your Personal Astrologer</h2>
        </div>
        <p className="card-subtitle text-center">Get personalized answers based on your birth chart</p>
      </div>


      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex gap-3">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask about your future, career, love, or anything else..."
            className="form-input flex-1"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !question.trim()}
            className="btn-primary px-6"
          >
            {loading ? (
              <div className="spinner w-5 h-5"></div>
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>
      </form>


      {responses.length === 0 && (
        <div className="mb-6">
          <h3 className="section-title mb-3">Suggested Questions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {suggestedQuestions.map((suggestedQ, index) => (
              <button
                key={index}
                onClick={() => handleSuggestedQuestion(suggestedQ)}
                disabled={loading}
                className="btn-secondary text-left p-4 hover:bg-gradient-from-purple-50"
              >
                <span className="text-purple-600 text-sm">{suggestedQ}</span>
              </button>
            ))}
          </div>
        </div>
      )}


      {responses.length > 0 && (
        <div className="space-y-4">
          <h3 className="section-title flex items-center space-x-2">
            <span>Your Astrology Conversations</span>
            <Sparkles className="w-5 h-5 text-purple-400" />
          </h3>
          {responses.map((response, index) => (
            <div key={index} className="bg-gradient-from-purple-50 rounded-lg p-6">

              <div className="mb-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">{userName.charAt(0).toUpperCase()}</span>
                  </div>
                  <div className="flex-1">
                    <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-200">
                      <p className="text-gray-800">{response.question}</p>
                    </div>
                  </div>
                </div>
              </div>


              <div className="ml-11">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-purple rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">AI</span>
                  </div>
                  <div className="flex-1">
                    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                      <p className="text-gray-700 leading-relaxed">{response.answer}</p>
                      <div className="flex items-center mt-3 text-xs text-gray-500">
                        <Clock className="w-3 h-3 mr-1" />
                        {response.timestamp.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}


      {responses.length === 0 && !loading && (
        <div className="text-center py-8 text-gray-500">
          <div className="section-icon mx-auto mb-3">
            <MessageCircle className="w-12 h-12 text-gray-300" />
          </div>
          <p>No questions asked yet. Start by asking something about your future!</p>
        </div>
      )}
    </div>
  );
};
