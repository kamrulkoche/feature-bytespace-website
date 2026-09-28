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

const levelOptions = ['All levels', 'Beginner', 'Intermediate', 'Advanced'] as const;
const categoryOptions = [
  'All categories',
  'Design',
  'Development',
  'Marketing',
  'Business',
  'Photography',
] as const;

type SearchFiltersProps = {
  sortBy: string;
  level: string;
  category: string;
  onSortChange: (value: string) => void;
  onLevelChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
};

const SearchFilters = ({
  sortBy,
  level,
  category,
  onSortChange,
  onLevelChange,
  onCategoryChange,
}: SearchFiltersProps) => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const menus: Record<
    string,
    { options: readonly string[]; value: string; onChange: (v: string) => void }
  > = {
    filter: {
      options: ['Clear filters'],
      value: '',
      onChange: () => {
        onLevelChange('All levels');
        onCategoryChange('All categories');
      },
    },
    level: {
      options: levelOptions,
      value: level,
      onChange: onLevelChange,
    },
    category: {
      options: categoryOptions,
      value: category,
      onChange: onCategoryChange,
    },
  };

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap items-center gap-3 sm:gap-4">
        {searchFilterOptions.map((option) => {
          const Icon = filterIcons[option.icon];
          const menu = menus[option.id];
          const isOpen = openMenu === option.id;
          return (
            <div key={option.id} className="relative">
              <button
                type="button"
                className="inline-flex h-12 items-center gap-1 rounded-full border border-[#CED0D3] bg-white px-4 text-base font-medium text-ink-muted transition hover:border-ink-faint"
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                onClick={() =>
                  setOpenMenu((current) =>
                    current === option.id ? null : option.id
                  )
                }
              >
                <Icon size={20} className="text-ink" aria-hidden />
                {option.id === 'level' && level !== 'All levels'
                  ? level
                  : option.id === 'category' && category !== 'All categories'
                    ? category
                    : option.label}
                <ChevronDown size={16} className="opacity-70" aria-hidden />
              </button>
              {isOpen && menu && (
                <ul
                  role="listbox"
                  className="absolute left-0 z-20 mt-2 min-w-[180px] overflow-hidden rounded-2xl border border-surface-line bg-white py-1 shadow-float"
                >
                  {menu.options.map((item) => (
                    <li key={item}>
                      <button
                        type="button"
                        role="option"
                        aria-selected={item === menu.value}
                        className={`block w-full px-4 py-2.5 text-left text-sm transition hover:bg-surface-muted ${
                          item === menu.value
                            ? 'font-medium text-brand'
                            : 'text-ink'
                        }`}
                        onClick={() => {
                          menu.onChange(item);
                          setOpenMenu(null);
                        }}
                      >
                        {item}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>

      <div className="relative">
        <button
          type="button"
          className="inline-flex h-12 w-full items-center justify-center gap-1 rounded-full border border-[#CED0D3] bg-white px-4 text-base font-medium text-ink-muted transition hover:border-ink-faint sm:w-auto"
          aria-haspopup="listbox"
          aria-expanded={openMenu === 'sort'}
          onClick={() =>
            setOpenMenu((current) => (current === 'sort' ? null : 'sort'))
          }
        >
          <ListFilter size={20} className="text-ink" aria-hidden />
          {sortBy}
          <ChevronDown size={16} className="ml-0.5 opacity-70" aria-hidden />
        </button>

        {openMenu === 'sort' && (
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
                    setOpenMenu(null);
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
