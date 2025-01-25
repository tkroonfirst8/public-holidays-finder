import { defineStore } from 'pinia'
import axios from 'axios'
import type { CountryV3Dto, PublicHolidayV3Dto } from '@/types/Api'
import { getYear } from 'date-fns'
import { Select } from 'primevue'

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
      this.selectedYear = year // Update the selected year
      if (this.selectedCountry) {
        this.fetchPublicHolidays(this.selectedCountry) // Optionally trigger a fetch for holidays
      }
    },
    async fetchPublicHolidays(countryCode: string) {
      this.selectedCountry = countryCode
      this.loading = true
      this.error = null
      this.holidays = [] // Reset holidays before fetching
      try {
        const response = await axios.get(
          `https://date.nager.at/api/v3/PublicHolidays/${this.selectedYear}/${countryCode}`,
        )
        this.holidays = response.data
      } catch (error) {
        this.error = "We're not able to fetch any holidays ate the moment. Please try again later."
        console.error(error)
      } finally {
        this.loading = false
      }
    },
  },
})
