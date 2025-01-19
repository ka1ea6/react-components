'use server'
import { getInitialData, addDeal, updateDeal, addCustomer, addComment, updateDealDescription } from "./actions"
import KanbanBoard from "./KanbanBoard"

export async function CRMPage() {
  const initialData = await getInitialData()

  return (
    <div className="container mx-auto py-10">
      <KanbanBoard
        initialData={initialData}
        addDeal={addDeal}
        updateDeal={updateDeal}
        addCustomer={addCustomer}
        addComment={addComment}
        updateDealDescription={updateDealDescription}
      />
    </div>
  )
}

