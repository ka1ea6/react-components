import { 
  Users, 
  Target, 
  DollarSign, 
  TrendingUp, 
  FileText, 
  Calendar, 
  Package, 
  Truck,
  BarChart,
  Settings,
  User,
  Briefcase,
  CheckCircle,
  Clock,
  Star,
  Archive
} from "lucide-react"
import type React from "react"

export interface CapabilityAction {
  id: string
  label: string
  description?: string
  icon?: React.ReactNode
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
  icon: React.ReactNode
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
    icon: <DollarSign className="h-4 w-4" />,
    color: "bg-green-600",
    type: "category",
    actions: [
      {
        id: "view-pipeline",
        label: "View Pipeline",
        description: "See all opportunities in pipeline",
        icon: <BarChart className="h-4 w-4" />,
        action: (context) => console.log("View pipeline", context)
      },
      {
        id: "create-opportunity",
        label: "Create Opportunity",
        icon: <Target className="h-4 w-4" />,
        action: (context) => console.log("Create opportunity", context)
      }
    ],
    children: [
      {
        id: "customers",
        name: "Customers",
        description: "Customer accounts and contacts",
        icon: <Users className="h-4 w-4" />,
        color: "bg-blue-500",
        type: "list",
        actions: [
          {
            id: "add-customer",
            label: "Add Customer",
            icon: <User className="h-4 w-4" />,
            action: (context) => console.log("Add customer", context)
          },
          {
            id: "export-customers",
            label: "Export List",
            icon: <FileText className="h-4 w-4" />,
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
        icon: <Target className="h-4 w-4" />,
        color: "bg-orange-500",
        type: "list",
        actions: [
          {
            id: "list-won-deals",
            label: "List Won Deals",
            icon: <CheckCircle className="h-4 w-4" />,
            action: (context) => console.log("List won deals", context)
          },
          {
            id: "list-pending-deals",
            label: "List Pending",
            icon: <Clock className="h-4 w-4" />,
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
    icon: <TrendingUp className="h-4 w-4" />,
    color: "bg-pink-600",
    type: "category",
    actions: [
      {
        id: "view-campaigns",
        label: "View Campaigns",
        icon: <BarChart className="h-4 w-4" />,
        action: (context) => console.log("View campaigns", context)
      }
    ],
    children: [
      {
        id: "campaigns",
        name: "Campaigns",
        description: "Marketing campaigns and performance",
        icon: <TrendingUp className="h-4 w-4" />,
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
    icon: <Briefcase className="h-4 w-4" />,
    color: "bg-indigo-600",
    type: "category",
    children: [
      {
        id: "active-projects",
        name: "Active Projects",
        icon: <Package className="h-4 w-4" />,
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
