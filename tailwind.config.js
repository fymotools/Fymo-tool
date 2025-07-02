// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}', // Ensures all files in src are scanned
    './pages/**/*.{js,ts,jsx,tsx,mdx}', // Also good to include if pages folder is directly in root
    './components/**/*.{js,ts,jsx,tsx,mdx}', // If you create a components folder outside src
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6', // Blue-600
        secondary: '#60A5FA', // Blue-400
        accent: '#10B981', // Green-500 for success/highlights
        background: '#F9FAFB', // Light gray background
        textDark: '#1F2937', // Dark gray for main text
        textLight: '#4B5563', // Medium gray for secondary text
        borderLight: '#E5E7EB', // Light border color
      },
      boxShadow: {
        soft: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
        medium: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      borderRadius: {
        'xl': '0.75rem', // 12px
        '2xl': '1rem',   // 16px
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Add Inter font
      },
    },
  },
  plugins: [],
};
export default config;
