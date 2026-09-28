import SearchHero from '@/features/search/components/SearchHero';
import SearchResults from '@/features/search/components/SearchResults';
import type { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Search Courses | ByteSpace',
  description:
    'Find your next course on ByteSpace. Filter by level and category, and discover featured learning paths.',
};

const SearchPage = () => {
  return (
    <main data-testid="search-page">
      <Suspense
        fallback={
          <div className="bg-brand pt-[88px] text-white lg:pt-[120px]">
            <div className="container-content py-16 text-center">Loading search…</div>
          </div>
        }
      >
        <SearchHero />
        <SearchResults />
      </Suspense>
    </main>
  );
};

export default SearchPage;
