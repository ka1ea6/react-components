import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Deal, Customer, DealCategory, User } from './types'
import { CalendarIcon, PoundSterling, UserIcon } from "lucide-react"

type DealCardProps = {
  deal: Deal
  customer: Partial<Customer> | undefined
  categories: DealCategory[]
  onClick: () => void
  compact?: boolean
}

export function DealCard({ deal, customer, categories, onClick, compact = false }: DealCardProps) {
  const propositionCategory = categories.find((c) => c.type === "proposition" && (deal.categories ?? []).includes(c.id))

  if  (compact) {
    return (
      <Card
        className="mb-1 cursor-pointer hover:shadow-md transition-shadow border-l-4 border-l-accent"
        onClick={onClick}
      >
        <CardHeader className="pb-1 pt-2">
          <CardTitle className="text-sm font-semibold text-foreground">{customer?.name}</CardTitle>
                  <p className="text-sm text-gray-500 mt-1">{deal.description}</p>

        </CardHeader>
        <CardContent className="text-xs text-gray-500 pb-2">
          <div className="flex justify-between items-center mb-1">
            {/* <div className="flex items-center">
              <UserIcon className="w-3 h-3 mr-1" />
              <span>{(deal.assignee as User).name}</span>
            </div> */}
            <div className="flex items-center text-sm font-bold text-green-600">
            <span>£{deal.value.toLocaleString()}</span>
          </div>
          </div>
          
        </CardContent>
      </Card>
    )
  }

  return (
    <Card
      className="mb-4 cursor-pointer hover:shadow-md transition-shadow border-l-4 border-l-accent"
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold text-foreground">{customer?.name}</CardTitle>
        </div>
        <p className="text-sm text-gray-500 mt-1">{deal.description}</p>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center text-sm text-accent">
            <UserIcon className="w-4 h-4 mr-1 text-xs" />
            <span>{(deal.assignee as User).name}</span>
          </div>
          <div className="flex items-center text-sm font-bold text-green-600">
            <span>£{deal.value.toLocaleString()}</span>
          </div>
        </div>
        <div className="flex justify-between items-left mb-3">
          <div className="flex items-center text-xs text-gray-500">
            <CalendarIcon className="w-3 h-3 mr-1" />
            <span>{new Date(deal.updatedAt).toLocaleDateString()}</span>
          </div>
          
        </div>
        <div className="flex justify-between items-left">
         
          {propositionCategory && (
            <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs">
              {propositionCategory.name}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

