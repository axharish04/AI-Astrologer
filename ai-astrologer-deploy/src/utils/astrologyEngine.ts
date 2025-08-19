import type { BirthDetails, AstrologyReading, QuestionResponse } from '../types/astrology';
import { getZodiacSign, calculateAge } from './zodiac';
import { LLMService, type LLMConfig, type AstrologyContext } from './llmService';

export class AstrologyEngine {
  private llmService: LLMService | null = null;

  constructor(llmConfig?: LLMConfig) {
    if (llmConfig) {
      this.llmService = new LLMService(llmConfig);
    }
  }

  public updateLLMConfig(config: LLMConfig) {
    this.llmService = new LLMService(config);
  }

  private createAstrologyContext(birthDetails: BirthDetails): AstrologyContext {
    const sunSign = getZodiacSign(birthDetails.dateOfBirth);
    const age = calculateAge(birthDetails.dateOfBirth);

    return {
      name: birthDetails.name,
      sunSign: sunSign.name,
      element: sunSign.element,
      traits: sunSign.traits,
      age,
      dateOfBirth: birthDetails.dateOfBirth,
      placeOfBirth: birthDetails.placeOfBirth
    };
  }

  public async answerQuestionWithLLM(question: string, birthDetails: BirthDetails): Promise<QuestionResponse> {
    console.log('answerQuestionWithLLM called with question:', question);
    console.log('LLM service available:', !!this.llmService);
    
    if (!this.llmService) {
      console.error('No LLM service configured! Check your environment variables.');
      throw new Error('AI service not configured. Please check your API key settings.');
    }

    try {
      const context = this.createAstrologyContext(birthDetails);
      console.log('Created astrology context for:', context.name, context.sunSign);
      
      const llmResponse = await this.llmService.generatePersonalizedAnswer(question, context);
      console.log('LLM response received:', llmResponse.answer.substring(0, 100) + '...');
      
      return {
        question,
        answer: llmResponse.answer,
        timestamp: new Date()
      };
    } catch (error) {
      console.error('LLM API call failed:', error);
      throw new Error(`AI service error: ${error instanceof Error ? error.message : 'Unknown error'}. Please check your API key and try again.`);
    }
  }

  private generatePersonalityTraits(signName: string, age: number): string[] {
    const baseTraits = {
      'Aries': ['Natural leader', 'Bold decision maker', 'Energetic pioneer'],
      'Taurus': ['Steadfast companion', 'Practical thinker', 'Appreciates beauty'],
      'Gemini': ['Excellent communicator', 'Adaptable nature', 'Intellectually curious'],
      'Cancer': ['Emotionally intelligent', 'Nurturing spirit', 'Strong intuition'],
      'Leo': ['Confident presence', 'Creative expression', 'Generous heart'],
      'Virgo': ['Detail-oriented', 'Analytical mind', 'Service-oriented'],
      'Libra': ['Seeks harmony', 'Diplomatic approach', 'Aesthetic appreciation'],
      'Scorpio': ['Intense focus', 'Transformative power', 'Deep emotional insight'],
      'Sagittarius': ['Philosophical mind', 'Adventurous spirit', 'Optimistic outlook'],
      'Capricorn': ['Goal-oriented', 'Disciplined approach', 'Natural authority'],
      'Aquarius': ['Innovative thinking', 'Humanitarian values', 'Independent spirit'],
      'Pisces': ['Compassionate nature', 'Artistic sensibility', 'Intuitive wisdom']
    };

    const traits = baseTraits[signName as keyof typeof baseTraits] || [];
    

    if (age < 25) {
      traits.push('Discovering personal identity', 'Learning life lessons');
    } else if (age < 40) {
      traits.push('Building foundations', 'Career-focused energy');
    } else if (age < 60) {
      traits.push('Wisdom from experience', 'Mentoring capabilities');
    } else {
      traits.push('Deep spiritual understanding', 'Life mastery');
    }

    return traits;
  }

