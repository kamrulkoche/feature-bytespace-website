'use client';

import CourseCard from '@/shared/components/CourseCard/CourseCard';
import { courseTags } from '@/data/categories/categories.data';
import { courses } from '@/data/courses/courses.data';
import { useState } from 'react';

const DiscoverCourses = () => {
  const [activeTag, setActiveTag] = useState('Featured');

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
                    : tag.label === '+ More'
                      ? 'text-brand'
                      : 'bg-surface-muted text-ink-muted hover:bg-surface-line'
                }`}
              >
                {tag.label}
              </button>
            );
          })}
          <button
            type="button"
            className="rounded-full px-4 py-2.5 text-sm font-medium text-brand"
          >
            + More
          </button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DiscoverCourses;
