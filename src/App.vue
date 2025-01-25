<template>
  <div class="flex flex-col h-screen">
    <!-- Header -->
    <header class="text-white shadow-lg">
      <Toolbar class="flex items-center">
        <template #start>
          <h1
            class="text-center bg-gradient-to-r from-teal-800 via-teal-600 to-teal-400 text-transparent bg-clip-text m-2 font-extrabold text-2xl md:text-3xl lg:text-4xl dark:text-white leading-none tracking-tight"
          >
            Public Holidays Finder
          </h1>
        </template>
        <template #end><SearchCombobox /><YearDropdown /></template>
      </Toolbar>
    </header>

    <div class="flex flex-1 overflow-hidden">
      <!-- Main Content -->
      <main class="flex-1 bg-gray-50 overflow-y-auto p-6">
        <HolidaysTableComponent />

        <!-- <RouterView /> -->
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
// import { useRouter } from 'vue-router'
import YearDropdown from '@/components/YearDropdown.vue'
import HolidaysTableComponent from '@/components/HolidaysTableComponent.vue'
import { Toolbar } from 'primevue'

import SearchCombobox from '@/components/SearchCombobox.vue'

// const router = useRouter()
</script>

<style>
@media (min-width: 768px) {
  aside {
    transform: translateX(0) !important;
  }
}
</style>
