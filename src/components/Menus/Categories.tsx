'use client'
import { cn } from '@/lib/utils/cn'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {  LinkProps } from '@/common-types'
import { ExternalLink } from 'lucide-react'


interface CategoryListProps {
  title?: string
  links: LinkProps[]
}

const linkClasses = cn('transition-colors duration-400 hover:text-primary ease-in-out')


export function Categories({ title, links }: CategoryListProps) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  function handleCategory(value: string) {
    console.log(value)
    const params = new URLSearchParams(searchParams)
    if (value) {
      params.set('category', value)
    } else {
      params.delete('category')
    }
    replace(`${pathname}?${params.toString()}`)
  }
  return (
      <Card>
        <CardHeader>
          <CardTitle className='text-accent'>{title && title}</CardTitle>
        </CardHeader>
        <CardContent>
          {links && links.length > 0 && (
            <nav aria-label="footer links navigation">
              <ul className="grid gap-2.5 ">
                {links.map((link, index) => (
                  <li key={index} className="flex items-center text-sm text-primary first:pt-0 hover:cursor-pointer" onClick={(e) => {
                    e.preventDefault()
                    handleCategory(link.href)
                  }}>                   
                      {link.label}
                      <ExternalLink className="ml-1 h-3 w-3" />
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </CardContent>
      </Card>
  )
}
