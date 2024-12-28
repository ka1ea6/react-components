import * as React from 'react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, FileText, Lightbulb, PoundSterling, User, Users2 } from 'lucide-react'

interface TeamMember {
  role: string
  count?: number
  isFTE?: boolean
}

interface TeamStructureProps {
  teamMembers?: {
    leadership: TeamMember[]
    core: TeamMember[]
    sme: string[]
  }
  outputs?: {
    title: string
    description: string
  }[]
  benefits?: string[]
  fee?: string
}

export function ProposalSummary({
  teamMembers = {
    leadership: [{ role: 'CTO oversight' }, { role: 'Senior Delivery Lead', isFTE: true }],
    core: [
      { role: 'Lead Cloud Architect', isFTE: true },
      { role: 'Senior Business Analyst', isFTE: true },
    ],
    sme: ['Security Architecture', 'Engineering', 'Data Architecture'],
  },
  outputs = [
    {
      title: 'Discovery Report',
      description:
        'A detailed report summarising the findings from the initial assessment, including insights from stakeholder interviews and document reviews.',
    },
    {
      title: 'Cloud and Data Estate Assessment Report',
      description:
        'A comprehensive analysis of the current cloud and data infrastructure, highlighting strengths, weaknesses, and opportunities for improvement.',
    },
    {
      title: 'Gap Analysis Report',
      description:
        'Identification of gaps between current capabilities and the requirements for adopting GenAI, along with a detailed analysis of these gaps.',
    },
    {
      title: 'Recommendations Report',
      description:
        'A set of actionable recommendations for enhancing the cloud infrastructure, data management practices, and operating model.',
    },
    {
      title: 'Implementation Roadmap',
      description:
        'A phased roadmap outlining the steps to implement the recommended changes, including timelines, milestones, and prioritisation of initiatives.',
    },
    {
      title: 'Risk Management Plan',
      description:
        'A detailed plan outlining potential risks and mitigation strategies to ensure a smooth transition.',
    },
  ],
  benefits = [
    'Strategic Alignment: Ensures that the adoption of GenAI aligns with the overall business strategy and objectives.',
    'Enhanced Efficiency: Optimises cloud and data operations, leading to improved performance and cost savings.',
    'Risk Mitigation: Identifies potential risks early and provides strategies to mitigate them, ensuring a smooth transition.',
    'Scalability: Prepares the organisation for future growth and scalability by enhancing the underlying technology infrastructure.',
    'Competitive Advantage: Positions the organisation to leverage Generative AI effectively, providing a competitive edge in the market.',
  ],
  fee = '£150,000 for delivery of listed outputs',
}: TeamStructureProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-1 space-y-6 flex flex-col">
        <Card className="flex-grow">
          <CardHeader className="bg-primary text-primary-foreground">
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Team
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="mb-6 text-sm text-muted-foreground">
              A small team of highly-skilled consultants with significant Cloud, Data and AI
              experience will execute this phase:
            </p>
            <div className="space-y-6">
              {/* Leadership */}
              <div className="space-y-2">
                {teamMembers.leadership.map((member, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span>{member.role}</span>
                    </div>
                    {member.isFTE && <span className="text-xs text-muted-foreground">(FTE)</span>}
                  </div>
                ))}
              </div>
              {/* Core Team */}
              <div className="space-y-2">
                {teamMembers.core.map((member, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span>{member.role}</span>
                      {member.count && <span>({member.count}x)</span>}
                    </div>
                    {member.isFTE && <span className="text-xs text-muted-foreground">(FTE)</span>}
                  </div>
                ))}
              </div>
              {/* SME Input */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Users2 className="h-4 w-4 text-muted-foreground" />
                  <span>SME input:</span>
                </div>
                <div className="ml-6 text-sm text-muted-foreground">
                  {teamMembers.sme.join(', ')}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="bg-primary text-primary-foreground">
            <CardTitle className="flex items-center gap-2">
              <PoundSterling className="h-5 w-5" />
              Fee
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-lg font-semibold">{fee}</p>
          </CardContent>
        </Card>
      </div>

      {/* Outputs Section */}
      <Card className="lg:col-span-1 flex flex-col">
        <CardHeader className="bg-primary text-primary-foreground">
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Outputs
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 flex-grow overflow-auto">
          <ol className="list-decimal list-inside space-y-4">
            {outputs.map((output, index) => (
              <li key={index} className="text-sm">
                <span className="font-medium">{output.title}:</span>{' '}
                <span className="text-muted-foreground">{output.description}</span>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-sm italic text-muted-foreground">
            Delivered within 8 weeks from start date of engagement.
          </p>
        </CardContent>
      </Card>

      {/* Benefits Section */}
      <Card className="lg:col-span-1 flex flex-col">
        <CardHeader className="bg-primary text-primary-foreground">
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            Benefits
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 flex-grow overflow-auto">
          <ul className="space-y-4">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex gap-2 text-sm">
                <span className="text-primary">✓</span>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
