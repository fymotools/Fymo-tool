// src/components/Layout/Layout.tsx
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import WhatsAppButton from '../UI/WhatsAppButton'; // For the floating WhatsApp button

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      <Footer />
      <WhatsAppButton /> {/* Floating WhatsApp button */}
    </div>
  );
};

export default Layout;
