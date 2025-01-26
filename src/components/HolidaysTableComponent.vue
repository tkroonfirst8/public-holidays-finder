<template>
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
  <DataTable
    v-else-if="!loading && !error && holidays.length > 0"
    paginator
    removableSort
    data-testid="holidays-table"
    :rows="10"
    :rowsPerPageOptions="[5, 10, 20, 50]"
    :value="holidays"
    stripedRows
    class="p-datatable-sm"
    @row-click="$emit('select-holiday', $event.data)"
  >
    <Column field="date" header="Date" :sortable="true">
      <template #body="slotProps">
        {{ formatDate(slotProps.data.date) }}
      </template>
    </Column>
    <Column field="localName" header="Local Name" :sortable="true"></Column>
    <Column field="name" header="English Name" :sortable="true"></Column>
    <Column field="countryCode" header="Country Code" :sortable="true"></Column>
    <Column field="types" header="Type" :sortable="true">
      <template #body="slotProps">
        {{ slotProps.data.types[0] }}
      </template>
    </Column>
  </DataTable>
</template>

<script setup lang="ts">
import Message from 'primevue/message'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { computed } from 'vue'
import { usePublicHolidays } from '@/stores/usePublicHolidays'
import Card from 'primevue/card'
import { formatDate } from '@/lib'
import SkeletonTable from './SkeletonTable.vue'
import type { PublicHolidayV3Dto } from '@/types/Api'

const publicHolidaysStore = usePublicHolidays()

const holidays = computed(() => publicHolidaysStore.holidays)
const loading = computed(() => publicHolidaysStore.loading)
const error = computed(() => publicHolidaysStore.error)

defineEmits<{
  (e: 'select-holiday', holiday: PublicHolidayV3Dto): void
}>()
</script>
