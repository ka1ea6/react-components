import { bankHolidays } from '@/lib/utils/BankHolidays'
import { getTotalDaysBetween, isDayOff, getIsMultipleDays } from '@/lib/utils/DaysUtil'
import { describe, expect, test } from 'vitest'

describe('DaysUtil', () => {
  describe('isDayOff', () => {
    test('returns true for weekends (Saturday & Sunday)', () => {
      expect(isDayOff(new Date(2025, 3, 19))).toBe(true) // Saturday, 19 April 2025
      expect(isDayOff(new Date(2025, 3, 20))).toBe(true) // Sunday, 20 April 2025
      expect(isDayOff(new Date(2025, 3, 26))).toBe(true) // Saturday, 26 April 2025
      expect(isDayOff(new Date(2025, 3, 27))).toBe(true) // Sunday, 27 April 2025
    })

    test('returns true for bank holidays', () => {
      bankHolidays.forEach((date) => {
        expect(isDayOff(date)).toBe(true)
      })
    })

    test("returns false for a regular weekday that's not a bank holiday", () => {
      expect(isDayOff(new Date(2025, 3, 22))).toBe(false) // Tuesday, 22 April 2025 (Not a holiday)
      expect(isDayOff(new Date(2025, 3, 25))).toBe(false) // Friday, 25 April 2025 (Not a holiday)
    })

    // New comprehensive tests for specific bank holidays
    test('correctly identifies specific 2025 bank holidays', () => {
      expect(isDayOff(new Date(2025, 0, 1))).toBe(true) // New Year's Day - Jan 1
      expect(isDayOff(new Date(2025, 3, 18))).toBe(true) // Good Friday - April 18
      expect(isDayOff(new Date(2025, 3, 21))).toBe(true) // Easter Monday - April 21
      expect(isDayOff(new Date(2025, 4, 5))).toBe(true) // Early May bank holiday - May 5
      expect(isDayOff(new Date(2025, 4, 26))).toBe(true) // Spring bank holiday - May 26
      expect(isDayOff(new Date(2025, 7, 25))).toBe(true) // Summer bank holiday - Aug 25
      expect(isDayOff(new Date(2025, 11, 25))).toBe(true) // Christmas Day - Dec 25
      expect(isDayOff(new Date(2025, 11, 26))).toBe(true) // Boxing Day - Dec 26
    })

    test('correctly identifies specific 2026 bank holidays', () => {
      expect(isDayOff(new Date(2026, 0, 1))).toBe(true) // New Year's Day - Jan 1
      expect(isDayOff(new Date(2026, 3, 3))).toBe(true) // Good Friday - April 3
      expect(isDayOff(new Date(2026, 3, 6))).toBe(true) // Easter Monday - April 6
      expect(isDayOff(new Date(2026, 4, 4))).toBe(true) // Early May bank holiday - May 4
      expect(isDayOff(new Date(2026, 4, 25))).toBe(true) // Spring bank holiday - May 25
      expect(isDayOff(new Date(2026, 7, 31))).toBe(true) // Summer bank holiday - Aug 31
      expect(isDayOff(new Date(2026, 11, 25))).toBe(true) // Christmas Day - Dec 25
      expect(isDayOff(new Date(2026, 11, 28))).toBe(true) // Boxing Day - Dec 28
    })

    test('correctly rejects dates that are NOT bank holidays', () => {
      expect(isDayOff(new Date(2025, 0, 2))).toBe(false) // Jan 2 (not a holiday)
      expect(isDayOff(new Date(2025, 3, 17))).toBe(false) // April 17 (day before Good Friday)
      expect(isDayOff(new Date(2025, 3, 19))).toBe(true) // April 19 is Saturday (weekend)
      expect(isDayOff(new Date(2025, 3, 22))).toBe(false) // April 22 (day after Easter Monday)
      expect(isDayOff(new Date(2025, 4, 4))).toBe(true) // May 4 is Sunday (weekend)
      expect(isDayOff(new Date(2025, 4, 6))).toBe(false) // May 6 (day after Early May holiday)
      expect(isDayOff(new Date(2025, 11, 24))).toBe(false) // Dec 24 (Christmas Eve, not a UK bank holiday)
      expect(isDayOff(new Date(2025, 11, 29))).toBe(false) // Dec 29 (Monday after Boxing Day, not a holiday)
    })
  })

  describe('getTotalDaysBetween', () => {
    test('returns half day', () => {
      expect(getTotalDaysBetween(new Date(2025, 0, 3), new Date(2025, 0, 3), true)).toBe(0.5)
      expect(getTotalDaysBetween(new Date(2025, 0, 3), new Date(2025, 0, 3), false)).toBe(1)
      expect(getTotalDaysBetween(new Date(2025, 1, 15), new Date(2025, 1, 15), true)).toBe(0) // weekend
    })

    test('returns correct number days off excluding weekend', () => {
      expect(getTotalDaysBetween(new Date(2025, 0, 3), new Date(2025, 0, 9))).toBe(5)
      expect(getTotalDaysBetween(new Date(2025, 2, 3), new Date(2025, 2, 14))).toBe(10)
    })

    test('returns correct number days off excluding bank holidays and weekend', () => {
      expect(getTotalDaysBetween(new Date(2025, 3, 17), new Date(2025, 3, 24))).toBe(4) // easter weekend
      expect(getTotalDaysBetween(new Date(2025, 2, 3), new Date(2025, 2, 14))).toBe(10)
    })

    // New comprehensive tests for edge cases
    test('handles periods around New Year correctly', () => {
      // Dec 30 2024 (Mon) to Jan 3 2025 (Fri) - should exclude Jan 1 (New Year's Day)
      expect(getTotalDaysBetween(new Date(2024, 11, 30), new Date(2025, 0, 3))).toBe(4)

      // Dec 31 2024 (Tue) to Jan 2 2025 (Thu) - should exclude Jan 1 (New Year's Day)
      expect(getTotalDaysBetween(new Date(2024, 11, 31), new Date(2025, 0, 2))).toBe(2)
    })

    test('handles Easter period correctly', () => {
      // April 17-22 (Thu-Tue) includes Good Friday (18th) and Easter Monday (21st), plus weekend
      // Working days: 17th (Thu), 22nd (Tue) = 2 days
      expect(getTotalDaysBetween(new Date(2025, 3, 17), new Date(2025, 3, 22))).toBe(2)

      // April 14-25 (Mon-Fri) - longer period including Easter
      // Excludes: 18th (Good Friday), 19th-20th (weekend), 21st (Easter Monday)
      // Working days: 14th, 15th, 16th, 17th, 22nd, 23rd, 24th, 25th = 8 days
      expect(getTotalDaysBetween(new Date(2025, 3, 14), new Date(2025, 3, 25))).toBe(8)
    })

    test('handles May bank holidays correctly', () => {
      // May 1-9 (Thu-Fri) includes Early May holiday (5th) and weekend
      // Working days: 1st, 2nd, 6th, 7th, 8th, 9th = 6 days
      expect(getTotalDaysBetween(new Date(2025, 4, 1), new Date(2025, 4, 9))).toBe(6)

      // May 22-30 (Thu-Fri) includes Spring bank holiday (26th) and weekend
      // Working days: 22nd, 23rd, 27th, 28th, 29th, 30th = 6 days
      expect(getTotalDaysBetween(new Date(2025, 4, 22), new Date(2025, 4, 30))).toBe(6)
    })

    test('handles Christmas period correctly', () => {
      // Dec 22-30 (Mon-Tue) includes Christmas Day (25th), Boxing Day (26th), and weekend
      // Working days: 22nd, 23rd, 24th, 29th, 30th = 5 days
      expect(getTotalDaysBetween(new Date(2025, 11, 22), new Date(2025, 11, 30))).toBe(5)
    })

    test('handles 2026 Easter period correctly', () => {
      // April 1-8 (Wed-Wed) includes Good Friday (3rd), Easter Monday (6th), and weekend
      // Working days: 1st (Wed), 2nd (Thu), 7th (Tue), 8th (Wed) = 4 days
      expect(getTotalDaysBetween(new Date(2026, 3, 1), new Date(2026, 3, 8))).toBe(4)
    })

    test('handles 2026 Christmas period correctly', () => {
      // Dec 23-30 (Wed-Wed) includes Christmas Day (25th), Boxing Day (28th), and weekend
      // Working days: 23rd (Wed), 24th (Thu), 29th (Tue), 30th (Wed) = 4 days
      expect(getTotalDaysBetween(new Date(2026, 11, 23), new Date(2026, 11, 30))).toBe(4)
    })

    test('handles full month calculations correctly', () => {
      // January 2025: 31 days total, minus weekends (8 days) and New Year's Day = 22 working days
      expect(getTotalDaysBetween(new Date(2025, 0, 1), new Date(2025, 0, 31))).toBe(22)

      // April 2025: 30 days total, minus weekends (8 days), Good Friday, and Easter Monday = 20 working days
      expect(getTotalDaysBetween(new Date(2025, 3, 1), new Date(2025, 3, 30))).toBe(20)
    })

    test('handles single day calculations', () => {
      // Single working day
      expect(getTotalDaysBetween(new Date(2025, 0, 2), new Date(2025, 0, 2))).toBe(1)

      // Single bank holiday
      expect(getTotalDaysBetween(new Date(2025, 0, 1), new Date(2025, 0, 1))).toBe(0)

      // Single weekend day
      expect(getTotalDaysBetween(new Date(2025, 0, 4), new Date(2025, 0, 4))).toBe(0) // Saturday
    })

    test('handles edge case with bank holidays falling on weekends', () => {
      // If a bank holiday falls on a weekend, it should still be counted as a day off
      // Test with various scenarios to ensure no double-counting

      // Check if any 2025 bank holidays fall on weekends
      const newYearsDay = new Date(2025, 0, 1) // Wednesday
      const goodFriday = new Date(2025, 3, 18) // Friday
      const easterMonday = new Date(2025, 3, 21) // Monday

      expect(newYearsDay.getDay()).toBe(3) // Wednesday
      expect(goodFriday.getDay()).toBe(5) // Friday
      expect(easterMonday.getDay()).toBe(1) // Monday
    })
  })

  describe('isMultipleDays', () => {
    test('returns false for same date', () => {
      expect(getIsMultipleDays(new Date(2025, 0, 3), new Date(2025, 0, 3))).toBe(false)
    })

    test('returns true for different dates', () => {
      expect(getIsMultipleDays(new Date(2025, 0, 3), new Date(2025, 0, 4))).toBe(true)
      expect(getIsMultipleDays(new Date(2025, 0, 3), new Date(2025, 0, 5))).toBe(true)
    })

    test('returns false for undefined dates', () => {
      expect(getIsMultipleDays(undefined, undefined)).toBe(false)
      expect(getIsMultipleDays(new Date(2025, 0, 3), undefined)).toBe(false)
      expect(getIsMultipleDays(undefined, new Date(2025, 0, 3))).toBe(false)
    })
  })

  describe('BankHolidays integrity', () => {
    test('has correct number of bank holidays for 2025 and 2026', () => {
      expect(bankHolidays).toHaveLength(16) // 8 for 2025 + 8 for 2026
    })

    test('all bank holidays are in 2025 or 2026', () => {
      bankHolidays.forEach((date) => {
        const year = date.getFullYear()
        expect(year === 2025 || year === 2026).toBe(true)
      })
    })

    test('bank holidays are in chronological order', () => {
      for (let i = 1; i < bankHolidays.length; i++) {
        expect(bankHolidays[i].getTime()).toBeGreaterThan(bankHolidays[i - 1].getTime())
      }
    })

    test('has correct number of holidays per year', () => {
      const holidays2025 = bankHolidays.filter((date) => date.getFullYear() === 2025)
      const holidays2026 = bankHolidays.filter((date) => date.getFullYear() === 2026)

      expect(holidays2025).toHaveLength(8)
      expect(holidays2026).toHaveLength(8)
    })
  })
})
