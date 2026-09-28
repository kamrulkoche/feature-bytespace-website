import SearchHero from '@/features/search/components/SearchHero';
import SearchResults from '@/features/search/components/SearchResults';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Search Courses | ByteSpace',
  description:
    'Find your next course on ByteSpace. Filter by level and category, and discover featured learning paths.',
};

const SearchPage = () => {
  return (
    <main data-testid="search-page">
      <SearchHero />
      <SearchResults />
    </main>
  );
};

export default SearchPage;
