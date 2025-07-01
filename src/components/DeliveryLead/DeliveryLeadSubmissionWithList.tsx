'use client'
import React, { useState } from 'react'

import { DeliveryLeadSubmissionList } from './DeliveryLeadSubmissionList'
import { DeliveryLeadSubmissionData } from './types'
import { ChevronDown, ChevronUp, List } from 'lucide-react'
import { DeliveryReport } from '@/payload-types'
import { DeliveryLeadSubmissionComponent } from './DeliveryLeadSubmission'
import type { CustomerProjectPair } from './DeliveryLeadSubmission'

export interface DeliveryLeadSubmissionWithListProps {
  submissions: DeliveryReport[]
  onSubmit?: (
    formData: DeliveryLeadSubmissionData,
  ) => Promise<{ success: boolean; message: string }>
  isLoading?: boolean
  customerProjectPairs: CustomerProjectPair[]
}

export function DeliveryLeadSubmissionWithList({
  submissions,
  onSubmit,
  isLoading = false,
  customerProjectPairs,
}: DeliveryLeadSubmissionWithListProps) {
  const [isListExpanded, setIsListExpanded] = useState(false)

  return (
    <div className="min-h-screen ">
      <div className="container mx-auto p-4 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-zinc-100 mb-2">
            Delivery Report Management
          </h1>
          <p className="text-gray-600 dark:text-zinc-400">
            Submit new delivery reports and view your previous submissions
          </p>
        </div>

        {/* Submission Form */}
        <div className="mb-8">
          <DeliveryLeadSubmissionComponent onSubmit={onSubmit} customerProjectPairs={customerProjectPairs} />
        </div>

        {/* Previous Submissions Section */}
        <div className="rounded-xl shadow-lg bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800">
          {/* Collapsible Header */}
          <button
            onClick={() => setIsListExpanded(!isListExpanded)}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <List className="h-5 w-5 text-gray-500 dark:text-zinc-400" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-zinc-100">
                Previous Submissions
              </h2>
              <span className="text-sm text-gray-500 dark:text-zinc-400">
                ({submissions.length})
              </span>
            </div>
            <div className="flex items-center gap-2">
              {isListExpanded ? (
                <ChevronUp className="h-5 w-5 text-gray-500 dark:text-zinc-400" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500 dark:text-zinc-400" />
              )}
            </div>
          </button>

          {/* Collapsible Content */}
          {isListExpanded && (
            <div className="border-t border-gray-200 dark:border-zinc-700">
              <DeliveryLeadSubmissionList submissions={submissions} isLoading={isLoading} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
