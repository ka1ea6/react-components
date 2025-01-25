import {type User} from "@/payload-types"


export type {User}

export type CRMCustomer = {
  id: string
  name: string
  intro?: string
  active: boolean
}

export type CRMCategory = {
  id: string
  name: string
  type: "proposition" | "source" | "sector"
}

export type CRMStatus = "Cold" | "Qualified" | "Proposal" | "SoW" | "Won" | "Lost"

export type Deal = {
  id: string
  customerId: string
  value: number
  assignee: string
  status: CRMStatus
  categories: string[]
  dateLogged: string
  closureDate: string
  lastModified: string
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
  users: User[]
  customers: CRMCustomer[]
  categories: CRMCategory[]
}

