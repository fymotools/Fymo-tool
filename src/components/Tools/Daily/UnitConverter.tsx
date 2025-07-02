// src/components/Tools/Daily/UnitConverter.tsx
import React, { useState, useEffect } from 'react';
import { Ruler, Scale, Thermometer, RefreshCcw } from 'lucide-react';

const UnitConverter: React.FC = () => {
  const [value, setValue] = useState<number | ''>('');
  const [fromUnit, setFromUnit] = useState<string>('meter');
  const [toUnit, setToUnit] = useState<string>('kilometer');
  const [result, setResult] = useState<string | null>(null);
  const [category, setCategory] = useState<string>('length'); // length, weight, temperature

  const units = {
    length: [
      { name: 'Meter', value: 'meter', factor: 1 },
      { name: 'Kilometer', value: 'kilometer', factor: 1000 },
      { name: 'Centimeter', value: 'centimeter', factor: 0.01 },
      { name: 'Millimeter', value: 'millimeter', factor: 0.001 },
      { name: 'Mile', value: 'mile', factor: 1609.34 },
      { name: 'Yard', value: 'yard', factor: 0.9144 },
      { name: 'Foot', value: 'foot', factor: 0.3048 },
      { name: 'Inch', value: 'inch', factor: 0.0254 },
    ],
    weight: [
      { name: 'Kilogram', value: 'kilogram', factor: 1 },
      { name: 'Gram', value: 'gram', factor: 0.001 },
      { name: 'Milligram', value: 'milligram', factor: 0.000001 },
      { name: 'Pound', value: 'pound', factor: 0.453592 },
      { name: 'Ounce', value: 'ounce', factor: 0.0283495 },
    ],
    temperature: [
      { name: 'Celsius', value: 'celsius' },
      { name: 'Fahrenheit', value: 'fahrenheit' },
      { name: 'Kelvin', value: 'kelvin' },
    ],
  };

  useEffect(() => {
    // Reset units when category changes to default first units
    if (category === 'length') {
      setFromUnit('meter');
      setToUnit('kilometer');
    } else if (category === 'weight') {
      setFromUnit('kilogram');
      setToUnit('gram');
    } else if (category === 'temperature') {
      setFromUnit('celsius');
      setToUnit('fahrenheit');
    }
    setResult(null); // Clear result on category change
  }, [category]);

  useEffect(() => {
    if (value !== '') {
      performConversion();
    } else {
      setResult(null);
    }
  }, [value, fromUnit, toUnit, category]);


  const performConversion = () => {
    if (typeof value !== 'number' || value === 0) {
      setResult(null);
      return;
    }

    let convertedValue: number | null = null;
    const fromUnitObj: any = units[category as keyof typeof units].find(u => u.value === fromUnit);
    const toUnitObj: any = units[category as keyof typeof units].find(u => u.value === toUnit);

    if (!fromUnitObj || !toUnitObj) {
      setResult('Invalid unit selection.');
      return;
    }

    if (category === 'temperature') {
      // Temperature conversions are non-linear
      let valueInCelsius: number;
      if (fromUnit === 'celsius') {
        valueInCelsius = value;
      } else if (fromUnit === 'fahrenheit') {
        valueInCelsius = (value - 32) * 5 / 9;
      } else { // kelvin
        valueInCelsius = value - 273.15;
      }

      if (toUnit === 'celsius') {
        convertedValue = valueInCelsius;
      } else if (toUnit === 'fahrenheit') {
        convertedValue = (valueInCelsius * 9 / 5) + 32;
      } else { // kelvin
        convertedValue = valueInCelsius + 273.15;
      }
    } else {
      // Linear conversions (length, weight)
      convertedValue = (value * fromUnitObj.factor) / toUnitObj.factor;
    }

    if (convertedValue !== null) {
      setResult(`${value} ${fromUnitObj.name} = ${convertedValue.toFixed(4)} ${toUnitObj.name}`);
    } else {
      setResult('Conversion Error');
    }
  };

  const handleReset = () => {
    setValue('');
    setResult(null);
    setCategory('length'); // Reset to default category
  };

  const getCategoryIcon = (cat: string) => {
    if (cat === 'length') return <Ruler size={20} className="mr-2" />;
    if (cat === 'weight') return <Scale size={20} className="mr-2" />;
    if (cat === 'temperature') return <Thermometer size={20} className="mr-2" />;
    return null;
  };

  return (
    <div className="flex flex-col space-y-4">
      <h2 className="text-2xl font-semibold text-textDark mb-4">Unit Converter</h2>
      <p className="text-textLight mb-4">
        Convert between various units of length, weight, and temperature instantly.
      </p>

      <div>
        <label htmlFor="category" className="block text-textDark text-sm font-medium mb-2">
          Select Category
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-3 border border-borderLight rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          <option value="length">Length</option>
          <option value="weight">Weight</option>
          <option value="temperature">Temperature</option>
        </select>
      </div>

      <div>
        <label htmlFor="value" className="block text-textDark text-sm font-medium mb-2">
          Value to Convert
        </label>
        <input
          type="number"
          id="value"
          value={value}
          onChange={(e) => setValue(parseFloat(e.target.value) || '')}
          placeholder="e.g., 100"
          className="w-full p-3 border border-borderLight rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="fromUnit" className="block text-textDark text-sm font-medium mb-2">
            From Unit
          </label>
          <select
            id="fromUnit"
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value)}
            className="w-full p-3 border border-borderLight rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            {units[category as keyof typeof units].map(unit => (
              <option key={unit.value} value={unit.value}>
                {unit.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="toUnit" className="block text-textDark text-sm font-medium mb-2">
            To Unit
          </label>
          <select
            id="toUnit"
            value={toUnit}
            onChange={(e) => setToUnit(e.target.value)}
            className="w-full p-3 border border-borderLight rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            {units[category as keyof typeof units].map(unit => (
              <option key={unit.value} value={unit.value}>
                {unit.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleReset}
          className="px-4 py-2 border border-red-300 rounded-lg text-red-600 hover:bg-red-50 transition-colors font-medium flex items-center"
        >
          <RefreshCcw size={18} className="mr-2" /> Reset
        </button>
      </div>

      {result && (
        <div className="bg-blue-50 p-4 rounded-md text-primary-dark">
          <p className="text-lg font-medium flex items-center">
            {getCategoryIcon(category)} Converted Result: <span className="font-bold ml-2">{result}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default UnitConverter;
