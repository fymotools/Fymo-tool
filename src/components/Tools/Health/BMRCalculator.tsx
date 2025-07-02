// src/components/Tools/Health/BMRCalculator.tsx
import React, { useState } from 'react';
import { Heart, RefreshCcw } from 'lucide-react';

const BMRCalculator: React.FC = () => {
  const [weight, setWeight] = useState<number | ''>(''); // kg
  const [height, setHeight] = useState<number | ''>(''); // cm
  const [age, setAge] = useState<number | ''>(''); // years
  const [gender, setGender] = useState<string>('male');
  const [bmr, setBmr] = useState<number | null>(null);

  const calculateBMR = () => {
    if (typeof weight !== 'number' || weight <= 0 ||
        typeof height !== 'number' || height <= 0 ||
        typeof age !== 'number' || age <= 0) {
      setBmr(null);
      return;
    }

    let calculatedBMR = 0;
    // Mifflin-St Jeor Equation
    if (gender === 'male') {
      calculatedBMR = (10 * weight) + (6.25 * height) - (5 * age) + 5;
    } else { // female
      calculatedBMR = (10 * weight) + (6.25 * height) - (5 * age) - 161;
    }
    setBmr(parseFloat(calculatedBMR.toFixed(2)));
  };

  const handleReset = () => {
    setWeight('');
    setHeight('');
    setAge('');
    setGender('male');
    setBmr(null);
  };

  return (
    <div className="flex flex-col space-y-4">
      <h2 className="text-2xl font-semibold text-textDark mb-4">BMR Calculator</h2>
      <p className="text-textLight mb-4">
        Calculate your Basal Metabolic Rate (BMR), the number of calories your body burns at rest.
      </p>

      <div>
        <label htmlFor="weight-bmr" className="block text-textDark text-sm font-medium mb-2">
          Weight (kg)
        </label>
        <input
          type="number"
          id="weight-bmr"
          value={weight}
          onChange={(e) => setWeight(parseFloat(e.target.value) || '')}
          placeholder="e.g., 70"
          className="w-full p-3 border border-borderLight rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      <div>
        <label htmlFor="height-bmr" className="block text-textDark text-sm font-medium mb-2">
          Height (cm)
        </label>
        <input
          type="number"
          id="height-bmr"
          value={height}
          onChange={(e) => setHeight(parseFloat(e.target.value) || '')}
          placeholder="e.g., 175"
          className="w-full p-3 border border-borderLight rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      <div>
        <label htmlFor="age-bmr" className="block text-textDark text-sm font-medium mb-2">
          Age (years)
        </label>
        <input
          type="number"
          id="age-bmr"
          value={age}
          onChange={(e) => setAge(parseFloat(e.target.value) || '')}
          placeholder="e.g., 30"
          className="w-full p-3 border border-borderLight rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      <div>
        <label htmlFor="gender-bmr" className="block text-textDark text-sm font-medium mb-2">
          Gender
        </label>
        <select
          id="gender-bmr"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="w-full p-3 border border-borderLight rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      <div className="flex space-x-4">
        <button
          onClick={calculateBMR}
          className="flex-1 bg-primary text-white py-3 px-6 rounded-lg hover:bg-secondary transition-colors font-semibold flex items-center justify-center"
        >
          <Heart size={20} className="mr-2" /> Calculate BMR
        </button>
        <button
          onClick={handleReset}
          className="px-4 py-2 border border-red-300 rounded-lg text-red-600 hover:bg-red-50 transition-colors font-medium flex items-center"
        >
          <RefreshCcw size={18} className="mr-2" /> Reset
        </button>
      </div>

      {bmr !== null && (
        <div className="bg-blue-50 p-4 rounded-md text-primary-dark">
          <p className="text-lg font-medium">Your Basal Metabolic Rate (BMR): <span className="font-bold">{bmr} calories/day</span></p>
          <p className="text-sm text-gray-600 mt-2">
            This is the minimum number of calories your body needs to perform basic functions at rest.
            Your total daily energy expenditure will be higher based on your activity level.
          </p>
        </div>
      )}
    </div>
  );
};

export default BMRCalculator;
