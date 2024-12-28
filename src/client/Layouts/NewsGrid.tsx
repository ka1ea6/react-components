'use client'
import * as React from 'react'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/client/ui/button'
import { useState, useEffect } from 'react'
import type { Post } from '@/payload-types'
import { Media } from '@/components/client/Payload/Media'

export function NewsGrid() {
  const [category, setCategory] = useState('All News')
  const [posts, setPosts] = useState<Post[]>([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const categories = ['All News', 'Announcements', 'Blogs', 'Articles', 'Case Studies']

  useEffect(() => {
    async function loadPosts() {
      if (category === 'All News') {
        const response = await fetch(`/api/posts?page=${page}`)
        const data = await response.json()
        setPosts(data.docs)
        setTotalPages(data.totalPages)
        return
      }

      const response = await fetch(
        `/api/posts?where[categories][title][equals]=${category}&page=${page}`,
      )
      const data = await response.json()
      setPosts(data.docs)
      setTotalPages(data.totalPages)
    }
    loadPosts()
  }, [category, page])

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <div className="flex gap-2 overflow-x-auto pb-4 mb-6">
        {categories.map((tab) => (
          <Button
            key={tab}
            variant={tab === category ? 'default' : 'ghost'}
            className="rounded-full whitespace-nowrap"
            onClick={() => setCategory(tab)}
          >
            {tab}
          </Button>
        ))}
        <Button variant="ghost" size="icon" className="rounded-full">
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">More</span>
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts &&
          posts.map((post) => (
            <Link
              key={post.id}
              href={`/posts/${post.slug}`}
              className="group rounded-lg overflow-hidden border bg-card text-card-foreground shadow hover:shadow-lg transition-shadow"
            >
              {/* <Image
              src={post.meta?.image.}
              alt=""
              width={600}
              height={400}
              className="w-full h-48 object-cover"
            /> */}
              {post.meta && post.meta.image && typeof post.meta.image !== 'string' && (
                <Media resource={post.meta.image} size="33vw" />
              )}

              <div className="p-4">
                <div className="text-sm text-muted-foreground mb-2">
                  {post.populatedAuthors &&
                    post.populatedAuthors.map((author) => {
                      return author.name
                    })}{' '}
                  ·{' '}
                  {post.publishedAt &&
                    new Date(post.publishedAt).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'long',
                    })}
                </div>
                <h2 className="text-xl font-bold mb-4 text-primary group-hover:text-accent group-hover:scale-105 transition-transform duration-200 ease-in-out">
                  {post.title}
                </h2>
              </div>
            </Link>
          ))}
      </div>

      {/* Pagination controls */}
      <div className="flex justify-center gap-1 mt-8">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
          <Button
            key={pageNumber}
            variant={pageNumber === page ? 'default' : 'ghost'}
            size="icon"
            className="w-10 h-10 rounded-full"
            onClick={() => setPage(pageNumber)}
          >
            {pageNumber}
          </Button>
        ))}
      </div>
    </div>
  )
}
