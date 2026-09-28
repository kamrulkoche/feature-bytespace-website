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

export type CourseLesson = {
  id: string;
  title: string;
  duration: string;
  preview?: boolean;
};

export type CourseDetail = Course & {
  slug: string;
  subtitle: string;
  reviewCount: string;
  studentsLabel: string;
  lessonsCountLabel: string;
  descriptionParagraphs: string[];
  keyPoints: string[];
  sneakPeeks: string[];
  videoImage: string;
  includes: string[];
  previewLessons: CourseLesson[];
  moreVideosLabel: string;
  enrollPitch: string;
  instructor: {
    name: string;
    role: string;
    avatar: string;
    bio: string;
    profileHref: string;
  };
};
