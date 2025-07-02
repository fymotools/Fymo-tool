// src/components/Tools/Health/WaterIntakeCalculator.tsx
import React, { useState } from 'react';
import { Droplet, RefreshCcw } from 'lucide-react';

const WaterIntakeCalculator: React.FC = () => {
  const [weight, setWeight] = useState<number | ''>(''); // in kg
  const [waterIntakeMl, setWaterIntakeMl] = useState<number | null>(null);
  const [waterIntakeLitres, setWaterIntakeLitres] = useState<number | null>(null);

  const calculateWaterIntake = () => {
    if (typeof weight !== 'number' || weight <= 0) {
      setWaterIntakeMl(null);
      setWaterIntakeLitres(null);
      return;
    }

    // General guideline: 30-35ml per kg of body weight
    // Let's use 33ml per kg as a simple average
    const calculatedMl = weight * 33;
    setWaterIntakeMl(parseFloat(calculatedMl.toFixed(0)));
    setWaterIntakeLitres(parseFloat((calculatedMl / 1000).toFixed(2)));
  };

  const handleReset = () => {
    setWeight('');
    setWaterIntakeMl(null);
    setWaterIntakeLitres(null);
  };

  return (
    <div className="flex flex-col space-y-4">
      <h2 className="text-2xl font-semibold text-textDark mb-4">Daily Water Intake Calculator</h2>
      <p className="text-textLight mb-4">
        Determine your recommended daily water intake based on your body weight to stay hydrated and healthy.
      </p>

      <div>
        <label htmlFor="weight" className="block text-textDark text-sm font-medium mb-2">
          Your Weight (in kg)
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

      <div className="flex space-x-4">
        <button
          onClick={calculateWaterIntake}
          className="flex-1 bg-primary text-white py-3 px-6 rounded-lg hover:bg-secondary transition-colors font-semibold flex items-center justify-center"
        >
          <Droplet size={20} className="mr-2" /> Calculate Intake
        </button>
        <button
          onClick={handleReset}
          className="px-4 py-2 border border-red-300 rounded-lg text-red-600 hover:bg-red-50 transition-colors font-medium flex items-center"
        >
          <RefreshCcw size={18} className="mr-2" /> Reset
        </button>
      </div>

      {(waterIntakeMl !== null || waterIntakeLitres !== null) && (
        <div className="bg-blue-50 p-4 rounded-md text-primary-dark">
          <p className="text-lg font-medium">Recommended Daily Water Intake:</p>
          {waterIntakeLitres !== null && <p className="text-xl font-bold">{waterIntakeLitres} Litres</p>}
          {waterIntakeMl !== null && <p className="text-md text-textLight">({waterIntakeMl} ml)</p>}
          <p className="text-sm text-gray-600 mt-2">
            (This is a general guideline. Consult a doctor or nutritionist for personalized advice.)
          </p>
        </div>
      )}
    </div>
  );
};

export default WaterIntakeCalculator;