  private generateStrengths(signName: string): string[] {
    const strengths = {
      'Aries': ['Leadership abilities', 'Courage in challenges', 'Quick decision making'],
      'Taurus': ['Reliability', 'Patience', 'Financial wisdom'],
      'Gemini': ['Communication skills', 'Adaptability', 'Learning agility'],
      'Cancer': ['Emotional support', 'Family devotion', 'Protective instincts'],
      'Leo': ['Creative talents', 'Confidence', 'Inspiring others'],
      'Virgo': ['Problem-solving', 'Organization', 'Attention to detail'],
      'Libra': ['Relationship building', 'Fair judgment', 'Artistic appreciation'],
      'Scorpio': ['Determination', 'Emotional depth', 'Transformation ability'],
      'Sagittarius': ['Optimism', 'Adventure seeking', 'Truth telling'],
      'Capricorn': ['Goal achievement', 'Responsibility', 'Long-term planning'],
      'Aquarius': ['Innovation', 'Humanitarian spirit', 'Independent thinking'],
      'Pisces': ['Empathy', 'Creativity', 'Spiritual connection']
    };

    return strengths[signName as keyof typeof strengths] || [];
  }

  private generateChallenges(signName: string): string[] {
    const challenges = {
      'Aries': ['Impatience', 'Impulsiveness', 'Need to consider others'],
      'Taurus': ['Stubbornness', 'Resistance to change', 'Materialism'],
      'Gemini': ['Inconsistency', 'Superficiality', 'Scattered focus'],
      'Cancer': ['Mood swings', 'Over-sensitivity', 'Living in the past'],
      'Leo': ['Pride', 'Need for attention', 'Dominating tendencies'],
      'Virgo': ['Perfectionism', 'Over-criticism', 'Worry'],
      'Libra': ['Indecisiveness', 'Avoiding confrontation', 'People-pleasing'],
      'Scorpio': ['Jealousy', 'Secretiveness', 'Holding grudges'],
      'Sagittarius': ['Overconfidence', 'Tactlessness', 'Restlessness'],
      'Capricorn': ['Pessimism', 'Rigidity', 'Workaholic tendencies'],
      'Aquarius': ['Emotional detachment', 'Stubbornness', 'Unpredictability'],
      'Pisces': ['Escapism', 'Over-emotionalism', 'Lack of boundaries']
    };

    return challenges[signName as keyof typeof challenges] || [];
  }

  private generateLifeAdvice(signName: string, age: number): string {
    const advice = {
      'Aries': `Focus your natural leadership energy on meaningful goals. Channel your pioneering spirit into projects that benefit others.`,
      'Taurus': `Trust your practical instincts while remaining open to new experiences. Your steady nature is a gift to those around you.`,
      'Gemini': `Use your communication gifts to bridge understanding between people. Deepen your knowledge in areas that truly interest you.`,
      'Cancer': `Honor your emotional intelligence as a superpower. Create nurturing environments that support growth and healing.`,
      'Leo': `Share your creative talents generously. Your natural warmth and confidence can inspire others to find their own light.`,
      'Virgo': `Your attention to detail creates excellence. Balance perfectionism with self-compassion and appreciate progress over perfection.`,
      'Libra': `Your gift for harmony brings peace to conflicts. Trust your judgment while maintaining your diplomatic nature.`,
      'Scorpio': `Embrace your transformative power. Use your emotional depth to help others navigate life's mysteries and challenges.`,
      'Sagittarius': `Your optimistic worldview is infectious. Share your wisdom through teaching, travel, or philosophical exploration.`,
      'Capricorn': `Your disciplined approach creates lasting achievements. Remember to celebrate milestones along your journey to success.`,
      'Aquarius': `Your innovative thinking can change the world. Channel your humanitarian ideals into practical solutions for society.`,
      'Pisces': `Your compassionate nature heals others. Trust your intuition and use your artistic gifts to express deep truths.`
    };

    let baseAdvice = advice[signName as keyof typeof advice] || 'Follow your inner wisdom and stay true to your authentic self.';
    
    if (age < 30) {
      baseAdvice += ' This is a time for exploration and discovering your true passions.';
    } else if (age < 50) {
      baseAdvice += ' Focus on building meaningful relationships and establishing your legacy.';
    } else {
      baseAdvice += ' Share your wisdom with younger generations and embrace spiritual growth.';
    }

    return baseAdvice;
  }

