<template>
  <Select
    v-model="selectedYear"
    :options="yearOptions"
    optionLabel="label"
    optionValue="value"
    placeholder="Select a Year"
    class="w-full"
    data-testid="year-select"
  />
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useYears } from '@/stores/useYears'
import { Select } from 'primevue'
import { getYear } from 'date-fns'

// Use the years store
const yearsStore = useYears()

// Reactive property for the selected year
const selectedYear = ref<string | null>(null)

onMounted(() => {
  yearsStore.generateYears()
  const currentYear = getYear(new Date()).toString()
  selectedYear.value = currentYear
})

watch(selectedYear, (newYear: string | null) => {
  yearsStore.setSelectedYear(newYear || '2025')
})

// Compute options for the dropdown
const yearOptions = computed(() =>
  yearsStore.generateYears().map((year) => ({ label: year.toString(), value: year.toString() })),
)
</script>
