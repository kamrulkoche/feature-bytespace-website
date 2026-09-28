import Button from '@/shared/components/Button/Button';
import Image from 'next/image';

const CreatorCta = () => {
  return (
    <section className="relative overflow-hidden bg-brand py-20 text-center text-white sm:py-24">
      <div
        className="pointer-events-none absolute inset-0 bg-brand-grid bg-grid opacity-40"
        aria-hidden
      />
      <Image
        src="/images/home/10-2614.png"
        alt=""
        width={140}
        height={140}
        className="pointer-events-none absolute left-[5%] top-[15%] hidden w-24 animate-float lg:block"
      />
      <Image
        src="/images/home/10-2629.png"
        alt=""
        width={160}
        height={160}
        className="pointer-events-none absolute bottom-[12%] left-[8%] hidden w-28 animate-float-delayed lg:block"
      />
      <Image
        src="/images/home/10-2634.png"
        alt=""
        width={120}
        height={120}
        className="pointer-events-none absolute right-[8%] top-[18%] hidden w-24 animate-float-delayed lg:block"
      />
      <Image
        src="/images/home/10-2606.png"
        alt=""
        width={130}
        height={130}
        className="pointer-events-none absolute bottom-[16%] right-[6%] hidden w-24 animate-float lg:block"
      />

      <div className="container-content relative z-10 mx-auto max-w-4xl">
        <h2 className="font-display text-3xl font-semibold sm:text-4xl lg:text-[44px] lg:leading-tight">
          Unlock Your Potential as a Creator with ByteSpace
        </h2>
        <p className="mx-auto mt-5 max-w-3xl text-base text-surface-muted sm:text-lg">
          Experience the collaboration of numerous creators and an expanding
          selection of courses. Register now and become a part of a community
          comprising over 10,000 local and international creators. Utilize our
          Course Editor, and showcase your expertise by publishing your finest
          course on the ByteSpace Course Library.
        </p>
        <Button href="/register" className="mt-8">
          Join as Creator
        </Button>
      </div>
    </section>
  );
};

export default CreatorCta;
