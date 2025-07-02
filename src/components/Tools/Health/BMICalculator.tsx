// src/components/Tools/Health/BMICalculator.tsx
import React, { useState } from 'react';
import { Calculator } from 'lucide-react';

const BMICalculator: React.FC = () => {
  const [weight, setWeight] = useState<number | ''>(''); // in kg
  const [height, setHeight] = useState<number | ''>(''); // in cm
  const [bmi, setBmi] = useState<number | null>(null);
  const [bmiCategory, setBmiCategory] = useState<string>('');

  const calculateBMI = () => {
    if (typeof weight !== 'number' || weight <= 0 || typeof height !== 'number' || height <= 0) {
      setBmi(null);
      setBmiCategory('');
      return;
    }

    const heightInMeters = height / 100; // Convert cm to meters
    const calculatedBmi = weight / (heightInMeters * heightInMeters);
    setBmi(parseFloat(calculatedBmi.toFixed(2))); // Round to 2 decimal places

    // Determine BMI category
    if (calculatedBmi < 18.5) {
      setBmiCategory('Underweight');
    } else if (calculatedBmi >= 18.5 && calculatedBmi < 24.9) {
      setBmiCategory('Normal weight');
    } else if (calculatedBmi >= 25 && calculatedBmi < 29.9) {
      setBmiCategory('Overweight');
    } else {
      setBmiCategory('Obesity');
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Underweight': return 'text-yellow-600';
      case 'Normal weight': return 'text-green-600';
      case 'Overweight': return 'text-orange-600';
      case 'Obesity': return 'text-red-600';
      default: return 'text-gray-800';
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      <h2 className="text-2xl font-semibold text-textDark mb-4">BMI Calculator</h2>
      <p className="text-textLight mb-4">
        Calculate your Body Mass Index (BMI) to assess if your weight is healthy in proportion to your height.
      </p>

      <div>
        <label htmlFor="weight" className="block text-textDark text-sm font-medium mb-2">
          Weight (in kg)
        </label>
        <input
          type="number"
          id="weight"
          value={weight}
          onChange={(e) => setWeight(parseFloat(e.target.value) || '')}
          placeholder="e.g., 70"
          className="w-full p-3 border border-borderLight rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      <div>
        <label htmlFor="height" className="block text-textDark text-sm font-medium mb-2">
          Height (in cm)
        </label>
        <input
          type="number"
          id="height"
          value={height}
          onChange={(e) => setHeight(parseFloat(e.target.value) || '')}
          placeholder="e.g., 175"
          className="w-full p-3 border border-borderLight rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      <button
        onClick={calculateBMI}
        className="bg-primary text-white py-3 px-6 rounded-lg hover:bg-secondary transition-colors font-semibold flex items-center justify-center"
      >
        <Calculator size={20} className="mr-2" /> Calculate BMI
      </button>

      {bmi !== null && (
        <div className="bg-blue-50 p-4 rounded-md text-primary-dark">
          <p className="text-lg font-medium">Your BMI: <span className="font-bold">{bmi}</span></p>
          <p className={`text-lg font-medium ${getCategoryColor(bmiCategory)}`}>Category: <span className="font-bold">{bmiCategory}</span></p>
        </div>
      )}
    </div>
  );
};

export default BMICalculator;
