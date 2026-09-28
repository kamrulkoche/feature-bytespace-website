import CreatorProfileView from '@/features/creator/components/CreatorProfileView';
import { creators, getCreatorById } from '@/features/creator/data';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

type CreatorPageProps = {
  params: Promise<{ id: string }>;
};

export const generateStaticParams = () =>
  creators.map((creator) => ({ id: creator.id }));

export const generateMetadata = async ({
  params,
}: CreatorPageProps): Promise<Metadata> => {
  const { id } = await params;
  const creator = getCreatorById(id);
  if (!creator) return { title: 'Creator Not Found | ByteSpace' };
  return {
    title: `${creator.name} | ByteSpace`,
    description: creator.welcome,
  };
};

const CreatorPage = async ({ params }: CreatorPageProps) => {
  const { id } = await params;
  const creator = getCreatorById(id);
  if (!creator) notFound();
  return <CreatorProfileView creator={creator} />;
};

export default CreatorPage;
