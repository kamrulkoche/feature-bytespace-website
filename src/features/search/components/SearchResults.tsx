'use client';

import CourseCard from '@/shared/components/CourseCard/CourseCard';
import SearchCategoryTabs from '@/features/search/components/SearchCategoryTabs';
import SearchFilters from '@/features/search/components/SearchFilters';
import SearchPagination from '@/features/search/components/SearchPagination';
import { courses } from '@/data/courses/courses.data';
import { creators } from '@/data/creators/creators.data';
import { featuredCategories } from '@/data/categories/categories.data';
import { SEARCH_PAGE_SIZE } from '@/features/search/data';
import type { Course } from '@/domain/course';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

const SearchResults = () => {
  const searchParams = useSearchParams();
  const query = (searchParams.get('q') ?? '').trim().toLowerCase();
  const categoryParam = searchParams.get('category') ?? '';
  const searchType = searchParams.get('type') ?? 'Courses';

  const [activeTag, setActiveTag] = useState(categoryParam || 'Featured');
  const [sortBy, setSortBy] = useState('Most relevant');
  const [level, setLevel] = useState('All levels');
  const [category, setCategory] = useState(
    categoryParam || 'All categories'
  );
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (categoryParam) {
      setCategory(categoryParam);
      setActiveTag(categoryParam);
      setCurrentPage(1);
    }
  }, [categoryParam]);

  const filteredCourses = useMemo(() => {
    let list: Course[] = [...courses];

    if (query) {
      list = list.filter(
        (course) =>
          course.title.toLowerCase().includes(query) ||
          course.author.toLowerCase().includes(query) ||
          course.level.toLowerCase().includes(query)
      );
    }

    if (level !== 'All levels') {
      list = list.filter((course) => course.level === level);
    }

    if (category !== 'All categories') {
      list = list.filter(
        (course) =>
          course.title.toLowerCase().includes(category.toLowerCase()) ||
          course.author.toLowerCase().includes(category.toLowerCase())
      );
    }

    if (activeTag && activeTag !== 'Featured') {
      const tag = activeTag.toLowerCase();
      const tagged = list.filter(
        (course) =>
          course.title.toLowerCase().includes(tag) ||
          course.level.toLowerCase().includes(tag)
      );
      if (tagged.length > 0) list = tagged;
    }

    if (sortBy === 'Highest rated') {
      list.sort((a, b) => Number(b.rating) - Number(a.rating));
    } else if (sortBy === 'Price: low to high') {
      list.sort(
        (a, b) =>
          Number(a.price.replace(/[^0-9.]/g, '')) -
          Number(b.price.replace(/[^0-9.]/g, ''))
      );
    } else if (sortBy === 'Price: high to low') {
      list.sort(
        (a, b) =>
          Number(b.price.replace(/[^0-9.]/g, '')) -
          Number(a.price.replace(/[^0-9.]/g, ''))
      );
    } else if (sortBy === 'Newest') {
      list = [...list].reverse();
    }

    return list;
  }, [query, level, category, activeTag, sortBy]);

  const totalPages = Math.max(
    1,
    Math.ceil(Math.max(filteredCourses.length, 1) / SEARCH_PAGE_SIZE)
  );

  const pageCourses = useMemo(() => {
    if (filteredCourses.length === 0) return [];
    const start = (currentPage - 1) * SEARCH_PAGE_SIZE;
    const slice = filteredCourses.slice(start, start + SEARCH_PAGE_SIZE);
    if (slice.length > 0) return slice;
    // Pad mock catalog pages when filters leave few results
    return Array.from({ length: Math.min(SEARCH_PAGE_SIZE, filteredCourses.length || 6) }, (_, index) => {
      return filteredCourses[index % filteredCourses.length];
    });
  }, [filteredCourses, currentPage]);

  const creatorMatches = useMemo(() => {
    if (!query) return creators;
    return creators.filter(
      (creator) =>
        creator.name.toLowerCase().includes(query) ||
        creator.role.toLowerCase().includes(query)
    );
  }, [query]);

  const categoryMatches = useMemo(() => {
    if (!query && category === 'All categories') return featuredCategories;
    const needle = (query || category).toLowerCase();
    return featuredCategories.filter((item) =>
      item.name.toLowerCase().includes(needle)
    );
  }, [query, category]);

  return (
    <section className="bg-white pb-16 pt-10 sm:pb-20 sm:pt-12">
      <div className="container-content space-y-8 sm:space-y-10">
        <SearchFilters
          sortBy={sortBy}
          level={level}
          category={category}
          onSortChange={(value) => {
            setSortBy(value);
            setCurrentPage(1);
          }}
          onLevelChange={(value) => {
            setLevel(value);
            setCurrentPage(1);
          }}
          onCategoryChange={(value) => {
            setCategory(value);
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

        {searchType === 'Creators' ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {creatorMatches.map((creator) => (
              <Link
                key={creator.id}
                href={`/creators/${creator.id}`}
                className="rounded-[24px] border border-[#CED0D3] p-5 transition hover:border-brand"
              >
                <p className="font-display text-xl font-semibold text-ink">
                  {creator.name}
                </p>
                <p className="mt-1 text-sm text-ink-muted">{creator.role}</p>
              </Link>
            ))}
            {creatorMatches.length === 0 && (
              <p className="text-ink-muted">No creators matched your search.</p>
            )}
          </div>
        ) : searchType === 'Categories' ? (
          <div className="grid gap-4 sm:grid-cols-3">
            {categoryMatches.map((item) => (
              <Link
                key={item.id}
                href={`/search?category=${encodeURIComponent(item.name)}`}
                className="rounded-[24px] border border-[#CED0D3] p-5 transition hover:border-brand"
              >
                <p className="font-display text-lg font-semibold text-ink">
                  {item.name}
                </p>
              </Link>
            ))}
            {categoryMatches.length === 0 && (
              <p className="text-ink-muted">No categories matched your search.</p>
            )}
          </div>
        ) : (
          <>
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3 xl:gap-10">
              {pageCourses.map((course, index) => (
                <CourseCard
                  key={`${course.id}-${currentPage}-${index}`}
                  course={course}
                  bordered
                />
              ))}
            </div>
            {filteredCourses.length === 0 && (
              <p className="text-center text-ink-muted">
                No courses matched your filters. Try a different search.
              </p>
            )}
            {filteredCourses.length > 0 && (
              <div className="pt-4">
                <SearchPagination
                  currentPage={Math.min(currentPage, totalPages)}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default SearchResults;
