'use client';

import { searchCategoryTags } from '@/features/search/data';

type SearchCategoryTabsProps = {
  activeTag: string;
  onChange: (tag: string) => void;
};

const SearchCategoryTabs = ({
  activeTag,
  onChange,
}: SearchCategoryTabsProps) => {
  return (
    <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:overflow-visible sm:px-0">
      <div
        className="flex w-max items-center gap-3 sm:w-full sm:flex-wrap sm:gap-4"
        role="tablist"
        aria-label="Course categories"
      >
        {searchCategoryTags.map((tag) => {
          const isActive = tag === activeTag;
          return (
            <button
              key={tag}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onChange(tag)}
              className={`whitespace-nowrap rounded-full px-4 py-3 text-base font-medium transition ${
                isActive
                  ? 'bg-accent text-ink'
                  : 'bg-surface-muted text-ink-muted hover:bg-surface-line'
              }`}
            >
              {tag}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SearchCategoryTabs;
