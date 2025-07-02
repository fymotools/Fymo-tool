// src/components/Tools/Writing/BlogTitleGenerator.tsx
import React, { useState } from 'react';
import { Sparkles, RefreshCcw, Clipboard } from 'lucide-react'; // Icons for generate, reset, copy

const BlogTitleGenerator: React.FC = () => {
  const [keywords, setKeywords] = useState<string>('');
  const [titles, setTitles] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<string>('');

  const generateTitles = () => {
    if (!keywords.trim()) {
      setFeedback('Please enter at least one keyword.');
      setTitles([]);
      return;
    }

    const keywordList = keywords.split(',').map(kw => kw.trim()).filter(kw => kw.length > 0);
    const generated: string[] = [];

    const templates = [
      'The Ultimate Guide to {keyword}',
      'How to Master {keyword} in 7 Days',
      'Top 10 Tips for {keyword} Success',
      'Unlocking the Power of {keyword}',
      '{keyword}: Everything You Need to Know',
      'Boost Your {keyword} with These Simple Tricks',
      'The Future of {keyword}: What to Expect',
      'Common Mistakes to Avoid in {keyword}',
      'Beyond Basics: Advanced {keyword} Strategies',
      'Why {keyword} Matters More Than Ever',
    ];

    keywordList.forEach(kw => {
      templates.forEach(template => {
        generated.push(template.replace('{keyword}', kw));
      });
    });

    setTitles(generated.sort(() => 0.5 - Math.random()).slice(0, 10)); // Shuffle and take top 10
    setFeedback('');
  };

  const handleCopy = (title: string) => {
    navigator.clipboard.writeText(title);
    setFeedback('Title copied to clipboard!');
    setTimeout(() => setFeedback(''), 2000); // Clear feedback after 2 seconds
  };

  const handleReset = () => {
    setKeywords('');
    setTitles([]);
    setFeedback('');
  };

  return (
    <div className="flex flex-col space-y-6">
      <h2 className="text-2xl font-semibold text-textDark">Blog Title Generator</h2>
      <p className="text-textLight">
        Generate catchy and SEO-friendly blog titles based on your keywords. Simply enter your keywords, and let us suggest engaging titles for your content.
      </p>

      <div>
        <label htmlFor="keywords" className="block text-textDark text-sm font-medium mb-2">
          Enter Keywords (comma-separated)
        </label>
        <input
          type="text"
          id="keywords"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          placeholder="e.g., content marketing, SEO, blogging tips"
          className="w-full p-3 border border-borderLight rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      <div className="flex space-x-4">
        <button
          onClick={generateTitles}
          className="bg-primary text-white py-3 px-6 rounded-lg hover:bg-secondary transition-colors font-semibold flex items-center justify-center"
        >
          <Sparkles size={20} className="mr-2" /> Generate Titles
        </button>
        <button
          onClick={handleReset}
          className="px-4 py-2 border border-red-300 rounded-lg text-red-600 hover:bg-red-50 transition-colors font-medium flex items-center"
        >
          <RefreshCcw size={18} className="mr-2" /> Reset
        </button>
      </div>

      {feedback && <p className={`text-sm ${feedback.includes('copied') ? 'text-green-600' : 'text-red-600'}`}>{feedback}</p>}

      {titles.length > 0 && (
        <div className="bg-blue-50 p-4 rounded-md text-primary-dark border border-blue-200">
          <h3 className="text-xl font-semibold text-textDark mb-3">Suggested Titles:</h3>
          <ul className="list-disc list-inside space-y-2">
            {titles.map((title, index) => (
              <li key={index} className="flex justify-between items-center text-textLight">
                <span>{title}</span>
                <button
                  onClick={() => handleCopy(title)}
                  className="ml-2 p-1 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
                  title="Copy to clipboard"
                >
                  <Clipboard size={16} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BlogTitleGenerator;
