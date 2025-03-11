'use client'
import { cn } from '@/lib/utils/cn'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa6'
import { useState } from 'react'

type PagingProps = {
  nextPage?: number | null
  page: number
  prevPage?: number | null
  totalDocs?: number | null
  totalPages: number
}

// Repeated styles
const paginationItemClasses = cn(
  'grid h-[45px] w-[45px] place-items-center border border-[#3b3b3b] font-secondary text-base text-foreground rounded-full transition-colors duration-300 hover:bg-accent hover:border-accent hover:text-accent-foreground',
)

export function Pagination({ pages }: { pages: PagingProps }) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()
  const { totalPages, page: currentPage } = pages

  const [visibleRange, setVisibleRange] = useState({ start: currentPage > 3 ? currentPage - 3: 1, end: currentPage + 2 })

  const handleScroll = (direction: 'left' | 'right') => {
    if (direction === 'left' && visibleRange.start > 1) {
      setVisibleRange((prev) => ({
        start: prev.start - 1,
        end: prev.end - 1,
      }))
    } else if (direction === 'right' && visibleRange.end < totalPages) {
      setVisibleRange((prev) => ({
        start: prev.start + 1,
        end: prev.end + 1,
      }))
    }
  }

  function handlePage(value: string) {
    const params = new URLSearchParams(searchParams)
    if (value) {
      params.set('page', value)
    } else {
      params.delete('page')
    }
    replace(`${pathname}?${params.toString()}`)
  }

  if (totalPages <= 1) return null

  const pageNumbers = []
  for (let i = visibleRange.start; i <= visibleRange.end; i++) {
    pageNumbers.push(i)
  }

  return (
    <div className='mt-12'>
      <ul
        className="flex flex-wrap items-center justify-center gap-3 md:gap-5"
        aria-label="pagination"
      >
        {visibleRange.start > 1 && (
          <li>
            <button
              className={cn(paginationItemClasses, 'border-accent bg-accent text-accent-foreground')}
              aria-label="scroll left"
              onClick={() => handleScroll('left')}
            >
              <FaArrowLeft />
            </button>
          </li>
        )}
        {pageNumbers.map((page, index) => (
          <li key={index}>
            <a
              className={cn(
                paginationItemClasses,
                page === currentPage
                  ? 'border-accent bg-accent text-accent-foreground'
                  : 'border-accent'
              )}
              href="#"
              aria-label={`pagination button ${page}`}
              role="button"
              onClick={(e) => {
                e.preventDefault()
                handlePage(page.toString())
              }}
            >
              {page}
            </a>
          </li>
        ))}
        {visibleRange.end < totalPages && (
          <li>
            <button
              className={cn(paginationItemClasses, 'border-accent bg-accent text-accent-foreground')}
              aria-label="scroll right"
              onClick={() => handleScroll('right')}
            >
              <FaArrowRight />
            </button>
          </li>
        )}
      </ul>
    </div>
  )
}
