// src/pages/seo-tools.tsx
import React from 'react';
import ToolContainer from '../components/Tools/ToolContainer';
import MetaTagGenerator from '../components/Tools/SEO/MetaTagGenerator';
import KeywordDensityChecker from '../components/Tools/SEO/KeywordDensityChecker';
import RobotsTxtGenerator from '../components/Tools/SEO/RobotsTxtGenerator'; // NEW IMPORT
import XMLSitemapGenerator from '../components/Tools/SEO/XMLSitemapGenerator'; // NEW IMPORT
import URLEncoderDecoder from '../components/Tools/SEO/URLEncoderDecoder'; // NEW IMPORT

const SEOToolsPage: React.FC = () => {
  return (
    <ToolContainer
      title="SEO Tools"
      description="Optimize your website for search engines with our free and easy-to-use SEO tools."
    >
      <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
        <MetaTagGenerator />
        <KeywordDensityChecker />
        <RobotsTxtGenerator /> {/* ADDED */}
        <XMLSitemapGenerator /> {/* ADDED */}
        <URLEncoderDecoder /> {/* ADDED */}
      </div>
    </ToolContainer>
  );
};

export default SEOToolsPage;
