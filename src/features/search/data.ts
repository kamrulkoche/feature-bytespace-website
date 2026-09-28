export {
  type Course,
  courses,
  studentAvatars,
} from '@/features/home/data';

export const searchCategoryTags = [
  'Featured',
  'Music',
  'Drawing & Painting',
  'Marketing',
  'Animation',
  'Social Media',
  'UI/UX Design',
  'Creative Marketing',
  'Cooking',
] as const;

export const searchFilterOptions = [
  { id: 'filter', label: 'Filter', icon: 'filter' },
  { id: 'level', label: 'Level', icon: 'bar-chart-3' },
  { id: 'category', label: 'Category', icon: 'shapes' },
] as const;

export const searchSortOptions = [
  'Most relevant',
  'Newest',
  'Highest rated',
  'Price: low to high',
  'Price: high to low',
] as const;

export const searchTypeOptions = ['Courses', 'Creators', 'Categories'] as const;

export const SEARCH_PAGE_SIZE = 18;
export const SEARCH_TOTAL_PAGES = 5;
