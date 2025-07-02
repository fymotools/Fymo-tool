// src/pages/health-tools.tsx
import React from 'react';
import ToolContainer from '../components/Tools/ToolContainer';
import BMICalculator from '../components/Tools/Health/BMICalculator';
import WaterIntakeCalculator from '../components/Tools/Health/WaterIntakeCalculator';
import BMRCalculator from '../components/Tools/Health/BMRCalculator'; // NEW IMPORT
import IdealWeightCalculator from '../components/Tools/Health/IdealWeightCalculator'; // NEW IMPORT
import CalorieCalculator from '../components/Tools/Health/CalorieCalculator'; // NEW IMPORT

const HealthToolsPage: React.FC = () => {
  return (
    <ToolContainer
      title="Health Tools"
      description="Stay on top of your health goals with our simple and effective health calculators."
    >
      <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
        <BMICalculator />
        <WaterIntakeCalculator />
        <BMRCalculator /> {/* ADDED */}
        <IdealWeightCalculator /> {/* ADDED */}
        <CalorieCalculator /> {/* ADDED */}
      </div>
    </ToolContainer>
  );
};

export default HealthToolsPage;
