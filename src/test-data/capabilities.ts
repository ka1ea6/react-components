import type React from "react"

// Core capability types
export interface CapabilityAction {
  id: string
  label: string
  description?: string
  icon?: React.ReactNode
  iconName?: string
  action: (context: CapabilityContext) => void
}

export interface CapabilityContext {
  path: Capability[]
  selectedItems: any[]
  filters: Record<string, any>
}

export interface CapabilityData {
  id: string
  title: string
  subtitle?: string
  value?: string | number
  metadata?: Record<string, any>
}

export interface Capability {
  id: string
  name: string
  description?: string
  icon?: React.ReactNode
  iconName?: string
  color?: string
  type: "category" | "list" | "item"
  children?: Capability[]
  data?: CapabilityData[]
  actions?: CapabilityAction[]
  // Function to fetch data dynamically
  fetchData?: (context: CapabilityContext) => Promise<CapabilityData[]>
}

// Color scheme for capabilities
export interface CapabilityColorScheme {
  primary: string
  secondary: string
  accent: string
  categories: string[]
  lists: string[]
  items: string[]
}

// Default color scheme
export const defaultColorScheme: CapabilityColorScheme = {
  primary: "bg-blue-500",
  secondary: "bg-gray-500",
  accent: "bg-purple-500",
  categories: [
    "bg-green-500",
    "bg-blue-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-orange-500",
  ],
  lists: [
    "bg-green-400",
    "bg-blue-400",
    "bg-purple-400",
    "bg-pink-400",
    "bg-indigo-400",
    "bg-orange-400",
  ],
  items: [
    "bg-green-300",
    "bg-blue-300",
    "bg-purple-300",
    "bg-pink-300",
    "bg-indigo-300",
    "bg-orange-300",
  ],
}

