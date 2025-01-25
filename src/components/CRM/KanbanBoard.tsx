"use client"

import React, { useState , useCallback} from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { PlusCircle } from "lucide-react"
import { type BoardData, type Deal, type Status, Category, type Customer, type Comment } from "./types"
import DealDetails from "./DealDetails"
import NewDealForm from "./NewDealForm"
import NewCustomerForm from "./NewCustomerForm"
import { KanbanColumn } from "./KanbanColumn"
import { DragDropContext, type DropResult } from "react-beautiful-dnd"

const statuses: Status[] = ["Cold", "Qualified", "Proposal", "SoW", "Won", "Lost"]

type KanbanBoardProps = {
  initialData: BoardData
  onDragEnd: (result: DropResult) => void
  addNewDeal: (newDeal: Deal) => void
  updateDeal: (updatedDeal: Deal) => void
  addComment: (dealId: string, comment: Comment) => void
  addNewCustomer: (newCustomer: Customer) => void
}

export default function KanbanBoard({
  initialData,
  addNewDeal,
  updateDeal,
  addComment,
  addNewCustomer,
}: KanbanBoardProps) {

  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null)
  const [boardData, setBoardData] = useState<BoardData>(initialData)

  const getColumnDeals = (status: Status) => {
    return boardData.deals.filter((deal) => deal.status === status)
  }

  const calculateColumnValue = (deals: Deal[]) => {
    return deals.reduce((sum, deal) => sum + (deal.value || 0), 0)
  }

  const calculateWeightedValue = (deals: Deal[], status: Status) => {
    const weightMap: { [key in Status]: number } = {
      Cold: 0.2,
      Qualified: 0.4,
      "Proposal": 0.6,
      "SoW": 0.7,
      Won: 1,
      Lost: 0,
    }
    return deals.reduce((sum, deal) => sum + (deal.value || 0) * weightMap[status], 0)
  }

  const onDragEnd = useCallback(
    (result: DropResult) => {
      const { source, destination } = result

      if (!destination) {
        return
      }

      if (source.droppableId === destination.droppableId && source.index === destination.index) {
        return
      }

      const sourceStatus = source.droppableId as Status
      const destinationStatus = destination.droppableId as Status
      console.log("Moving from ", sourceStatus, "to", destinationStatus)
      const updatedDeals = [...boardData.deals]
      const [movedDeal] = updatedDeals.splice(source.index, 1)
      movedDeal.status = destinationStatus
      updatedDeals.splice(destination.index, 0, movedDeal)

      setBoardData({ ...boardData, deals: updatedDeals })

      // Update the deal using the updateDeal function
      updateDeal(movedDeal);
    },
    [boardData, updateDeal],
  )

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="p-4">
        {/* <h1 className="text-3xl font-bold mb-8">Cortex Sales Pipeline</h1> */}
        <div className="flex space-x-4 overflow-x-auto pb-4">
          {statuses.map((status) => {
            const deals = getColumnDeals(status)
            return (
              <KanbanColumn
                key={status}
                status={status}
                deals={deals}
                customers={boardData.customers}
                users={initialData.users}
                categories={boardData.categories}
                onDealClick={setSelectedDeal}
                calculateColumnValue={calculateColumnValue}
                calculateWeightedValue={calculateWeightedValue}
                addNewDeal={status === "Cold" ? addNewDeal : undefined}
                onAddCustomer={addNewCustomer}
              />
            )
          })}
        </div>

        <div className="mt-8 flex space-x-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add New Customer
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Customer</DialogTitle>
              </DialogHeader>
              <NewCustomerForm  onSubmit={addNewCustomer} />
            </DialogContent>
          </Dialog>
        </div>

        {selectedDeal && (
          <DealDetails
            deal={selectedDeal}
            users={initialData.users}
            customer={boardData.customers.find((c) => c.id === selectedDeal.customerId)}
            categories={boardData.categories}
            onClose={() => setSelectedDeal(null)}
            onSave={updateDeal}
            onAddComment={(comment) => addComment(selectedDeal.id, comment)}
          />
        )}
      </div>
    </DragDropContext>
  )
}

