<template>
  <AutoComplete
    v-model="selectedCountry"
    dropdown
    aria-placeholder="Select a country"
    placeholder="Select a country"
    optionLabel="name"
    :suggestions="filteredCountries"
    :inputStyle="{ width: '15rem' }"
    @complete="search"
  />
</template>

<script setup lang="ts">
import { AutoComplete } from 'primevue'
import { ref, watch } from 'vue'
import { useCountries } from '@/stores/useCountries'
import { usePublicHolidays } from '@/stores/usePublicHolidays'
import type { CountryV3Dto } from '@/types/Api'
import { onMounted } from 'vue'

const countriesStore = useCountries()
const holidaysStore = usePublicHolidays()
const selectedCountry = ref<CountryV3Dto | null>(null)
const filteredCountries = ref<CountryV3Dto[]>([])

onMounted(() => {
  if (countriesStore.countries.length === 0) {
    countriesStore.fetchCountries()
  }
})

watch(selectedCountry, (newCountry) => {
  if (newCountry && newCountry.countryCode) {
    holidaysStore.fetchPublicHolidays(newCountry.countryCode)
  }
})

const search = (event: { query: string }) => {
  setTimeout(() => {
    if (!event.query.trim().length) {
      filteredCountries.value = [...countriesStore.countries]
    } else {
      filteredCountries.value = countriesStore.countries.filter((country: CountryV3Dto) => {
        return country.name?.toLowerCase().startsWith(event.query.toLowerCase())
      })
    }
  }, 250)
}
</script>
