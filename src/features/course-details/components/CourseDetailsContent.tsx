'use client';

import { CourseDetail } from '@/domain/course';
import { Check, Star, Video } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

export const courseTabs = ['About', 'Lessons', 'Reviews'] as const;
export type CourseTab = (typeof courseTabs)[number];

type CourseDetailsContentProps = {
  course: CourseDetail;
  activeTab: CourseTab;
  onTabChange: (tab: CourseTab) => void;
};

const lessonModules = [
  {
    title: 'Module 1: Introduction to Digital Assets',
    body: "Lay the groundwork with lessons like 'Understanding Digital Elements' and 'Navigating Design Software Tools.' Dive into the essentials of digital asset creation.",
  },
  {
    title: 'Module 2: Design Principles for Impact',
    body: "Master the principles that drive impactful designs with lessons such as 'Color Theory in Digital Design' and 'Typography Essentials.' Elevate your visual communication skills.",
  },
  {
    title: 'Module 4: User-Centric Design Strategies',
    body: "Understand 'Design Thinking in Digital Creation' and delve into 'User Experience (UX) Essentials.' Craft digital assets with a focus on user-centric design.",
  },
  {
    title: 'Module 5: Interactive Media and Engagement',
    body: "Engage your audience with lessons like 'Creating Interactive Presentations' and 'Integrating Multimedia Elements.' Master the art of creating immersive digital experiences.",
  },
  {
    title: 'Module 6: Project Showcase and Critique',
    body: "Perfect your presentation skills with 'Effective Presentation Techniques' and embrace collaboration with 'Peer Critique and Collaboration.' Showcase your work with confidence.",
  },
  {
    title: 'Module 7: Optimizing Digital Assets for Various Platforms',
    body: "Adapt your digital creations for 'Mobile Platforms' and optimize for 'Social Media.' Ensure widespread accessibility and engagement across diverse digital landscapes.",
  },
];

const ratingBreakdown = [
  { stars: 5, count: 720, percent: 88 },
  { stars: 4, count: 120, percent: 18 },
  { stars: 3, count: 21, percent: 6 },
  { stars: 2, count: 12, percent: 4 },
  { stars: 1, count: 16, percent: 5 },
];

const reviewFilters = ['All rating', '5', '4', '3', '2', '1'] as const;

const reviews = [
  {
    id: '1',
    name: 'PurePearl Studio',
    role: 'UI/UX Designer',
    avatar: '/images/home/10-3215.png',
    rating: 5,
    quote:
      'The course provided me with a comprehensive understanding of digital asset creation. The lessons were in-depth, practical, and immediately applicable to my work. Highly recommended!',
    when: 'a year ago',
  },
  {
    id: '2',
    name: 'Albert Flores',
    role: 'UI/UX Designer',
    avatar: '/images/home/10-3221.png',
    rating: 5,
    quote:
      "This course transformed my approach to digital design. The combination of theory, hands-on exercises, and real-world applications made it a truly enriching experience. Excited to implement what I've learned.",
    when: 'a year ago',
  },
  {
    id: '3',
    name: 'Cody Fisher',
    role: 'UI/UX Designer',
    avatar: '/images/home/10-3227.png',
    rating: 5,
    quote:
      'The project showcase and critique module created a collaborative environment where I could showcase my work, receive valuable feedback, and refine my skills. It added a unique and valuable dimension to the learning process.',
    when: 'a year ago',
  },
  {
    id: '4',
    name: 'Brooklyn Simmons',
    role: 'UI/UX Designer',
    avatar: '/images/home/10-3055.png',
    rating: 5,
    quote:
      'The lessons on optimizing digital assets for various platforms were particularly insightful. The course adapts to the evolving digital landscape, and the engaging content kept me motivated throughout.',
    when: 'a year ago',
  },
];

