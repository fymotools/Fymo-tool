// src/components/UI/ToolCard.tsx
import Link from 'next/link';
import { LucideIcon } from 'lucide-react'; // Import LucideIcon type

interface ToolCardProps {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon; // Expects a Lucide icon component
}

const ToolCard: React.FC<ToolCardProps> = ({ title, description, href, icon: Icon }) => {
  return (
    <Link
      href={href}
      className="bg-white p-6 rounded-xl shadow-soft hover:shadow-medium transition-shadow duration-300 flex flex-col items-center text-center"
    >
      <div className="mb-4 p-3 bg-primary-100 rounded-full"> {/* You can define primary-100 in tailwind config */}
        <Icon size={40} className="text-primary" />
      </div>
      <h3 className="text-xl font-semibold text-textDark mb-2">{title}</h3>
      <p className="text-textLight text-sm">{description}</p>
    </Link>
  );
};

export default ToolCard;
