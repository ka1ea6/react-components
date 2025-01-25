"use server"

import type { BoardData, Deal, Customer, Comment } from "./types"

// This is a mock database. In a real application, you would use a proper database.
const mockDb: BoardData = {
  deals: [],
  customers: [],
  users: [],
  categories: [
    { id: "1", name: "Software", type: "proposition" },
    { id: "2", name: "Hardware", type: "proposition" },
    { id: "3", name: "Referral", type: "source" },
    { id: "4", name: "Outbound", type: "source" },
    { id: "5", name: "Tech", type: "sector" },
    { id: "6", name: "Finance", type: "sector" },
  ],
}

export async function getInitialData(): Promise<BoardData> {
  // In a real application, you would fetch this data from your database
  return mockDb
}

export async function addDeal(newDeal: Omit<Deal, "id">): Promise<Deal> {
  const deal: Deal = {
    id: Date.now().toString(),
    ...newDeal,
    lastModified: new Date().toISOString(),
    comments: [],
  }
  mockDb.deals.push(deal)
  return deal
}

export async function updateDeal(updatedDeal: Deal): Promise<Deal> {
  const index = mockDb.deals.findIndex((deal) => deal.id === updatedDeal.id)
  if (index !== -1) {
    mockDb.deals[index] = {
      ...updatedDeal,
      lastModified: new Date().toISOString(),
    }
    return mockDb.deals[index]
  }
  throw new Error("Deal not found")
}

export async function addCustomer(newCustomer: Omit<Customer, "id">): Promise<Customer> {
  const customer: Customer = {
    id: Date.now().toString(),
    ...newCustomer,
  }
  mockDb.customers.push(customer)
  return customer
}

export async function addComment(dealId: string, comment: Omit<Comment, "id">): Promise<Comment> {
  const deal = mockDb.deals.find((d) => d.id === dealId)
  if (deal) {
    const newComment: Comment = {
      id: Date.now().toString(),
      ...comment,
    }
    deal.comments.push(newComment)
    deal.lastModified = new Date().toISOString()
    return newComment
  }
  throw new Error("Deal not found")
}

export async function updateDealDescription(dealId: string, description: string): Promise<Deal> {
  const deal = mockDb.deals.find((d) => d.id === dealId)
  if (deal) {
    deal.description = description
    deal.lastModified = new Date().toISOString()
    return deal
  }
  throw new Error("Deal not found")
}