  private generateCareerGuidance(signName: string): string {
    const career = {
      'Aries': 'Leadership roles, entrepreneurship, sports, military, emergency services',
      'Taurus': 'Finance, real estate, agriculture, arts, luxury goods, banking',
      'Gemini': 'Communication, journalism, teaching, sales, technology, writing',
      'Cancer': 'Healthcare, education, social work, hospitality, real estate',
      'Leo': 'Entertainment, leadership, creative arts, public speaking, management',
      'Virgo': 'Healthcare, research, analysis, administration, quality control',
      'Libra': 'Law, diplomacy, arts, beauty industry, counseling, design',
      'Scorpio': 'Investigation, psychology, research, surgery, detective work',
      'Sagittarius': 'Education, travel, philosophy, publishing, international business',
      'Capricorn': 'Business, government, engineering, architecture, management',
      'Aquarius': 'Technology, innovation, humanitarian work, science, reform',
      'Pisces': 'Arts, healing, spirituality, psychology, charitable work'
    };

    return `Your natural talents align with careers in: ${career[signName as keyof typeof career]}. Consider roles that utilize your innate strengths while allowing for personal growth.`;
  }

  private generateRelationshipInsights(signName: string): string {
    const relationship = {
      'Aries': 'You bring passion and excitement to relationships. Seek partners who appreciate your direct nature and can match your energy.',
      'Taurus': 'You offer stability and loyalty in relationships. Look for partners who value commitment and share your appreciation for life\'s pleasures.',
      'Gemini': 'You thrive with intellectual connection and variety. Seek partners who enjoy deep conversations and can adapt to your changing interests.',
      'Cancer': 'You create emotional depth and nurturing in relationships. Find partners who appreciate your caring nature and offer emotional security.',
      'Leo': 'You bring warmth and generosity to relationships. Seek partners who admire your confidence and can share the spotlight occasionally.',
      'Virgo': 'You offer practical support and devotion in relationships. Look for partners who appreciate your caring attention to their well-being.',
      'Libra': 'You create harmony and balance in relationships. Seek partners who value fairness and can help you make decisions when needed.',
      'Scorpio': 'You bring intensity and loyalty to relationships. Find partners who can handle emotional depth and value authentic connection.',
      'Sagittarius': 'You offer adventure and growth in relationships. Seek partners who share your love of exploration and philosophical discussions.',
      'Capricorn': 'You provide stability and long-term commitment in relationships. Look for partners who share your goals and appreciate your reliability.',
      'Aquarius': 'You bring friendship and innovation to relationships. Seek partners who respect your independence and share your humanitarian values.',
      'Pisces': 'You offer compassion and understanding in relationships. Find partners who appreciate your emotional sensitivity and creative spirit.'
    };

    return relationship[signName as keyof typeof relationship] || 'Focus on building authentic connections based on mutual respect and understanding.';
  }

  public generateReading(birthDetails: BirthDetails): AstrologyReading {
    const sunSign = getZodiacSign(birthDetails.dateOfBirth);
    const age = calculateAge(birthDetails.dateOfBirth);

    return {
      sunSign,
      personalityTraits: this.generatePersonalityTraits(sunSign.name, age),
      strengths: this.generateStrengths(sunSign.name),
      challenges: this.generateChallenges(sunSign.name),
      lifeAdvice: this.generateLifeAdvice(sunSign.name, age),
      careerGuidance: this.generateCareerGuidance(sunSign.name),
      relationshipInsights: this.generateRelationshipInsights(sunSign.name)
    };
  }

