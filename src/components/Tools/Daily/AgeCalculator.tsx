// src/components/Tools/Daily/AgeCalculator.tsx
import React, { useState } from 'react';
import { Calendar } from 'lucide-react';

const AgeCalculator: React.FC = () => {
  const [birthDate, setBirthDate] = useState<string>('');
  const [ageResult, setAgeResult] = useState<string | null>(null);

  const calculateAge = () => {
    if (!birthDate) {
      setAgeResult('Please enter your birth date.');
      return;
    }

    const birth = new Date(birthDate);
    const today = new Date();

    if (birth > today) {
      setAgeResult('Birth date cannot be in the future.');
      return;
    }

    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    // Adjust for negative days/months
    if (days < 0) {
      months--;
      days += new Date(today.getFullYear(), today.getMonth(), 0).getDate(); // Days in previous month
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    setAgeResult(`You are ${years} years, ${months} months, and ${days} days old.`);
  };

  return (
    <div className="flex flex-col space-y-4">
      <h2 className="text-2xl font-semibold text-textDark mb-4">Age Calculator</h2>
      <p className="text-textLight mb-4">
        Accurately calculate your age in years, months, and days based on your birth date.
      </p>

      <div>
        <label htmlFor="birthDate" className="block text-textDark text-sm font-medium mb-2">
          Your Birth Date
        </label>
        <input
          type="date"
          id="birthDate"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          className="w-full p-3 border border-borderLight rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      <button
        onClick={calculateAge}
        className="bg-primary text-white py-3 px-6 rounded-lg hover:bg-secondary transition-colors font-semibold flex items-center justify-center"
      >
        <Calendar size={20} className="mr-2" /> Calculate Age
      </button>

      {ageResult && (
        <div className="bg-blue-50 p-4 rounded-md text-primary-dark">
          <p className="text-lg font-medium">{ageResult}</p>
        </div>
      )}
    </div>
  );
};

export default AgeCalculator;
