'use client';

import {
  searchFilterOptions,
  searchSortOptions,
} from '@/features/search/data';
import {
  BarChart3,
  ChevronDown,
  Filter,
  ListFilter,
  Shapes,
} from 'lucide-react';
import { useState } from 'react';

const filterIcons = {
  filter: Filter,
  'bar-chart-3': BarChart3,
  shapes: Shapes,
} as const;

type SearchFiltersProps = {
  sortBy: string;
  onSortChange: (value: string) => void;
};

const SearchFilters = ({ sortBy, onSortChange }: SearchFiltersProps) => {
  const [sortOpen, setSortOpen] = useState(false);

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap items-center gap-3 sm:gap-4">
        {searchFilterOptions.map((option) => {
          const Icon = filterIcons[option.icon];
          return (
            <button
              key={option.id}
              type="button"
              className="inline-flex h-12 items-center gap-1 rounded-full border border-[#CED0D3] bg-white px-4 text-base font-medium text-ink-muted transition hover:border-ink-faint"
            >
              <Icon size={20} className="text-ink" aria-hidden />
              {option.label}
            </button>
          );
        })}
      </div>

      <div className="relative">
        <button
          type="button"
          className="inline-flex h-12 w-full items-center justify-center gap-1 rounded-full border border-[#CED0D3] bg-white px-4 text-base font-medium text-ink-muted transition hover:border-ink-faint sm:w-auto"
          aria-haspopup="listbox"
          aria-expanded={sortOpen}
          onClick={() => setSortOpen((open) => !open)}
        >
          <ListFilter size={20} className="text-ink" aria-hidden />
          {sortBy}
          <ChevronDown size={16} className="ml-0.5 opacity-70" aria-hidden />
        </button>

        {sortOpen && (
          <ul
            role="listbox"
            className="absolute right-0 z-20 mt-2 min-w-[200px] overflow-hidden rounded-2xl border border-surface-line bg-white py-1 shadow-float"
          >
            {searchSortOptions.map((option) => (
              <li key={option}>
                <button
                  type="button"
                  role="option"
                  aria-selected={option === sortBy}
                  className={`block w-full px-4 py-2.5 text-left text-sm transition hover:bg-surface-muted ${
                    option === sortBy ? 'font-medium text-brand' : 'text-ink'
                  }`}
                  onClick={() => {
                    onSortChange(option);
                    setSortOpen(false);
                  }}
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchFilters;
