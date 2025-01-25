import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount, type VueWrapper } from '@vue/test-utils'
import SearchCombobox from '../SearchCombobox.vue'
import { createPinia, setActivePinia } from 'pinia'
import PrimeVue from 'primevue/config'
import AutoComplete from 'primevue/autocomplete'
import { useCountries } from '@/stores/useCountries'

describe('SearchCombobox', () => {
  let wrapper: VueWrapper

  const mockCountries = [
    { name: 'United States', countryCode: 'US' },
    { name: 'United Kingdom', countryCode: 'GB' },
    { name: 'Canada', countryCode: 'CA' },
  ]

  beforeEach(() => {
    // Create a fresh pinia instance for each test
    const pinia = createPinia()
    setActivePinia(pinia)

    // Setup store with mock data before mounting
    const countriesStore = useCountries()
    countriesStore.countries = mockCountries

    wrapper = mount(SearchCombobox, {
      global: {
        plugins: [pinia, PrimeVue],
        components: {
          AutoComplete,
        },
        stubs: {
          AutoComplete: {
            template: `
              <div>
                <input
                  :placeholder="placeholder"
                  :aria-placeholder="$attrs['aria-placeholder']"
                />
              </div>
            `,
            props: ['placeholder', 'modelValue'],
          },
        },
      },
    })
  })

  it('renders properly', () => {
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.findComponent(AutoComplete).exists()).toBe(true)
  })

  it('fetches countries on mount if store is empty', async () => {
    // Reset pinia and create fresh store instance
    const pinia = createPinia()
    setActivePinia(pinia)

    const countriesStore = useCountries()
    // Mock the fetchCountries method
    const fetchSpy = vi.fn()
    countriesStore.fetchCountries = fetchSpy
    countriesStore.countries = []

    mount(SearchCombobox, {
      global: {
        plugins: [pinia, PrimeVue],
        components: { AutoComplete },
      },
    })

    expect(fetchSpy).toHaveBeenCalled()
  })
})
