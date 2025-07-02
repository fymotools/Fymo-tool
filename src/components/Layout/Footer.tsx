// src/components/Layout/Footer.tsx
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white shadow-inner border-t border-borderLight py-8 mt-12">
      <div className="container mx-auto px-4 text-center md:flex md:justify-between md:items-center">
        {/* Copyright */}
        <p className="text-textLight text-sm mb-4 md:mb-0">
          © {new Date().getFullYear()} Fymo Tools. All rights reserved.
        </p>

        {/* Navigation Links */}
        <nav className="flex flex-wrap justify-center md:justify-end space-x-6 text-textLight text-sm font-medium">
          <Link href="/about-us" className="hover:text-primary transition-colors whitespace-nowrap">About Us</Link>
          <Link href="/privacy-policy" className="hover:text-primary transition-colors whitespace-nowrap">Privacy Policy</Link>
          <Link href="/contact" className="hover:text-primary transition-colors whitespace-nowrap">Contact</Link>
          <Link href="/donate" className="hover:text-primary transition-colors whitespace-nowrap">Donate</Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
