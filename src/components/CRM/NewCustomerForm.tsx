import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import type { Customer } from './types'

type NewCustomerFormProps = {
  onSubmit: (customer: Omit<Customer, "id">) => void
}

export function NewCustomerForm({ onSubmit }: NewCustomerFormProps) {
  const [customer, setCustomer] = useState<Omit<Partial<Customer>, "id">>({
    name: "",
    intro: "",
    active: true,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (customer.name) {
      onSubmit({
        ...customer,
        name: customer.name as string,
        updatedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      })
      setCustomer({ name: "", intro: "", active: true })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="customerName">Customer Name</Label>
        <Input
          id="customerName"
          value={customer.name}
          onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
          placeholder="Enter customer name"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="customerIntro">Intro</Label>
        <Textarea
          id="customerIntro"
          value={customer.intro ?? ""}
          onChange={(e) => setCustomer({ ...customer, intro: e.target.value })}
          placeholder="Enter customer intro"
        />
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id="activeCustomer"
          checked={!!customer.active}
          onCheckedChange={(checked) => setCustomer({ ...customer, active: checked as boolean })}
        />
        <Label htmlFor="activeCustomer">Active Customer</Label>
      </div>
      <Button type="submit" className="w-full">
        Add Customer
      </Button>
    </form>
  )
}

