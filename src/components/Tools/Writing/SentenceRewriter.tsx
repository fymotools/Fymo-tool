// src/components/Tools/Writing/SentenceRewriter.tsx
import React, { useState } from 'react';
import { Edit, RefreshCcw, Copy } from 'lucide-react';

const SentenceRewriter: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [rewrittenText, setRewrittenText] = useState<string>('');
  const [feedback, setFeedback] = useState<string>('');

  // This is a *highly simplified* client-side rewriter.
  // Real AI rewriters are complex and require powerful models (usually backend).
  // This will perform basic synonym replacement and structural changes.
  const rewriteSentence = () => {
    if (!inputText.trim()) {
      setFeedback('Please enter text to rewrite.');
      setRewrittenText('');
      return;
    }

    const text = inputText.trim();
    let rewritten = text;

    // Simple synonym replacements (expand this list for better results)
    const synonyms: { [key: string]: string[] } = {
      'good': ['excellent', 'great', 'positive', 'favorable'],
      'bad': ['poor', 'terrible', 'negative', 'unfavorable'],
      'very': ['extremely', 'highly', 'remarkably'],
      'big': ['large', 'huge', 'massive'],
      'small': ['tiny', 'minute', 'little'],
      'happy': ['joyful', 'cheerful', 'glad'],
      'sad': ['unhappy', 'gloomy', 'down'],
      'important': ['crucial', 'significant', 'vital'],
      'interesting': ['engaging', 'captivating', 'fascinating'],
      'beautiful': ['gorgeous', 'stunning', 'attractive'],
    };

    // Replace words with a random synonym from the list
    Object.keys(synonyms).forEach(word => {
      const regex = new RegExp(`\\b${word}\\b`, 'gi'); // Case-insensitive, whole word
      rewritten = rewritten.replace(regex, (match) => {
        const replacements = synonyms[word];
        return replacements[Math.floor(Math.random() * replacements.length)];
      });
    });

    // Simple structural changes (e.g., changing active to passive voice, very limited)
    // This part is extremely basic and illustrative. A real rewriter needs NLP.
    if (rewritten.toLowerCase().includes('is a')) {
      rewritten = rewritten.replace(/is a (\w+)/gi, 'can be considered a $1');
    }
    if (rewritten.toLowerCase().includes('it is')) {
        rewritten = rewritten.replace(/it is (\w+)/gi, 'one might find it $1');
    }


    setRewrittenText(rewritten);
    setFeedback('Text rewritten (simplified)!');
  };

  const handleCopy = () => {
    if (rewrittenText) {
      navigator.clipboard.writeText(rewrittenText);
      setFeedback('Rewritten text copied to clipboard!');
      setTimeout(() => setFeedback(''), 2000);
    }
  };

  const handleReset = () => {
    setInputText('');
    setRewrittenText('');
    setFeedback('');
  };

  return (
    <div className="flex flex-col space-y-4">
      <h2 className="text-2xl font-semibold text-textDark mb-4">Sentence/Paragraph Rewriter</h2>
      <p className="text-textLight mb-4">
        Rewrite sentences or paragraphs to improve clarity, originality, or style. (Note: This is a basic client-side rewriter. For advanced rewriting, consider AI-powered tools.)
      </p>

      <div>
        <label htmlFor="input-text-rewrite" className="block text-textDark text-sm font-medium mb-2">
          Enter text to rewrite
        </label>
        <textarea
          id="input-text-rewrite"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type or paste your text here..."
          rows={6}
          className="w-full p-3 border border-borderLight rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-y"
        ></textarea>
      </div>

      <div className="flex space-x-4">
        <button
          onClick={rewriteSentence}
          className="flex-1 bg-primary text-white py-3 px-6 rounded-lg hover:bg-secondary transition-colors font-semibold flex items-center justify-center"
        >
          <Edit size={20} className="mr-2" /> Rewrite Text
        </button>
        <button
          onClick={handleReset}
          className="px-4 py-2 border border-red-300 rounded-lg text-red-600 hover:bg-red-50 transition-colors font-medium flex items-center"
        >
          <RefreshCcw size={18} className="mr-2" /> Reset
        </button>
      </div>

      {feedback && <p className={`text-sm ${feedback.includes('copied') || feedback.includes('successful') ? 'text-green-600' : 'text-red-600'}`}>{feedback}</p>}

      {rewrittenText && (
        <div className="bg-blue-50 p-4 rounded-md text-primary-dark border border-blue-200">
          <h3 className="text-xl font-semibold text-textDark mb-3">Rewritten Text:</h3>
          <textarea
            readOnly
            value={rewrittenText}
            rows={6}
            className="w-full p-3 border border-borderLight rounded-md bg-white text-textDark resize-y"
          ></textarea>
          <button
            onClick={handleCopy}
            className="mt-3 bg-accent text-white py-2 px-6 rounded-lg hover:bg-green-600 transition-colors font-semibold flex items-center justify-center mx-auto"
          >
            <Copy size={20} className="mr-2" /> Copy Rewritten Text
          </button>
        </div>
      )}
    </div>
  );
};

export default SentenceRewriter;
