'use client'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  FileText,
  ListChecks,
  AlertTriangle,
  Users,
  Briefcase,
  ShieldAlert,
  PlusCircle,
  Trash2,
} from 'lucide-react'
import { DeliveryLeadSubmissionData, Milestone } from './types'
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select'

const initialMilestones: Milestone[] = [{ name: '', commentary: '', dueDate: '', rag: 'On-Track' }]

const ragOptions = ['On-Track', 'Off-Track', 'At Risk', 'Complete']

const tabConfig = [
  { name: 'Project Summary', icon: FileText },
  { name: 'Milestones', icon: ListChecks },
  { name: 'Project Update', icon: Users },
  { name: 'Project Concerns', icon: AlertTriangle },
  { name: 'Opportunities', icon: Briefcase },
  { name: 'Risks', icon: ShieldAlert },
]

export interface CustomerProjectPair {
  customer: { id: number; name: string }
  project: { id: number; name: string }
}

export interface DeliveryLeadSubmissionProps {
  onSubmit?: (
    formData: DeliveryLeadSubmissionData,
  ) => Promise<{ success: boolean; message: string }>
  customerProjectPairs?: CustomerProjectPair[]
}

export function DeliveryLeadSubmissionComponent({ onSubmit, customerProjectPairs }: DeliveryLeadSubmissionProps) {
  const [currentTab, setCurrentTab] = useState(tabConfig[0].name)
  const [clientId, setClientId] = useState<number | null>(null)
  const [projectId, setProjectId] = useState<number | null>(null)
  const [deliveryLead, setDeliveryLead] = useState('')
  const [projectSummary, setProjectSummary] = useState('')
  const [milestones, setMilestones] = useState(initialMilestones)
  const [projectUpdate, setProjectUpdate] = useState('')
  const [projectConcerns, setProjectConcerns] = useState('')
  const [commercialOpportunities, setCommercialOpportunities] = useState('')
  const [commercialRisks, setCommercialRisks] = useState('')

  // Derive unique customers
  const customers = Array.from(
    new Map((customerProjectPairs ?? []).map(cp => [cp.customer.id, cp.customer])).values()
  )
  // Filter projects by selected customer
  const filteredProjects = (customerProjectPairs ?? [])
    .filter(cp => cp.customer.id === clientId)
    .map(cp => cp.project)

  const handleMilestoneChange = (idx: number, field: string, value: string) => {
    setMilestones((prev) => {
      const newMilestones = [...prev]
      if (field === 'rag' && !ragOptions.includes(value)) {
        return prev
      }
      newMilestones[idx] = { ...newMilestones[idx], [field]: value }
      return newMilestones
    })
  }

  const addMilestone = () => {
    setMilestones((prev) => [...prev, { name: '', commentary: '', dueDate: '', rag: 'On-Track' }])
  }

  const removeMilestone = (idx: number) => {
    setMilestones((prev) => prev.filter((_, i) => i !== idx))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data: DeliveryLeadSubmissionData = {
      customer: clientId as number, // must be number
      project: projectId as number, // must be number
      projectSummary,
      milestones: milestones.length > 0 ? milestones : null,
      projectUpdate,
      projectConcerns: projectConcerns || null,
      commercialOpportunities: commercialOpportunities || null,
      commercialRisks: commercialRisks || null,
    }

    if (onSubmit) {
      return onSubmit(data)
    }

    try {
      const response = await fetch('/api/delivery-lead-submission', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to submit delivery lead')
      }

      const result = await response.json()
      return { success: true, message: 'Delivery lead submitted successfully' }
    } catch (error) {
      console.error('Error submitting delivery lead:', error)
      return { success: false, message: 'Failed to submit delivery lead' }
    }
  }

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <div className="rounded-xl shadow-lg bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 p-6">
        <div className="mb-6 flex border-b border-zinc-200 dark:border-zinc-700 flex-wrap justify-evenly">
          {tabConfig.map((tab) => (
            <button
              key={tab.name}
              className={`flex items-center gap-2 py-2 px-4 font-semibold border-b-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60
                ${
                  currentTab === tab.name
                    ? 'border-accent text-accent bg-accent/10 dark:bg-accent/20'
                    : 'border-transparent text-gray-500 dark:text-zinc-400 hover:text-accent hover:bg-accent/5 dark:hover:bg-accent/10'
                }
                text-sm sm:text-base flex-1 basis-1/4 min-w-[180px] max-w-xs justify-center`}
              onClick={() => setCurrentTab(tab.name)}
              type="button"
            >
              <tab.icon className="w-5 h-5" />
              <span>{tab.name}</span>
            </button>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="space-y-8">
          {currentTab === 'Project Summary' && (
            <div className="space-y-6">
              <div>
                <Label>Client Name</Label>
                <Select value={clientId?.toString() ?? ''} onValueChange={v => setClientId(Number(v))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select client" />
                  </SelectTrigger>
                  <SelectContent>
                    {customers.map((customer) => (
                      <SelectItem key={customer.id} value={customer.id.toString()}>{customer.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Project Name</Label>
                <Select value={projectId?.toString() ?? ''} onValueChange={v => setProjectId(Number(v))} disabled={!clientId}>
                  <SelectTrigger>
                    <SelectValue placeholder={clientId ? "Select project" : "Select client first"} />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredProjects.map((project) => (
                      <SelectItem key={project.id} value={project.id.toString()}>{project.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {/* <div>
                <Label>Delivery Lead</Label>
                <input
                  className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 p-2 focus:ring-2 focus:ring-accent/40 focus:outline-none placeholder-zinc-400 dark:placeholder-zinc-500"
                  value={deliveryLead}
                  onChange={(e) => setDeliveryLead(e.target.value)}
                  required
                  placeholder="Enter delivery lead name"
                />
              </div> */}
              <div>
                <Label>Project Summary</Label>
                <textarea
                  className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 p-2 min-h-[140px] focus:ring-2 focus:ring-accent/40 focus:outline-none placeholder-zinc-400 dark:placeholder-zinc-500"
                  value={projectSummary}
                  onChange={(e) => setProjectSummary(e.target.value)}
                  required
                  placeholder="Provide a summary of the project, objectives, and outcomes"
                />
              </div>
            </div>
          )}
          {currentTab === 'Milestones' && (
            <div>
              <div className="mb-4 flex justify-between items-center">
                <Label className="text-lg flex items-center gap-2">
                  <ListChecks className="w-5 h-5" />
                  Milestones
                </Label>
                <Button
                  type="button"
                  onClick={addMilestone}
                  variant="outline"
                  className="flex items-center gap-1"
                >
                  <PlusCircle className="w-5 h-5" /> Add Milestone
                </Button>
              </div>
              <div className="space-y-4">
                {milestones.map((m, idx) => (
                  <div
                    key={idx}
                    className="grid grid-cols-5 gap-2 items-end border border-zinc-200 dark:border-zinc-700 p-2 rounded-lg bg-zinc-50 dark:bg-zinc-800 relative group"
                  >
                    <div className="col-span-1">
                      <Label>Milestone</Label>
                      <input
                        className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 p-1 focus:ring-2 focus:ring-accent/40 focus:outline-none placeholder-zinc-400 dark:placeholder-zinc-500"
                        value={m.name}
                        onChange={(e) => handleMilestoneChange(idx, 'name', e.target.value)}
                        required
                        placeholder="Milestone name"
                      />
                    </div>
                    <div className="col-span-2">
                      <Label>Commentary</Label>
                      <input
                        className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 p-1 focus:ring-2 focus:ring-accent/40 focus:outline-none placeholder-zinc-400 dark:placeholder-zinc-500"
                        value={m.commentary}
                        onChange={(e) => handleMilestoneChange(idx, 'commentary', e.target.value)}
                        placeholder="Commentary"
                      />
                    </div>
                    <div className="col-span-1">
                      <Label>Due Date</Label>
                      <input
                        type="date"
                        className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 p-1 focus:ring-2 focus:ring-accent/40 focus:outline-none"
                        value={m.dueDate}
                        onChange={(e) => handleMilestoneChange(idx, 'dueDate', e.target.value)}
                        placeholder="Due date"
                      />
                    </div>
                    <div className="col-span-1">
                      <Label>RAG</Label>
                      <select
                        className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 p-1 focus:ring-2 focus:ring-accent/40 focus:outline-none"
                        value={m.rag}
                        onChange={(e) => handleMilestoneChange(idx, 'rag', e.target.value)}
                      >
                        {ragOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                    <button
                      type="button"
                      className="absolute -top-2 -right-2 bg-white dark:bg-zinc-900 rounded-full shadow p-1 border border-gray-200 dark:border-zinc-700 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 dark:hover:bg-red-900"
                      onClick={() => removeMilestone(idx)}
                      aria-label="Remove Milestone"
                    >
                      <Trash2 className="w-5 h-5 text-red-500" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          {currentTab === 'Project Update' && (
            <div>
              <Label>Project Update & Immediate Focus</Label>
              <textarea
                className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 p-2 min-h-[140px] focus:ring-2 focus:ring-accent/40 focus:outline-none placeholder-zinc-400 dark:placeholder-zinc-500"
                value={projectUpdate}
                onChange={(e) => setProjectUpdate(e.target.value)}
                required
                placeholder="[Provide a brief project update, including current progress and any immediate areas of focus or priority for the coming weeks]"
              />
            </div>
          )}
          {currentTab === 'Project Concerns' && (
            <div>
              <Label>Project Concerns</Label>
              <textarea
                className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 p-2 min-h-[140px] focus:ring-2 focus:ring-accent/40 focus:outline-none placeholder-zinc-400 dark:placeholder-zinc-500"
                value={projectConcerns}
                onChange={(e) => setProjectConcerns(e.target.value)}
                placeholder="​​[Please highlight any project concerns, that may require escalation or support from the Cortex Reply senior leadership team]"
              />
            </div>
          )}
          {currentTab === 'Opportunities' && (
            <div>
              <Label>Commercial Opportunities</Label>
              <textarea
                className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 p-2 min-h-[140px] focus:ring-2 focus:ring-accent/40 focus:outline-none placeholder-zinc-400 dark:placeholder-zinc-500"
                value={commercialOpportunities}
                onChange={(e) => setCommercialOpportunities(e.target.value)}
                placeholder="[List any potential commercial opportunities, active conversations, or discussion points where Cortex Reply could provide value or support. These may highlight areas for expansion or collaboration across our service offerings]"
              />
            </div>
          )}
          {currentTab === 'Risks' && (
            <div>
              <Label>Commercial Risk/Issue Details</Label>
              <textarea
                className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 p-2 min-h-[140px] focus:ring-2 focus:ring-accent/40 focus:outline-none placeholder-zinc-400 dark:placeholder-zinc-500"
                value={commercialRisks}
                onChange={(e) => setCommercialRisks(e.target.value)}
                placeholder="[Please highlight any risks that could impact our commercial engagement, such as reputational concerns, risks to fixed-outcome milestones, changes in key client stakeholders, or challenges with project resourcing]"
              />
            </div>
          )}
          <div className="flex justify-end pt-4">
            <Button type="submit" className="px-6">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
