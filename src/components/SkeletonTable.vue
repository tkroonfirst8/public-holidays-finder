<template>
  <DataTable :value="holidays">
    <Column field="date" header="Date">
      <template #body>
        <Skeleton></Skeleton>
      </template>
    </Column>
    <Column field="localName" header="Local Name">
      <template #body>
        <Skeleton></Skeleton>
      </template>
    </Column>
    <Column field="name" header="English Name">
      <template #body>
        <Skeleton></Skeleton>
      </template>
    </Column>
    <Column field="countryCode" header="Country Code">
      <template #body>
        <Skeleton></Skeleton>
      </template>
    </Column>
    <Column field="launchYear" header="Type">
      <template #body>
        <Skeleton></Skeleton>
      </template>
    </Column>
  </DataTable>
</template>
<script setup lang="ts">
import { DataTable } from 'primevue'
import { Column } from 'primevue'
import Skeleton from 'primevue/skeleton'
import { ref } from 'vue'

const holidays = ref(new Array(9))
</script>
