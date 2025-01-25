import { defineStore } from 'pinia'
import type { CountryV3Dto } from '@/types/Api'

export const useCountries = defineStore('countries', {
  state: () => ({
    countries: [] as CountryV3Dto[],
    loading: false,
    error: null as string | null,
  }),

  actions: {
    async fetchCountries() {
      this.loading = true
      this.error = null
      try {
        const response = await fetch('https://date.nager.at/api/v3/AvailableCountries')
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        this.countries = await response.json()
      } catch (error) {
        this.error = 'Failed to fetch countries'
        console.error(error)
      } finally {
        this.loading = false
      }
    },
  },

  getters: {
    countryCount: (state) => state.countries.length,
    getCountryByCode: (state) => (code: string | null) =>
      state.countries.find((country: CountryV3Dto) => country.countryCode === code),
    getCountryByName: (state) => (name: string | null) =>
      state.countries.find((country: CountryV3Dto) => country.name === name),
  },
})
