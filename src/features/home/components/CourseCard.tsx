import Image from 'next/image';
import Link from 'next/link';
import { Course, studentAvatars } from '@/features/home/data';
import { BarChart3, Star } from 'lucide-react';

type CourseCardProps = {
  course: Course;
  bordered?: boolean;
  className?: string;
};

const CourseCard = ({
  course,
  bordered = false,
  className = '',
}: CourseCardProps) => {
  return (
    <article
      className={`overflow-hidden rounded-[28px] bg-white transition hover:-translate-y-1 ${
        bordered
          ? 'border border-[#CED0D3] hover:shadow-card'
          : 'shadow-card hover:shadow-float'
      } ${className}`}
    >
      <Link
        href={`/courses/${course.id}`}
        className="block h-full outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
        aria-label={`View details for ${course.title}`}
      >
        <div className="relative aspect-[341/195] overflow-hidden">
          <Image
            src={course.image}
            alt={course.title}
            fill
            className="object-cover"
            sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 373px"
          />
          <div className="absolute inset-x-3 bottom-3 flex flex-wrap gap-2">
            {[course.lessons, course.duration, course.comments].map((item) => (
              <span
                key={item}
                className="rounded-full bg-white/60 px-3 py-1 text-[12px] font-medium text-ink-soft backdrop-blur-sm"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-3 p-4 sm:p-5">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-display text-lg font-semibold leading-snug text-black line-clamp-2">
              {course.title}
            </h3>
            <div className="flex shrink-0 items-center gap-1 text-[18px] text-ink-soft">
              <span>{course.rating}</span>
              <Star size={16} className="fill-ink-soft text-ink-soft" />
            </div>
          </div>

          <p className="text-xs text-ink-soft">{course.author}</p>

          <div className="flex items-center justify-between gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-surface-muted px-3 py-1 text-xs font-medium text-ink-muted">
              <BarChart3 size={14} />
              {course.level}
            </span>
            <div className="flex items-center">
              {studentAvatars.map((avatar, index) => (
                <Image
                  key={`${course.id}-${avatar}`}
                  src={avatar}
                  alt=""
                  width={32}
                  height={32}
                  className={`h-8 w-8 rounded-full border-2 border-white object-cover ${
                    index === 0 ? '' : '-ml-2'
                  }`}
                />
              ))}
              <span className="-ml-2 inline-flex h-8 min-w-8 items-center justify-center rounded-full bg-accent px-2 text-xs font-medium text-ink">
                {course.students}
              </span>
            </div>
          </div>

          <p className="pt-1">
            <span className="font-display text-xl font-semibold text-brand">
              {course.price}
            </span>
            <span className="ml-1 text-xs text-ink-soft">/lifetime</span>
          </p>
        </div>
      </Link>
    </article>
  );
};

export default CourseCard;
