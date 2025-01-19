'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Toaster, toast } from 'sonner'

interface RequestLeaveProps {
  remainingDays: number
  submitLeaveRequest?: (formData: FormData) => Promise<{ success: boolean; message: string }>
}

interface ButtonGroupProps {
  options: string[]
  value: string
  onChange: (value: string) => void
  disabled?: boolean[]
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({ options, value, onChange, disabled = [] }) => {
  return (
    <div className="flex space-x-2">
      {options.map((option, index) => (
        <Button
          key={option}
          type="button"
          variant={value === option ? "default" : "outline"}
          onClick={() => onChange(option)}
          disabled={disabled[index]}
          className="flex-1 hover:bg-accent hover:text-accent-foreground"
        >
          {option}
        </Button>
      ))}
    </div>
  )
}

export function RequestLeave({ remainingDays, submitLeaveRequest }: RequestLeaveProps) {
  const [startDate, setStartDate] = useState<Date | undefined>(new Date())
  const [endDate, setEndDate] = useState<Date | undefined>(new Date())
  const [leaveType, setLeaveType] = useState('Full Day')
  const [isMultipleDays, setIsMultipleDays] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setIsMultipleDays(startDate !== endDate || !startDate || !endDate)
    if (isMultipleDays) {
      setLeaveType('Full Day')
    }
  }, [startDate, endDate])

  const handleLeaveTypeChange = (leaveType : string) => {
    setLeaveType(leaveType);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!startDate || !endDate) {
      toast.error('Please select both start and end dates')
      // alert('Please select both start and end dates')
      return
    }
    // check the number of days selected doesn't exceed the remaining days
    let days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1
    if (leaveType === 'Morning' || leaveType === 'Afternoon') {
      days = 0.5
    }
    if (days > remainingDays) {
      toast.error('You do not have enough leave days remaining')
      // alert('You do not have enough leave days remaining')
      return
    }

    const formData = new FormData()
    formData.append('startDate', startDate.toISOString())
    formData.append('endDate', endDate.toISOString())
    formData.append('leaveType', leaveType)
    formData.append('duration', days.toString())
    const result = await (submitLeaveRequest || defaultSubmitLeaveRequest)(formData)

    if (result.success) {
      toast.success(result.message)
      setStartDate(undefined)
      setEndDate(undefined)
      setLeaveType('Full Day')
      router.refresh() // Refresh the page to show updated data
    } else {
      toast.error(`Error: ${result.message}`)
    }
  }

  return (
    <div className="max-w-2xl">
      <h2 className="text-lg font-semibold mb-4">Request Leave</h2>
      <p className="text-sm text-gray-500 mb-4">Remaining leave days: {remainingDays}</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col space-y-2">
            <Label htmlFor="startDate">Start Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !startDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={(date) => {
                    setStartDate(date)
                    if (date && (!endDate || date > endDate)) {
                      setEndDate(date)
                    }
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="endDate">End Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !endDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={setEndDate}
                  disabled={(date) => (startDate ? date < startDate : false)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label>Leave Type</Label>
          <ButtonGroup
            options={['Full Day', 'Morning', 'Afternoon']}
            value={leaveType}
            onChange={handleLeaveTypeChange}
            disabled={[false, isMultipleDays, isMultipleDays]}
          />
        </div>

        <Button type="submit" className="w-full hover:bg-accent hover:text-accent-foreground">Submit Request</Button>
      </form>
      <Toaster richColors position="top-right" closeButton visibleToasts={9} />
    </div>
  )
}

// Default server action implementation
const defaultSubmitLeaveRequest = async (formData: FormData) => {
  const formDataEntries: { [key: string]: any } = {};
  formData.forEach((value, key) => {
    formDataEntries[key] = value;
  });
  // console.log('Leave request submitted:', formDataEntries);
  return { success: true, message: `Leave request submitted successfully for ${formData.get('duration')}` }
}

