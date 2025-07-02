// src/components/Layout/Header.tsx
import Link from 'next/link';
import { useState } from 'react';
import { ChevronDown, Menu, X, Globe, Heart } from 'lucide-react'; // For icons
import LanguageToggle from '../UI/LanguageToggle'; // We'll create this soon
import WhatsAppButton from '../UI/WhatsAppButton'; // We'll create this soon

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isToolsDropdownOpen, setIsToolsDropdownOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleToolsDropdown = () => setIsToolsDropdownOpen(!isToolsDropdownOpen);

  return (
    <header className="bg-white shadow-soft sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          {/* Replace with your actual Fymo Tools logo image */}
          <span className="text-2xl font-bold text-primary">Fymo Tools</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <div className="relative">
            <button
              onClick={toggleToolsDropdown}
              className="flex items-center text-textDark hover:text-primary transition-colors text-lg font-medium"
            >
              Tools <ChevronDown size={18} className={`ml-1 transition-transform ${isToolsDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            {isToolsDropdownOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-white border border-borderLight rounded-lg shadow-medium py-2 z-10">
                <Link href="/tax-tools" className="block px-4 py-2 text-textDark hover:bg-gray-100">Tax Tools</Link>
                <Link href="/health-tools" className="block px-4 py-2 text-textDark hover:bg-gray-100">Health Tools</Link>
                <Link href="/writing-tools" className="block px-4 py-2 text-textDark hover:bg-gray-100">Writing Tools</Link>
                <Link href="/seo-tools" className="block px-4 py-2 text-textDark hover:bg-gray-100">SEO Tools</Link>
                <Link href="/image-tools" className="block px-4 py-2 text-textDark hover:bg-gray-100">Image Tools</Link>
                <Link href="/daily-tools" className="block px-4 py-2 text-textDark hover:bg-gray-100">Daily Tools</Link>
              </div>
            )}
          </div>
          <Link href="/blog" className="text-textDark hover:text-primary transition-colors text-lg font-medium">Blog</Link>
          <Link href="/contact" className="text-textDark hover:text-primary transition-colors text-lg font-medium">Contact</Link>
          <Link href="/donate" className="text-textDark hover:text-primary transition-colors text-lg font-medium flex items-center">
            <Heart size={20} className="mr-1 text-red-500" /> Donate
          </Link>
          <LanguageToggle />
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-4">
          <LanguageToggle />
          <button onClick={toggleMobileMenu} className="text-textDark focus:outline-none">
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-white bg-opacity-95 z-40 flex flex-col items-center justify-center space-y-6 animate-fade-in">
          <button onClick={toggleMobileMenu} className="absolute top-4 right-4 text-textDark">
            <X size={32} />
          </button>
          <Link href="/" className="text-2xl font-bold text-primary" onClick={toggleMobileMenu}>Home</Link>
          <div className="w-full text-center">
            <button
              onClick={toggleToolsDropdown}
              className="flex items-center justify-center mx-auto text-2xl font-semibold text-textDark hover:text-primary transition-colors"
            >
              Tools <ChevronDown size={24} className={`ml-2 transition-transform ${isToolsDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            {isToolsDropdownOpen && (
              <div className="mt-4 flex flex-col space-y-3">
                <Link href="/tax-tools" className="block text-xl text-textLight hover:text-primary" onClick={toggleMobileMenu}>Tax Tools</Link>
                <Link href="/health-tools" className="block text-xl text-textLight hover:text-primary" onClick={toggleMobileMenu}>Health Tools</Link>
                <Link href="/writing-tools" className="block text-xl text-textLight hover:text-primary" onClick={toggleMobileMenu}>Writing Tools</Link>
                <Link href="/seo-tools" className="block text-xl text-textLight hover:text-primary" onClick={toggleMobileMenu}>SEO Tools</Link>
                <Link href="/image-tools" className="block text-xl text-textLight hover:text-primary" onClick={toggleMobileMenu}>Image Tools</Link>
                <Link href="/daily-tools" className="block text-xl text-textLight hover:text-primary" onClick={toggleMobileMenu}>Daily Tools</Link>
              </div>
            )}
          </div>
          <Link href="/blog" className="text-2xl font-semibold text-textDark hover:text-primary" onClick={toggleMobileMenu}>Blog</Link>
          <Link href="/contact" className="text-2xl font-semibold text-textDark hover:text-primary" onClick={toggleMobileMenu}>Contact</Link>
          <Link href="/donate" className="text-2xl font-semibold text-textDark hover:text-primary flex items-center" onClick={toggleMobileMenu}>
            <Heart size={28} className="mr-2 text-red-500" /> Donate
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
