import Button from '@/shared/components/Button/Button';
import Image from 'next/image';
import Link from 'next/link';

const NotFoundHero = () => {
  return (
    <section
      className="relative min-h-[calc(100vh-88px)] overflow-hidden bg-brand lg:min-h-[957px]"
      data-testid="not-found-hero"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-brand-grid bg-grid opacity-30"
        aria-hidden
      />

      {/* Giant watermark 404 */}
      <p
        className="pointer-events-none absolute left-1/2 top-[42%] z-0 -translate-x-1/2 -translate-y-1/2 select-none font-display text-[180px] font-semibold leading-none text-white/[0.07] sm:text-[280px] lg:text-[480px]"
        aria-hidden
      >
        404
      </p>

      <Image
        src="/images/home/10-2614.png"
        alt=""
        width={188}
        height={188}
        className="pointer-events-none absolute left-[6%] top-[22%] z-[1] hidden w-24 animate-float lg:block lg:w-[140px]"
      />
      <Image
        src="/images/home/10-2629.png"
        alt=""
        width={222}
        height={222}
        className="pointer-events-none absolute bottom-[18%] left-[8%] z-[1] hidden w-28 animate-float-delayed lg:block lg:w-[160px]"
      />
      <Image
        src="/images/home/10-2634.png"
        alt=""
        width={200}
        height={200}
        className="pointer-events-none absolute right-[7%] top-[20%] z-[1] hidden w-24 animate-float-delayed lg:block lg:w-[150px]"
      />
      <Image
        src="/images/home/10-2606.png"
        alt=""
        width={180}
        height={180}
        className="pointer-events-none absolute bottom-[20%] right-[6%] z-[1] hidden w-24 animate-float lg:block lg:w-[140px]"
      />

      <div className="container-content relative z-10 flex min-h-[calc(100vh-88px)] flex-col items-center justify-center px-4 py-20 text-center lg:min-h-[837px] lg:py-24">
        <div className="mx-auto flex max-w-[935px] flex-col items-center gap-6 sm:gap-8">
          <h1 className="font-display text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-[72px] lg:leading-[1.2]">
            The page you are looking for doesn&apos;t exist
          </h1>
          <p className="max-w-md text-base text-[#E5E6E8] sm:text-lg">
            Try to use a correct url or go back to homepage to start again
          </p>
          <Link href="/">
            <Button size="md" className="h-[46px] px-6 text-lg font-medium">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFoundHero;
