// stores/useUpNext.ts
import type { CountryInfoDto, PublicHolidayV3Dto } from '@/types/Api'
import { defineStore } from 'pinia'

export const useUpNext = defineStore('upNext', {
  state: () => ({
    upNext: null as (PublicHolidayV3Dto & { countryInfo?: CountryInfoDto }) | null,
    loading: false,
    error: null as string | null,
  }),
  actions: {
    async setUpNext() {
      this.loading = true
      this.error = null
      this.upNext = null
      try {
        const response = await fetch(`https://date.nager.at/api/v3/NextPublicHolidaysWorldwide`)
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const upcomingHolidays: PublicHolidayV3Dto[] = await response.json()
        const [upNext] = upcomingHolidays.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
        )
        console.log(upNext)
        // Fetch country info
        const countryResponse = await fetch(
          `https://date.nager.at/api/v3/CountryInfo/${upNext.countryCode}`,
        )
        console.log(countryResponse)
        if (countryResponse.ok) {
          const countryInfo: CountryInfoDto = await countryResponse.json()
          this.upNext = { ...upNext, countryInfo }
        } else {
          this.upNext = upNext
        }
      } catch (error) {
        this.error =
          "We're not able to fetch any upcoming world wide holidays at the moment. Please try again later."
        console.error(error)
      } finally {
        this.loading = false
      }
    },
  },
})
