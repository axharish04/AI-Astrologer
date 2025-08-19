import React, { useState } from 'react';
import { User, Calendar, Clock, MapPin } from 'lucide-react';
import type { BirthDetails } from '../types/astrology';

interface BirthDetailsFormProps {
  onSubmit: (details: BirthDetails) => void;
  loading?: boolean;
}

export const BirthDetailsForm: React.FC<BirthDetailsFormProps> = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState<BirthDetails>({
    name: '',
    dateOfBirth: '',
    timeOfBirth: '',
    placeOfBirth: ''
  });

  const [errors, setErrors] = useState<Partial<BirthDetails>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<BirthDetails> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    } else {
      const birthDate = new Date(formData.dateOfBirth);
      const today = new Date();
      if (birthDate > today) {
        newErrors.dateOfBirth = 'Date of birth cannot be in the future';
      }
    }

    if (!formData.timeOfBirth) {
      newErrors.timeOfBirth = 'Time of birth is required';
    }

    if (!formData.placeOfBirth.trim()) {
      newErrors.placeOfBirth = 'Place of birth is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleInputChange = (field: keyof BirthDetails, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    

    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  return (
    <div className="max-w-md mx-auto card">
      <div className="card-header">
        <h2 className="card-title text-center">Birth Details</h2>
        <p className="card-subtitle text-center">Enter your information for a personalized reading</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">

        <div className="form-group">
          <label className="form-label">
            Full Name
          </label>
          <div className="relative">
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className={`form-input ${errors.name ? 'error' : ''}`}
              placeholder="Enter your full name"
            />
            <User className="form-icon w-4 h-4" />
          </div>
          {errors.name && <p className="error-message">{errors.name}</p>}
        </div>


        <div className="form-group">
          <label className="form-label">
            Date of Birth
          </label>
          <div className="relative">
            <input
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
              className={`form-input ${errors.dateOfBirth ? 'error' : ''}`}
              max={new Date().toISOString().split('T')[0]}
            />
            <Calendar className="form-icon w-4 h-4" />
          </div>
          {errors.dateOfBirth && <p className="error-message">{errors.dateOfBirth}</p>}
        </div>


        <div className="form-group">
          <label className="form-label">
            Time of Birth
          </label>
          <div className="relative">
            <input
              type="time"
              value={formData.timeOfBirth}
              onChange={(e) => handleInputChange('timeOfBirth', e.target.value)}
              className={`form-input ${errors.timeOfBirth ? 'error' : ''}`}
            />
            <Clock className="form-icon w-4 h-4" />
          </div>
          {errors.timeOfBirth && <p className="error-message">{errors.timeOfBirth}</p>}
        </div>


        <div className="form-group">
          <label className="form-label">
            Place of Birth
          </label>
          <div className="relative">
            <input
              type="text"
              value={formData.placeOfBirth}
              onChange={(e) => handleInputChange('placeOfBirth', e.target.value)}
              className={`form-input ${errors.placeOfBirth ? 'error' : ''}`}
              placeholder="City, Country"
            />
            <MapPin className="form-icon w-4 h-4" />
          </div>
          {errors.placeOfBirth && <p className="error-message">{errors.placeOfBirth}</p>}
        </div>


        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full"
        >
          {loading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="spinner w-5 h-5"></div>
              <span>Generating Reading...</span>
            </div>
          ) : (
            'Get My Astrology Reading'
          )}
        </button>
      </form>
    </div>
  );
};
