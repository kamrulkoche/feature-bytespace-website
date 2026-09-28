'use client';

import { searchTypeOptions } from '@/features/search/data';
import { ChevronDown, Search } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';

const SearchHero = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') ?? '');
  const [searchType, setSearchType] = useState<(typeof searchTypeOptions)[number]>(
    () => {
      const type = searchParams.get('type');
      return searchTypeOptions.includes(type as (typeof searchTypeOptions)[number])
        ? (type as (typeof searchTypeOptions)[number])
        : 'Courses';
    }
  );
  const [typeOpen, setTypeOpen] = useState(false);

  useEffect(() => {
    setQuery(searchParams.get('q') ?? '');
  }, [searchParams]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const params = new URLSearchParams();
    const trimmed = query.trim();
    if (trimmed) params.set('q', trimmed);
    if (searchType !== 'Courses') params.set('type', searchType);
    const category = searchParams.get('category');
    if (category) params.set('category', category);
    const qs = params.toString();
    router.push(qs ? `/search?${qs}` : '/search');
  };

  return (
    <section className="relative overflow-hidden bg-brand pt-[88px] text-white lg:pt-[120px]">
      <div
        className="pointer-events-none absolute inset-0 bg-brand-grid bg-grid opacity-40"
        aria-hidden
      />

      <div className="container-content relative z-10 flex flex-col items-center justify-center pb-8 pt-6 sm:pb-12 sm:pt-8 lg:min-h-[240px] lg:pb-14 lg:pt-0">
        <h1 className="text-center font-display text-[26px] font-semibold leading-tight text-surface-muted sm:text-3xl md:text-4xl">
          Find Your Next Course
        </h1>

        <form
          onSubmit={handleSubmit}
          className="mt-6 flex w-full max-w-[624px] flex-col gap-3 sm:mt-8 sm:flex-row sm:items-stretch sm:gap-4"
        >
          <label className="sr-only" htmlFor="search-query">
            Search courses
          </label>

          {/* Same height as Courses on all breakpoints */}
          <div className="flex h-14 min-h-14 w-full min-w-0 flex-1 items-center gap-3 rounded-full bg-white px-5 text-ink-faint sm:h-[52px] sm:min-h-[52px] sm:px-6">
            <Search size={22} className="shrink-0" aria-hidden />
            <input
              id="search-query"
              name="q"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search"
              className="h-full w-full min-w-0 bg-transparent text-base text-ink outline-none placeholder:text-ink-faint sm:text-lg"
            />
          </div>

          <div className="relative w-full shrink-0 sm:w-auto">
            <button
              type="button"
              className="inline-flex h-14 min-h-14 w-full items-center justify-center gap-2 rounded-full bg-accent px-6 text-base font-medium text-ink transition hover:bg-accent-dark sm:h-[52px] sm:min-h-[52px] sm:w-auto sm:text-lg"
              aria-haspopup="listbox"
              aria-expanded={typeOpen}
              onClick={() => setTypeOpen((open) => !open)}
            >
              {searchType}
              <ChevronDown size={20} aria-hidden />
            </button>

            {typeOpen && (
              <ul
                role="listbox"
                className="absolute left-0 right-0 z-30 mt-2 overflow-hidden rounded-2xl border border-surface-line bg-white py-1 shadow-float sm:left-auto sm:right-0 sm:min-w-[160px]"
              >
                {searchTypeOptions.map((option) => (
                  <li key={option}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={option === searchType}
                      className={`block w-full px-4 py-3 text-left text-sm transition hover:bg-surface-muted ${
                        option === searchType
                          ? 'font-medium text-brand'
                          : 'text-ink'
                      }`}
                      onClick={() => {
                        setSearchType(option);
                        setTypeOpen(false);
                      }}
                    >
                      {option}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};

export default SearchHero;
