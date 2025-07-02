// src/components/Tools/Health/IdealWeightCalculator.tsx
import React, { useState } from 'react';
import { Scale } from 'lucide-react';

const IdealWeightCalculator: React.FC = () => {
  const [height, setHeight] = useState<number | ''>(''); // in cm
  const [gender, setGender] = useState<string>('male');
  const [idealWeight, setIdealWeight] = useState<number | null>(null);
  const [method, setMethod] = useState<string>('hamwi'); // hamwi, broca, devine

  const calculateIdealWeight = () => {
    if (typeof height !== 'number' || height <= 0) {
      setIdealWeight(null);
      return;
    }

    let calculatedWeight = 0;
    const heightInInches = height / 2.54; // Convert cm to inches

    if (method === 'hamwi') {
      // Hamwi Method
      if (gender === 'male') {
        calculatedWeight = 48 + 2.7 * (heightInInches - 60);
      } else { // female
        calculatedWeight = 45.5 + 2.2 * (heightInInches - 60);
      }
    } else if (method === 'broca') {
      // Broca Index (simplified)
      const heightInCmAbove100 = height - 100;
      if (gender === 'male') {
        calculatedWeight = heightInCmAbove100 - (heightInCmAbove100 * 0.10);
      } else { // female
        calculatedWeight = heightInCmAbove100 - (heightInCmAbove100 * 0.15);
      }
    } else { // devine
      // Devine Formula
      if (gender === 'male') {
        calculatedWeight = 50 + 2.3 * Math.max(0, heightInInches - 60);
      } else { // female
        calculatedWeight = 45.5 + 2.3 * Math.max(0, heightInInches - 60);
      }
    }

    setIdealWeight(parseFloat(calculatedWeight.toFixed(2)));
  };

  const handleReset = () => {
    setHeight('');
    setGender('male');
    setIdealWeight(null);
    setMethod('hamwi');
  };

  return (
    <div className="flex flex-col space-y-4">
      <h2 className="text-2xl font-semibold text-textDark mb-4">Ideal Weight Calculator</h2>
      <p className="text-textLight mb-4">
        Find your ideal body weight range using different common formulas based on your height and gender.
      </p>

      <div>
        <label htmlFor="height-ideal" className="block text-textDark text-sm font-medium mb-2">
          Height (in cm)
        </label>
        <input
          type="number"
          id="height-ideal"
          value={height}
          onChange={(e) => setHeight(parseFloat(e.target.value) || '')}
          placeholder="e.g., 170"
          className="w-full p-3 border border-borderLight rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      <div>
        <label htmlFor="gender-ideal" className="block text-textDark text-sm font-medium mb-2">
          Gender
        </label>
        <select
          id="gender-ideal"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="w-full p-3 border border-borderLight rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      <div>
        <label htmlFor="method" className="block text-textDark text-sm font-medium mb-2">
          Calculation Method
        </label>
        <select
          id="method"
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          className="w-full p-3 border border-borderLight rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          <option value="hamwi">Hamwi Method</option>
          <option value="broca">Broca Index</option>
          <option value="devine">Devine Formula</option>
        </select>
      </div>

      <div className="flex space-x-4">
        <button
          onClick={calculateIdealWeight}
          className="flex-1 bg-primary text-white py-3 px-6 rounded-lg hover:bg-secondary transition-colors font-semibold flex items-center justify-center"
        >
          <Scale size={20} className="mr-2" /> Calculate Ideal Weight
        </button>
        <button
          onClick={handleReset}
          className="px-4 py-2 border border-red-300 rounded-lg text-red-600 hover:bg-red-50 transition-colors font-medium flex items-center"
        >
          <RefreshCcw size={18} className="mr-2" /> Reset
        </button>
      </div>

      {idealWeight !== null && (
        <div className="bg-blue-50 p-4 rounded-md text-primary-dark">
          <p className="text-lg font-medium">Your Estimated Ideal Weight: <span className="font-bold">{idealWeight} kg</span></p>
          <p className="text-sm text-gray-600 mt-2">
            (Calculated using the {method} method. These are guidelines; consult a healthcare professional for personalized advice.)
          </p>
        </div>
      )}
    </div>
  );
};

export default IdealWeightCalculator;
