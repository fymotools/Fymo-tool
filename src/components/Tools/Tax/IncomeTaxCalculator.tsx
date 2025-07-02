// src/components/Tools/Tax/IncomeTaxCalculator.tsx
import React, { useState } from 'react';

const IncomeTaxCalculator: React.FC = () => {
  const [income, setIncome] = useState<number | ''>('');
  const [tax, setTax] = useState<number | null>(null);

  const calculateTax = () => {
    if (typeof income !== 'number' || income < 0) {
      setTax(null);
      return;
    }

    let calculatedTax = 0;
    // This is a simplified example. Real tax laws are complex!
    if (income <= 600000) {
      calculatedTax = 0;
    } else if (income <= 1200000) {
      calculatedTax = (income - 600000) * 0.025; // 2.5% of amount exceeding 600,000
    } else if (income <= 1800000) {
      calculatedTax = 15000 + (income - 1200000) * 0.125;
    } else if (income <= 2500000) {
      calculatedTax = 90000 + (income - 1800000) * 0.225;
    } else if (income <= 3500000) {
      calculatedTax = 247500 + (income - 2500000) * 0.275;
    } else {
      calculatedTax = 522500 + (income - 3500000) * 0.35;
    }
    setTax(calculatedTax);
  };

  return (
    <div className="flex flex-col space-y-4">
      <h2 className="text-2xl font-semibold text-textDark mb-4">Income Tax Calculator</h2>
      <p className="text-textLight mb-4">
        Calculate your approximate annual income tax based on a simplified tax slab system. (Note: This is a simplified calculator and should not be used for actual tax filing.)
      </p>

      <div>
        <label htmlFor="income" className="block text-textDark text-sm font-medium mb-2">
          Annual Income (PKR)
        </label>
        <input
          type="number"
          id="income"
          value={income}
          onChange={(e) => setIncome(parseFloat(e.target.value) || '')}
          placeholder="e.g., 800000"
          className="w-full p-3 border border-borderLight rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      <button
        onClick={calculateTax}
        className="bg-primary text-white py-3 px-6 rounded-lg hover:bg-secondary transition-colors font-semibold"
      >
        Calculate Tax
      </button>

      {tax !== null && (
        <div className="bg-blue-50 p-4 rounded-md text-primary-dark">
          <p className="text-lg font-medium">Estimated Annual Tax: <span className="font-bold">{tax.toLocaleString('en-PK', { style: 'currency', currency: 'PKR' })}</span></p>
        </div>
      )}
    </div>
  );
};

export default IncomeTaxCalculator;
