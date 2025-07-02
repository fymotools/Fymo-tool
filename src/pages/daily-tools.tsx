// src/pages/daily-tools.tsx
import React from 'react';
import ToolContainer from '../components/Tools/ToolContainer';
import AgeCalculator from '../components/Tools/Daily/AgeCalculator';
import UnitConverter from '../components/Tools/Daily/UnitConverter';
import LoanEMICalculator from '../components/Tools/Daily/LoanEMICalculator'; // NEW IMPORT
import NotesPad from '../components/Tools/Daily/NotesPad'; // NEW IMPORT
import QRCodeGenerator from '../components/Tools/Daily/QRCodeGenerator'; // NEW IMPORT

const DailyToolsPage: React.FC = () => {
  return (
    <ToolContainer
      title="Daily Tools"
      description="Handy tools for everyday tasks, from calculating age to managing notes and converting units."
    >
      <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
        <AgeCalculator />
        <UnitConverter />
        <LoanEMICalculator /> {/* ADDED */}
        <NotesPad /> {/* ADDED */}
        <QRCodeGenerator /> {/* ADDED */}
      </div>
    </ToolContainer>
  );
};

export default DailyToolsPage;
