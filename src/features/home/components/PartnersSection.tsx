import { partnerLogos } from '@/features/home/data';

const PartnersSection = () => {
  return (
    <section className="bg-surface-muted py-12 sm:py-16">
      <div className="container-content">
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 opacity-60 sm:justify-between">
          {partnerLogos.map((logo, index) => (
            <p
              key={`${logo}-${index}`}
              className="font-display text-xl font-semibold tracking-tight text-ink-faint sm:text-2xl"
            >
              {logo}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
