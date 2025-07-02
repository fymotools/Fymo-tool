// src/components/Tools/Tax/GSTCalculator.tsx
import React, { useState } from 'react';
import { Percent } from 'lucide-react';

const GSTCalculator: React.FC = () => {
  const [amount, setAmount] = useState<number | ''>('');
  const [gstRate, setGstRate] = useState<number>(18); // Default GST rate for Pakistan
  const [gstAmount, setGstAmount] = useState<number | null>(null);
  const [totalWithGST, setTotalWithGST] = useState<number | null>(null);
  const [totalWithoutGST, setTotalWithoutGST] = useState<number | null>(null);

  const calculateGST = (type: 'add' | 'remove') => {
    if (typeof amount !== 'number' || amount <= 0 || typeof gstRate !== 'number' || gstRate <= 0) {
      setGstAmount(null);
      setTotalWithGST(null);
      setTotalWithoutGST(null);
      return;
    }

    const rateDecimal = gstRate / 100;

    if (type === 'add') {
      const calculatedGst = amount * rateDecimal;
      setGstAmount(parseFloat(calculatedGst.toFixed(2)));
      setTotalWithGST(parseFloat((amount + calculatedGst).toFixed(2)));
      setTotalWithoutGST(null); // Clear this as it's not relevant for 'add'
    } else { // type === 'remove'
      const originalAmount = amount / (1 + rateDecimal);
      const calculatedGst = amount - originalAmount;
      setGstAmount(parseFloat(calculatedGst.toFixed(2)));
      setTotalWithoutGST(parseFloat(originalAmount.toFixed(2)));
      setTotalWithGST(null); // Clear this as it's not relevant for 'remove'
    }
  };

  const handleReset = () => {
    setAmount('');
    setGstRate(18);
    setGstAmount(null);
    setTotalWithGST(null);
    setTotalWithoutGST(null);
  };

  return (
    <div className="flex flex-col space-y-4">
      <h2 className="text-2xl font-semibold text-textDark mb-4">GST Calculator (Pakistan)</h2>
      <p className="text-textLight mb-4">
        Calculate General Sales Tax (GST) for your amounts, either to add GST to a base value or to extract GST from a total.
      </p>

      <div>
        <label htmlFor="amount" className="block text-textDark text-sm font-medium mb-2">
          Amount (PKR)
        </label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value) || '')}
          placeholder="e.g., 1000"
          className="w-full p-3 border border-borderLight rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      <div>
        <label htmlFor="gstRate" className="block text-textDark text-sm font-medium mb-2">
          GST Rate (%)
        </label>
        <input
          type="number"
          id="gstRate"
          value={gstRate}
          onChange={(e) => setGstRate(parseFloat(e.target.value) || 0)}
          placeholder="e.g., 18"
          min="0"
          max="100"
          className="w-full p-3 border border-borderLight rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4">
        <button
          onClick={() => calculateGST('add')}
          className="flex-1 bg-primary text-white py-3 px-6 rounded-lg hover:bg-secondary transition-colors font-semibold flex items-center justify-center"
        >
          <Percent size={20} className="mr-2" /> Add GST
        </button>
        <button
          onClick={() => calculateGST('remove')}
          className="flex-1 bg-accent text-white py-3 px-6 rounded-lg hover:bg-green-600 transition-colors font-semibold flex items-center justify-center"
        >
          <Percent size={20} className="mr-2" /> Remove GST
        </button>
      </div>
      <button
          onClick={handleReset}
          className="w-full md:w-auto px-4 py-2 border border-red-300 rounded-lg text-red-600 hover:bg-red-50 transition-colors font-medium flex items-center justify-center mx-auto"
        >
          Reset
        </button>

      {(gstAmount !== null || totalWithGST !== null || totalWithoutGST !== null) && (
        <div className="bg-blue-50 p-4 rounded-md text-primary-dark">
          {gstAmount !== null && <p className="text-lg font-medium">GST Amount: <span className="font-bold">{gstAmount.toLocaleString('en-PK', { style: 'currency', currency: 'PKR' })}</span></p>}
          {totalWithGST !== null && <p className="text-lg font-medium">Total (with GST): <span className="font-bold">{totalWithGST.toLocaleString('en-PK', { style: 'currency', currency: 'PKR' })}</span></p>}
          {totalWithoutGST !== null && <p className="text-lg font-medium">Amount (without GST): <span className="font-bold">{totalWithoutGST.toLocaleString('en-PK', { style: 'currency', currency: 'PKR' })}</span></p>}
        </div>
      )}
    </div>
  );
};

export default GSTCalculator;
