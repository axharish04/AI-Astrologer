import type { ZodiacSign } from '../types/astrology';

export const zodiacSigns: ZodiacSign[] = [
  {
    name: 'Aries',
    element: 'Fire',
    quality: 'Cardinal',
    rulingPlanet: 'Mars',
    dateRange: 'March 21 - April 19',
    symbol: '♈',
    traits: ['Courageous', 'Determined', 'Confident', 'Enthusiastic', 'Optimistic', 'Honest', 'Passionate'],
    compatibility: ['Leo', 'Sagittarius', 'Gemini', 'Aquarius']
  },
  {
    name: 'Taurus',
    element: 'Earth',
    quality: 'Fixed',
    rulingPlanet: 'Venus',
    dateRange: 'April 20 - May 20',
    symbol: '♉',
    traits: ['Reliable', 'Patient', 'Practical', 'Devoted', 'Responsible', 'Stable'],
    compatibility: ['Virgo', 'Capricorn', 'Cancer', 'Pisces']
  },
  {
    name: 'Gemini',
    element: 'Air',
    quality: 'Mutable',
    rulingPlanet: 'Mercury',
    dateRange: 'May 21 - June 20',
    symbol: '♊',
    traits: ['Gentle', 'Affectionate', 'Curious', 'Adaptable', 'Quick-witted', 'Sociable'],
    compatibility: ['Libra', 'Aquarius', 'Aries', 'Leo']
  },
  {
    name: 'Cancer',
    element: 'Water',
    quality: 'Cardinal',
    rulingPlanet: 'Moon',
    dateRange: 'June 21 - July 22',
    symbol: '♋',
    traits: ['Tenacious', 'Intuitive', 'Caring', 'Emotional', 'Protective', 'Sympathetic'],
    compatibility: ['Scorpio', 'Pisces', 'Taurus', 'Virgo']
  },
  {
    name: 'Leo',
    element: 'Fire',
    quality: 'Fixed',
    rulingPlanet: 'Sun',
    dateRange: 'July 23 - August 22',
    symbol: '♌',
    traits: ['Creative', 'Passionate', 'Generous', 'Warm-hearted', 'Cheerful', 'Humorous'],
    compatibility: ['Aries', 'Sagittarius', 'Gemini', 'Libra']
  },
  {
    name: 'Virgo',
    element: 'Earth',
    quality: 'Mutable',
    rulingPlanet: 'Mercury',
    dateRange: 'August 23 - September 22',
    symbol: '♍',
    traits: ['Loyal', 'Analytical', 'Kind', 'Hardworking', 'Practical', 'Modest'],
    compatibility: ['Taurus', 'Capricorn', 'Cancer', 'Scorpio']
  },
  {
    name: 'Libra',
    element: 'Air',
    quality: 'Cardinal',
    rulingPlanet: 'Venus',
    dateRange: 'September 23 - October 22',
    symbol: '♎',
    traits: ['Cooperative', 'Diplomatic', 'Gracious', 'Fair-minded', 'Social', 'Peaceful'],
    compatibility: ['Gemini', 'Aquarius', 'Leo', 'Sagittarius']
  },
  {
    name: 'Scorpio',
    element: 'Water',
    quality: 'Fixed',
    rulingPlanet: 'Pluto',
    dateRange: 'October 23 - November 21',
    symbol: '♏',
    traits: ['Resourceful', 'Brave', 'Passionate', 'Stubborn', 'Mysterious', 'Intense'],
    compatibility: ['Cancer', 'Pisces', 'Virgo', 'Capricorn']
  },
  {
    name: 'Sagittarius',
    element: 'Fire',
    quality: 'Mutable',
    rulingPlanet: 'Jupiter',
    dateRange: 'November 22 - December 21',
    symbol: '♐',
    traits: ['Generous', 'Idealistic', 'Great sense of humor', 'Adventurous', 'Philosophical'],
    compatibility: ['Aries', 'Leo', 'Libra', 'Aquarius']
  },
  {
    name: 'Capricorn',
    element: 'Earth',
    quality: 'Cardinal',
    rulingPlanet: 'Saturn',
    dateRange: 'December 22 - January 19',
    symbol: '♑',
    traits: ['Responsible', 'Disciplined', 'Self-control', 'Good managers', 'Traditional'],
    compatibility: ['Taurus', 'Virgo', 'Scorpio', 'Pisces']
  },
  {
    name: 'Aquarius',
    element: 'Air',
    quality: 'Fixed',
    rulingPlanet: 'Uranus',
    dateRange: 'January 20 - February 18',
    symbol: '♒',
    traits: ['Progressive', 'Original', 'Independent', 'Humanitarian', 'Innovative'],
    compatibility: ['Gemini', 'Libra', 'Aries', 'Sagittarius']
  },
  {
    name: 'Pisces',
    element: 'Water',
    quality: 'Mutable',
    rulingPlanet: 'Neptune',
    dateRange: 'February 19 - March 20',
    symbol: '♓',
    traits: ['Compassionate', 'Artistic', 'Intuitive', 'Gentle', 'Wise', 'Musical'],
    compatibility: ['Cancer', 'Scorpio', 'Taurus', 'Capricorn']
  }
];

export function getZodiacSign(dateOfBirth: string): ZodiacSign {
  const date = new Date(dateOfBirth);
  const month = date.getMonth() + 1;
  const day = date.getDate();

  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return zodiacSigns[0]; // Aries
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return zodiacSigns[1]; // Taurus
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return zodiacSigns[2]; // Gemini
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return zodiacSigns[3]; // Cancer
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return zodiacSigns[4]; // Leo
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return zodiacSigns[5]; // Virgo
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return zodiacSigns[6]; // Libra
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return zodiacSigns[7]; // Scorpio
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return zodiacSigns[8]; // Sagittarius
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return zodiacSigns[9]; // Capricorn
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return zodiacSigns[10]; // Aquarius
  return zodiacSigns[11]; // Pisces
}

export function calculateAge(dateOfBirth: string): number {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
}

export function getElementCompatibility(element1: string, element2: string): boolean {
  const fireCompatible = ['Fire', 'Air'];
  const earthCompatible = ['Earth', 'Water'];
  const airCompatible = ['Air', 'Fire'];
  const waterCompatible = ['Water', 'Earth'];
  
  switch (element1) {
    case 'Fire': return fireCompatible.includes(element2);
    case 'Earth': return earthCompatible.includes(element2);
    case 'Air': return airCompatible.includes(element2);
    case 'Water': return waterCompatible.includes(element2);
    default: return false;
  }
}
