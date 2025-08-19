export interface LLMConfig {
  provider: 'openai' | 'anthropic' | 'gemini' | 'local';
  apiKey?: string;
  model?: string;
  endpoint?: string;
}

export interface LLMResponse {
  answer: string;
  error?: string;
}

export interface AstrologyContext {
  name: string;
  sunSign: string;
  element: string;
  traits: string[];
  age: number;
  dateOfBirth: string;
  placeOfBirth: string;
}

export class LLMService {
  private config: LLMConfig;

  constructor(config: LLMConfig) {
    this.config = config;
    console.log('LLMService initialized with config:', {
      provider: config.provider,
      hasApiKey: !!config.apiKey,
      model: config.model,
      endpoint: config.endpoint
    });
  }

  async generatePersonalizedAnswer(
    question: string, 
    context: AstrologyContext
  ): Promise<LLMResponse> {
    console.log('Generating personalized answer for question:', question);
    console.log('Using provider:', this.config.provider);
    console.log('API Key present:', !!this.config.apiKey);
    console.log('Model:', this.config.model);
    
    const prompt = this.buildAstrologyPrompt(question, context);

    switch (this.config.provider) {
      case 'openai':
        console.log('Calling OpenAI API...');
        return await this.callOpenAI(prompt);
      case 'anthropic':
        console.log('Calling Anthropic API...');
        return await this.callAnthropic(prompt);
      case 'gemini':
        console.log('Calling Gemini API...');
        return await this.callGemini(prompt);
      case 'local':
        console.log('Calling Local LLM...');
        return await this.callLocalLLM(prompt);
      default:
        throw new Error(`Unsupported LLM provider: ${this.config.provider}. Please check your configuration.`);
    }
  }

  private buildAstrologyPrompt(question: string, context: AstrologyContext): string {
    return `You are an expert astrologer providing personalized guidance. Please answer the following question with deep astrological insight.

PERSONAL CONTEXT:
- Name: ${context.name}
- Sun Sign: ${context.sunSign} (${context.element} element)
- Age: ${context.age}
- Birth Date: ${context.dateOfBirth}
- Place: ${context.placeOfBirth}
- Key Traits: ${context.traits.join(', ')}

QUESTION: "${question}"

INSTRUCTIONS:
- Provide a personalized, insightful answer (150-250 words)
- Reference their specific zodiac traits and element
- Use their name naturally in the response
- Offer practical guidance based on astrological principles
- Maintain a warm, mystical but grounded tone
- Include specific advice related to their ${context.sunSign} nature

ANSWER:`;
  }

  private async callOpenAI(prompt: string): Promise<LLMResponse> {
    console.log('callOpenAI called with API key:', this.config.apiKey?.substring(0, 20) + '...');
    
    if (!this.config.apiKey) {
      throw new Error('OpenAI API key required');
    }

    const requestBody = {
      model: this.config.model || 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are an expert astrologer providing personalized guidance.' },
        { role: 'user', content: prompt }
      ],
      max_tokens: 300,
      temperature: 0.7
    };

    console.log('Making OpenAI request with model:', requestBody.model);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.config.apiKey}`
      },
      body: JSON.stringify(requestBody)
    });

    console.log('OpenAI response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API error response:', errorText);
      throw new Error(`OpenAI API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('OpenAI response received successfully');
    return {
      answer: data.choices[0]?.message?.content || 'Unable to generate response'
    };
  }

  private async callAnthropic(prompt: string): Promise<LLMResponse> {
    if (!this.config.apiKey) {
      throw new Error('Anthropic API key required');
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.config.apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: this.config.model || 'claude-3-haiku-20240307',
        max_tokens: 300,
        messages: [{ role: 'user', content: prompt }]
      })
    });

    if (!response.ok) {
      throw new Error(`Anthropic API error: ${response.status}`);
    }

    const data = await response.json();
    return {
      answer: data.content[0]?.text || 'Unable to generate response'
    };
  }

  private async callGemini(prompt: string): Promise<LLMResponse> {
    console.log('callGemini called');
    console.log('API Key:', this.config.apiKey ? `${this.config.apiKey.substring(0, 10)}...` : 'MISSING');
    console.log('Model:', this.config.model);
    
    if (!this.config.apiKey) {
      console.error('No API key provided for Gemini');
      throw new Error('Gemini API key required');
    }

    // Use the correct model name for Gemini v1 API
    const model = this.config.model || 'gemini-1.5-flash';
    const url = `https://generativelanguage.googleapis.com/v1/models/${model}:generateContent?key=${this.config.apiKey}`;
    console.log('Making request to URL:', url.replace(this.config.apiKey, 'API_KEY_HIDDEN'));

    const requestBody = {
      contents: [{
        parts: [{ text: prompt }]
      }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 300
      }
    };
    
    console.log('Request body:', JSON.stringify(requestBody, null, 2));

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    console.log('Gemini response status:', response.status);
    console.log('Gemini response headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API error response:', errorText);
      throw new Error(`Gemini API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('Gemini response data:', JSON.stringify(data, null, 2));
    
    return {
      answer: data.candidates[0]?.content?.parts[0]?.text || 'Unable to generate response'
    };
  }

  private async callLocalLLM(prompt: string): Promise<LLMResponse> {
    // For local LLM integration (Ollama, etc.)
    const endpoint = this.config.endpoint || 'http://localhost:11434/api/generate';
    
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: this.config.model || 'llama2',
        prompt: prompt,
        stream: false,
        options: {
          temperature: 0.7,
          num_predict: 300
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Local LLM error: ${response.status}`);
    }

    const data = await response.json();
    return {
      answer: data.response || 'Unable to generate response'
    };
  }
}

// Factory function to create LLM service with different providers
export function createLLMService(config: LLMConfig): LLMService {
  return new LLMService(config);
}
