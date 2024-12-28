'use client'

import React, { useState, useMemo } from 'react'
import {
  ChevronRight,
  ChevronDown,
  Users,
  Code,
  Truck,
  GanttChart,
  DraftingCompass,
  Building2,
  Search,
} from 'lucide-react'

type Discipline = 'Architecture' | 'Engineering' | 'Development' | 'Delivery'
type Grade =
  | 'Consultant 1'
  | 'Consultant 2'
  | 'Consultant 3'
  | 'Senior Consultant 1'
  | 'Senior Consultant 2'
  | 'Manager'
  | 'Senior Manager'
  | 'Director'

interface Person {
  name: string
  discipline: Discipline
  grade: Grade
  reports: Person[]
}

const disciplineIcons: Record<Discipline, React.ReactNode> = {
  Architecture: <DraftingCompass className="h-5 w-5 text-blue-600" />,
  Engineering: <Code className="h-5 w-5 text-green-600" />,
  Development: <Code className="h-5 w-5 text-purple-600" />,
  Delivery: <GanttChart className="h-5 w-5 text-red-600" />,
}

const PersonCard: React.FC<{
  person: Person
  level: number
  onToggle: () => void
  isExpanded: boolean
  isHighlighted: boolean
}> = ({ person, level, onToggle, isExpanded, isHighlighted }) => {
  const hasReports = person.reports.length > 0

  return (
    <div className={`ml-${level * 4} mb-2`}>
      <div
        className={`flex items-center p-3 rounded-lg shadow-sm border ${isHighlighted ? 'bg-card border-primary' : 'bg-white border-gray-200'}`}
      >
        {hasReports && (
          <button
            onClick={onToggle}
            className="mr-2"
            aria-label={isExpanded ? 'Collapse' : 'Expand'}
          >
            {isExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </button>
        )}
        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3">
          <Users className="h-6 w-6 text-gray-500" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-800">{person.name}</h3>
          <div className="flex items-center mt-1">
            {disciplineIcons[person.discipline]}
            <span className="ml-1 text-xs text-gray-600">{person.discipline}</span>
          </div>
        </div>
        <span className="ml-auto text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
          {person.grade}
        </span>
      </div>
    </div>
  )
}

const OrgChartElement: React.FC<{ person: Person; level: number; searchTerm: string }> = ({
  person,
  level,
  searchTerm,
}) => {
  const [isExpanded, setIsExpanded] = useState(level < 1)

  const toggleExpand = () => setIsExpanded(!isExpanded)

  const isMatch = (p: Person) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.discipline.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.grade.toLowerCase().includes(searchTerm.toLowerCase())

  const hasMatchInSubtree = (p: Person): boolean => isMatch(p) || p.reports.some(hasMatchInSubtree)

  const shouldShow = searchTerm === '' || hasMatchInSubtree(person)
  const isHighlighted = isMatch(person)

  // Expand if there's a search term and this subtree has a match
  React.useEffect(() => {
    if (searchTerm !== '' && hasMatchInSubtree(person)) {
      setIsExpanded(true)
    }
  }, [searchTerm, person])

  if (!shouldShow) {
    return null
  }

  return (
    <div>
      <PersonCard
        person={person}
        level={level}
        onToggle={toggleExpand}
        isExpanded={isExpanded}
        isHighlighted={isHighlighted}
      />
      {isExpanded &&
        person.reports.map((report, index) => (
          <OrgChartElement key={index} person={report} level={level + 1} searchTerm={searchTerm} />
        ))}
    </div>
  )
}

export function OrgChart() {
  const [searchTerm, setSearchTerm] = useState('')

  const companyStructure: Person[] = [
    {
      name: 'Alice Johnson',
      discipline: 'Architecture',
      grade: 'Director',
      reports: [
        {
          name: 'Bob Smith',
          discipline: 'Engineering',
          grade: 'Senior Manager',
          reports: [
            {
              name: 'Charlie Brown',
              discipline: 'Development',
              grade: 'Manager',
              reports: [],
            },
            {
              name: 'Diana Ross',
              discipline: 'Engineering',
              grade: 'Manager',
              reports: [],
            },
            {
              name: 'Edward Norton',
              discipline: 'Engineering',
              grade: 'Manager',
              reports: [],
            },
          ],
        },
        {
          name: 'Fiona Apple',
          discipline: 'Architecture',
          grade: 'Senior Manager',
          reports: [
            {
              name: 'George Clooney',
              discipline: 'Architecture',
              grade: 'Manager',
              reports: [],
            },
            {
              name: 'Helen Mirren',
              discipline: 'Architecture',
              grade: 'Manager',
              reports: [],
            },
            {
              name: 'Ian McKellen',
              discipline: 'Architecture',
              grade: 'Manager',
              reports: [],
            },
          ],
        },
        {
          name: 'Julia Roberts',
          discipline: 'Development',
          grade: 'Senior Manager',
          reports: [
            {
              name: 'Kevin Spacey',
              discipline: 'Development',
              grade: 'Manager',
              reports: [],
            },
            {
              name: 'Liam Neeson',
              discipline: 'Development',
              grade: 'Manager',
              reports: [],
            },
            {
              name: 'Meryl Streep',
              discipline: 'Development',
              grade: 'Manager',
              reports: [],
            },
          ],
        },
      ],
    },
    {
      name: 'Nicole Kidman',
      discipline: 'Delivery',
      grade: 'Director',
      reports: [
        {
          name: 'Owen Wilson',
          discipline: 'Delivery',
          grade: 'Senior Manager',
          reports: [
            {
              name: 'Penelope Cruz',
              discipline: 'Delivery',
              grade: 'Manager',
              reports: [],
            },
            {
              name: 'Quentin Tarantino',
              discipline: 'Delivery',
              grade: 'Manager',
              reports: [],
            },
            {
              name: 'Rachel McAdams',
              discipline: 'Delivery',
              grade: 'Manager',
              reports: [],
            },
          ],
        },
        {
          name: 'Samuel L. Jackson',
          discipline: 'Delivery',
          grade: 'Senior Manager',
          reports: [
            {
              name: 'Tom Hanks',
              discipline: 'Delivery',
              grade: 'Manager',
              reports: [],
            },
            {
              name: 'Uma Thurman',
              discipline: 'Delivery',
              grade: 'Manager',
              reports: [],
            },
            {
              name: 'Viola Davis',
              discipline: 'Delivery',
              grade: 'Manager',
              reports: [],
            },
          ],
        },
        {
          name: 'Will Smith',
          discipline: 'Delivery',
          grade: 'Senior Manager',
          reports: [
            {
              name: 'Xavier Dolan',
              discipline: 'Delivery',
              grade: 'Manager',
              reports: [],
            },
            {
              name: 'Yalitza Aparicio',
              discipline: 'Delivery',
              grade: 'Manager',
              reports: [],
            },
            {
              name: 'Zoe Saldana',
              discipline: 'Delivery',
              grade: 'Manager',
              reports: [],
            },
          ],
        },
      ],
    },
  ]

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">{`Who's who`}</h2>
      <div className="mb-4 relative">
        <input
          type="text"
          placeholder="Search by name, discipline, or grade"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Search the organization chart"
        />
        <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
      </div>
      <div className="space-y-4">
        {companyStructure.map((director, index) => (
          <OrgChartElement key={index} person={director} level={0} searchTerm={searchTerm} />
        ))}
      </div>
    </div>
  )
}
