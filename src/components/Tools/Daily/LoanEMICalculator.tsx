// src/components/Tools/Daily/LoanEMICalculator.tsx
import React, { useState } from 'react';
import { DollarSign, RefreshCcw } from 'lucide-react';

const LoanEMICalculator: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState<number | ''>('');
  const [interestRate, setInterestRate] = useState<number | ''>(''); // Annual %
  const [loanTenure, setLoanTenure] = useState<number | ''>(''); // In months
  const [emi, setEmi] = useState<number | null>(null);
  const [totalInterest, setTotalInterest] = useState<number | null>(null);
  const [totalPayment, setTotalPayment] = useState<number | null>(null);

  const calculateEMI = () => {
    if (typeof loanAmount !== 'number' || loanAmount <= 0 ||
        typeof interestRate !== 'number' || interestRate < 0 ||
        typeof loanTenure !== 'number' || loanTenure <= 0) {
      setEmi(null);
      setTotalInterest(null);
      setTotalPayment(null);
      return;
    }

    const principal = loanAmount;
    const monthlyRate = (interestRate / 100) / 12;
    const numberOfPayments = loanTenure;

    let calculatedEmi;
    if (monthlyRate === 0) {
      calculatedEmi = principal / numberOfPayments;
    } else {
      calculatedEmi = principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    }

    const calculatedTotalPayment = calculatedEmi * numberOfPayments;
    const calculatedTotalInterest = calculatedTotalPayment - principal;

    setEmi(parseFloat(calculatedEmi.toFixed(2)));
    setTotalPayment(parseFloat(calculatedTotalPayment.toFixed(2)));
    setTotalInterest(parseFloat(calculatedTotalInterest.toFixed(2)));
  };

  const handleReset = () => {
    setLoanAmount('');
    setInterestRate('');
    setLoanTenure('');
    setEmi(null);
    setTotalInterest(null);
    setTotalPayment(null);
  };

  return (
    <div className="flex flex-col space-y-4">
      <h2 className="text-2xl font-semibold text-textDark mb-4">Loan EMI Calculator</h2>
      <p className="text-textLight mb-4">
        Calculate your Equal Monthly Installments (EMI) for loans, along with total interest payable and total payment.
      </p>

      <div>
        <label htmlFor="loanAmount" className="block text-textDark text-sm font-medium mb-2">
          Loan Amount (PKR)
        </label>
        <input
          type="number"
          id="loanAmount"
          value={loanAmount}
          onChange={(e) => setLoanAmount(parseFloat(e.target.value) || '')}
          placeholder="e.g., 1000000"
          className="w-full p-3 border border-borderLight rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      <div>
        <label htmlFor="interestRate" className="block text-textDark text-sm font-medium mb-2">
          Annual Interest Rate (%)
        </label>
        <input
          type="number"
          id="interestRate"
          value={interestRate}
          onChange={(e) => setInterestRate(parseFloat(e.target.value) || '')}
          placeholder="e.g., 10"
          min="0"
          step="0.1"
          className="w-full p-3 border border-borderLight rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      <div>
        <label htmlFor="loanTenure" className="block text-textDark text-sm font-medium mb-2">
          Loan Tenure (Months)
        </label>
        <input
          type="number"
          id="loanTenure"
          value={loanTenure}
          onChange={(e) => setLoanTenure(parseFloat(e.target.value) || '')}
          placeholder="e.g., 60"
          min="1"
          className="w-full p-3 border border-borderLight rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      <div className="flex space-x-4">
        <button
          onClick={calculateEMI}
          className="flex-1 bg-primary text-white py-3 px-6 rounded-lg hover:bg-secondary transition-colors font-semibold flex items-center justify-center"
        >
          <DollarSign size={20} className="mr-2" /> Calculate EMI
        </button>
        <button
          onClick={handleReset}
          className="px-4 py-2 border border-red-300 rounded-lg text-red-600 hover:bg-red-50 transition-colors font-medium flex items-center"
        >
          <RefreshCcw size={18} className="mr-2" /> Reset
        </button>
      </div>

      {(emi !== null || totalInterest !== null || totalPayment !== null) && (
        <div className="bg-blue-50 p-4 rounded-md text-primary-dark">
          {emi !== null && <p className="text-lg font-medium">Monthly EMI: <span className="font-bold">{emi.toLocaleString('en-PK', { style: 'currency', currency: 'PKR' })}</span></p>}
          {totalInterest !== null && <p className="text-lg font-medium">Total Interest Payable: <span className="font-bold">{totalInterest.toLocaleString('en-PK', { style: 'currency', currency: 'PKR' })}</span></p>}
          {totalPayment !== null && <p className="text-lg font-medium">Total Payment: <span className="font-bold">{totalPayment.toLocaleString('en-PK', { style: 'currency', currency: 'PKR' })}</span></p>}
        </div>
      )}
    </div>
  );
};

export default LoanEMICalculator;
