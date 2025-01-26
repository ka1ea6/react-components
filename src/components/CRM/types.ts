import type {User, Customer} from "@/payload-types"


export type {User, Customer}


export type CRMCategory = {
  id: string
  name: string
  type: "proposition" | "source" | "sector"
}

export type CRMStatus = "Cold" | "Qualified" | "Proposal" | "SoW" | "Won" | "Lost"

export type Deal = {
  id: number
  customer: Partial<Customer> 
  value: number
  assignee: Partial<User>
  status: CRMStatus
  categories: string[]
  dateLogged: string
  closureDate: string
  updatedAt: string
  comments: Comment[]
  description: string
}

export type Comment = {
  id: string
  text: string
  author?: string
  timestamp: string
}

export type BoardData = {
  deals: Deal[]
  users: Partial<User>[]
  customers: Partial<Customer>[]
  categories: CRMCategory[]
}

