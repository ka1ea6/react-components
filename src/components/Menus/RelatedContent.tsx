import React from 'react'
import Link from 'next/link'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ExternalLink } from 'lucide-react'

export interface RelatedContentProps {
  links: Array<{ title: string; url: string }>
  title?: string
}

export const RelatedContent: React.FC<RelatedContentProps> = ({ links, title = 'Related Content' }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-accent'>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <nav className="flex flex-col space-y-2">
          {links.map((link, index) => (
            <Link
              key={index}
              href={link.url}
              className="inline-flex items-center text-sm text-primary hover:underline"
            >
              {link.title}
              {/* only show the external link for external sites (http/https) */}
              {link.url.startsWith('http') && <ExternalLink className="ml-1 h-3 w-3" />}
            </Link>
          ))}
        </nav>
      </CardContent>
    </Card>
  )
}

// <div className="space-y-6">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Quick Actions</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <p className="mb-4 text-sm text-muted-foreground">
//                   Get started with your first action in just a few clicks.
//                 </p>
//                 <Button className="w-full">Create New</Button>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader>
//                 <CardTitle>Resources</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <nav className="flex flex-col space-y-2">
//                   <a
//                     href="#"
//                     className="inline-flex items-center text-sm text-blue-600 hover:underline"
//                   >
//                     User Guide
//                     <ExternalLink className="ml-1 h-3 w-3" />
//                   </a>
//                   <a
//                     href="#"
//                     className="inline-flex items-center text-sm text-blue-600 hover:underline"
//                   >
//                     API Documentation
//                     <ExternalLink className="ml-1 h-3 w-3" />
//                   </a>
//                   <a
//                     href="#"
//                     className="inline-flex items-center text-sm text-blue-600 hover:underline"
//                   >
//                     View Pricing Details
//                     <ExternalLink className="ml-1 h-3 w-3" />
//                   </a>
//                 </nav>
//               </CardContent>
//             </Card>
//           </div>
