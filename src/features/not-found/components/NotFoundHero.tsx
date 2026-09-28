import Button from '@/shared/components/Button/Button';

const NotFoundHero = () => {
  return (
    <section
      className="relative min-h-[calc(100vh-88px)] overflow-hidden bg-brand lg:min-h-[calc(100vh-120px)]"
      data-testid="not-found-hero"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-brand-grid bg-grid opacity-40"
        aria-hidden
      />

      <div className="container-content relative z-10 flex min-h-[calc(100vh-88px)] flex-col items-center justify-center px-4 py-16 text-center lg:min-h-[calc(100vh-120px)] lg:py-20">
        <div className="relative mx-auto flex w-full max-w-[960px] flex-col items-center">
          {/* Figma 10:2113 — large lime→brand fade 404 */}
          <p
            className="pointer-events-none select-none font-display text-[140px] font-semibold leading-[0.85] tracking-[-0.04em] sm:text-[220px] lg:text-[320px] xl:text-[380px]"
            style={{
              backgroundImage:
                'linear-gradient(180deg, #D4FB20 0%, #D4FB20 28%, rgba(212, 251, 32, 0.55) 52%, rgba(0, 59, 226, 0.15) 78%, rgba(0, 59, 226, 0) 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
            }}
            aria-hidden
          >
            404
          </p>

          <div className="relative z-10 -mt-8 flex max-w-[720px] flex-col items-center gap-5 sm:-mt-12 sm:gap-6 lg:-mt-16 lg:gap-8">
            <h1 className="font-display text-[28px] font-semibold leading-tight text-white sm:text-4xl lg:text-[48px] lg:leading-[1.2]">
              The page you are looking for doesn&apos;t exist
            </h1>
            <p className="max-w-md text-base font-normal text-white/85 sm:text-lg">
              Try to use a correct url or go back to homepage to start again
            </p>
            <Button
              href="/"
              size="md"
              className="mt-1 h-[46px] px-7 text-lg font-medium text-ink"
            >
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFoundHero;