  public answerQuestion(question: string, birthDetails: BirthDetails): QuestionResponse {
    const sunSign = getZodiacSign(birthDetails.dateOfBirth);
    const age = calculateAge(birthDetails.dateOfBirth);
    
    let answer = '';
    const questionLower = question.toLowerCase();

    if (questionLower.includes('career') || questionLower.includes('job') || questionLower.includes('work')) {
      answer = this.generateCareerGuidance(sunSign.name) + ` Given your ${sunSign.name} nature, focus on roles that allow you to utilize your natural strengths.`;
    } else if (questionLower.includes('love') || questionLower.includes('relationship') || questionLower.includes('partner')) {
      answer = this.generateRelationshipInsights(sunSign.name) + ` Your ${sunSign.element} element suggests you value ${sunSign.element === 'Fire' ? 'passion and independence' : sunSign.element === 'Earth' ? 'stability and loyalty' : sunSign.element === 'Air' ? 'intellectual connection and communication' : 'emotional depth and intuition'} in relationships.`;
    } else if (questionLower.includes('future') || questionLower.includes('what will happen') || questionLower.includes('prediction')) {
      answer = `Based on your ${sunSign.name} energy, the future holds opportunities for ${sunSign.element === 'Fire' ? 'leadership and creative expression' : sunSign.element === 'Earth' ? 'building lasting foundations' : sunSign.element === 'Air' ? 'communication and learning' : 'emotional growth and healing'}. Focus on developing your natural talents while addressing your challenges with patience and self-awareness.`;
    } else if (questionLower.includes('money') || questionLower.includes('finance') || questionLower.includes('wealth')) {
      answer = `As a ${sunSign.name}, your approach to finances reflects your ${sunSign.element} nature. ${sunSign.element === 'Earth' ? 'You have natural financial wisdom and should trust your practical instincts.' : sunSign.element === 'Fire' ? 'You may be impulsive with money - create structured savings plans.' : sunSign.element === 'Air' ? 'You might benefit from diversified investments and financial education.' : 'Trust your intuition about investments, but seek practical advice.'} Your ruling planet ${sunSign.rulingPlanet} suggests ${sunSign.rulingPlanet === 'Venus' ? 'prosperity through beauty and relationships' : sunSign.rulingPlanet === 'Mars' ? 'wealth through bold actions and leadership' : sunSign.rulingPlanet === 'Jupiter' ? 'abundance through expansion and education' : 'steady growth through discipline and patience'}.`;
    } else if (questionLower.includes('health') || questionLower.includes('wellness') || questionLower.includes('body')) {
      answer = `Your ${sunSign.name} constitution suggests focusing on ${sunSign.element === 'Fire' ? 'physical activity and stress management' : sunSign.element === 'Earth' ? 'digestive health and regular exercise' : sunSign.element === 'Air' ? 'respiratory health and mental stimulation' : 'emotional balance and restorative practices'}. Pay attention to areas ruled by your sign and maintain a balanced lifestyle that honors both your body and spirit.`;
    } else if (questionLower.includes('family') || questionLower.includes('home') || questionLower.includes('parents')) {
      answer = `Family relationships are influenced by your ${sunSign.name} nature. You likely ${sunSign.element === 'Water' ? 'feel deeply connected to family and may be the emotional caretaker' : sunSign.element === 'Fire' ? 'bring energy and leadership to family situations' : sunSign.element === 'Earth' ? 'provide stability and practical support to your family' : 'help family members communicate and see different perspectives'}. Understanding your family members' signs can improve harmony and reduce conflicts.`;
    } else {

      answer = `As a ${sunSign.name} born on ${birthDetails.dateOfBirth}, your ${sunSign.element} energy guides you toward ${this.generateLifeAdvice(sunSign.name, age)}. The stars suggest that embracing your natural ${sunSign.traits.slice(0, 3).join(', ').toLowerCase()} traits while working on ${this.generateChallenges(sunSign.name)[0].toLowerCase()} will lead to personal growth and fulfillment.`;
    }

    return {
      question,
      answer,
      timestamp: new Date()
    };
  }
}
