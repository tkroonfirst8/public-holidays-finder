<template>
  <!-- Show message if no country is selected -->
  <div v-if="loading"><SkeletonTable /></div>
  <div v-if="error">
    <Card>
      <template #content>
        <Message severity="info" variant="outlined">{{ error }}</Message>
      </template>
    </Card>
  </div>
  <Card v-else-if="!loading && !error && holidays.length === 0">
    <template #title>Select a country to view the holidays</template>
    <template #content>
      <p>Please select a country from the search box in the top right corner of the page</p>
    </template>
  </Card>
  <!-- Show loading, error, or DataTable if holidays are available -->
  <DataTable
    v-else-if="!loading && !error && holidays.length > 0"
    paginator
    removableSort
    :rows="10"
    :rowsPerPageOptions="[5, 10, 20, 50]"
    :value="holidays"
    stripedRows
    class="p-datatable-sm"
  >
    <Column field="date" header="Date" :sortable="true">
      <template #body="slotProps">
        {{ formatDate(slotProps.data.date) }}
      </template></Column
    >
    <Column field="localName" header="Local Name" :sortable="true"></Column>
    <Column field="name" header="English Name" :sortable="true"></Column>
    <Column field="countryCode" header="Country Code" :sortable="true"></Column>
    <Column field="types" header="Type" :sortable="true">
      <template #body="slotProps">
        <Tag :value="slotProps.data.types[0]" :severity="getSeverity(data.status)" /> </template
    ></Column>
  </DataTable>
</template>

<script setup lang="ts">
import Message from 'primevue/message'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { computed, watch } from 'vue'
import { usePublicHolidays } from '@/stores/usePublicHolidays'
import Card from 'primevue/card'
import { format } from 'date-fns'
import SkeletonTable from './SkeletonTable.vue'

// Store related to public holidays
const publicHolidaysStore = usePublicHolidays()

// Computed properties for holidays, loading, and error
const holidays = computed(() => publicHolidaysStore.holidays)
const loading = computed(() => publicHolidaysStore.loading)
const error = computed(() => publicHolidaysStore.error)

// Function to format the date using date-fns
const formatDate = (date: string | Date) => {
  return format(new Date(date), 'd MMMM yyyy') // Example: January 1, 2025
}

watch(
  () => publicHolidaysStore.holidays,
  (newHolidays) => {
    console.log('Holidays updated:', newHolidays)
  },
)
</script>
