// stores/useYears.ts
import { defineStore } from 'pinia'
import { getYear, addYears, subYears } from 'date-fns'
import { usePublicHolidays } from '@/stores/usePublicHolidays'

export const useYears = defineStore('years', {
  state: () => ({
    years: [] as string[], // Holds the list of years
    selectedYear: getYear(new Date()).toString(),
  }),
  actions: {
    generateYears() {
      const currentYear = getYear(new Date()).toString()
      const pastYears = Array.from({ length: 10 }, (_, i) =>
        getYear(subYears(new Date(), i + 1)).toString(),
      ).reverse()
      const futureYears = Array.from({ length: 10 }, (_, i) =>
        getYear(addYears(new Date(), i + 1)).toString(),
      )
      return [...pastYears, currentYear, ...futureYears]
    },
    setSelectedYear(year: string) {
      this.selectedYear = year // Update the selected year
      const publicHolidaysStore = usePublicHolidays()
      publicHolidaysStore.setSelectedYear(year) // Optionally trigger a fetch for holidays
    },
  },
})
