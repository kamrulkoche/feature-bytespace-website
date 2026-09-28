import {
  Building2,
  Camera,
  Code2,
  Megaphone,
  Monitor,
  PenTool,
  type LucideIcon,
} from 'lucide-react';
import { Category } from '@/features/home/data';

const iconMap: Record<string, LucideIcon> = {
  'pen-tool': PenTool,
  'code-2': Code2,
  monitor: Monitor,
  'building-2': Building2,
  megaphone: Megaphone,
  camera: Camera,
};

type CategoryCardProps = {
  category: Category;
  variant?: 'featured' | 'path';
};

const CategoryCard = ({
  category,
  variant = 'featured',
}: CategoryCardProps) => {
  const Icon = iconMap[category.icon] ?? PenTool;
  const isPath = variant === 'path';

  return (
    <article
      className={`flex flex-col items-center justify-center rounded-[28px] bg-surface-muted text-center transition hover:-translate-y-1 hover:shadow-card ${
        isPath ? 'aspect-square gap-4 p-6' : 'min-h-[167px] gap-3 p-5'
      }`}
    >
      <span
        className={`inline-flex items-center justify-center rounded-2xl ${
          isPath
            ? 'h-14 w-14 bg-accent text-ink'
            : 'h-12 w-12 bg-white text-ink-faint'
        }`}
      >
        <Icon size={isPath ? 28 : 24} strokeWidth={1.75} />
      </span>
      <p
        className={`font-medium text-ink ${
          isPath ? 'text-xl' : 'text-lg'
        }`}
      >
        {category.name}
      </p>
    </article>
  );
};

export default CategoryCard;