// Test capabilities data
export const testCapabilities: Capability[] = [
  {
    id: "sales",
    name: "Sales",
    description: "Revenue and customer management",
    iconName: "DollarSign",
    color: "bg-green-600",
    type: "category",
    actions: [
      {
        id: "view-pipeline",
        label: "View Pipeline",
        description: "See all opportunities in pipeline",
        iconName: "BarChart",
        action: (context) => console.log("View pipeline", context)
      },
      {
        id: "create-opportunity",
        label: "Create Opportunity",
        iconName: "Target",
        action: (context) => console.log("Create opportunity", context)
      }
    ],
    children: [
      {
        id: "customers",
        name: "Customers",
        description: "Customer accounts and contacts",
        iconName: "Users",
        color: "bg-blue-500",
        type: "list",
        actions: [
          {
            id: "add-customer",
            label: "Add Customer",
            iconName: "User",
            action: (context) => console.log("Add customer", context)
          },
          {
            id: "export-customers",
            label: "Export List",
            iconName: "FileText",
            action: (context) => console.log("Export customers", context)
          }
        ],
        data: [
          {
            id: "acme-corp",
            title: "Acme Corp",
            subtitle: "Enterprise Customer",
            value: "$125K ARR",
            metadata: { industry: "Technology", employees: 500, lastContact: "2024-01-15" }
          },
          {
            id: "beta-inc",
            title: "Beta Inc",
            subtitle: "Mid-market",
            value: "$45K ARR",
            metadata: { industry: "Healthcare", employees: 150, lastContact: "2024-01-10" }
          },
          {
            id: "gamma-llc",
            title: "Gamma LLC",
            subtitle: "Small Business",
            value: "$15K ARR",
            metadata: { industry: "Manufacturing", employees: 50, lastContact: "2024-01-08" }
          }
        ]
      },
      {
        id: "opportunities",
        name: "Opportunities",
        description: "Sales opportunities and deals",
        iconName: "Target",
        color: "bg-yellow-500",
        type: "list",
        actions: [
          {
            id: "close-won",
            label: "Mark as Won",
            iconName: "CheckCircle",
            action: (context) => console.log("Close won", context)
          },
          {
            id: "schedule-followup",
            label: "Schedule Follow-up",
            iconName: "Clock",
            action: (context) => console.log("Schedule follow-up", context)
          }
        ],
        data: [
          {
            id: "opp-1",
            title: "Acme Corp - Enterprise License",
            subtitle: "Closing Q1 2024",
            value: "$85K",
            metadata: { stage: "Negotiation", probability: 80, closeDate: "2024-03-31" }
          },
          {
            id: "opp-2",
            title: "Beta Inc - Platform Upgrade",
            subtitle: "Closing Q2 2024",
            value: "$32K",
            metadata: { stage: "Proposal", probability: 65, closeDate: "2024-06-15" }
          }
        ]
      }
    ]
  },
  {
    id: "marketing",
    name: "Marketing",
    description: "Marketing campaigns and analytics",
    iconName: "TrendingUp",
    color: "bg-pink-600",
    type: "category",
    actions: [
      {
        id: "view-analytics",
        label: "View Analytics",
        iconName: "BarChart",
        action: (context) => console.log("View analytics", context)
      }
    ],
    children: [
      {
        id: "campaigns",
        name: "Campaigns",
        description: "Marketing campaigns and performance",
        iconName: "TrendingUp",
        color: "bg-pink-500",
        type: "list",
        data: [
          {
            id: "campaign-1",
            title: "Q1 Product Launch",
            subtitle: "Active Campaign",
            value: "45% CTR",
            metadata: { budget: "$50K", spend: "$32K", leads: 1250 }
          },
          {
            id: "campaign-2",
            title: "Holiday Promotion",
            subtitle: "Completed",
            value: "38% CTR",
            metadata: { budget: "$25K", spend: "$24K", leads: 890 }
          }
        ]
      }
    ]
  },
  {
    id: "projects",
    name: "Projects",
    description: "Project management and tracking",
    iconName: "Briefcase",
    color: "bg-blue-600",
    type: "category",
    children: [
      {
        id: "active-projects",
        name: "Active Projects",
        description: "Currently active projects",
        iconName: "Activity",
        color: "bg-blue-500",
        type: "list",
        data: [
          {
            id: "project-1",
            title: "Website Redesign",
            subtitle: "In Progress",
            value: "75% Complete",
            metadata: { team: "Design", deadline: "2024-02-15", status: "On Track" }
          },
          {
            id: "project-2",
            title: "Mobile App Development",
            subtitle: "Planning",
            value: "25% Complete",
            metadata: { team: "Engineering", deadline: "2024-03-31", status: "On Track" }
          }
        ]
      }
    ]
  },
  {
    id: "engineering",
    name: "Engineering",
    description: "Development and technical operations",
    iconName: "Code",
    color: "bg-purple-600",
    type: "category",
    actions: [
      {
        id: "view-repos",
        label: "View Repositories",
        description: "See all code repositories",
        iconName: "Git",
        action: (context) => console.log("View repositories", context)
      },
      {
        id: "create-task",
        label: "Create Task",
        iconName: "Plus",
        action: (context) => console.log("Create task", context)
      }
    ],
    children: [
      {
        id: "repositories",
        name: "Repositories",
        description: "Code repositories and projects",
        iconName: "GitBranch",
        color: "bg-purple-500",
        type: "list",
        actions: [
          {
            id: "create-repo",
            label: "Create Repository",
            iconName: "Plus",
            action: (context) => console.log("Create repository", context)
          },
          {
            id: "view-commits",
            label: "View Commits",
            iconName: "Git",
            action: (context) => console.log("View commits", context)
          }
        ],
        data: [
          {
            id: "repo-1",
            title: "frontend-app",
            subtitle: "React Application",
            value: "Main Branch",
            metadata: { language: "TypeScript", commits: 1247, contributors: 8 }
          },
          {
            id: "repo-2",
            title: "backend-api",
            subtitle: "Node.js API",
            value: "Main Branch",
            metadata: { language: "Node.js", commits: 892, contributors: 5 }
          }
        ]
      },
      {
        id: "tasks",
        name: "Tasks",
        description: "Development tasks and issues",
        iconName: "CheckSquare",
        color: "bg-blue-500",
        type: "list",
        actions: [
          {
            id: "create-task",
            label: "Create Task",
            iconName: "Plus",
            action: (context) => console.log("Create task", context)
          },
          {
            id: "assign-task",
            label: "Assign Task",
            iconName: "UserPlus",
            action: (context) => console.log("Assign task", context)
          }
        ],
        data: [
          {
            id: "task-1",
            title: "Fix authentication bug",
            subtitle: "High Priority",
            value: "In Progress",
            metadata: { assignee: "John Doe", priority: "High", estimate: "4h" }
          },
          {
            id: "task-2",
            title: "Implement dark mode",
            subtitle: "Feature Request",
            value: "Todo",
            metadata: { assignee: "Jane Smith", priority: "Medium", estimate: "8h" }
          }
        ]
      }
    ]
  },
  {
    id: "design",
    name: "Design",
    description: "User experience and visual design",
    iconName: "Palette",
    color: "bg-pink-600",
    type: "category",
    actions: [
      {
        id: "view-designs",
        label: "View Designs",
        description: "See all design assets",
        iconName: "Image",
        action: (context) => console.log("View designs", context)
      },
      {
        id: "create-mockup",
        label: "Create Mockup",
        iconName: "Plus",
        action: (context) => console.log("Create mockup", context)
      }
    ],
    children: [
      {
        id: "assets",
        name: "Assets",
        description: "Design assets and components",
        iconName: "Package",
        color: "bg-pink-500",
        type: "list",
        actions: [
          {
            id: "add-asset",
            label: "Add Asset",
            iconName: "Plus",
            action: (context) => console.log("Add asset", context)
          },
          {
            id: "organize-assets",
            label: "Organize",
            iconName: "FolderOpen",
            action: (context) => console.log("Organize assets", context)
          }
        ],
        data: [
          {
            id: "asset-1",
            title: "Logo Variations",
            subtitle: "Brand Assets",
            value: "12 files",
            metadata: { format: "SVG", size: "2.4MB", updated: "2024-01-20" }
          },
          {
            id: "asset-2",
            title: "UI Components",
            subtitle: "Component Library",
            value: "45 components",
            metadata: { format: "Figma", size: "18.7MB", updated: "2024-01-22" }
          }
        ]
      }
    ]
  },
  {
    id: "product",
    name: "Product",
    description: "Product management and strategy",
    iconName: "Layers",
    color: "bg-indigo-600",
    type: "category",
    actions: [
      {
        id: "view-roadmap",
        label: "View Roadmap",
        description: "See product roadmap",
        iconName: "Map",
        action: (context) => console.log("View roadmap", context)
      },
      {
        id: "create-feature",
        label: "Create Feature",
        iconName: "Plus",
        action: (context) => console.log("Create feature", context)
      }
    ],
    children: [
      {
        id: "features",
        name: "Features",
        description: "Product features and requirements",
        iconName: "Star",
        color: "bg-indigo-500",
        type: "list",
        actions: [
          {
            id: "add-feature",
            label: "Add Feature",
            iconName: "Plus",
            action: (context) => console.log("Add feature", context)
          },
          {
            id: "prioritize-features",
            label: "Prioritize",
            iconName: "ArrowUp",
            action: (context) => console.log("Prioritize features", context)
          }
        ],
        data: [
          {
            id: "feature-1",
            title: "User Authentication",
            subtitle: "Security Feature",
            value: "In Development",
            metadata: { priority: "High", effort: "Large", impact: "High" }
          },
          {
            id: "feature-2",
            title: "Dark Mode",
            subtitle: "UI Enhancement",
            value: "Backlog",
            metadata: { priority: "Medium", effort: "Small", impact: "Medium" }
          }
        ]
      }
    ]
  }
]

// Helper functions
export function findCapabilityByPath(path: string[]): Capability | null {
  let current = testCapabilities
  let found: Capability | null = null

  for (const pathItem of path) {
    found = current.find(cap => cap.id === pathItem || cap.name === pathItem) || null
    if (!found) return null
    current = found.children || []
  }

  return found
}

export function getContextualActions(context: CapabilityContext): CapabilityAction[] {
  const currentCapability = context.path[context.path.length - 1]
  if (!currentCapability?.actions) return []

  // Filter actions based on context - can be extended
  return currentCapability.actions
}

export function getCapabilityByTeam(teamName: string): Capability[] {
  return testCapabilities.filter(cap => 
    cap.name.toLowerCase().includes(teamName.toLowerCase()) ||
    teamName.toLowerCase().includes(cap.name.toLowerCase())
  )
}

export function getAllCapabilities(): Capability[] {
  return testCapabilities
}
