import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { PlusIcon } from "lucide-react"
import NewCustomerForm from "./NewCustomerForm"
import type { Customer, Category, Deal, Status } from "./types"
import type { User } from "@/payload-types"

type NewDealFormProps = {
  customers: Customer[]
  users?: User[]
  categories: Category[]
  onSubmit: (deal: Deal) => void
  onAddCustomer: (newCustomer: Customer) => void
  initialDeal?: Deal
}

export default function NewDealForm({ customers, users, categories, onSubmit, initialDeal, onAddCustomer }: NewDealFormProps) {
  const [deal, setDeal] = useState<Partial<Deal>>(
    initialDeal || {
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
    },
  )
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  useEffect(() => {
    if (initialDeal) {
      setDeal(initialDeal)
    }
  }, [initialDeal])

  const validate = () => {
    const newErrors: { [key: string]: string } = {}
    if (!deal.customerId) newErrors.customerId = "Customer is required"
    if (!deal.value) newErrors.value = "Value is required"
    if (!deal.assignee) newErrors.assignee = "Assignee is required"
    if (!deal.closureDate) newErrors.closureDate = "Closure Date is required"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) {
      onSubmit({
        ...(deal as Deal),
        id: deal.id || Date.now().toString(),
        lastModified: new Date().toISOString(),
      })
      setDeal({
        customerId: "",
        value: 0,
        assignee: "",
        description: "",
        status: "Cold",
        closureDate: "",
      })
      setErrors({})
    }
  }

  const handleCategoryChange = (categoryId: string) => {
    setDeal((prevDeal) => ({
      ...prevDeal,
      categories: prevDeal.categories?.includes(categoryId)
        ? prevDeal.categories.filter((id) => id !== categoryId)
        : [...(prevDeal.categories || []), categoryId],
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

  const handleAddCustomer = (newCustomer: Customer) => {
    customers.push(newCustomer)
    setDeal({ ...deal, customerId: newCustomer.id })
    setIsCustomerModalOpen(false)
    onAddCustomer(newCustomer)
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        <ScrollArea className="h-[60vh] pr-4">
          <div className="space-y-6">
            <div className="space-y-2 space-x-2">
              <Label htmlFor="customer">Customer</Label>
              <div className="flex items-center space-x-2">
                <Select value={deal.customerId} onValueChange={(value) => setDeal({ ...deal, customerId: value })}>
                  <SelectTrigger>
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
                <Button variant="outline" size="icon" onClick={() => setIsCustomerModalOpen(true)}>
                  <PlusIcon className="w-5 h-5" />
                </Button>
              </div>
              {errors.customerId && <p className="text-red-500 text-sm">{errors.customerId}</p>}
            </div>
            <div className="space-y-2 space-x-2">
              <Label htmlFor="value">Value</Label>
              <Input
                id="value"
                type="number"
                value={deal.value || ""}
                onChange={(e) => setDeal({ ...deal, value: Number.parseFloat(e.target.value) })}
                placeholder="Enter deal value"
              />
              {errors.value && <p className="text-red-500 text-sm">{errors.value}</p>}
            </div>
            <div className="space-y-2 space-x-2">
              <Label htmlFor="assignee">Assignee</Label>

              <Select value={deal.assignee} onValueChange={(value) => setDeal({ ...deal, assignee: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select assignee" />
                  </SelectTrigger>
                  <SelectContent>
                    {users && users.map((user) => (
                      <SelectItem key={user.id} value={user.id.toString()}>
                        {user.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>


              {/* <Input
                id="assignee"
                value={deal.assignee || ""}
                onChange={(e) => setDeal({ ...deal, assignee: e.target.value })}
                placeholder="Enter assignee name"
              /> */}
              {errors.assignee && <p className="text-red-500 text-sm">{errors.assignee}</p>}
            </div>
            <div className="space-y-2 space-x-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={deal.description || ""}
                onChange={(e) => setDeal({ ...deal, description: e.target.value })}
                placeholder="Enter deal description"
              />
            </div>
            {/* <div className="space-y-2 space-x-2">
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
            </div> */}
            <div className="space-y-2 space-x-2">
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
                              checked={deal.categories?.includes(category.id)}
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
            {/* <div className="space-y-2 space-x-2">
              <Label htmlFor="dateLogged">Date Logged</Label>
              <Input
                id="dateLogged"
                type="date"
                value={deal.dateLogged}
                onChange={(e) => setDeal({ ...deal, dateLogged: e.target.value })}
              />
            </div> */}
            <div className="space-y-2 space-x-2">
              <Label htmlFor="closureDate">Closure Date</Label>
              <Input
                id="closureDate"
                type="date"
                value={deal.closureDate}
                onChange={(e) => setDeal({ ...deal, closureDate: e.target.value })}
              />
              {errors.closureDate && <p className="text-red-500 text-sm">{errors.closureDate}</p>}
            </div>
          </div>
        </ScrollArea>
        <Button type="submit" className="w-full">
          {initialDeal ? "Update Deal" : "Add Deal"}
        </Button>
      </form>

      <Dialog open={isCustomerModalOpen} onOpenChange={setIsCustomerModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Customer</DialogTitle>
          </DialogHeader>
          <NewCustomerForm onSubmit={handleAddCustomer} />
        </DialogContent>
      </Dialog>
    </>
  )
}

