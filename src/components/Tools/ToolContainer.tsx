// src/components/Tools/ToolContainer.tsx
import React from 'react';
import Head from 'next/head';

interface ToolContainerProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

const ToolContainer: React.FC<ToolContainerProps> = ({ title, description, children }) => {
  return (
    <>
      <Head>
        <title>{title} - Fymo Tools</title>
        <meta name="description" content={description} />
      </Head>
      <div className="max-w-4xl mx-auto py-8">
        <h1 className="text-4xl md:text-5xl font-bold text-textDark mb-6 text-center">{title}</h1>
        <p className="text-textLight text-lg mb-10 text-center max-w-2xl mx-auto">
          {description}
        </p>
        <div className="bg-white p-6 rounded-xl shadow-medium">
          {children}
        </div>
      </div>
    </>
  );
};

export default ToolContainer;
