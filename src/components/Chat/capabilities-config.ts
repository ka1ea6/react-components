import type React from "react"

export interface CapabilityAction {
  id: string
  label: string
  description?: string
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
  iconName: string
  color: string
  type: "category" | "list" | "item"
  children?: Capability[]
  data?: CapabilityData[]
  actions?: CapabilityAction[]
  // Function to fetch data dynamically
  fetchData?: (context: CapabilityContext) => Promise<CapabilityData[]>
}

// Sample capabilities structure
export const capabilities: Capability[] = [
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
            id: "gamma-ltd",
            title: "Gamma Ltd",
            subtitle: "Small business",
            value: "$12K ARR",
            metadata: { industry: "Retail", employees: 25, lastContact: "2024-01-08" }
          }
        ]
      },
      {
        id: "opportunities",
        name: "Opportunities",
        description: "Sales pipeline and deals",
        iconName: "Target",
        color: "bg-orange-500",
        type: "list",
        actions: [
          {
            id: "list-won-deals",
            label: "List Won Deals",
            iconName: "CheckCircle",
            action: (context) => console.log("List won deals", context)
          },
          {
            id: "list-pending-deals",
            label: "List Pending",
            iconName: "Clock",
            action: (context) => console.log("List pending deals", context)
          }
        ],
        data: [
          {
            id: "opp-1",
            title: "Enterprise License",
            subtitle: "Acme Corp",
            value: "$50K",
            metadata: { stage: "Negotiation", probability: 80, closeDate: "2024-02-15" }
          },
          {
            id: "opp-2",
            title: "Platform Upgrade",
            subtitle: "Beta Inc",
            value: "$25K",
            metadata: { stage: "Proposal", probability: 60, closeDate: "2024-03-01" }
          }
        ]
      }
    ]
  },
  {
    id: "marketing",
    name: "Marketing",
    description: "Campaigns and lead generation",
    iconName: "TrendingUp",
    color: "bg-pink-600",
    type: "category",
    actions: [
      {
        id: "view-campaigns",
        label: "View Campaigns",
        iconName: "BarChart",
        action: (context) => console.log("View campaigns", context)
      }
    ],
    children: [
      {
        id: "campaigns",
        name: "Campaigns",
        description: "Marketing campaigns and performance",
        iconName: "TrendingUp",
        color: "bg-purple-500",
        type: "list",
        data: [
          {
            id: "q1-launch",
            title: "Q1 Product Launch",
            subtitle: "Multi-channel campaign",
            value: "85% CTR",
            metadata: { budget: 25000, spent: 18500, leads: 340 }
          },
          {
            id: "webinar-series",
            title: "Webinar Series",
            subtitle: "Educational content",
            value: "1,250 attendees",
            metadata: { budget: 5000, spent: 4200, leads: 89 }
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
    color: "bg-indigo-600",
    type: "category",
    children: [
      {
        id: "active-projects",
        name: "Active Projects",
        iconName: "Package",
        color: "bg-green-500",
        type: "list",
        data: [
          {
            id: "proj-alpha",
            title: "Project Alpha",
            subtitle: "Q1 Initiative",
            value: "75% complete",
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
        id: "projects",
        name: "Projects",
        description: "Active development projects",
        iconName: "Briefcase",
        color: "bg-blue-500",
        type: "list",
        actions: [
          {
            id: "add-project",
            label: "Add Project",
            iconName: "Plus",
            action: (context) => console.log("Add project", context)
          },
          {
            id: "view-tasks",
            label: "View Tasks",
            iconName: "List",
            action: (context) => console.log("View tasks", context)
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
        color: "bg-blue-500",
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
        color: "bg-yellow-500",
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
        ]
      }
    ]
  }
]

// Helper function to find capability by path
export function findCapabilityByPath(path: string[]): Capability | null {
  let current = capabilities
  let result: Capability | null = null

  for (const id of path) {
    const found = current.find(cap => cap.id === id)
    if (!found) return null
    
    result = found
    current = found.children || []
  }

  return result
}

// Helper function to get available actions for current context
export function getContextualActions(context: CapabilityContext): CapabilityAction[] {
  const currentCapability = context.path[context.path.length - 1]
  if (!currentCapability?.actions) return []

  // Filter actions based on context - can be extended
  return currentCapability.actions
}
