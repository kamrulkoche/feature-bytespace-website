import type { CourseDetail, CourseLesson } from '@/domain/course';
import { courses } from '@/data/courses/courses.data';

const defaultKeyPoints = [
  'Foundational Concepts',
  'Design Principles Mastery',
  'Advanced Techniques in Digital Creation',
  'Project Showcase and Critique',
  'Optimizing for Various Platforms',
  'Digital Asset Management Best Practices',
  'Monetization Strategies',
  'Capstone Project: Building Your Portfolio',
];

const defaultIncludes = [
  'Learning Resources',
  'Quality Lesson Videos',
  'Certificate of Completion',
  'Private Consultation',
];

const defaultPreviewLessons: CourseLesson[] = [
  { id: '01', title: 'Introduction to Digital Assets', duration: '12 mins' },
  { id: '02', title: 'Understanding Design Systems', duration: '21 mins' },
  { id: '03', title: 'Creating Your First Asset Pack', duration: '16 mins' },
];

const defaultSneakPeeks = [
  '/images/home/raw/c1.png',
  '/images/home/raw/c2.png',
  '/images/home/raw/c3.png',
  '/images/home/raw/c4.png',
];

const defaultDescription = [
  'Embark on an enlightening exploration into the world of digital creation with our comprehensive course, "Build Digital Assets: A Comprehensive Guide." This transformative learning experience invites you to delve deep into the intricacies of crafting impactful digital content. From laying the groundwork with foundational concepts to mastering advanced techniques, this guide is meticulously curated to empower you with the skills essential for navigating the dynamic landscape of digital asset creation.',
  "In the initial modules, you'll establish a solid foundation by immersing yourself in the foundational concepts that form the backbone of digital asset creation. Understand the fundamental elements that constitute compelling digital content and gain proficiency in leveraging these elements to communicate effectively in the digital realm.",
  "As you progress through the course, you'll ascend to higher levels of expertise, delving into the nuances of design principles that drive impactful creations. Uncover the secrets behind effective visual communication, exploring color theory, typography, and layout strategies that elevate your digital assets to new heights. Engage in hands-on exercises that reinforce your understanding, allowing you to apply these principles in practical scenarios.",
];

const detailOverrides: Record<
  string,
  Partial<
    Pick<
      CourseDetail,
      | 'title'
      | 'subtitle'
      | 'level'
      | 'rating'
      | 'reviewCount'
      | 'studentsLabel'
      | 'lessonsCountLabel'
      | 'descriptionParagraphs'
      | 'keyPoints'
      | 'videoImage'
    >
  >
> = {
  '1': {
    title: 'Learn Figma from Basic: A Complete Starter Guide',
    subtitle: 'Master interface design fundamentals with hands-on Figma practice',
    level: 'Beginner',
    videoImage: '/images/home/raw/c1.png',
  },
  '2': {
    title: 'Build Digital Asset: A Comprehensive Guide',
    subtitle: 'Unlock the Power of Digital Creation with Expert Guidance',
    level: 'Intermediate',
    rating: '4.8',
    reviewCount: '172 reviews',
    studentsLabel: '199 Students',
    lessonsCountLabel: '112 Lessons (24 hours)',
    videoImage: '/images/home/raw/c2.png',
    descriptionParagraphs: defaultDescription,
    keyPoints: defaultKeyPoints,
  },
  '3': {
    title: 'The Power of Big Data: Practical Insights',
    subtitle: 'Turn complex data into clear decisions and visual stories',
    level: 'Intermediate',
    videoImage: '/images/home/raw/c3.png',
  },
  '4': {
    title: 'Balancing Productivity and Self-Care',
    subtitle: 'Build sustainable focus habits without burning out',
    videoImage: '/images/home/raw/c4.png',
  },
  '5': {
    title: 'Mastering Money Management',
    subtitle: 'Practical frameworks for clearer financial decisions',
    videoImage: '/images/home/raw/c5.png',
  },
  '6': {
    title: 'From Idea to Startup Success',
    subtitle: 'Validate, launch, and grow your first venture with confidence',
    level: 'Intermediate',
    videoImage: '/images/home/raw/c6.png',
  },
};

export const courseDetails: CourseDetail[] = courses.map((course) => {
  const override = detailOverrides[course.id] ?? {};

  return {
    ...course,
    slug: course.id,
    subtitle:
      override.subtitle ??
      'Learn practical skills with expert guidance and project-based lessons',
    level: override.level ?? course.level,
    rating: override.rating ?? course.rating,
    reviewCount: override.reviewCount ?? '112 reviews',
    studentsLabel: override.studentsLabel ?? '999 Students',
    lessonsCountLabel: override.lessonsCountLabel ?? '112 Lessons (24 hours)',
    title: override.title ?? course.title,
    descriptionParagraphs: override.descriptionParagraphs ?? defaultDescription,
    keyPoints: override.keyPoints ?? defaultKeyPoints,
    sneakPeeks: defaultSneakPeeks,
    videoImage: override.videoImage ?? course.image,
    includes: defaultIncludes,
    previewLessons: defaultPreviewLessons,
    moreVideosLabel: '99 more videos',
    enrollPitch:
      'Ready to Dive In? Enroll Now and Start Building Your Digital Future!',
    instructor: {
      name: 'PurePearl Studio',
      role: 'Professional Creator',
      avatar: '/images/home/10-3215.png',
      bio: 'Ready to Dive In? Enroll Now and Start Building Your Digital Future!',
      profileHref: '/creators/purepearl',
    },
  };
});

export const getCourseById = (id: string) => {
  const direct = courseDetails.find(
    (course) => course.id === id || course.slug === id
  );
  if (direct) return direct;

  const baseId = id.split('-')[0];
  return courseDetails.find(
    (course) => course.id === baseId || course.slug === baseId
  );
};
