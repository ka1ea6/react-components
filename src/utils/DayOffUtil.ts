import { bankHolidays } from './BankHolidays'

export const dayOffUtil = (date: Date) => {
  const isSunday = date.getDay() === 0
  const isSaturday = date.getDay() === 6
  const isBankHoliday = bankHolidays.some((h) => h.date.toISOString() === date.toISOString())

  return isSunday || isSaturday || isBankHoliday
}
