// src/components/Tools/SEO/MetaTagGenerator.tsx
import React, { useState } from 'react';
import { Code, Copy, RefreshCcw } from 'lucide-react'; // Icons for generate, copy, reset

const MetaTagGenerator: React.FC = () => {
  const [pageTitle, setPageTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [keywords, setKeywords] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const [generatedTags, setGeneratedTags] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<string>('');

  const generateMetaTags = () => {
    const tags: string[] = [];

    if (pageTitle.trim()) {
      tags.push(`<title>${pageTitle.trim()}</title>`);
      tags.push(`<meta property="og:title" content="${pageTitle.trim()}" />`);
      tags.push(`<meta name="twitter:title" content="${pageTitle.trim()}" />`);
    }

    if (description.trim()) {
      tags.push(`<meta name="description" content="${description.trim()}" />`);
      tags.push(`<meta property="og:description" content="${description.trim()}" />`);
      tags.push(`<meta name="twitter:description" content="${description.trim()}" />`);
    }

    if (keywords.trim()) {
      tags.push(`<meta name="keywords" content="${keywords.trim()}" />`);
    }

    if (author.trim()) {
      tags.push(`<meta name="author" content="${author.trim()}" />`);
    }

    // Common static meta tags (can be made dynamic if needed)
    tags.push(`<meta charset="UTF-8" />`);
    tags.push(`<meta name="viewport" content="width=device-width, initial-scale=1.0" />`);
    tags.push(`<meta property="og:type" content="website" />`); // Default to website
    tags.push(`<meta name="twitter:card" content="summary_large_image" />`); // Default for Twitter

    setGeneratedTags(tags);
    setFeedback('');
  };

  const handleCopyAll = () => {
    if (generatedTags.length === 0) {
      setFeedback('No tags to copy. Generate them first!');
      return;
    }
    const allTags = generatedTags.join('\n');
    navigator.clipboard.writeText(allTags);
    setFeedback('All meta tags copied to clipboard!');
    setTimeout(() => setFeedback(''), 3000);
  };

  const handleReset = () => {
    setPageTitle('');
    setDescription('');
    setKeywords('');
    setAuthor('');
    setGeneratedTags([]);
    setFeedback('');
  };

  return (
    <div className="flex flex-col space-y-6">
      <h2 className="text-2xl font-semibold text-textDark">Meta Tag Generator</h2>
      <p className="text-textLight">
        Generate essential HTML meta tags for your website to improve SEO and social media sharing.
      </p>

      {/* Input Fields */}
      <div>
        <label htmlFor="pageTitle" className="block text-textDark text-sm font-medium mb-2">
          Page Title (max 60 characters recommended)
        </label>
        <input
          type="text"
          id="pageTitle"
          value={pageTitle}
          onChange={(e) => setPageTitle(e.target.value)}
          placeholder="e.g., Best Online Tools for Productivity"
          maxLength={70}
          className="w-full p-3 border border-borderLight rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
        <p className="text-xs text-gray-500 mt-1">{pageTitle.length}/70 characters</p>
      </div>

      <div>
        <label htmlFor="description" className="block text-textDark text-sm font-medium mb-2">
          Meta Description (max 160 characters recommended)
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="e.g., Discover a wide range of free online tools to boost your productivity and simplify daily tasks."
          rows={3}
          maxLength={180}
          className="w-full p-3 border border-borderLight rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-y"
        ></textarea>
        <p className="text-xs text-gray-500 mt-1">{description.length}/180 characters</p>
      </div>

      <div>
        <label htmlFor="keywords" className="block text-textDark text-sm font-medium mb-2">
          Keywords (comma-separated, optional)
        </label>
        <input
          type="text"
          id="keywords"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          placeholder="e.g., online tools, free utilities, productivity"
          className="w-full p-3 border border-borderLight rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      <div>
        <label htmlFor="author" className="block text-textDark text-sm font-medium mb-2">
          Author (optional)
        </label>
        <input
          type="text"
          id="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="e.g., Fymo Tools"
          className="w-full p-3 border border-borderLight rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      {/* Buttons */}
      <div className="flex space-x-4">
        <button
          onClick={generateMetaTags}
          className="bg-primary text-white py-3 px-6 rounded-lg hover:bg-secondary transition-colors font-semibold flex items-center justify-center"
        >
          <Code size={20} className="mr-2" /> Generate Tags
        </button>
        <button
          onClick={handleReset}
          className="px-4 py-2 border border-red-300 rounded-lg text-red-600 hover:bg-red-50 transition-colors font-medium flex items-center"
        >
          <RefreshCcw size={18} className="mr-2" /> Reset
        </button>
      </div>

      {feedback && <p className={`text-sm ${feedback.includes('copied') ? 'text-green-600' : 'text-red-600'}`}>{feedback}</p>}

      {/* Generated Tags Output */}
      {generatedTags.length > 0 && (
        <div className="bg-gray-100 p-4 rounded-md text-textDark border border-gray-200">
          <h3 className="text-xl font-semibold mb-3 flex items-center">
            Generated Meta Tags <Code size={20} className="ml-2" />
          </h3>
          <pre className="bg-gray-800 text-white p-4 rounded-md text-sm overflow-x-auto relative">
            {generatedTags.join('\n')}
            <button
              onClick={handleCopyAll}
              className="absolute top-2 right-2 p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              title="Copy all tags"
            >
              <Copy size={16} />
            </button>
          </pre>
          <p className="text-sm text-textLight mt-3">
            Copy these tags and paste them into the `&lt;head&gt;` section of your HTML document.
          </p>
        </div>
      )}
    </div>
  );
};

export default MetaTagGenerator;
