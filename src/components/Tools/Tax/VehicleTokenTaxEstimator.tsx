// src/components/Tools/Tax/VehicleTokenTaxEstimator.tsx
import React, { useState } from 'react';
import { Car } from 'lucide-react';

const VehicleTokenTaxEstimator: React.FC = () => {
  const [engineCapacity, setEngineCapacity] = useState<number | ''>(''); // in CC
  const [taxResult, setTaxResult] = useState<number | null>(null);

  const calculateTax = () => {
    if (typeof engineCapacity !== 'number' || engineCapacity <= 0) {
      setTaxResult(null);
      return;
    }

    let calculatedTax = 0;
    // Simplified example tax slabs for demonstration
    if (engineCapacity <= 1000) {
      calculatedTax = 800;
    } else if (engineCapacity <= 1300) {
      calculatedTax = 1500;
    } else if (engineCapacity <= 1500) {
      calculatedTax = 2500;
    } else if (engineCapacity <= 1800) {
      calculatedTax = 4500;
    } else if (engineCapacity <= 2000) {
      calculatedTax = 8000;
    } else if (engineCapacity <= 2500) {
      calculatedTax = 15000;
    } else {
      calculatedTax = 25000; // For > 2500 CC
    }
    setTaxResult(calculatedTax);
  };

  const handleReset = () => {
    setEngineCapacity('');
    setTaxResult(null);
  };

  return (
    <div className="flex flex-col space-y-4">
      <h2 className="text-2xl font-semibold text-textDark mb-4">Vehicle Token Tax Estimator</h2>
      <p className="text-textLight mb-4">
        Estimate annual vehicle token tax based on engine capacity (CC). (Note: This is a simplified estimation. Actual taxes may vary by province and specific rules.)
      </p>

      <div>
        <label htmlFor="engineCapacity" className="block text-textDark text-sm font-medium mb-2">
          Engine Capacity (CC)
        </label>
        <input
          type="number"
          id="engineCapacity"
          value={engineCapacity}
          onChange={(e) => setEngineCapacity(parseFloat(e.target.value) || '')}
          placeholder="e.g., 1300"
          className="w-full p-3 border border-borderLight rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      <div className="flex space-x-4">
        <button
          onClick={calculateTax}
          className="flex-1 bg-primary text-white py-3 px-6 rounded-lg hover:bg-secondary transition-colors font-semibold flex items-center justify-center"
        >
          <Car size={20} className="mr-2" /> Calculate Tax
        </button>
        <button
          onClick={handleReset}
          className="px-4 py-2 border border-red-300 rounded-lg text-red-600 hover:bg-red-50 transition-colors font-medium flex items-center"
        >
          <RefreshCcw size={18} className="mr-2" /> Reset
        </button>
      </div>

      {taxResult !== null && (
        <div className="bg-blue-50 p-4 rounded-md text-primary-dark">
          <p className="text-lg font-medium">Estimated Annual Token Tax: <span className="font-bold">{taxResult.toLocaleString('en-PK', { style: 'currency', currency: 'PKR' })}</span></p>
        </div>
      )}
    </div>
  );
};

export default VehicleTokenTaxEstimator;
