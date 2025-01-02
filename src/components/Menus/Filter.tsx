'use client'
import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'
import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils/cn'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import {  LinkProps } from '@/common-types'

export function Filter({ types: categories }: { types?: LinkProps[] }) {
  const [category, setCategory] = useState(categories && categories[0].href)
 const searchParams = useSearchParams()
 const pathname = usePathname()
    const { replace } = useRouter()
    

  function handlePage(value: string) {
    const params = new URLSearchParams(searchParams)
    if (value) {
      params.set('type', value)
    } else {
      params.delete('type')
    }
      setCategory(value)
    replace(`${pathname}?${params.toString()}`)
  }

  // className="flex flex-wrap items-center justify-center gap-3 md:gap-5"

  return (    <div className="flex gap-2 flex-wrap items-center justify-center overflow-x-auto pb-4 mb-6">

      {categories && categories.map((tab, index) => (
        <Button
          key={index}
          variant={tab.href === category ? 'default' : 'ghost'}
          className={cn(
            'rounded-full whitespace-nowrap hover:bg-accent hover:text-accent-foreground',
            tab.href === category && 'bg-accent text-accent-foreground',
          )}
          onClick={() => handlePage(tab.href)}
        >
          {tab.label}
        </Button>
      ))}
      {/* { categories && <Button
        variant="ghost"
        size="icon"
        className="rounded-full hover:bg-accent hover:text-accent-foreground"
      >
        <ChevronRight className="h-4 w-4" />
        <span className="sr-only">More</span>
      </Button>
} */}
    </div>
  )
}
