// src/pages/about-us.tsx
import Head from 'next/head';

const AboutUs: React.FC = () => {
  return (
    <>
      <Head>
        <title>About Us - Fymo Tools</title>
        <meta name="description" content="Learn more about Fymo Tools and our mission to provide free and useful online utilities." />
      </Head>
      <div className="max-w-3xl mx-auto py-8">
        <h1 className="text-4xl md:text-5xl font-bold text-textDark mb-6 text-center">About Fymo Tools</h1>
        <p className="text-textLight text-lg mb-4">
          Welcome to Fymo Tools, your ultimate destination for a wide range of free, fast, and easy-to-use online tools. Our mission is to simplify your daily tasks and provide efficient solutions for various needs.
        </p>
        <p className="text-textLight text-lg mb-4">
          Whether you're looking for financial calculators, health trackers, writing aids, SEO optimizations, image editing tools, or general daily utilities, Fymo Tools has got you covered. We strive to offer a clean, intuitive, and mobile-friendly experience to all our users.
        </p>
        <p className="text-textLight text-lg">
          We are constantly working to expand our collection of tools and improve existing ones. Your feedback is valuable to us! Thank you for choosing Fymo Tools.
        </p>
      </div>
    </>
  );
};

export default AboutUs;
