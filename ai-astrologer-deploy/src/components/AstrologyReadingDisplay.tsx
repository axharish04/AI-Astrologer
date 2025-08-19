import React from 'react';
import { Star, Heart, Briefcase, Lightbulb, Target, TrendingUp } from 'lucide-react';
import type { AstrologyReading } from '../types/astrology';

interface AstrologyReadingDisplayProps {
  reading: AstrologyReading;
  userName: string;
}

export const AstrologyReadingDisplay: React.FC<AstrologyReadingDisplayProps> = ({ reading, userName }) => {
  return (
    <div className="max-w-4xl mx-auto card space-y-6">

      <div className="card-header">
        <h1 className="card-title text-center">
          {userName}'s Astrology Reading
        </h1>
        <div className="flex items-center justify-center space-x-6 mt-4">
          <div className="text-6xl">{reading.sunSign.symbol}</div>
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-purple-600">{reading.sunSign.name}</h2>
            <p className="text-gray-600">{reading.sunSign.dateRange}</p>
            <p className="text-sm text-gray-500">
              {reading.sunSign.element} • {reading.sunSign.quality} • Ruled by {reading.sunSign.rulingPlanet}
            </p>
          </div>
        </div>
      </div>


      <div className="bg-gradient-from-purple-50 rounded-lg p-6">
        <div className="section-header">
          <div className="section-icon">
            <Star className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="section-title">Personality Traits</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {reading.personalityTraits.map((trait, index) => (
            <div key={index} className="flex items-center">
              <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
              <span className="text-gray-700">{trait}</span>
            </div>
          ))}
        </div>
      </div>


      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <div className="bg-gradient-from-green-50 rounded-lg p-6">
          <div className="section-header">
            <div className="section-icon">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="section-title">Strengths</h3>
          </div>
          <ul className="space-y-2">
            {reading.strengths.map((strength, index) => (
              <li key={index} className="flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                <span className="text-gray-700">{strength}</span>
              </li>
            ))}
          </ul>
        </div>


        <div className="bg-gradient-from-orange-50 rounded-lg p-6">
          <div className="section-header">
            <div className="section-icon">
              <Target className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="section-title">Areas for Growth</h3>
          </div>
          <ul className="space-y-2">
            {reading.challenges.map((challenge, index) => (
              <li key={index} className="flex items-center">
                <div className="w-2 h-2 bg-orange-400 rounded-full mr-3"></div>
                <span className="text-gray-700">{challenge}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>


      <div className="bg-gradient-from-blue-50 rounded-lg p-6">
        <div className="section-header">
          <div className="section-icon">
            <Lightbulb className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="section-title">Life Guidance</h3>
        </div>
        <p className="text-gray-700 leading-relaxed">{reading.lifeAdvice}</p>
      </div>


      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <div className="bg-gradient-from-yellow-50 rounded-lg p-6">
          <div className="section-header">
            <div className="section-icon">
              <Briefcase className="w-6 h-6 text-yellow-600" />
            </div>
            <h3 className="section-title">Career Insights</h3>
          </div>
          <p className="text-gray-700 leading-relaxed">{reading.careerGuidance}</p>
        </div>


        <div className="bg-gradient-from-pink-50 rounded-lg p-6">
          <div className="section-header">
            <div className="section-icon">
              <Heart className="w-6 h-6 text-pink-600" />
            </div>
            <h3 className="section-title">Relationship Insights</h3>
          </div>
          <p className="text-gray-700 leading-relaxed">{reading.relationshipInsights}</p>
        </div>
      </div>


      <div className="bg-gradient-from-gray-50 rounded-lg p-6">
        <h3 className="section-title mb-6">About {reading.sunSign.name}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="traits-container">
            <h4 className="font-medium text-gray-700 mb-4">Core Traits</h4>
            <div className="flex flex-wrap gap-3 items-start">
              {reading.sunSign.traits.map((trait, index) => (
                <span key={`trait-${index}`} className="tag">
                  {trait}
                </span>
              ))}
            </div>
          </div>
          <div className="compatibility-container">
            <h4 className="font-medium text-gray-700 mb-4">Compatible Signs</h4>
            <div className="flex flex-wrap gap-3 items-start">
              {reading.sunSign.compatibility.map((sign, index) => (
                <span key={`compat-${index}`} className="tag tag-success">
                  {sign}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
