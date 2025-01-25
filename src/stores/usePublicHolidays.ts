import { defineStore } from 'pinia'
import type { PublicHolidayV3Dto } from '@/types/Api'
import { getYear } from 'date-fns'

export const usePublicHolidays = defineStore('publicHolidays', {
  state: () => ({
    holidays: [] as PublicHolidayV3Dto[],
    loading: false,
    error: null as string | null,
    selectedYear: getYear(new Date()).toString(),
    selectedCountry: null as string | null,
  }),

  actions: {
    setSelectedYear(year: string) {
      this.selectedYear = year
      if (this.selectedCountry) {
        this.fetchPublicHolidays(this.selectedCountry)
      }
    },
    async fetchPublicHolidays(countryCode: string) {
      this.selectedCountry = countryCode
      this.loading = true
      this.error = null
      this.holidays = []
      try {
        const response = await fetch(
          `https://date.nager.at/api/v3/PublicHolidays/${this.selectedYear}/${countryCode}`,
        )
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        this.holidays = await response.json()
      } catch (error) {
        this.error = "We're not able to fetch any holidays at the moment. Please try again later."
        console.error(error)
      } finally {
        this.loading = false
      }
    },
  },
})
