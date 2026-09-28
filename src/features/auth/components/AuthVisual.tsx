import CourseCard from '@/shared/components/CourseCard/CourseCard';
import { courses } from '@/data/courses/courses.data';
import { studentAvatars } from '@/shared/constants/assets';
import Image from 'next/image';

const floatingCourses = [
  courses.find((course) => course.id === '3') ?? courses[2],
  courses.find((course) => course.id === '2') ?? courses[1],
];

type AuthVisualProps = {
  title: string;
  description: string;
};

const AuthVisual = ({ title, description }: AuthVisualProps) => {
  return (
    <div className="relative flex h-full flex-col text-white">
      <div className="max-w-[475px]">
        <h2 className="font-display text-xl font-semibold text-[#F5F5F6]">
          {title}
        </h2>
        <p className="mt-4 text-base leading-[29px] text-[#F5F5F6] sm:text-lg">
          {description}
        </p>
      </div>

      <div className="relative mt-10 min-h-[420px] flex-1 sm:mt-14 sm:min-h-[520px] lg:mt-8 lg:min-h-[620px]">
        <Image
          src="/images/home/10-2629.png"
          alt=""
          width={146}
          height={146}
          className="pointer-events-none absolute left-2 top-4 z-0 w-24 animate-float sm:left-6 sm:w-28 lg:left-4 lg:w-32"
        />
        <Image
          src="/images/home/10-2614.png"
          alt=""
          width={175}
          height={175}
          className="pointer-events-none absolute bottom-24 right-0 z-30 hidden w-28 animate-float-delayed sm:block lg:right-8 lg:w-36"
        />
        <Image
          src="/images/home/10-2634.png"
          alt=""
          width={188}
          height={188}
          className="pointer-events-none absolute -left-2 bottom-8 z-0 w-28 animate-float-delayed sm:w-36 lg:bottom-4 lg:w-40"
        />

        <div className="absolute left-6 top-16 z-10 w-[min(100%,300px)] -rotate-6 scale-90 sm:left-10 sm:top-12 sm:w-[340px] sm:scale-95 lg:left-8 lg:w-[360px]">
          <div className="origin-center shadow-float">
            <CourseCard course={floatingCourses[1]} />
          </div>
        </div>

        <div className="absolute left-16 top-4 z-20 w-[min(100%,300px)] rotate-[4deg] scale-95 sm:left-28 sm:w-[340px] lg:left-24 lg:w-[360px]">
          <div className="origin-center shadow-float">
            <CourseCard course={floatingCourses[0]} />
          </div>
        </div>

        <div className="absolute bottom-4 right-2 z-30 w-[232px] rounded-2xl bg-accent p-4 text-ink shadow-float sm:bottom-8 sm:right-8 lg:right-12">
          <p className="text-sm font-medium">Happy Students</p>
          <div className="mt-0.5 flex items-center gap-1 text-[10px] text-[#424348]">
            <span>4.5 (240)</span>
            <span aria-hidden className="text-brand">
              ★
            </span>
          </div>
          <div className="mt-2 flex items-center">
            {[
              ...studentAvatars,
              '/images/auth/10-438.png',
              '/images/auth/10-439.png',
              '/images/auth/10-440.png',
            ].map((avatar, index) => (
              <Image
                key={`${avatar}-${index}`}
                src={avatar}
                alt=""
                width={43}
                height={43}
                className={`h-9 w-9 rounded-full border-2 border-accent object-cover sm:h-10 sm:w-10 ${
                  index === 0 ? '' : '-ml-4'
                }`}
              />
            ))}
            <span className="-ml-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-ink text-xs font-bold text-surface-muted sm:h-10 sm:w-10">
              2K+
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthVisual;
