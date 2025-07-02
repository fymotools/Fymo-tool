// src/components/UI/LanguageToggle.tsx
import { Globe } from 'lucide-react';

const LanguageToggle: React.FC = () => {
  // In a real app, you'd use React Context or a library like next-i18next
  // to manage the actual language state and switch locale.
  const currentLang = 'EN'; // Placeholder: 'EN' or 'ES'
  const toggleLanguage = () => {
    alert(`Language changed to ${currentLang === 'EN' ? 'Spanish' : 'English'} (simulated)`);
    // Logic to actually change language
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center text-textDark hover:text-primary transition-colors text-lg font-medium px-3 py-1 rounded-md border border-borderLight focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
      aria-label="Toggle Language"
    >
      <Globe size={20} className="mr-1" />
      {currentLang}
    </button>
  );
};

export default LanguageToggle;
