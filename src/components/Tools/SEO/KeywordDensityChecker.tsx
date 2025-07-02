// src/components/Tools/SEO/KeywordDensityChecker.tsx
import React, { useState, useEffect } from 'react';
import { Search, Text, RefreshCcw } from 'lucide-react';

interface KeywordResult {
  keyword: string;
  count: number;
  density: string; // Percentage string
}

const KeywordDensityChecker: React.FC = () => {
  const [text, setText] = useState<string>('');
  const [minWordLength, setMinWordLength] = useState<number>(3);
  const [results, setResults] = useState<KeywordResult[]>([]);
  const [totalWords, setTotalWords] = useState<number>(0);

  useEffect(() => {
    calculateKeywordDensity();
  }, [text, minWordLength]);

  const calculateKeywordDensity = () => {
    if (!text.trim()) {
      setResults([]);
      setTotalWords(0);
      return;
    }

    const cleanedText = text.toLowerCase().replace(/[.,!?;:()"']/g, ''); // Remove punctuation
    const words = cleanedText.match(/\b\w+\b/g); // Get all words

    if (!words) {
      setResults([]);
      setTotalWords(0);
      return;
    }

    const filteredWords = words.filter(word => word.length >= minWordLength);
    setTotalWords(filteredWords.length);

    const wordCounts: { [key: string]: number } = {};
    filteredWords.forEach(word => {
      wordCounts[word] = (wordCounts[word] || 0) + 1;
    });

    const calculatedResults: KeywordResult[] = Object.entries(wordCounts)
      .map(([keyword, count]) => ({
        keyword,
        count,
        density: ((count / filteredWords.length) * 100).toFixed(2) + '%',
      }))
      .sort((a, b) => b.count - a.count); // Sort by count descending

    setResults(calculatedResults);
  };

  const handleReset = () => {
    setText('');
    setMinWordLength(3);
    setResults([]);
    setTotalWords(0);
  };

  return (
    <div className="flex flex-col space-y-4">
      <h2 className="text-2xl font-semibold text-textDark mb-4">Keyword Density Checker</h2>
      <p className="text-textLight mb-4">
        Analyze the keyword density of your text. Understand how frequently specific keywords appear to optimize your content for SEO.
      </p>

      <div>
        <label htmlFor="text-input-seo" className="block text-textDark text-sm font-medium mb-2">
          Paste your content here
        </label>
        <textarea
          id="text-input-seo"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter your article, blog post, or website content..."
          rows={10}
          className="w-full p-3 border border-borderLight rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-y"
        ></textarea>
      </div>

      <div>
        <label htmlFor="min-word-length" className="block text-textDark text-sm font-medium mb-2">
          Minimum Word Length to Consider
        </label>
        <input
          type="number"
          id="min-word-length"
          value={minWordLength}
          onChange={(e) => setMinWordLength(parseInt(e.target.value) || 1)}
          min="1"
          max="10"
          className="w-full p-3 border border-borderLight rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleReset}
          className="px-4 py-2 border border-red-300 rounded-lg text-red-600 hover:bg-red-50 transition-colors font-medium flex items-center"
        >
          <RefreshCcw size={18} className="mr-2" /> Reset
        </button>
      </div>

      {totalWords > 0 && (
        <div className="bg-blue-50 p-4 rounded-md text-primary-dark border border-blue-200">
          <h3 className="text-xl font-semibold text-textDark mb-3">Analysis Results:</h3>
          <p className="text-lg font-medium mb-3">Total Relevant Words: <span className="font-bold">{totalWords}</span></p>

          {results.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg shadow-soft text-left text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 border-b border-borderLight">Keyword</th>
                    <th className="px-4 py-2 border-b border-borderLight">Count</th>
                    <th className="px-4 py-2 border-b border-borderLight">Density</th>
                  </tr>
                </thead>
                <tbody>
                  {results.slice(0, 20).map((result, index) => ( // Show top 20 keywords
                    <tr key={result.keyword} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-2 whitespace-nowrap">{result.keyword}</td>
                      <td className="px-4 py-2">{result.count}</td>
                      <td className="px-4 py-2">{result.density}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-textLight">No keywords found meeting the criteria.</p>
          )}
          <p className="text-sm text-gray-600 mt-3">
            (Density is calculated based on words with length {minWordLength} or more.)
          </p>
        </div>
      )}
    </div>
  );
};

export default KeywordDensityChecker;
