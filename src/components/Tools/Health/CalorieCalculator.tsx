// src/components/Tools/Health/CalorieCalculator.tsx
import React, { useState } from 'react';
import { Utensils, RefreshCcw } from 'lucide-react';

const CalorieCalculator: React.FC = () => {
  const [weight, setWeight] = useState<number | ''>(''); // kg
  const [height, setHeight] = useState<number | ''>(''); // cm
  const [age, setAge] = useState<number | ''>(''); // years
  const [gender, setGender] = useState<string>('male');
  const [activityLevel, setActivityLevel] = useState<string>('sedentary');
  const [tdee, setTdee] = useState<number | null>(null);

  const activityFactors: { [key: string]: number } = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    veryActive: 1.9,
  };

  const calculateTDEE = () => {
    if (typeof weight !== 'number' || weight <= 0 ||
        typeof height !== 'number' || height <= 0 ||
        typeof age !== 'number' || age <= 0) {
      setTdee(null);
      return;
    }

    let bmr = 0;
    // Mifflin-St Jeor Equation for BMR
    if (gender === 'male') {
      bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
    } else { // female
      bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
    }

    const calculatedTdee = bmr * activityFactors[activityLevel];
    setTdee(parseFloat(calculatedTdee.toFixed(2)));
  };

  const handleReset = () => {
    setWeight('');
    setHeight('');
    setAge('');
    setGender('male');
    setActivityLevel('sedentary');
    setTdee(null);
  };

  return (
    <div className="flex flex-col space-y-4">
      <h2 className="text-2xl font-semibold text-textDark mb-4">Daily Calorie Needs Calculator</h2>
      <p className="text-textLight mb-4">
        Estimate your Total Daily Energy Expenditure (TDEE) – the number of calories you burn daily, including activity.
      </p>

      <div>
        <label htmlFor="weight-cal" className="block text-textDark text-sm font-medium mb-2">
          Weight (kg)
        </label>
        <input
          type="number"
          id="weight-cal"
          value={weight}
          onChange={(e) => setWeight(parseFloat(e.target.value) || '')}
          placeholder="e.g., 70"
          className="w-full p-3 border border-borderLight rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      <div>
        <label htmlFor="height-cal" className="block text-textDark text-sm font-medium mb-2">
          Height (cm)
        </label>
        <input
          type="number"
          id="height-cal"
          value={height}
          onChange={(e) => setHeight(parseFloat(e.target.value) || '')}
          placeholder="e.g., 175"
          className="w-full p-3 border border-borderLight rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      <div>
        <label htmlFor="age-cal" className="block text-textDark text-sm font-medium mb-2">
          Age (years)
        </label>
        <input
          type="number"
          id="age-cal"
          value={age}
          onChange={(e) => setAge(parseFloat(e.target.value) || '')}
          placeholder="e.g., 30"
          className="w-full p-3 border border-borderLight rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      <div>
        <label htmlFor="gender-cal" className="block text-textDark text-sm font-medium mb-2">
          Gender
        </label>
        <select
          id="gender-cal"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="w-full p-3 border border-borderLight rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      <div>
        <label htmlFor="activity-level" className="block text-textDark text-sm font-medium mb-2">
          Activity Level
        </label>
        <select
          id="activity-level"
          value={activityLevel}
          onChange={(e) => setActivityLevel(e.target.value)}
          className="w-full p-3 border border-borderLight rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          <option value="sedentary">Sedentary (little to no exercise)</option>
          <option value="light">Lightly Active (light exercise/sports 1-3 days/week)</option>
          <option value="moderate">Moderately Active (moderate exercise/sports 3-5 days/week)</option>
          <option value="active">Very Active (hard exercise/sports 6-7 days/week)</option>
          <option value="veryActive">Extremely Active (hard daily exercise/physical job)</option>
        </select>
      </div>

      <div className="flex space-x-4">
        <button
          onClick={calculateTDEE}
          className="flex-1 bg-primary text-white py-3 px-6 rounded-lg hover:bg-secondary transition-colors font-semibold flex items-center justify-center"
        >
          <Utensils size={20} className="mr-2" /> Calculate Calories
        </button>
        <button
          onClick={handleReset}
          className="px-4 py-2 border border-red-300 rounded-lg text-red-600 hover:bg-red-50 transition-colors font-medium flex items-center"
        >
          <RefreshCcw size={18} className="mr-2" /> Reset
        </button>
      </div>

      {tdee !== null && (
        <div className="bg-blue-50 p-4 rounded-md text-primary-dark">
          <p className="text-lg font-medium">Estimated Daily Calorie Needs (TDEE): <span className="font-bold">{tdee} calories/day</span></p>
          <p className="text-sm text-gray-600 mt-2">
            This is an estimate. Individual needs vary. Consult a healthcare professional or nutritionist for personalized advice.
          </p>
        </div>
      )}
    </div>
  );
};

export default CalorieCalculator;
