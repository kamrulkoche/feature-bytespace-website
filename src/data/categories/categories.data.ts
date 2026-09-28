import type { Category } from '@/domain/category';

export const courseTags = [
  { label: 'Featured', active: true },
  { label: 'Music', active: false },
  { label: 'Drawing & Painting', active: false },
  { label: 'Marketing', active: false },
  { label: 'Animation', active: false },
  { label: 'Social Media', active: false },
  { label: 'UI/UX Design', active: false },
  { label: 'Creative Marketing', active: false },
  { label: 'Digital Illustration', active: false },
  { label: 'Film & Video', active: false },
  { label: 'Crafts', active: false },
  { label: 'Freelance & Entrepreneurship', active: false },
  { label: 'Graphic Design', active: false },
  { label: 'Photography', active: false },
  { label: 'Productivity', active: false },
  { label: 'Web Development', active: false },
  { label: 'Data Science', active: false },
  { label: 'Cooking', active: false },
];

export const featuredCategories: Category[] = [
  { id: 'design', name: 'Design', icon: 'pen-tool' },
  { id: 'development', name: 'Development', icon: 'code-2' },
  { id: 'it', name: 'IT & Software', icon: 'monitor' },
  { id: 'business', name: 'Business', icon: 'building-2' },
  { id: 'marketing', name: 'Marketing', icon: 'megaphone' },
  { id: 'photography', name: 'Photography', icon: 'camera' },
];

export const learningPaths: Category[] = [
  { id: 'design', name: 'Design', icon: 'pen-tool' },
  { id: 'development', name: 'Development', icon: 'code-2' },
  { id: 'it', name: 'IT & Software', icon: 'monitor' },
  { id: 'business', name: 'Business', icon: 'building-2' },
  { id: 'marketing', name: 'Marketing', icon: 'megaphone' },
  { id: 'photography', name: 'Photography', icon: 'camera' },
];
