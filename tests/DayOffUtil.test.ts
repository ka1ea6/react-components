import { bankHolidays } from '@/components/Holidays/BankHolidays'
import { dayOffUtil } from '@/lib/utils/DayOffUtil'
import { describe, expect, test } from 'vitest'

describe('dayOffUtil', () => {
  test('returns true for weekends (Saturday & Sunday)', () => {
    expect(dayOffUtil(new Date(2025, 3, 19))).toBe(true) // Saturday, 19 April 2025
    expect(dayOffUtil(new Date(2025, 3, 20))).toBe(true) // Sunday, 20 April 2025
    expect(dayOffUtil(new Date(2025, 3, 26))).toBe(true) // Saturday, 26 April 2025
    expect(dayOffUtil(new Date(2025, 3, 27))).toBe(true) // Sunday, 27 April 2025
  })

  test('returns true for bank holidays', () => {
    bankHolidays.forEach(({ date }) => {
      expect(dayOffUtil(date)).toBe(true)
    })
  })

  test("returns false for a regular weekday that's not a bank holiday", () => {
    expect(dayOffUtil(new Date(2025, 3, 22))).toBe(false) // Tuesday, 22 April 2025 (Not a holiday)
    expect(dayOffUtil(new Date(2025, 3, 25))).toBe(false) // Friday, 23 April 2025 (Not a holiday)
  })
})
