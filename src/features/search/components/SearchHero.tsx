'use client';

import { searchTypeOptions } from '@/features/search/data';
import { ChevronDown, Search } from 'lucide-react';
import { FormEvent, useState } from 'react';

const SearchHero = () => {
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState<(typeof searchTypeOptions)[number]>(
    'Courses'
  );
  const [typeOpen, setTypeOpen] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <section className="relative overflow-hidden bg-brand pt-[88px] text-white lg:pt-[120px]">
      <div
        className="pointer-events-none absolute inset-0 bg-brand-grid bg-grid opacity-40"
        aria-hidden
      />

      <div className="container-content relative z-10 flex min-h-[240px] flex-col items-center justify-center pb-12 pt-2 lg:min-h-[240px] lg:pb-14 lg:pt-0">
        <h1 className="text-center font-display text-3xl font-semibold text-surface-muted sm:text-4xl">
          Find Your Next Course
        </h1>

        <form
          onSubmit={handleSubmit}
          className="mt-8 flex w-full max-w-[624px] flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
        >
          <label className="sr-only" htmlFor="search-query">
            Search courses
          </label>
          <div className="flex h-[52px] flex-1 items-center gap-2 rounded-full bg-white px-6 text-ink-faint">
            <Search size={20} aria-hidden />
            <input
              id="search-query"
              name="q"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search"
              className="h-full w-full bg-transparent text-lg text-ink outline-none placeholder:text-ink-faint"
            />
          </div>

          <div className="relative shrink-0">
            <button
              type="button"
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-accent px-6 text-lg font-medium text-ink transition hover:bg-accent-dark sm:w-auto"
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
                className="absolute right-0 z-20 mt-2 min-w-full overflow-hidden rounded-2xl border border-surface-line bg-white py-1 shadow-float"
              >
                {searchTypeOptions.map((option) => (
                  <li key={option}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={option === searchType}
                      className={`block w-full px-4 py-2.5 text-left text-sm transition hover:bg-surface-muted ${
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
