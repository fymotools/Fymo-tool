// src/components/Tools/Writing/ArticleGenerator.tsx
import React, { useState } from 'react';
import { FileText, Sparkles, RefreshCcw, Copy } from 'lucide-react';

const ArticleGenerator: React.FC = () => {
  const [mainKeyword, setMainKeyword] = useState<string>('');
  const [subKeywords, setSubKeywords] = useState<string>('');
  const [lengthOption, setLengthOption] = useState<string>('short'); // short, medium, long
  const [generatedArticle, setGeneratedArticle] = useState<string>('');
  const [feedback, setFeedback] = useState<string>('');

  const generateArticleContent = () => {
    if (!mainKeyword.trim()) {
      setFeedback('Please enter a main keyword to generate content.');
      setGeneratedArticle('');
      return;
    }

    const primaryKeyword = mainKeyword.trim().toLowerCase();
    const secondaryKeywords = subKeywords.split(',').map(kw => kw.trim().toLowerCase()).filter(kw => kw.length > 0);

    let article = '';
    let title = '';
    let intro = '';
    let sections: string[] = [];
    let conclusion = '';

    // --- Title Generation ---
    const titleTemplates = [
      `The Ultimate Guide to ${primaryKeyword.charAt(0).toUpperCase() + primaryKeyword.slice(1)}`,
      `Mastering ${primaryKeyword.charAt(0).toUpperCase() + primaryKeyword.slice(1)}: Tips and Tricks`,
      `Everything You Need to Know About ${primaryKeyword.charAt(0).toUpperCase() + primaryKeyword.slice(1)}`,
      `Unlock Your Potential with ${primaryKeyword.charAt(0).toUpperCase() + primaryKeyword.slice(1)}`,
      `A Deep Dive into ${primaryKeyword.charAt(0).toUpperCase() + primaryKeyword.slice(1)}`,
    ];
    title = titleTemplates[Math.floor(Math.random() * titleTemplates.length)];

    // --- Introduction Generation ---
    intro = `Welcome to our comprehensive guide on **${primaryKeyword}**! In today's fast-paced world, understanding ${primaryKeyword} has become more crucial than ever. This article will delve into the core aspects of ${primaryKeyword}, providing you with valuable insights and actionable tips. We'll explore various facets to help you master this essential topic.`;

    // --- Section Generation ---
    const sectionTopics: string[] = [`What is ${primaryKeyword}?`];
    if (secondaryKeywords.length > 0) {
      secondaryKeywords.slice(0, 2).forEach(skw => sectionTopics.push(`The Benefits of ${skw.charAt(0).toUpperCase() + skw.slice(1)}`));
    }
    sectionTopics.push(`How to Get Started with ${primaryKeyword}?`);
    sectionTopics.push(`Future Trends in ${primaryKeyword}`);

    sectionTopics.forEach((topic, index) => {
      let sectionContent = `\n\n## ${topic}\n\n`;
      let paragraphCount = 1;

      if (lengthOption === 'medium') paragraphCount = 2;
      if (lengthOption === 'long') paragraphCount = 3;

      for (let i = 0; i < paragraphCount; i++) {
        sectionContent += `This section explores the intricate details of **${topic.replace(/What is |The Benefits of |How to Get Started with |Future Trends in /gi, '')}**. It's vital to grasp the fundamentals to leverage its full potential. We'll provide insights and actionable strategies to help you navigate this area. Consider the impact of related concepts like ${secondaryKeywords[i % secondaryKeywords.length] || 'innovation'}.\n\n`;
      }
      sections.push(sectionContent);
    });

    // --- Conclusion Generation ---
    conclusion = `\n\n## Conclusion\n\nIn conclusion, **${primaryKeyword}** is a multifaceted subject with vast implications. By understanding its core principles and applying the strategies discussed, you can achieve significant success. We hope this guide has provided you with a solid foundation. Continue exploring and learning to stay ahead in your journey!`;

    article = `# ${title}\n\n${intro}${sections.join('')}${conclusion}`;

    setGeneratedArticle(article);
    setFeedback('Article generated! (Simplified content)');
  };

  const handleCopy = () => {
    if (generatedArticle) {
      navigator.clipboard.writeText(generatedArticle);
      setFeedback('Article copied to clipboard!');
      setTimeout(() => setFeedback(''), 2000);
    }
  };

  const handleReset = () => {
    setMainKeyword('');
    setSubKeywords('');
    setLengthOption('short');
    setGeneratedArticle('');
    setFeedback('');
  };

  return (
    <div className="flex flex-col space-y-4">
      <h2 className="text-2xl font-semibold text-textDark mb-4">Client-Side Article/Content Generator</h2>
      <p className="text-textLight mb-4">
        Generate basic article outlines and content using keywords. (Note: This is a simplified generator for demonstration and uses predefined templates. It's not a true AI article writer.)
      </p>

      <div>
        <label htmlFor="main-keyword" className="block text-textDark text-sm font-medium mb-2">
          Main Topic/Keyword
        </label>
        <input
          type="text"
          id="main-keyword"
          value={mainKeyword}
          onChange={(e) => setMainKeyword(e.target.value)}
          placeholder="e.g., Digital Marketing"
          className="w-full p-3 border border-borderLight rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      <div>
        <label htmlFor="sub-keywords" className="block text-textDark text-sm font-medium mb-2">
          Sub-Keywords (comma-separated, optional)
        </label>
        <input
          type="text"
          id="sub-keywords"
          value={subKeywords}
          onChange={(e) => setSubKeywords(e.target.value)}
          placeholder="e.g., SEO, Social Media, Content Strategy"
          className="w-full p-3 border border-borderLight rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      <div>
        <label htmlFor="length-option" className="block text-textDark text-sm font-medium mb-2">
          Content Length
        </label>
        <select
          id="length-option"
          value={lengthOption}
          onChange={(e) => setLengthOption(e.target.value)}
          className="w-full p-3 border border-borderLight rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          <option value="short">Short (approx. 300 words)</option>
          <option value="medium">Medium (approx. 600 words)</option>
          <option value="long">Long (approx. 900+ words)</option>
        </select>
      </div>

      <div className="flex space-x-4">
        <button
          onClick={generateArticleContent}
          className="flex-1 bg-primary text-white py-3 px-6 rounded-lg hover:bg-secondary transition-colors font-semibold flex items-center justify-center"
        >
          <Sparkles size={20} className="mr-2" /> Generate Article
        </button>
        <button
          onClick={handleReset}
          className="px-4 py-2 border border-red-300 rounded-lg text-red-600 hover:bg-red-50 transition-colors font-medium flex items-center"
        >
          <RefreshCcw size={18} className="mr-2" /> Reset
        </button>
      </div>

      {feedback && <p className={`text-sm ${feedback.includes('copied') || feedback.includes('generated') ? 'text-green-600' : 'text-red-600'}`}>{feedback}</p>}

      {generatedArticle && (
        <div className="bg-blue-50 p-4 rounded-md text-primary-dark border border-blue-200">
          <h3 className="text-xl font-semibold text-textDark mb-3 flex items-center">
            <FileText size={20} className="mr-2"/> Generated Article
          </h3>
          <textarea
            readOnly
            value={generatedArticle}
            rows={15}
            className="w-full p-3 border border-borderLight rounded-md bg-white text-textDark font-mono overflow-auto resize-y"
          ></textarea>
          <button
            onClick={handleCopy}
            className="mt-3 bg-accent text-white py-2 px-6 rounded-lg hover:bg-green-600 transition-colors font-semibold flex items-center justify-center mx-auto"
          >
            <Copy size={20} className="mr-2" /> Copy Article
          </button>
          <p className="text-sm text-gray-600 mt-3">
            (This is a template-based generation. For real AI-quality content, a backend AI model is required.)
          </p>
        </div>
      )}
    </div>
  );
};

export default ArticleGenerator;
