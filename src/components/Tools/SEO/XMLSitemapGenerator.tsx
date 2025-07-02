// src/components/Tools/SEO/XMLSitemapGenerator.tsx
import React, { useState } from 'react';
import { Code, Link, RefreshCcw, Copy } from 'lucide-react';

const XMLSitemapGenerator: React.FC = () => {
  const [urls, setUrls] = useState<string>('https://www.fymotools.com/\nhttps://www.fymotools.com/tax-tools\nhttps://www.fymotools.com/image-tools');
  const [generatedSitemap, setGeneratedSitemap] = useState<string>('');
  const [feedback, setFeedback] = useState<string>('');

  const generateSitemap = () => {
    const urlList = urls.split('\n').map(u => u.trim()).filter(u => u.length > 0 && u.startsWith('http'));

    if (urlList.length === 0) {
      setFeedback('Please enter valid URLs (one per line, starting with http/https).');
      setGeneratedSitemap('');
      return;
    }

    let sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    urlList.forEach(url => {
      sitemapContent += `
  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
    });

    sitemapContent += `
</urlset>`;

    setGeneratedSitemap(sitemapContent);
    setFeedback('XML Sitemap generated!');
  };

  const handleCopy = () => {
    if (generatedSitemap) {
      navigator.clipboard.writeText(generatedSitemap);
      setFeedback('Sitemap content copied to clipboard!');
      setTimeout(() => setFeedback(''), 2000);
    }
  };

  const handleReset = () => {
    setUrls('https://www.fymotools.com/\nhttps://www.fymotools.com/tax-tools\nhttps://www.fymotools.com/image-tools');
    setGeneratedSitemap('');
    setFeedback('');
  };

  return (
    <div className="flex flex-col space-y-4">
      <h2 className="text-2xl font-semibold text-textDark mb-4">XML Sitemap Generator</h2>
      <p className="text-textLight mb-4">
        Generate a basic XML sitemap for your website. Simply enter your URLs (one per line) to create the sitemap structure.
      </p>

      <div>
        <label htmlFor="sitemap-urls" className="block text-textDark text-sm font-medium mb-2">
          Enter URLs (one per line, full URL including http/https)
        </label>
        <textarea
          id="sitemap-urls"
          value={urls}
          onChange={(e) => setUrls(e.target.value)}
          rows={8}
          placeholder="https://www.example.com/\nhttps://www.example.com/about\nhttps://www.example.com/products"
          className="w-full p-3 border border-borderLight rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-y"
        ></textarea>
      </div>

      <div className="flex space-x-4">
        <button
          onClick={generateSitemap}
          className="flex-1 bg-primary text-white py-3 px-6 rounded-lg hover:bg-secondary transition-colors font-semibold flex items-center justify-center"
        >
          <Code size={20} className="mr-2" /> Generate Sitemap
        </button>
        <button
          onClick={handleReset}
          className="px-4 py-2 border border-red-300 rounded-lg text-red-600 hover:bg-red-50 transition-colors font-medium flex items-center"
        >
          <RefreshCcw size={18} className="mr-2" /> Reset
        </button>
      </div>

      {feedback && <p className={`text-sm ${feedback.includes('copied') || feedback.includes('generated') ? 'text-green-600' : 'text-red-600'}`}>{feedback}</p>}

      {generatedSitemap && (
        <div className="bg-blue-50 p-4 rounded-md text-primary-dark border border-blue-200">
          <h3 className="text-xl font-semibold text-textDark mb-3">Generated XML Sitemap:</h3>
          <textarea
            readOnly
            value={generatedSitemap}
            rows={10}
            className="w-full p-3 border border-borderLight rounded-md bg-white text-textDark font-mono overflow-auto resize-y"
          ></textarea>
          <button
            onClick={handleCopy}
            className="mt-3 bg-accent text-white py-2 px-6 rounded-lg hover:bg-green-600 transition-colors font-semibold flex items-center justify-center mx-auto"
          >
            <Copy size={20} className="mr-2" /> Copy Content
          </button>
          <p className="text-sm text-gray-600 mt-3">
            Save this content as `sitemap.xml` and place it in the root directory of your website. Also, submit it to Google Search Console.
          </p>
        </div>
      )}
    </div>
  );
};

export default XMLSitemapGenerator;
