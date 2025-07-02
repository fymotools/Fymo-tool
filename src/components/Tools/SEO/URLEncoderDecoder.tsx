// src/components/Tools/SEO/URLEncoderDecoder.tsx
import React, { useState } from 'react';
import { Link, RefreshCcw, Copy } from 'lucide-react';

const URLEncoderDecoder: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [outputText, setOutputText] = useState<string>('');
  const [feedback, setFeedback] = useState<string>('');

  const encodeUrl = () => {
    if (!inputText.trim()) {
      setFeedback('Please enter text to encode.');
      setOutputText('');
      return;
    }
    setOutputText(encodeURIComponent(inputText.trim()));
    setFeedback('URL encoded!');
  };

  const decodeUrl = () => {
    if (!inputText.trim()) {
      setFeedback('Please enter text to decode.');
      setOutputText('');
      return;
    }
    try {
      setOutputText(decodeURIComponent(inputText.trim()));
      setFeedback('URL decoded!');
    } catch (error) {
      setFeedback('Invalid URL encoding to decode.');
      setOutputText('');
    }
  };

  const handleCopy = () => {
    if (outputText) {
      navigator.clipboard.writeText(outputText);
      setFeedback('Text copied to clipboard!');
      setTimeout(() => setFeedback(''), 2000);
    }
  };

  const handleReset = () => {
    setInputText('');
    setOutputText('');
    setFeedback('');
  };

  return (
    <div className="flex flex-col space-y-4">
      <h2 className="text-2xl font-semibold text-textDark mb-4">URL Encoder/Decoder</h2>
      <p className="text-textLight mb-4">
        Encode or decode URLs for safe use in web addresses or data transfer.
      </p>

      <div>
        <label htmlFor="input-url" className="block text-textDark text-sm font-medium mb-2">
          Enter URL or text
        </label>
        <textarea
          id="input-url"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="e.g., https://example.com?query=hello world"
          rows={5}
          className="w-full p-3 border border-borderLight rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-y"
        ></textarea>
      </div>

      <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4">
        <button
          onClick={encodeUrl}
          className="flex-1 bg-primary text-white py-3 px-6 rounded-lg hover:bg-secondary transition-colors font-semibold flex items-center justify-center"
        >
          <Link size={20} className="mr-2" /> Encode URL
        </button>
        <button
          onClick={decodeUrl}
          className="flex-1 bg-accent text-white py-3 px-6 rounded-lg hover:bg-green-600 transition-colors font-semibold flex items-center justify-center"
        >
          <Link size={20} className="mr-2" /> Decode URL
        </button>
      </div>
      <button
          onClick={handleReset}
          className="w-full md:w-auto px-4 py-2 border border-red-300 rounded-lg text-red-600 hover:bg-red-50 transition-colors font-medium flex items-center justify-center mx-auto"
        >
          <RefreshCcw size={18} className="mr-2" /> Reset
        </button>


      {feedback && <p className={`text-sm ${feedback.includes('copied') || feedback.includes('encoded') || feedback.includes('decoded') ? 'text-green-600' : 'text-red-600'}`}>{feedback}</p>}

      {outputText && (
        <div className="bg-blue-50 p-4 rounded-md text-primary-dark border border-blue-200">
          <h3 className="text-xl font-semibold text-textDark mb-3">Output:</h3>
          <textarea
            readOnly
            value={outputText}
            rows={5}
            className="w-full p-3 border border-borderLight rounded-md bg-white text-textDark font-mono overflow-auto resize-y"
          ></textarea>
          <button
            onClick={handleCopy}
            className="mt-3 bg-accent text-white py-2 px-6 rounded-lg hover:bg-green-600 transition-colors font-semibold flex items-center justify-center mx-auto"
          >
            <Copy size={20} className="mr-2" /> Copy Output
          </button>
        </div>
      )}
    </div>
  );
};

export default URLEncoderDecoder;
