'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

type SearchPaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const SearchPagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: SearchPaginationProps) => {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav
      className="flex items-center justify-center gap-6"
      aria-label="Search results pagination"
    >
      <button
        type="button"
        className="inline-flex h-12 w-14 items-center justify-center rounded-full border border-[#CED0D3] bg-white text-ink-muted transition hover:border-ink-faint disabled:cursor-not-allowed disabled:opacity-40"
        aria-label="Previous page"
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <ChevronLeft size={20} />
      </button>

      <div className="flex items-center gap-6">
        {pages.map((page) => {
          const isActive = page === currentPage;
          return (
            <button
              key={page}
              type="button"
              aria-label={`Page ${page}`}
              aria-current={isActive ? 'page' : undefined}
              className={`font-display text-xl font-semibold transition ${
                isActive
                  ? 'text-ink'
                  : 'text-[#CED0D3] hover:text-ink-muted'
              }`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        className="inline-flex h-12 w-14 items-center justify-center rounded-full border border-[#CED0D3] bg-white text-ink transition hover:border-ink-faint disabled:cursor-not-allowed disabled:opacity-40"
        aria-label="Next page"
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <ChevronRight size={20} />
      </button>
    </nav>
  );
};

export default SearchPagination;
