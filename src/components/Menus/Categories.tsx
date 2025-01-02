'use client'
import { cn } from '@/lib/utils/cn'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {  LinkProps } from '@/common-types'


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
    <div className="space-y-5 rounded-5 bg-accent-100 py-8 dark:bg-accent-700 lg:p-10">
      <Card>
        <CardHeader>
          <CardTitle>{title && title}</CardTitle>
        </CardHeader>
        <CardContent>
          {links && links.length > 0 && (
            <nav aria-label="footer links navigation">
              <ul className="grid gap-2.5 ">
                {links.map((link, index) => (
                  <li key={index} className="flex items-center gap-2.5 pt-2.5 first:pt-0 hover:cursor-pointer" onClick={(e) => {
                    e.preventDefault()
                    handleCategory(link.href)
                  }}>
                    <span className="grid h-3 w-3 place-items-center border border-accent">
                      <span className="block h-0.5 w-0.5 bg-accent"></span>
                    </span>
                    <a className={linkClasses} >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
