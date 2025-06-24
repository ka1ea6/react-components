export interface DeliveryLeadSubmissionProps {
  onSubmit: (formData: DeliveryLeadSubmissionData) => Promise<{ success: boolean; message: string }>
  isSubmitting?: boolean
}

export interface DeliveryLeadSubmissionData {
  clientName: string
  projectName: string
  deliveryLead: string
  projectSummary: string
  milestones: Milestone[]
  projectUpdate: string
  projectConcerns?: string
  commercialOpportunities?: string
  commercialRisks?: string
}

export interface Milestone {
  name: string
  commentary?: string
  dueDate?: string
  rag: 'On-Track' | 'Off-Track' | 'At Risk' | 'Complete'
}
