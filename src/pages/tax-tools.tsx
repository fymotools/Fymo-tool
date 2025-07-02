// src/pages/tax-tools.tsx
import React from 'react';
import ToolContainer from '../components/Tools/ToolContainer';
import IncomeTaxCalculator from '../components/Tools/Tax/IncomeTaxCalculator';
import GSTCalculator from '../components/Tools/Tax/GSTCalculator';
import SalesTaxCalculator from '../components/Tools/Tax/SalesTaxCalculator'; // NEW IMPORT
import PropertyTaxEstimator from '../components/Tools/Tax/PropertyTaxEstimator'; // NEW IMPORT
import VehicleTokenTaxEstimator from '../components/Tools/Tax/VehicleTokenTaxEstimator'; // NEW IMPORT

const TaxToolsPage: React.FC = () => {
  return (
    <ToolContainer
      title="Tax Tools"
      description="A collection of essential tax calculators including income tax, GST, property tax, and vehicle token tax estimators."
    >
      <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
        <IncomeTaxCalculator />
        <GSTCalculator />
        <SalesTaxCalculator /> {/* ADDED */}
        <PropertyTaxEstimator /> {/* ADDED */}
        <VehicleTokenTaxEstimator /> {/* ADDED */}
      </div>
    </ToolContainer>
  );
};

export default TaxToolsPage;
