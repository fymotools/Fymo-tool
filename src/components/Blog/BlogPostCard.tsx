// src/components/Blog/BlogPostCard.tsx
import Link from 'next/link';
import Image from 'next/image';

interface BlogPostCardProps {
  slug: string;
  title: string;
  description: string;
  date: string;
  imageUrl: string;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ slug, title, description, date, imageUrl }) => {
  return (
    <Link
      href={`/blog/${slug}`}
      className="bg-white rounded-xl shadow-soft hover:shadow-medium transition-shadow duration-300 overflow-hidden flex flex-col"
    >
      <div className="relative w-full h-48">
        <Image
          src={imageUrl}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: 'cover' }}
          className="transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold text-textDark mb-2 line-clamp-2">{title}</h3>
        <p className="text-textLight text-sm mb-4 flex-grow line-clamp-3">{description}</p>
        <p className="text-xs text-gray-500 mt-auto">{date}</p>
      </div>
    </Link>
  );
};

export default BlogPostCard;
