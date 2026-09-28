'use client';

import CourseCard from '@/shared/components/CourseCard/CourseCard';
import { courseTags } from '@/data/categories/categories.data';
import { courses } from '@/data/courses/courses.data';
import Link from 'next/link';
import { useMemo, useState } from 'react';

const DiscoverCourses = () => {
  const [activeTag, setActiveTag] = useState('Featured');

  const visibleCourses = useMemo(() => {
    if (activeTag === 'Featured') return courses;
    const needle = activeTag.toLowerCase();
    const filtered = courses.filter(
      (course) =>
        course.title.toLowerCase().includes(needle) ||
        course.level.toLowerCase().includes(needle) ||
        course.author.toLowerCase().includes(needle)
    );
    return filtered.length > 0 ? filtered : courses;
  }, [activeTag]);

  return (
    <section id="courses" className="bg-white py-14 sm:py-20">
      <div className="container-content">
        <div className="mx-auto mb-10 max-w-4xl text-center">
          <h2 className="font-display text-3xl font-semibold text-ink-strong sm:text-4xl lg:text-[44px] lg:leading-tight">
            Discover Your Passion, Build Your Skills
          </h2>
          <p className="mt-4 text-base text-ink-faint sm:text-lg">
            At Bytespace Courses, we bring you closer to life-changing
            knowledge. Explore a variety of courses across different fields,
            from technology to the arts, and make a difference in your career
            and life.
          </p>
        </div>

        <div className="mb-10 flex flex-wrap justify-center gap-3">
          {courseTags.map((tag) => {
            const isActive = tag.label === activeTag;
            return (
              <button
                key={tag.label}
                type="button"
                onClick={() => setActiveTag(tag.label)}
                className={`rounded-full px-4 py-2.5 text-sm font-medium transition ${
                  isActive
                    ? 'bg-accent text-ink'
                    : 'bg-surface-muted text-ink-muted hover:bg-surface-line'
                }`}
              >
                {tag.label}
              </button>
            );
          })}
          <Link
            href="/search"
            className="rounded-full px-4 py-2.5 text-sm font-medium text-brand transition hover:bg-surface-muted"
          >
            + More
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {visibleCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DiscoverCourses;
