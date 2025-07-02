// src/components/Tools/Writing/WordCounter.tsx
import React, { useState, useEffect } from 'react';
import { Count, Type } from 'lucide-react'; // Assuming 'Count' is a suitable icon

const WordCounter: React.FC = () => {
  const [text, setText] = useState<string>('');
  const [wordCount, setWordCount] = useState<number>(0);
  const [charCount, setCharCount] = useState<number>(0);
  const [charCountNoSpaces, setCharCountNoSpaces] = useState<number>(0);
  const [sentenceCount, setSentenceCount] = useState<number>(0);
  const [paragraphCount, setParagraphCount] = useState<number>(0);

  useEffect(() => {
    const calculateCounts = () => {
      // Word Count
      const words = text.match(/\b\w+\b/g);
      setWordCount(words ? words.length : 0);

      // Character Count (with spaces)
      setCharCount(text.length);

      // Character Count (no spaces)
      setCharCountNoSpaces(text.replace(/\s/g, '').length);

      // Sentence Count (simple approximation)
      // Matches periods, exclamation marks, question marks, followed by whitespace
      const sentences = text.match(/[^.!?]*[.!?]/g);
      setSentenceCount(sentences ? sentences.length : 0);

      // Paragraph Count
      const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim() !== '');
      setParagraphCount(paragraphs.length > 0 ? paragraphs.length : 0);
    };

    calculateCounts();
  }, [text]); // Recalculate whenever text changes

  const handleReset = () => {
    setText('');
    setWordCount(0);
    setCharCount(0);
    setCharCountNoSpaces(0);
    setSentenceCount(0);
    setParagraphCount(0);
  };

  return (
    <div className="flex flex-col space-y-4">
      <h2 className="text-2xl font-semibold text-textDark mb-4">Word Counter</h2>
      <p className="text-textLight mb-4">
        Analyze your text instantly! Count words, characters, sentences, and paragraphs for your documents, essays, or blog posts.
      </p>

      <div>
        <label htmlFor="text-input" className="block text-textDark text-sm font-medium mb-2">
          Paste your text here
        </label>
        <textarea
          id="text-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Start typing or paste your text here..."
          rows={10}
          className="w-full p-3 border border-borderLight rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-y"
        ></textarea>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleReset}
          className="px-4 py-2 border border-red-300 rounded-lg text-red-600 hover:bg-red-50 transition-colors font-medium flex items-center"
        >
          <RefreshCcw size={18} className="mr-2" /> Clear Text
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-blue-50 p-4 rounded-md text-primary-dark border border-blue-200">
        <div className="flex items-center space-x-2">
          <Type size={24} className="text-primary" />
          <p className="text-lg font-medium">Words: <span className="font-bold">{wordCount}</span></p>
        </div>
        <div className="flex items-center space-x-2">
          <Type size={24} className="text-primary" />
          <p className="text-lg font-medium">Characters (with spaces): <span className="font-bold">{charCount}</span></p>
        </div>
        <div className="flex items-center space-x-2">
          <Type size={24} className="text-primary" />
          <p className="text-lg font-medium">Characters (no spaces): <span className="font-bold">{charCountNoSpaces}</span></p>
        </div>
        <div className="flex items-center space-x-2">
          <Type size={24} className="text-primary" />
          <p className="text-lg font-medium">Sentences: <span className="font-bold">{sentenceCount}</span></p>
        </div>
        <div className="flex items-center space-x-2">
          <Type size={24} className="text-primary" />
          <p className="text-lg font-medium">Paragraphs: <span className="font-bold">{paragraphCount}</span></p>
        </div>
      </div>
    </div>
  );
};

export default WordCounter;
