export type Course = {
  id: string;
  title: string;
  author: string;
  image: string;
  lessons: string;
  duration: string;
  comments: string;
  level: string;
  students: string;
  price: string;
  rating: string;
};

export type Category = {
  id: string;
  name: string;
  icon: string;
};

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  quote: string;
  avatar: string;
};

export const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Courses', href: '/search' },
  { label: 'Creators', href: '/creators/purepearl' },
];

export const partnerLogos = [
  'Logoipsum',
  'Logoipsum',
  'Logoipsum',
  'Logoipsum',
  'Logoipsum',
];

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

export const courses: Course[] = [
  {
    id: '1',
    title: 'Learn Figma from Basic',
    author: 'by purepearl studio',
    image: '/images/home/raw/c1.png',
    lessons: '17 Lessons',
    duration: '2 hours 16 mins',
    comments: '59 Comments',
    level: 'Beginner',
    students: '26+',
    price: '$25',
    rating: '4.5',
  },
  {
    id: '2',
    title: 'Build Digital Asset',
    author: 'by purepearl studio',
    image: '/images/home/raw/c2.png',
    lessons: '17 Lessons',
    duration: '2 hours 16 mins',
    comments: '59 Comments',
    level: 'Beginner',
    students: '26+',
    price: '$25',
    rating: '4.5',
  },
  {
    id: '3',
    title: 'the Power of Big Data',
    author: 'by purepearl studio',
    image: '/images/home/raw/c3.png',
    lessons: '17 Lessons',
    duration: '2 hours 16 mins',
    comments: '59 Comments',
    level: 'Beginner',
    students: '26+',
    price: '$25',
    rating: '4.5',
  },
  {
    id: '4',
    title: 'Balancing Productivity and Self-Care',
    author: 'by purepearl studio',
    image: '/images/home/raw/c4.png',
    lessons: '17 Lessons',
    duration: '2 hours 16 mins',
    comments: '59 Comments',
    level: 'Beginner',
    students: '26+',
    price: '$25',
    rating: '4.5',
  },
  {
    id: '5',
    title: 'Mastering Money Management',
    author: 'by purepearl studio',
    image: '/images/home/raw/c5.png',
    lessons: '17 Lessons',
    duration: '2 hours 16 mins',
    comments: '59 Comments',
    level: 'Beginner',
    students: '26+',
    price: '$25',
    rating: '4.5',
  },
  {
    id: '6',
    title: 'From Idea to Startup Success',
    author: 'by purepearl studio',
    image: '/images/home/raw/c6.png',
    lessons: '17 Lessons',
    duration: '2 hours 16 mins',
    comments: '59 Comments',
    level: 'Beginner',
    students: '26+',
    price: '$25',
    rating: '4.5',
  },
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

export const growthFeatures = [
  'Share Your Expertise',
  'Monetize Your Passion',
  'Flexibility and Autonomy',
  'Build a Community',
];

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah M.',
    role: 'Enthusiastic Learner',
    quote:
      '"ByteSpace has transformed my approach to learning. The diverse range of courses and the quality of content provided by creators have exceeded my expectations. The platform truly fosters a sense of community and lifelong learning."',
    avatar: '/images/home/10-3215.png',
  },
  {
    id: '2',
    name: 'James L.',
    role: 'Lifelong Learner',
    quote:
      '"I\'ve tried several online learning platforms, and ByteSpace stands out for its vibrant community and the variety of courses available. The easy navigation and engaging content make it a go-to platform for continuous skill development."',
    avatar: '/images/home/10-3221.png',
  },
  {
    id: '3',
    name: 'Alex B.',
    role: 'Inspired Creator',
    quote:
      '"As a creator, ByteSpace has been a game-changer for me. The Course Editor is user-friendly, and the support from the community is incredible. It\'s fulfilling to see my courses making a positive impact on learners globally."',
    avatar: '/images/home/10-3227.png',
  },
];

export const footerBrowse = [
  'Featured Courses',
  'Featured Categories',
  'Business',
  'IT',
  'Design',
  'Development',
  'Marketing',
  'Photography',
  'Finance',
  'Sport',
];

export const footerPlatform = [
  'Become a Creator',
  'Affiliate Program',
  'Contact',
  'Help',
  'About',
];

export const studentAvatars = [
  '/images/home/10-2772.png',
  '/images/home/10-2773.png',
  '/images/home/10-2774.png',
  '/images/home/10-2775.png',
];
