import type { BoardData, Deal, Customer, Category, Status } from './types'

export const mockCustomers: Customer[] = [
  { id: "1", name: "Acme Corp", intro: "A leading technology company", active: true },
  { id: "2", name: "GlobalTech", intro: "Innovative solutions provider", active: true },
  { id: "3", name: "InnoSystems", intro: "Cutting-edge software development", active: false },
]

export const mockCategories: Category[] = [
  { id: "1", name: "Software", type: "proposition" },
  { id: "2", name: "Hardware", type: "proposition" },
  { id: "3", name: "Referral", type: "source" },
  { id: "4", name: "Outbound", type: "source" },
  { id: "5", name: "Tech", type: "sector" },
  { id: "6", name: "Finance", type: "sector" },
]

export const mockDeals: Deal[] = [
  {
    id: "1",
    customerId: "1",
    value: 50000,
    assignee: "John Doe",
    status: "Qualified",
    categories: ["1", "3", "5"],
    dateLogged: "2023-01-15",
    closureDate: "2023-06-30",
    lastModified: "2023-05-01T10:00:00Z",
    comments: [{ id: "1", text: "Initial contact made", author: "John Doe", timestamp: "2023-01-15T09:00:00Z" }],
    description: "Potential software solution for Acme Corp",
  },
  {
    id: "2",
    customerId: "2",
    value: 75000,
    assignee: "Jane Smith",
    status: "Proposal Made",
    categories: ["2", "4", "6"],
    dateLogged: "2023-02-01",
    closureDate: "2023-07-31",
    lastModified: "2023-05-10T14:30:00Z",
    comments: [{ id: "2", text: "Proposal sent", author: "Jane Smith", timestamp: "2023-05-10T14:30:00Z" }],
    description: "Custom hardware solution for GlobalTech",
  },
]

export const mockBoardData: BoardData = {
  deals: mockDeals,
  customers: mockCustomers,
  categories: mockCategories,
}

export const mockStatuses: Status[] = ["Cold", "Qualified", "Proposal Made", "Won", "Lost"]

