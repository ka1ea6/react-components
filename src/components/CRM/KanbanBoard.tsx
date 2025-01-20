"use client"

import React, { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { PlusCircle } from "lucide-react"
import { type BoardData, type Deal, type Status, Category, type Customer, type Comment } from './types'
import DealDetails from "./DealDetails"
import NewDealForm from "./NewDealForm"
import NewCustomerForm from "./NewCustomerForm"
import { KanbanColumn } from "./KanbanColumn"
import { DragDropContext, type DropResult } from "react-beautiful-dnd"

const statuses: Status[] = ["Cold", "Qualified", "Proposal Made", "Won", "Lost"]

type KanbanBoardProps = {
  initialData: BoardData
  addDeal: (deal: Omit<Deal, "id">) => Promise<Deal>
  updateDeal: (deal: Deal) => Promise<Deal>
  addCustomer: (customer: Omit<Customer, "id">) => Promise<Customer>
  addComment: (dealId: string, comment: Omit<Comment, "id">) => Promise<Comment>
  updateDealDescription: (dealId: string, description: string) => Promise<Deal>
}

export default function KanbanBoard({
  initialData,
  addDeal,
  updateDeal,
  addCustomer,
  addComment,
  updateDealDescription,
}: KanbanBoardProps) {
  const [boardData, setBoardData] = useState<BoardData>(initialData)
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null)
  const [editingDeal, setEditingDeal] = useState<Deal | null>(null)

  const onDragEnd = useCallback(
    async (result: DropResult) => {
      const { source, destination } = result

      if (!destination) {
        return
      }

      if (source.droppableId === destination.droppableId && source.index === destination.index) {
        return
      }

      const sourceStatus = source.droppableId as Status
      const destinationStatus = destination.droppableId as Status

      const updatedDeals = [...boardData.deals]
      const [movedDeal] = updatedDeals.splice(source.index, 1)
      movedDeal.status = destinationStatus
      updatedDeals.splice(destination.index, 0, movedDeal)

      const updatedDeal = await updateDeal(movedDeal)
      setBoardData((prevData) => ({
        ...prevData,
        deals: prevData.deals.map((deal) => (deal.id === updatedDeal.id ? updatedDeal : deal)),
      }))
    },
    [boardData, updateDeal],
  )

  const handleAddNewDeal = async (newDeal: Omit<Deal, "id">) => {
    const addedDeal = await addDeal(newDeal)
    setBoardData((prevData) => ({
      ...prevData,
      deals: [...prevData.deals, addedDeal],
    }))
  }

  const handleUpdateDeal = async (updatedDeal: Deal) => {
    const updated = await updateDeal(updatedDeal)
    setBoardData((prevData) => ({
      ...prevData,
      deals: prevData.deals.map((deal) => (deal.id === updated.id ? updated : deal)),
    }))
    setEditingDeal(null)
  }

  const handleAddComment = async (dealId: string, comment: Comment) => {
    const newComment = await addComment(dealId, {
      text: comment.text,
      author: comment.author,
      timestamp: comment.timestamp,
    })
    setBoardData((prevData) => ({
      ...prevData,
      deals: prevData.deals.map((deal) =>
        deal.id === dealId
          ? { ...deal, comments: [...deal.comments, newComment], lastModified: new Date().toISOString() }
          : deal,
      ),
    }))
  }

  const getColumnDeals = (status: Status) => {
    return boardData.deals.filter((deal) => deal.status === status)
  }

  const calculateColumnValue = (deals: Deal[]) => {
    return deals.reduce((sum, deal) => sum + deal.value, 0)
  }

  const calculateWeightedValue = (deals: Deal[], status: Status) => {
    const weightMap: { [key in Status]: number } = {
      Cold: 0.2,
      Qualified: 0.4,
      "Proposal Made": 0.6,
      Won: 1,
      Lost: 0,
    }
    return deals.reduce((sum, deal) => sum + deal.value * weightMap[status], 0)
  }

  const handleAddNewCustomer = async (newCustomer: Omit<Customer, "id">) => {
    const addedCustomer = await addCustomer(newCustomer)
    setBoardData((prevData) => ({
      ...prevData,
      customers: [...prevData.customers, addedCustomer],
    }))
  }

  const handleUpdateDealDescription = async (dealId: string, description: string) => {
    const updatedDeal = await updateDealDescription(dealId, description)
    setBoardData((prevData) => ({
      ...prevData,
      deals: prevData.deals.map((deal) => (deal.id === updatedDeal.id ? updatedDeal : deal)),
    }))
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="p-4">
        <div className="flex space-x-4 overflow-x-auto pb-4">
          {statuses.map((status) => {
            const deals = getColumnDeals(status)
            return (
              <KanbanColumn
                key={status}
                status={status}
                deals={deals}
                customers={boardData.customers}
                categories={boardData.categories}
                onDealClick={setSelectedDeal}
                calculateColumnValue={calculateColumnValue}
                calculateWeightedValue={calculateWeightedValue}
                addNewDeal={status === "Cold" ? handleAddNewDeal : undefined}
                updateDeal={handleUpdateDeal}
                onAddCustomer={handleAddNewCustomer}
              />
            )
          })}
        </div>

        {selectedDeal && (
          <DealDetails
            deal={selectedDeal}
            customer={boardData.customers.find((c) => c.id === selectedDeal.customerId)}
            categories={boardData.categories}
            onClose={() => setSelectedDeal(null)}
            onEdit={() => setEditingDeal(selectedDeal)}
            onAddComment={(comment : Comment) => handleAddComment(selectedDeal.id, comment)}
            onUpdateDescription={(description) => handleUpdateDealDescription(selectedDeal.id, description)}
          />
        )}

        {editingDeal && (
          <Dialog open={true} onOpenChange={() => setEditingDeal(null)}>
            <DialogContent className="sm:max-w-[625px]">
              <DialogHeader>
                <DialogTitle>Edit Deal</DialogTitle>
              </DialogHeader>
              <NewDealForm
                customers={boardData.customers}
                categories={boardData.categories}
                onSubmit={handleAddNewDeal}
                onUpdate={handleUpdateDeal}
                initialDeal={editingDeal}
                onAddCustomer={handleAddNewCustomer}
              />
            </DialogContent>
          </Dialog>
        )}
      </div>
    </DragDropContext>
  )
}