const CourseDetailsContent = ({
  course,
  activeTab,
  onTabChange,
}: CourseDetailsContentProps) => {
  const [activeReviewFilter, setActiveReviewFilter] =
    useState<(typeof reviewFilters)[number]>('All rating');

  const filteredReviews =
    activeReviewFilter === 'All rating'
      ? reviews
      : reviews.filter(
          (review) => review.rating === Number(activeReviewFilter)
        );

  return (
    <div>
      <div
        className="flex flex-wrap gap-3"
        role="tablist"
        aria-label="Course sections"
      >
        {courseTabs.map((tab) => {
          const isActive = tab === activeTab;
          return (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onTabChange(tab)}
              className={`rounded-full px-5 py-2.5 text-sm font-medium transition sm:px-6 sm:text-base ${
                isActive
                  ? 'bg-accent text-ink'
                  : 'bg-[#F5F5F6] text-ink-muted hover:bg-[#EBEBED]'
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {activeTab === 'About' && (
        <div className="mt-8 space-y-10 sm:mt-10 sm:space-y-12">
          <section>
            <h2 className="font-display text-xl font-semibold text-ink sm:text-[20px]">
              Description
            </h2>
            <div className="mt-4 max-w-3xl space-y-4 text-base leading-8 text-ink-muted">
              {course.descriptionParagraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-ink sm:text-[20px]">
              Sneak Peak
            </h2>
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
              {course.sneakPeeks.map((src, index) => (
                <div
                  key={`${src}-${index}`}
                  className="relative aspect-[5/4] overflow-hidden rounded-2xl bg-surface-muted shadow-sm"
                >
                  <Image
                    src={src}
                    alt={`Course sneak peek ${index + 1}`}
                    fill
                    className="object-cover transition duration-300 hover:scale-105"
                    sizes="(max-width:640px) 45vw, 200px"
                  />
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-ink sm:text-[20px]">
              Key Points
            </h2>
            <ul className="mt-5 space-y-4">
              {course.keyPoints.map((point) => (
                <li
                  key={point}
                  className="flex items-center gap-3 text-base text-ink-muted"
                >
                  <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand text-white">
                    <Check size={14} strokeWidth={3} aria-hidden />
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </section>
        </div>
      )}

      {activeTab === 'Lessons' && (
        <div className="mt-8 space-y-10 sm:mt-10 sm:space-y-12">
          <section>
            <h2 className="font-display text-xl font-semibold text-ink sm:text-[20px]">
              Explore the Modules
            </h2>
            <p className="mt-3 max-w-3xl text-base leading-7 text-ink-muted">
              Immerse yourself in the course content as we break down each
              module into comprehensive lessons, providing practical insights
              and hands-on experiences.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-ink sm:text-[20px]">
              Lesson List
            </h2>
            <ul className="mt-5 space-y-6">
              {lessonModules.map((module) => (
                <li key={module.title} className="flex gap-4 sm:gap-5">
                  <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accent text-ink sm:h-14 sm:w-14">
                    <Video size={22} strokeWidth={1.75} aria-hidden />
                  </span>
                  <div className="min-w-0 pt-0.5">
                    <h3 className="text-base font-medium text-ink sm:text-[16px]">
                      {module.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-6 text-ink-muted sm:text-base sm:leading-7">
                      {module.body}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-ink sm:text-[20px]">
              Lesson Content
            </h2>
            <p className="mt-3 max-w-3xl text-base leading-7 text-ink-muted">
              Engage with each lesson through captivating video content,
              detailed textual explanations, and interactive elements. Download
              resources, complete assignments, and test your understanding with
              quizzes.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-ink sm:text-[20px]">
              Lesson Progress Tracking
            </h2>
            <p className="mt-3 max-w-3xl text-base leading-7 text-ink-muted">
              Witness your growth as you complete lessons, with an intuitive
              progress tracking feature guiding you through your learning
              journey.
            </p>
            <div className="mt-5 max-w-[280px] rounded-2xl border border-[#E5E6E8] bg-[#F9F9F9] p-5">
              <p className="text-sm font-medium text-ink-faint">
                Learning Progress
              </p>
              <p className="mt-1 font-display text-[36px] font-semibold leading-none text-ink">
                55%
              </p>
              <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-[#E5E6E8]">
                <div className="h-full w-[55%] rounded-full bg-accent" />
              </div>
            </div>
          </section>
        </div>
      )}

      {activeTab === 'Reviews' && (
        <div className="mt-8 space-y-8 sm:mt-10 sm:space-y-10">
          <section>
            <h2 className="font-display text-xl font-semibold text-ink sm:text-[20px]">
              What Learners Are Saying
            </h2>
            <p className="mt-3 max-w-3xl text-base leading-7 text-ink-muted">
              Discover what our learners have to say about their experience with
              &apos;Build Digital Assets: A Comprehensive Guide.&apos; Read
              reviews and ratings from individuals who have embarked on the
              transformative journey of mastering digital asset creation.
            </p>

            <div className="mt-6 flex flex-col gap-5 rounded-2xl border border-[#E5E6E8] bg-white p-4 sm:flex-row sm:items-center sm:gap-6 sm:p-5">
              <div className="flex h-[120px] w-full shrink-0 flex-col items-center justify-center rounded-2xl bg-accent text-ink sm:h-[132px] sm:w-[132px]">
                <p className="text-sm font-medium">Ratings</p>
                <p className="mt-1 font-display text-[36px] font-semibold leading-none">
                  4.7
                </p>
              </div>

              <div className="min-w-0 flex-1 space-y-2.5">
                {ratingBreakdown.map((row) => (
                  <div
                    key={row.stars}
                    className="grid grid-cols-[1fr_auto_auto] items-center gap-3 sm:gap-4"
                  >
                    <div className="h-1.5 overflow-hidden rounded-full bg-[#E5E6E8]">
                      <div
                        className="h-full rounded-full bg-accent"
                        style={{ width: `${row.percent}%` }}
                      />
                    </div>
                    <div className="flex items-center gap-0.5 text-ink">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star
                          key={`${row.stars}-${index}`}
                          size={12}
                          className="fill-ink text-ink"
                          aria-hidden
                        />
                      ))}
                    </div>
                    <span className="w-8 text-right text-sm text-ink-muted">
                      {row.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-ink sm:text-[20px]">
              Individual Reviews:
            </h2>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {reviewFilters.map((filter) => {
                const isActive = filter === activeReviewFilter;
                return (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setActiveReviewFilter(filter)}
                    className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition ${
                      isActive
                        ? 'bg-accent text-ink'
                        : 'bg-[#F5F5F6] text-ink-muted hover:bg-[#EBEBED]'
                    }`}
                  >
                    {filter !== 'All rating' && (
                      <Star
                        size={12}
                        className="fill-current text-current"
                        aria-hidden
                      />
                    )}
                    {filter}
                  </button>
                );
              })}
            </div>

            <ul className="mt-5 space-y-4">
              {filteredReviews.map((review) => (
                <li
                  key={review.id}
                  className="rounded-2xl border border-[#E5E6E8] bg-white p-5 sm:p-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex min-w-0 items-center gap-3">
                      <Image
                        src={review.avatar}
                        alt={review.name}
                        width={48}
                        height={48}
                        className="h-12 w-12 rounded-full object-cover"
                      />
                      <div className="min-w-0">
                        <p className="font-medium text-ink">{review.name}</p>
                        <p className="text-sm text-ink-faint">{review.role}</p>
                      </div>
                    </div>
                    <p className="shrink-0 text-sm text-ink-faint">
                      {review.when}
                    </p>
                  </div>

                  <div className="mt-3 flex items-center gap-0.5 text-ink">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star
                        key={`${review.id}-star-${index}`}
                        size={14}
                        className="fill-ink text-ink"
                        aria-hidden
                      />
                    ))}
                  </div>

                  <p className="mt-3 text-base leading-7 text-ink-muted">
                    &ldquo;{review.quote}&rdquo;
                  </p>
                </li>
              ))}
            </ul>
          </section>
        </div>
      )}
    </div>
  );
};

export default CourseDetailsContent;
