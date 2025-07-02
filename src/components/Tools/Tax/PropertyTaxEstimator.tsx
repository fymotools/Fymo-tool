// src/components/Tools/Tax/PropertyTaxEstimator.tsx
import React, { useState } from 'react';
import { Home } from 'lucide-react';

const PropertyTaxEstimator: React.FC = () => {
  const [propertyValue, setPropertyValue] = useState<number | ''>('');
  const [taxRate, setTaxRate] = useState<number>(0.5); // Default 0.5% (example)
  const [estimatedTax, setEstimatedTax] = useState<number | null>(null);

  const calculatePropertyTax = () => {
    if (typeof propertyValue !== 'number' || propertyValue <= 0 || typeof taxRate !== 'number' || taxRate < 0) {
      setEstimatedTax(null);
      return;
    }
    const calculatedTax = propertyValue * (taxRate / 100);
    setEstimatedTax(parseFloat(calculatedTax.toFixed(2)));
  };

  const handleReset = () => {
    setPropertyValue('');
    setTaxRate(0.5);
    setEstimatedTax(null);
  };

  return (
    <div className="flex flex-col space-y-4">
      <h2 className="text-2xl font-semibold text-textDark mb-4">Property Tax Estimator</h2>
      <p className="text-textLight mb-4">
        Estimate your annual property tax based on the property value and local tax rate. (Note: This is an estimation and actual tax may vary.)
      </p>

      <div>
        <label htmlFor="propertyValue" className="block text-textDark text-sm font-medium mb-2">
          Property Value (PKR)
        </label>
        <input
          type="number"
          id="propertyValue"
          value={propertyValue}
          onChange={(e) => setPropertyValue(parseFloat(e.target.value) || '')}
          placeholder="e.g., 5000000"
          className="w-full p-3 border border-borderLight rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      <div>
        <label htmlFor="taxRate" className="block text-textDark text-sm font-medium mb-2">
          Annual Tax Rate (%)
        </label>
        <input
          type="number"
          id="taxRate"
          value={taxRate}
          onChange={(e) => setTaxRate(parseFloat(e.target.value) || 0)}
          placeholder="e.g., 0.5"
          min="0"
          step="0.01"
          className="w-full p-3 border border-borderLight rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      <div className="flex space-x-4">
        <button
          onClick={calculatePropertyTax}
          className="flex-1 bg-primary text-white py-3 px-6 rounded-lg hover:bg-secondary transition-colors font-semibold flex items-center justify-center"
        >
          <Home size={20} className="mr-2" /> Estimate Tax
        </button>
        <button
          onClick={handleReset}
          className="px-4 py-2 border border-red-300 rounded-lg text-red-600 hover:bg-red-50 transition-colors font-medium flex items-center"
        >
          <RefreshCcw size={18} className="mr-2" /> Reset
        </button>
      </div>

      {estimatedTax !== null && (
        <div className="bg-blue-50 p-4 rounded-md text-primary-dark">
          <p className="text-lg font-medium">Estimated Annual Property Tax: <span className="font-bold">{estimatedTax.toLocaleString('en-PK', { style: 'currency', currency: 'PKR' })}</span></p>
        </div>
      )}
    </div>
  );
};

export default PropertyTaxEstimator;
