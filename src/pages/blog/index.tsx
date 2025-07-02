// src/pages/blog/index.tsx
import Head from 'next/head';
import BlogPostCard from '../../components/Blog/BlogPostCard';

const BlogPage: React.FC = () => {
  // Placeholder data for blog posts. In a real project, this would come from a CMS or markdown files.
  const blogPosts = [
    {
      slug: 'understanding-income-tax-pakistan',
      title: 'Understanding Income Tax in Pakistan: A Beginner\'s Guide',
      description: 'A comprehensive guide to understanding the basics of income tax, tax slabs, and filing procedures in Pakistan.',
      date: 'June 25, 2025',
      imageUrl: 'https://via.placeholder.com/600x400/D1F0E0/10B981?text=Income+Tax', // Example image
    },
    {
      slug: 'benefits-of-bmi-calculator',
      title: 'The Hidden Benefits of Using a BMI Calculator Regularly',
      description: 'Discover how regularly checking your BMI can help you maintain a healthy lifestyle and achieve your fitness goals.',
      date: 'June 20, 2025',
      imageUrl: 'https://via.placeholder.com/600x400/E0E7FF/3B82F6?text=BMI+Calculator', // Example image
    },
    {
      slug: 'mastering-seo-meta-descriptions',
      title: 'Mastering SEO Meta Descriptions for Higher Click-Through Rates',
      description: 'Learn the art of crafting compelling meta descriptions that not only attract search engines but also entice users to click.',
      date: 'June 18, 2025',
      imageUrl: 'https://via.placeholder.com/600x400/FFFBEA/F59E0B?text=SEO+Meta', // Example image
    },
    {
      slug: 'daily-tools-for-productivity',
      title: 'Top 5 Daily Tools to Boost Your Productivity',
      description: 'Explore essential online tools that can help you manage your time, organize tasks, and boost overall productivity.',
      date: 'June 15, 2025',
      imageUrl: 'https://via.placeholder.com/600x400/FFE7D1/FF7B00?text=Productivity', // Example image
    },
    // Add more blog posts as needed
  ];

  return (
    <>
      <Head>
        <title>Blog - Fymo Tools</title>
        <meta name="description" content="Read insightful articles and guides on various topics related to tax, health, writing, SEO, and daily tools." />
      </Head>
      <div className="max-w-5xl mx-auto py-8">
        <h1 className="text-4xl md:text-5xl font-bold text-textDark mb-10 text-center">Our Blog</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <BlogPostCard key={post.slug} {...post} />
          ))}
        </div>
      </div>
    </>
  );
};

export default BlogPage;
