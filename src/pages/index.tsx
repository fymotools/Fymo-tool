// src/pages/index.tsx
import Head from 'next/head';
import ToolCard from '../components/UI/ToolCard'; // Assuming ToolCard is in src/components/UI
import { Calculator, HeartPulse, PenTool, Search, Image, Clock } from 'lucide-react'; // Lucide icons for categories

export default function Home() {
  const toolCategories = [
    {
      title: 'Tax Tools',
      description: 'Calculate income tax, GST, sales tax, and property tax.',
      href: '/tax-tools',
      icon: Calculator,
    },
    {
      title: 'Health Tools',
      description: 'BMI, BMR, ideal weight, water intake, and calorie calculators.',
      href: '/health-tools',
      icon: HeartPulse,
    },
    {
      title: 'Writing Tools',
      description: 'Generate articles, blog titles, summaries, and meta descriptions.',
      href: '/writing-tools',
      icon: PenTool,
    },
    {
      title: 'SEO Tools',
      description: 'Generate meta tags, robots.txt, check keyword density, and sitemaps.',
      href: '/seo-tools',
      icon: Search,
    },
    {
      title: 'Image Tools',
      description: 'Compress, resize, convert images, and apply filters.',
      href: '/image-tools',
      icon: Image,
    },
    {
      title: 'Daily Tools',
      description: 'Age calculator, loan EMI, screen recorder, unit converter, and notes.',
      href: '/daily-tools',
      icon: Clock,
    },
  ];

  return (
    <>
      <Head>
        <title>Fymo Tools - Your Go-To Online Tools</title>
        <meta name="description" content="Access a wide range of free online tools for various needs including tax, health, writing, SEO, image, and daily utilities." />
        {/* Open Graph and Twitter tags are in _app.tsx for global defaults */}
      </Head>

      <section className="text-center py-16 md:py-24 bg-background">
        <h1 className="text-5xl md:text-7xl font-extrabold text-textDark mb-6 leading-tight">
          Your <span className="text-primary">Everyday Tools</span>, All in One Place
        </h1>
        <p className="text-xl md:text-2xl text-textLight max-w-3xl mx-auto mb-10">
          Simplify your life with our collection of free, fast, and easy-to-use online tools for tax, health, writing, SEO, image editing, and daily utilities.
        </p>
        {/* Search Bar Placeholder */}
        <div className="max-w-xl mx-auto mb-16 px-4">
          <input
            type="text"
            placeholder="Search for a tool..."
            className="w-full p-4 text-lg border border-borderLight rounded-xl shadow-soft focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
        </div>
      </section>

      <section className="py-12 md:py-16">
        <h2 className="text-4xl md:text-5xl font-bold text-textDark text-center mb-12">
          Explore Our <span className="text-primary">Tool Categories</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {toolCategories.map((category) => (
            <ToolCard
              key={category.title}
              title={category.title}
              description={category.description}
              href={category.href}
              icon={category.icon}
            />
          ))}
        </div>
      </section>

      {/* Add a section for Newsletter/Feedback Form here later */}
    </>
  );
}
