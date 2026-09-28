import type { Course } from '@/domain/course';

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
