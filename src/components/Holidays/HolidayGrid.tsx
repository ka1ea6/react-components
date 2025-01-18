import React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { consolidateHTMLConverters } from '@payloadcms/richtext-lexical'

interface HolidayGridProps {
  currentDate: Date
  setCurrentDate: (date: Date) => Promise<{ success: boolean }>
  holidays: Holiday[]
  employees: Employee[]
}

interface Holiday {
  id: string
  userId: string
  userName: string
  startDate: string
  endDate: string
  status: 'approved' | 'requested' | 'rejected',
  totalDays: number
  leaveType: 'Full Day' | 'Morning' | 'Afternoon'
}

interface Employee {
  id: string
  name: string
  email: string
  image?: string
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}



export function HolidayGrid({ currentDate, setCurrentDate, holidays, employees }: HolidayGridProps) {
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()

const prevMonth = () => {
  setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
}

const nextMonth = () => {
  setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
}
const setToday = () => {
  setCurrentDate(new Date())
}

  console.log('currentDate:holidayGrid', currentDate)

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-accent">
            {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
          </h1>
          <p className="mt-2 text-sm text-foreground">
            All staff with holidays for the current month.
          </p>
        </div>
        <div className="relative flex items-center rounded-md gap-1 md:items-stretch">
        <Button onClick={prevMonth} variant="outline" size="icon" className="rounded-l-md border-accent hover:text-accent">
              <span className="sr-only">Previous month</span>
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </Button>
            <Button
              variant="outline"
              onClick={setToday}
              className="hidden border-l border-r border-accent px-3.5 text-sm font-semibold text-accent hover:bg-gray-50 focus:relative md:block"
            >
              Today
            </Button>
            <Button onClick={nextMonth} variant="outline" size="icon" className="rounded-r-md border-accent hover:text-accent">
              <span className="sr-only">Next month</span>
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </Button>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle">
            <table className="min-w-full border-separate border-spacing-0">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="sticky top-0 z-10 border-b border-r border-gray-300 bg-white bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8"
                  >
                    Employee
                  </th>
                  {[...Array(daysInMonth)].map((_, index) => (
                    <th
                      key={index}
                      scope="col"
                      className="sticky top-0 z-10 border-b border-r border-gray-300 bg-white bg-opacity-75 px-0 py-3.5 text-center text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
                    >
                      {index + 1}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {employees.map((employee, employeeIdx) => (
                  <tr key={employee.id}>
                    <td
                      className={classNames(
                        employeeIdx !== employees.length - 1 ? ' border-gray-200' : '',
                        'whitespace-nowrap py-4 border-r pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8'
                      )}
                    >
                      <div className="flex items-center">
                        <Avatar className="h-11 w-11">
                          <AvatarImage src={employee.image} alt={employee.name} />
                          <AvatarFallback>{employee.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div className="ml-4">
                          <div className="font-medium text-accent">{employee.name}</div>
                          {/* <div className="mt-1 text-gray-500">{employee.email}</div> */}
                        </div>
                      </div>
                    </td>
                    {[...Array(daysInMonth)].map((_, day) => {
                      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day + 1)
                      const holiday = holidays.find(
                        (h) =>
                          h.userId === employee.id &&
                          new Date(h.startDate) <= date &&
                          new Date(h.endDate) >= date
                      )
                      return (
                        <td
                          key={`${employee.id}-${day}`}
                          className={classNames(
                            employeeIdx !== employees.length - 1 ? 'border-r border-gray-200' : '',
                            'whitespace-nowrap border-r border-gray-200'
                          )}
                        >
                          <div
                            className={`h-6 w-6 mx-auto rounded-full overflow-hidden ${
                              holiday
                                ? holiday.status === 'approved'
                                  ? 'bg-green-500'
                                  : holiday.status === 'rejected'
                                  ? 'bg-red-500'
                                  : 'bg-gray-600'
                                : 'bg-gray-100'
                            }`}
                            title={holiday ? `${employee.name}: ${holiday.status} (${holiday.startDate} - ${holiday.endDate}) - ${holiday.leaveType}` : ''}
                          >
                            {holiday && holiday.leaveType !== 'Full Day' && (
                              <div
                                className={`h-3 w-6 ${
                                  holiday.leaveType === 'Morning'
                                    ? 'bg-white rounded-t-full'
                                    : 'bg-white rounded-t-full'
                                }`}
                              />
                            )}
                          </div>
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

