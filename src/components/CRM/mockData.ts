import type { BoardData, Deal, Customer, CRMCategory, CRMStatus } from './types'
import type { User } from '@/payload-types';

export const mockCustomers: Partial<Customer>[] = [
  { id: 1, name: "Acme Corp", intro: "A leading technology company", active: true },
  { id: 2, name: "GlobalTech", intro: "Innovative solutions provider", active: true },
  { id: 3, name: "InnoSystems", intro: "Cutting-edge software development", active: false },
]

export const mockCategories: CRMCategory[] = [
  { id: "1", name: "Software", type: "proposition" },
  { id: "2", name: "Hardware", type: "proposition" },
  { id: "3", name: "Referral", type: "source" },
  { id: "4", name: "Outbound", type: "source" },
  { id: "5", name: "Tech", type: "sector" },
  { id: "6", name: "Finance", type: "sector" },
]

export const mockDeals: Deal[] = [
  {
    id: 1,
    customer: {id: 1, name: "Acme Corp", active: true},
    value: 50000,
    assignee: { id: 1, name: "John Doe" },
    status: "Qualified",
    categories: ["1", "3", "5"],
    dateLogged: "2023-01-15",
    closureDate: "2023-06-30",
    lastModified: "2023-05-01T10:00:00Z",
    comments: [{ id: "1", text: "Initial contact made", author: "John Doe", timestamp: "2023-01-15T09:00:00Z" }],
    description: "Potential software solution for Acme Corp",
  },
  {
    id: 2,
    customer: { id: 2, name: "GlobalTech", active: true },
    value: 75000,
    assignee: { id: 2, name: "Jane Smith"},
    status: "Proposal",
    categories: ["2", "4", "6"],
    dateLogged: "2023-02-01",
    closureDate: "2023-07-31",
    lastModified: "2023-05-10T14:30:00Z",
    comments: [{ id: "2", text: "Proposal sent", author: "Jane Smith", timestamp: "2023-05-10T14:30:00Z" }],
    description: "Custom hardware solution for GlobalTech",
  },
]


export const mockUsers: User[] = [
  { id: 1, name: "John Doe", email: "john.doe@example.com", role: "user", createdAt: "2023-01-01", updatedAt: "2023-01-01" },
  { id: 2, name: "Jane Smith", email: "jane.smith@example.com", role: "user", createdAt: "2023-01-01", updatedAt: "2023-01-01" },
  { id: 3, name: "Bob Johnson", email: "bob.johnson@example.com", role: "user", createdAt: "2023-01-01", updatedAt: "2023-01-01" },
  { id: 4, name: "Alice Brown", email: "alice.brown@example.com", role: "user", createdAt: "2023-01-01", updatedAt: "2023-01-01" },
  { id: 5, name: "Charlie Davis", email: "charlie.davis@example.com", role: "user", createdAt: "2023-01-01", updatedAt: "2023-01-01" },
];

export const mockBoardData: BoardData = {
  deals: mockDeals,
  users: mockUsers,
  customers: mockCustomers,
  categories: mockCategories,
}

export const mockStatuses: CRMStatus[] = ["Cold", "Qualified", "Proposal", "Won", "Lost"]

