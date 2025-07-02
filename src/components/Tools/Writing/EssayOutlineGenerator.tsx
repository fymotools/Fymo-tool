// src/components/Tools/Writing/EssayOutlineGenerator.tsx
import React, { useState } from 'react';
import { List, RefreshCcw, Copy } from 'lucide-react';

const EssayOutlineGenerator: React.FC = () => {
  const [topic, setTopic] = useState<string>('');
  const [points, setPoints] = useState<string>(''); // comma-separated
  const [outline, setOutline] = useState<string>('');
  const [feedback, setFeedback] = useState<string>('');

  const generateOutline = () => {
    if (!topic.trim()) {
      setFeedback('Please enter an essay topic.');
      setOutline('');
      return;
    }

    const mainTopic = topic.trim();
    const supportingPoints = points.split(',').map(p => p.trim()).filter(p => p.length > 0);

    let generated = `ESSAY OUTLINE: "${mainTopic}"\n\n`;

    generated += 'I. Introduction\n';
    generated += '   A. Hook/Attention Grabber\n';
    generated += `   B. Background Information on "${mainTopic}"\n`;
    generated += '   C. Thesis Statement\n\n';

    if (supportingPoints.length > 0) {
      supportingPoints.slice(0, 3).forEach((point, index) => { // Limit to top 3 points for structured outline
        generated += `II. Body Paragraph ${index + 1}: ${point}\n`;
        generated += `    A. Topic Sentence related to "${point}"\n`;
        generated += `    B. Supporting Detail 1\n`;
        generated += `    C. Supporting Detail 2\n`;
        generated += `    D. Concluding Sentence\n\n`;
      });
    } else {
        generated += 'II. Body Paragraph 1: Main Point 1\n';
        generated += '    A. Supporting Detail\n';
        generated += '    B. Example/Evidence\n';
        generated += '    C. Concluding Sentence\n\n';
        generated += 'III. Body Paragraph 2: Main Point 2\n';
        generated += '    A. Supporting Detail\n';
        generated += '    B. Example/Evidence\n';
        generated += '    C. Concluding Sentence\n\n';
    }


    generated += 'IV. Conclusion\n';
    generated += '    A. Restate Thesis (in different words)\n';
    generated += '    B. Summarize Main Points\n';
    generated += '    C. Concluding Thought/Call to Action\n';

    setOutline(generated);
    setFeedback('Outline generated!');
  };

  const handleCopy = () => {
    if (outline) {
      navigator.clipboard.writeText(outline);
      setFeedback('Outline copied to clipboard!');
      setTimeout(() => setFeedback(''), 2000);
    }
  };

  const handleReset = () => {
    setTopic('');
    setPoints('');
    setOutline('');
    setFeedback('');
  };

  return (
    <div className="flex flex-col space-y-4">
      <h2 className="text-2xl font-semibold text-textDark mb-4">Essay Outline Generator</h2>
      <p className="text-textLight mb-4">
        Generate a structured outline for your essay or research paper based on your topic and key points.
      </p>

      <div>
        <label htmlFor="essay-topic" className="block text-textDark text-sm font-medium mb-2">
          Essay Topic
        </label>
        <input
          type="text"
          id="essay-topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="e.g., The Importance of Renewable Energy"
          className="w-full p-3 border border-borderLight rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      <div>
        <label htmlFor="supporting-points" className="block text-textDark text-sm font-medium mb-2">
          Key Supporting Points (comma-separated, optional)
        </label>
        <input
          type="text"
          id="supporting-points"
          value={points}
          onChange={(e) => setPoints(e.target.value)}
          placeholder="e.g., solar, wind, hydropower"
          className="w-full p-3 border border-borderLight rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      <div className="flex space-x-4">
        <button
          onClick={generateOutline}
          className="flex-1 bg-primary text-white py-3 px-6 rounded-lg hover:bg-secondary transition-colors font-semibold flex items-center justify-center"
        >
          <List size={20} className="mr-2" /> Generate Outline
        </button>
        <button
          onClick={handleReset}
          className="px-4 py-2 border border-red-300 rounded-lg text-red-600 hover:bg-red-50 transition-colors font-medium flex items-center"
        >
          <RefreshCcw size={18} className="mr-2" /> Reset
        </button>
      </div>

      {feedback && <p className={`text-sm ${feedback.includes('copied') || feedback.includes('generated') ? 'text-green-600' : 'text-red-600'}`}>{feedback}</p>}

      {outline && (
        <div className="bg-blue-50 p-4 rounded-md text-primary-dark border border-blue-200">
          <h3 className="text-xl font-semibold text-textDark mb-3">Generated Essay Outline:</h3>
          <textarea
            readOnly
            value={outline}
            rows={15}
            className="w-full p-3 border border-borderLight rounded-md bg-white text-textDark font-mono overflow-auto resize-y"
          ></textarea>
          <button
            onClick={handleCopy}
            className="mt-3 bg-accent text-white py-2 px-6 rounded-lg hover:bg-green-600 transition-colors font-semibold flex items-center justify-center mx-auto"
          >
            <Copy size={20} className="mr-2" /> Copy Outline
          </button>
        </div>
      )}
    </div>
  );
};

export default EssayOutlineGenerator;
