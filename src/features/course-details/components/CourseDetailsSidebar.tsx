'use client';

import Button from '@/shared/components/Button/Button';
import { CourseDetail } from '@/domain/course';
import { getAuthUser } from '@/shared/lib/auth';
import {
  Award,
  BarChart3,
  FolderOpen,
  Share2,
  Star,
  Users,
  Video,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type CourseDetailsSidebarProps = {
  course: CourseDetail;
};

const includeIcons = [FolderOpen, Video, Award, Users];

const CourseDetailsSidebar = ({ course }: CourseDetailsSidebarProps) => {
  const router = useRouter();
  const [showAllLessons, setShowAllLessons] = useState(false);
  const [enrollStatus, setEnrollStatus] = useState<'idle' | 'enrolled'>('idle');

  const visibleLessons = showAllLessons
    ? [
        ...course.previewLessons,
        {
          id: '04',
          title: 'Publishing and Portfolio Review',
          duration: '18 mins',
        },
        {
          id: '05',
          title: 'Advanced Workflow Tips',
          duration: '22 mins',
        },
        {
          id: '06',
          title: 'Final Capstone Project',
          duration: '30 mins',
        },
      ]
    : course.previewLessons;

  const handleEnroll = () => {
    if (!getAuthUser()) {
      router.push(`/login?next=${encodeURIComponent(`/courses/${course.id}`)}`);
      return;
    }
    setEnrollStatus('enrolled');
  };

  return (
    <aside className="rounded-[28px] border border-[#E8E9EC] bg-white p-5 shadow-float sm:p-6 lg:p-7">
      <h2 className="font-display text-lg font-semibold text-ink sm:text-xl">
        {course.lessonsCountLabel}
      </h2>

      <ul className="mt-5 space-y-4">
        {visibleLessons.map((lesson) => (
          <li
            key={lesson.id}
            className="flex items-start justify-between gap-3 text-sm leading-snug"
          >
            <span className="min-w-0">
              <span className="mr-1.5 text-ink-faint">{lesson.id}</span>
              <span className="text-ink">{lesson.title}</span>
            </span>
            <span className="shrink-0 font-medium text-brand">
              {lesson.duration}
            </span>
          </li>
        ))}
      </ul>

      <button
        type="button"
        className="mt-3 text-sm text-ink-faint transition hover:text-brand"
        onClick={() => setShowAllLessons((value) => !value)}
      >
        {showAllLessons ? 'Show fewer videos' : course.moreVideosLabel}
      </button>

      <p className="mt-6 text-sm leading-6 text-ink-muted">{course.enrollPitch}</p>

      <p className="mt-5 flex items-baseline gap-1.5">
        <span className="font-display text-[36px] font-semibold leading-none text-brand">
          {course.price}
        </span>
        <span className="text-sm text-ink-faint">/lifetime</span>
      </p>

      <Button
        className="mt-5 h-12 w-full text-base font-semibold"
        size="lg"
        onClick={handleEnroll}
        disabled={enrollStatus === 'enrolled'}
      >
        {enrollStatus === 'enrolled' ? 'Enrolled' : 'Enroll Now'}
      </Button>
      {enrollStatus === 'enrolled' && (
        <p className="mt-2 text-center text-sm text-brand" role="status">
          You&apos;re enrolled. Start with lesson 01 anytime.
        </p>
      )}

      <div className="mt-7">
        <p className="mb-4 font-display text-base font-semibold text-ink">
          This course include
        </p>
        <ul className="space-y-3.5">
          {course.includes.map((item, index) => {
            const Icon = includeIcons[index % includeIcons.length];
            return (
              <li
                key={item}
                className="flex items-center gap-3 text-sm text-ink-muted"
              >
                <Icon
                  size={18}
                  className="shrink-0 text-brand"
                  strokeWidth={1.75}
                  aria-hidden
                />
                {item}
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-7 border-t border-surface-line pt-6">
        <div className="flex items-center gap-3">
          <Image
            src={course.instructor.avatar}
            alt={course.instructor.name}
            width={48}
            height={48}
            className="h-12 w-12 rounded-full object-cover"
          />
          <div>
            <p className="font-display text-base font-semibold text-ink">
              {course.instructor.name}
            </p>
            <p className="text-sm text-ink-faint">{course.instructor.role}</p>
          </div>
        </div>
        <p className="mt-3 text-sm leading-6 text-ink-muted">
          {course.instructor.bio}
        </p>
        <Link
          href={course.instructor.profileHref}
          className="mt-4 inline-flex h-11 w-full items-center justify-center rounded-full border border-surface-line text-sm font-medium text-ink transition hover:border-ink-faint"
        >
          See Full Profile
        </Link>
      </div>
    </aside>
  );
};

export const CourseMetaBadges = ({ course }: { course: CourseDetail }) => (
  <div className="flex flex-wrap gap-2.5 sm:gap-3">
    <span className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-sm font-medium text-ink shadow-sm sm:px-4">
      <BarChart3 size={16} className="text-brand" aria-hidden />
      {course.level}
    </span>
    <span className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-sm font-medium text-ink shadow-sm sm:px-4">
      <Star size={16} className="fill-brand text-brand" aria-hidden />
      {course.rating} ({course.reviewCount})
    </span>
    <span className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-sm font-medium text-ink shadow-sm sm:px-4">
      <Users size={16} className="text-brand" aria-hidden />
      {course.studentsLabel}
    </span>
  </div>
);

export const CourseShareButton = ({ title }: { title: string }) => {
  const [status, setStatus] = useState('');

  const handleShare = async () => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
        setStatus('Shared');
      } else if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
        setStatus('Link copied');
      } else {
        setStatus('Copy this page URL to share');
      }
    } catch {
      setStatus('');
    }
    window.setTimeout(() => setStatus(''), 2500);
  };

  return (
    <div className="flex flex-col items-start gap-1">
      <button
        type="button"
        onClick={handleShare}
        className="inline-flex h-10 items-center gap-2 rounded-full bg-accent px-4 text-sm font-medium text-ink shadow-sm transition hover:bg-accent-dark sm:h-11 sm:px-5"
      >
        <Share2 size={16} aria-hidden />
        Share
      </button>
      {status && (
        <span className="text-xs text-white/90" role="status">
          {status}
        </span>
      )}
    </div>
  );
};

export default CourseDetailsSidebar;
