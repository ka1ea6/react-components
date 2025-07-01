import { DeliveryReport as PayloadDeliveryLeadSubmission } from '../../payload-types'

export interface DeliveryLeadSubmissionProps {
  onSubmit: (
    formData: Omit<PayloadDeliveryLeadSubmission, 'id' | 'user' | 'updatedAt' | 'createdAt'>,
  ) => Promise<{ success: boolean; message: string }>
  isSubmitting?: boolean
}

// Re-export the payload type for convenience
export type DeliveryLeadSubmissionData = Omit<
  PayloadDeliveryLeadSubmission,
  'id' | 'user' | 'updatedAt' | 'createdAt'
>

// Keep the Milestone type for backward compatibility
export interface Milestone {
  name: string
  commentary?: string
  dueDate?: string
  rag: 'On-Track' | 'Off-Track' | 'At Risk' | 'Complete'
}
