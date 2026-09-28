import CourseDetailsView from '@/features/course-details/components/CourseDetailsView';
import {
  courseDetails,
  getCourseById,
} from '@/data/courses/course-details.data';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

type CourseDetailsPageProps = {
  params: Promise<{ id: string }>;
};

export const generateStaticParams = () =>
  courseDetails.map((course) => ({ id: course.id }));

export const generateMetadata = async ({
  params,
}: CourseDetailsPageProps): Promise<Metadata> => {
  const { id } = await params;
  const course = getCourseById(id);

  if (!course) {
    return { title: 'Course Not Found | ByteSpace' };
  }

  return {
    title: `${course.title} | ByteSpace`,
    description: course.descriptionParagraphs[0],
  };
};

const CourseDetailsPage = async ({ params }: CourseDetailsPageProps) => {
  const { id } = await params;
  const course = getCourseById(id);

  if (!course) {
    notFound();
  }

  return <CourseDetailsView course={course} />;
};

export default CourseDetailsPage;
