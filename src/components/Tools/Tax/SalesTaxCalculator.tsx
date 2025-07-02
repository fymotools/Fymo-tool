// src/components/Tools/Tax/SalesTaxCalculator.tsx
import React, { useState } from 'react';
import { ShoppingBag } from 'lucide-react';

const SalesTaxCalculator: React.FC = () => {
  const [price, setPrice] = useState<number | ''>('');
  const [taxRate, setTaxRate] = useState<number>(10); // Default 10%
  const [taxAmount, setTaxAmount] = useState<number | null>(null);
  const [totalPrice, setTotalPrice] = useState<number | null>(null);

  const calculateSalesTax = () => {
    if (typeof price !== 'number' || price <= 0 || typeof taxRate !== 'number' || taxRate < 0) {
      setTaxAmount(null);
      setTotalPrice(null);
      return;
    }

    const calculatedTax = price * (taxRate / 100);
    setTaxAmount(parseFloat(calculatedTax.toFixed(2)));
    setTotalPrice(parseFloat((price + calculatedTax).toFixed(2)));
  };

  const handleReset = () => {
    setPrice('');
    setTaxRate(10);
    setTaxAmount(null);
    setTotalPrice(null);
  };

  return (
    <div className="flex flex-col space-y-4">
      <h2 className="text-2xl font-semibold text-textDark mb-4">Sales Tax Calculator</h2>
      <p className="text-textLight mb-4">
        Calculate the sales tax and total price based on a given price and tax rate.
      </p>

      <div>
        <label htmlFor="price" className="block text-textDark text-sm font-medium mb-2">
          Original Price (PKR)
        </label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(parseFloat(e.target.value) || '')}
          placeholder="e.g., 5000"
          className="w-full p-3 border border-borderLight rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      <div>
        <label htmlFor="taxRate" className="block text-textDark text-sm font-medium mb-2">
          Sales Tax Rate (%)
        </label>
        <input
          type="number"
          id="taxRate"
          value={taxRate}
          onChange={(e) => setTaxRate(parseFloat(e.target.value) || 0)}
          placeholder="e.g., 10"
          min="0"
          max="100"
          className="w-full p-3 border border-borderLight rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      <div className="flex space-x-4">
        <button
          onClick={calculateSalesTax}
          className="flex-1 bg-primary text-white py-3 px-6 rounded-lg hover:bg-secondary transition-colors font-semibold flex items-center justify-center"
        >
          <ShoppingBag size={20} className="mr-2" /> Calculate Tax
        </button>
        <button
          onClick={handleReset}
          className="px-4 py-2 border border-red-300 rounded-lg text-red-600 hover:bg-red-50 transition-colors font-medium flex items-center"
        >
          <RefreshCcw size={18} className="mr-2" /> Reset
        </button>
      </div>

      {(taxAmount !== null || totalPrice !== null) && (
        <div className="bg-blue-50 p-4 rounded-md text-primary-dark">
          {taxAmount !== null && <p className="text-lg font-medium">Sales Tax Amount: <span className="font-bold">{taxAmount.toLocaleString('en-PK', { style: 'currency', currency: 'PKR' })}</span></p>}
          {totalPrice !== null && <p className="text-lg font-medium">Total Price (with Tax): <span className="font-bold">{totalPrice.toLocaleString('en-PK', { style: 'currency', currency: 'PKR' })}</span></p>}
        </div>
      )}
    </div>
  );
};

export default SalesTaxCalculator;
