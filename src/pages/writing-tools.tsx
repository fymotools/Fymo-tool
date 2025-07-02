// src/pages/writing-tools.tsx
import React from 'react';
import ToolContainer from '../components/Tools/ToolContainer';
import BlogTitleGenerator from '../components/Tools/Writing/BlogTitleGenerator';
import WordCounter from '../components/Tools/Writing/WordCounter';
import SentenceRewriter from '../components/Tools/Writing/SentenceRewriter'; // NEW IMPORT
import TextCaseConverter from '../components/Tools/Writing/TextCaseConverter'; // NEW IMPORT
import ArticleGenerator from '../components/Tools/Writing/ArticleGenerator'; // NEW IMPORT
import EssayOutlineGenerator from '../components/Tools/Writing/EssayOutlineGenerator'; // NEW IMPORT

const WritingToolsPage: React.FC = () => {
  return (
    <ToolContainer
      title="Writing Tools"
      description="Enhance your writing with our text analysis, rewriting, formatting, and content generation tools."
    >
      <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
        <BlogTitleGenerator />
        <WordCounter />
        <SentenceRewriter /> {/* ADDED */}
        <TextCaseConverter /> {/* ADDED */}
        <ArticleGenerator /> {/* ADDED */}
        <EssayOutlineGenerator /> {/* ADDED */} {/* Agar 5 tools se zyada ho gaye to aap apni pasand ke hisab se select kar lena. Maine 6 bana diye hain taaki options zyada hon. */}
      </div>
    </ToolContainer>
  );
};

export default WritingToolsPage;
