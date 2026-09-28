'use client';

import CourseCard from '@/shared/components/CourseCard/CourseCard';
import SearchCategoryTabs from '@/features/search/components/SearchCategoryTabs';
import SearchFilters from '@/features/search/components/SearchFilters';
import SearchPagination from '@/features/search/components/SearchPagination';
import { courses } from '@/data/courses/courses.data';
import {
  SEARCH_PAGE_SIZE,
  SEARCH_TOTAL_PAGES,
} from '@/features/search/data';
import { useMemo, useState } from 'react';

const SearchResults = () => {
  const [activeTag, setActiveTag] = useState('Featured');
  const [sortBy, setSortBy] = useState('Most relevant');
  const [currentPage, setCurrentPage] = useState(1);

  const results = useMemo(() => {
    return Array.from({ length: SEARCH_PAGE_SIZE }, (_, index) => {
      const course = courses[index % courses.length];
      return {
        course,
        key: `${course.id}-${activeTag}-p${currentPage}-${index}`,
      };
    });
  }, [activeTag, currentPage]);

  return (
    <section className="bg-white pb-16 pt-10 sm:pb-20 sm:pt-12">
      <div className="container-content space-y-8 sm:space-y-10">
        <SearchFilters
          sortBy={sortBy}
          onSortChange={(value) => {
            setSortBy(value);
            setCurrentPage(1);
          }}
        />
        <SearchCategoryTabs
          activeTag={activeTag}
          onChange={(tag) => {
            setActiveTag(tag);
            setCurrentPage(1);
          }}
        />

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3 xl:gap-10">
          {results.map(({ course, key }) => (
            <CourseCard key={key} course={course} bordered />
          ))}
        </div>

        <div className="pt-4">
          <SearchPagination
            currentPage={currentPage}
            totalPages={SEARCH_TOTAL_PAGES}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </section>
  );
};

export default SearchResults;
