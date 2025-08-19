export interface BirthDetails {
  name: string;
  dateOfBirth: string;
  timeOfBirth: string;
  placeOfBirth: string;
  latitude?: number;
  longitude?: number;
}

export interface ZodiacSign {
  name: string;
  element: string;
  quality: string;
  rulingPlanet: string;
  dateRange: string;
  traits: string[];
  compatibility: string[];
  symbol: string;
}

export interface AstrologyReading {
  sunSign: ZodiacSign;
  moonSign?: ZodiacSign;
  risingSign?: ZodiacSign;
  personalityTraits: string[];
  strengths: string[];
  challenges: string[];
  lifeAdvice: string;
  careerGuidance: string;
  relationshipInsights: string;
}

export interface QuestionResponse {
  question: string;
  answer: string;
  timestamp: Date;
}
