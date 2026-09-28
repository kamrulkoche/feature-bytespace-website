import Button from '@/shared/components/Button/Button';
import type { Metadata } from 'next';

type LegalPageProps = {
  title: string;
  description: string;
  body: string[];
};

const LegalContent = ({ title, description, body }: LegalPageProps) => (
  <main className="bg-white">
    <section className="container-content max-w-3xl py-16 sm:py-20">
      <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
        {title}
      </h1>
      <p className="mt-3 text-base text-ink-muted sm:text-lg">{description}</p>
      <div className="mt-8 space-y-4 text-sm leading-7 text-ink-muted sm:text-base">
        {body.map((paragraph) => (
          <p key={paragraph.slice(0, 24)}>{paragraph}</p>
        ))}
      </div>
      <div className="mt-10">
        <Button href="/">Back to home</Button>
      </div>
    </section>
  </main>
);

export const privacyMetadata: Metadata = {
  title: 'Privacy Policy | ByteSpace',
};

export const PrivacyPage = () => (
  <LegalContent
    title="Privacy Policy"
    description="How ByteSpace collects, uses, and protects your information."
    body={[
      'We collect account details you provide (such as name and email) to create your profile, deliver courses, and send product updates you opt into.',
      'Course progress and purchase history are stored so you can resume learning across devices. We do not sell personal data to third parties.',
      'You can request access, correction, or deletion of your account data by contacting hello@bytespace.example.',
    ]}
  />
);

export const TermsPage = () => (
  <LegalContent
    title="Terms of Service"
    description="The rules for using ByteSpace courses and creator tools."
    body={[
      'By creating an account or purchasing a course, you agree to use ByteSpace lawfully and respect intellectual property owned by creators and ByteSpace.',
      'Course access is licensed for personal learning unless a creator states otherwise. Sharing account credentials is not allowed.',
      'We may update these terms as the platform grows. Continued use after updates means you accept the revised terms.',
    ]}
  />
);

export const CookiesPage = () => (
  <LegalContent
    title="Cookies Settings"
    description="How ByteSpace uses cookies and similar technologies."
    body={[
      'Essential cookies keep you signed in and secure the checkout and enrollment flow.',
      'Analytics cookies help us understand which courses are popular so we can improve discovery. You can continue browsing with essential cookies only.',
      'Preference cookies remember UI choices such as sort order on search. Clearing site data resets these preferences.',
    ]}
  />
);
