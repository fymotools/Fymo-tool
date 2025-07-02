// src/components/Tools/Writing/TextCaseConverter.tsx
import React, { useState } from 'react';
import { Type, RefreshCcw, Copy } from 'lucide-react';

const TextCaseConverter: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [convertedText, setConvertedText] = useState<string>('');
  const [feedback, setFeedback] = useState<string>('');

  const convertText = (type: string) => {
    let result = '';
    const text = inputText.trim();
    if (!text) {
      setFeedback('Please enter text to convert.');
      setConvertedText('');
      return;
    }

    switch (type) {
      case 'uppercase':
        result = text.toUpperCase();
        break;
      case 'lowercase':
        result = text.toLowerCase();
        break;
      case 'capitalize':
        result = text.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
        break;
      case 'titlecase':
        result = text.toLowerCase().split(' ').map((word) => {
          if (['a', 'an', 'the', 'and', 'but', 'or', 'for', 'nor', 'on', 'at', 'to', 'from', 'by'].includes(word) && word !== text.split(' ')[0].toLowerCase()) {
            return word;
          }
          return word.charAt(0).toUpperCase() + word.slice(1);
        }).join(' ');
        break;
      case 'alternatingcase':
        result = text.split('').map((char, index) => {
          return index % 2 === 0 ? char.toLowerCase() : char.toUpperCase();
        }).join('');
        break;
      case 'sentencecase':
        result = text.toLowerCase().replace(/(^\s*\w|[.?!]\s*\w)/g, (c) => c.toUpperCase());
        break;
      default:
        result = text;
    }
    setConvertedText(result);
    setFeedback('Text converted!');
  };

  const handleCopy = () => {
    if (convertedText) {
      navigator.clipboard.writeText(convertedText);
      setFeedback('Converted text copied to clipboard!');
      setTimeout(() => setFeedback(''), 2000);
    }
  };

  const handleReset = () => {
    setInputText('');
    setConvertedText('');
    setFeedback('');
  };

  return (
    <div className="flex flex-col space-y-4">
      <h2 className="text-2xl font-semibold text-textDark mb-4">Text Case Converter</h2>
      <p className="text-textLight mb-4">
        Convert your text to various cases: UPPERCASE, lowercase, Capitalized, Title Case, sEnTeNcEcAsE, and AlTeRnAtInG cAsE.
      </p>

      <div>
        <label htmlFor="input-text-case" className="block text-textDark text-sm font-medium mb-2">
          Enter your text
        </label>
        <textarea
          id="input-text-case"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type or paste your text here..."
          rows={6}
          className="w-full p-3 border border-borderLight rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-y"
        ></textarea>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        <button onClick={() => convertText('uppercase')} className="btn-secondary py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors font-medium text-textDark">UPPERCASE</button>
        <button onClick={() => convertText('lowercase')} className="btn-secondary py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors font-medium text-textDark">lowercase</button>
        <button onClick={() => convertText('capitalize')} className="btn-secondary py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors font-medium text-textDark">Capitalize Words</button>
        <button onClick={() => convertText('titlecase')} className="btn-secondary py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors font-medium text-textDark">Title Case</button>
        <button onClick={() => convertText('alternatingcase')} className="btn-secondary py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors font-medium text-textDark">aLtErNaTiNg cAsE</button>
        <button onClick={() => convertText('sentencecase')} className="btn-secondary py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors font-medium text-textDark">Sentence case</button>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleReset}
          className="px-4 py-2 border border-red-300 rounded-lg text-red-600 hover:bg-red-50 transition-colors font-medium flex items-center"
        >
          <RefreshCcw size={18} className="mr-2" /> Reset
        </button>
      </div>

      {feedback && <p className={`text-sm ${feedback.includes('copied') || feedback.includes('converted') ? 'text-green-600' : 'text-red-600'}`}>{feedback}</p>}

      {convertedText && (
        <div className="bg-blue-50 p-4 rounded-md text-primary-dark border border-blue-200">
          <h3 className="text-xl font-semibold text-textDark mb-3">Converted Text:</h3>
          <textarea
            readOnly
            value={convertedText}
            rows={6}
            className="w-full p-3 border border-borderLight rounded-md bg-white text-textDark resize-y"
          ></textarea>
          <button
            onClick={handleCopy}
            className="mt-3 bg-accent text-white py-2 px-6 rounded-lg hover:bg-green-600 transition-colors font-semibold flex items-center justify-center mx-auto"
          >
            <Copy size={20} className="mr-2" /> Copy Converted Text
          </button>
        </div>
      )}
    </div>
  );
};

export default TextCaseConverter;
