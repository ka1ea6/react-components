import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent } from '@/components/client/ui/card'

export interface CustomerCardProps {
  name: string
  logo?: string
  href: string
}

export function CustomerCard({ name, logo, href }: CustomerCardProps) {
  return (
    <Card className="w-full max-w-sm overflow-hidden transition-all duration-300 ring-0 hover:shadow-lg  group">
      <Link href={href} className="block">
        <div className="bg-white p-2 flex items-center justify-center h-24">
          <div className="relative w-full h-full">
            {logo && <Image src={logo} alt={`${name} logo`} layout="fill" objectFit="contain" />}
          </div>
        </div>
        <CardContent className="p-3 flex items-center justify-center h-18 bg-gradient-to-br from-gray-900 via-brand-one to-gray-900">
          <p className="font-medium text-lg text-white text-center group-hover:scale-105 transition-transform duration-200 ease-in-out">
            {name}
          </p>
        </CardContent>
      </Link>
    </Card>
  )
}
