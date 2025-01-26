<template>
  <Message size="large" icon="pi pi-send" class="mb-6">
    <span v-if="loading">Loading...</span>
    <span v-if="error">{{ error }}</span>
    <span class="font-light" v-else-if="upNext">
      The first upcoming public holiday worldwide is {{ upNext.name }} in
      {{ upNext.countryInfo?.commonName }} on
      {{ formatDate(upNext.date) }}
    </span>
  </Message>
</template>

<script setup lang="ts">
import { formatDate } from '@/lib'
import { Message } from 'primevue'
import { useUpNext } from '@/stores/useUpNext'
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'

const upNextStore = useUpNext()
const { upNext, loading, error } = storeToRefs(upNextStore)

onMounted(() => {
  upNextStore.setUpNext()
})
</script>
