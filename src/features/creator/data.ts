import { courses, Course } from '@/features/home/data';

export type CreatorProfile = {
  id: string;
  name: string;
  role: string;
  avatar: string;
  welcome: string;
  portfolioBlurb: string;
  productsCount: string;
  followersCount: string;
  courses: Course[];
};

export const creators: CreatorProfile[] = [
  {
    id: 'purepearl',
    name: 'PurePearl Studio',
    role: 'Professional Creator',
    avatar: '/images/home/10-3215.png',
    welcome:
      "Welcome to the creative world of PurePearl Studio. Here, you'll discover the passion, expertise, and inspiration that drive my creative journey. Let's explore and learn together!",
    portfolioBlurb:
      'Dive into my creative portfolio, showcasing a glimpse of my artistic endeavors. From digital designs to multimedia projects, each piece tells a unique story. Explore the world of creativity with me.',
    productsCount: '3',
    followersCount: '12',
    courses: courses.slice(0, 6),
  },
];

export const getCreatorById = (id: string) =>
  creators.find(
    (creator) =>
      creator.id === id ||
      creator.name.toLowerCase().replace(/\s+/g, '-') === id.toLowerCase()
  );
