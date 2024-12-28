import React from 'react'
import { Card } from '@/components//ui/card'
import { Users } from 'lucide-react'
import Image from 'next/image'

interface TeamMember {
  name: string
  role?: string
  avatar?: string
}

interface ProjectTeamProps {
  members: TeamMember[]
  title: string
}

export function ProjectTeam({ title, members }: ProjectTeamProps) {
  return (
    <Card className="mb-6">
      <div className="p-6">
        <div className="flex items-center mb-4">
          <Users className="w-6 h-6 text-accent mr-2" />
          <h2 className="text-xl font-semibold text-foreground">{title}</h2>
        </div>
        <div className="space-y-4">
          {members.map((member, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="relative w-12 h-12 rounded-full overflow-hidden">
                {member.avatar && (
                  <Image src={member.avatar} alt={member.name} layout="fill" objectFit="cover" />
                )}
              </div>
              <div>
                <p className="font-semibold text-foreground">{member.name}</p>
                {member.role && <p className="text-sm text-muted-foreground">{member.role}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}
