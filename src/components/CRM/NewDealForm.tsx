import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { PlusCircle } from "lucide-react"
import type { Customer, Category, Deal, Status } from './types'
import NewCustomerForm from "./NewCustomerForm"

type NewDealFormProps = {
  customers: Customer[]
  categories: Category[]
  onSubmit: (deal: Omit<Deal, "id">) => Promise<void>
  onUpdate: (deal: Deal) => Promise<void>
  initialDeal?: Deal
  onAddCustomer: (customer: Omit<Customer, "id">) => Promise<void>
}

export default function NewDealForm({ customers, categories, onSubmit,onUpdate, initialDeal, onAddCustomer }: NewDealFormProps) {
  const [deal, setDeal] = useState<Omit<Deal, "id">>({
    customerId: "",
    value: 0,
    assignee: "",
    status: "Cold",
    categories: [],
    dateLogged: new Date().toISOString().split("T")[0],
    closureDate: "",
    lastModified: new Date().toISOString(),
    comments: [],
    description: "",
  })

  useEffect(() => {
    if (initialDeal) {
      setDeal(initialDeal)
    }
  }, [initialDeal])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (deal.customerId && deal.value && deal.assignee && deal.closureDate) {
      if (!initialDeal) { 
        await onSubmit(deal)
      } else {
        const updatedDeal = { ...deal, id: initialDeal.id }
        await onUpdate(updatedDeal)
      }
    }
  }

  const handleCategoryChange = (categoryId: string) => {
    setDeal((prevDeal) => ({
      ...prevDeal,
      categories: prevDeal.categories.includes(categoryId)
        ? prevDeal.categories.filter((id) => id !== categoryId)
        : [...prevDeal.categories, categoryId],
    }))
  }

  const getCategoryColor = (type: Category["type"]) => {
    switch (type) {
      case "proposition":
        return "bg-blue-100 text-blue-800"
      case "source":
        return "bg-green-100 text-green-800"
      case "sector":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <ScrollArea className="h-[60vh] pr-4 mx-2">
        <div className="space-y-6 mx-2">
          <div className="space-y-2">
            <Label htmlFor="customer">Customer</Label>
            <div className="flex items-center space-x-2">
              <Select value={deal.customerId} onValueChange={(value) => setDeal({ ...deal, customerId: value })}>
                <SelectTrigger className="flex-grow">
                  <SelectValue placeholder="Select customer" />
                </SelectTrigger>
                <SelectContent>
                  {customers.map((customer) => (
                    <SelectItem key={customer.id} value={customer.id}>
                      {customer.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Dialog>
                <DialogTrigger asChild>
                  <Button type="button" size="icon" variant="outline">
                    <PlusCircle className="h-4 w-4" />
                    <span className="sr-only">Add new customer</span>
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Customer</DialogTitle>
                  </DialogHeader>
                  <NewCustomerForm onSubmit={onAddCustomer} />
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="value">Value</Label>
            <Input
              id="value"
              type="number"
              value={deal.value || ""}
              onChange={(e) => setDeal({ ...deal, value: Number.parseFloat(e.target.value) })}
              placeholder="Enter deal value"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="assignee">Assignee</Label>
            <Input
              id="assignee"
              value={deal.assignee || ""}
              onChange={(e) => setDeal({ ...deal, assignee: e.target.value })}
              placeholder="Enter assignee name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={deal.description || ""}
              onChange={(e) => setDeal({ ...deal, description: e.target.value })}
              placeholder="Enter deal description"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={deal.status} onValueChange={(value) => setDeal({ ...deal, status: value as Status })}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {["Cold", "Qualified", "Proposal Made", "Won", "Lost"].map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Categories</Label>
            <div className="space-y-4">
              {["proposition", "source", "sector"].map((type) => (
                <div key={type} className="space-y-2">
                  <h4 className="text-sm font-medium">{type.charAt(0).toUpperCase() + type.slice(1)}</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {categories
                      .filter((category) => category.type === type)
                      .map((category) => (
                        <div key={category.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={category.id}
                            checked={deal.categories.includes(category.id)}
                            onCheckedChange={() => handleCategoryChange(category.id)}
                          />
                          <label
                            htmlFor={category.id}
                            className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${getCategoryColor(category.type)}`}
                          >
                            {category.name}
                          </label>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="dateLogged">Date Logged</Label>
            <Input
              id="dateLogged"
              type="date"
              value={deal.dateLogged}
              onChange={(e) => setDeal({ ...deal, dateLogged: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="closureDate">Closure Date</Label>
            <Input
              id="closureDate"
              type="date"
              value={deal.closureDate}
              onChange={(e) => setDeal({ ...deal, closureDate: e.target.value })}
            />
          </div>
        </div>
      </ScrollArea>
      <Button type="submit" className="w-full">
        {initialDeal ? "Update Deal" : "Add Deal"}
      </Button>
    </form>
  )
}

