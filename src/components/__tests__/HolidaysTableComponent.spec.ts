import { describe, it, expect, beforeEach } from 'vitest'
import { mount, type VueWrapper } from '@vue/test-utils'
import HolidaysTableComponent from '../HolidaysTableComponent.vue'
import { createPinia, type Pinia } from 'pinia'
import { setActivePinia } from 'pinia'
import PrimeVue from 'primevue/config'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Card from 'primevue/card'
import Message from 'primevue/message'
import { usePublicHolidays } from '@/stores/usePublicHolidays'
import { PublicHolidayV3Dto } from '@/types/Api'

describe('HolidaysTableComponent', () => {
  let wrapper: VueWrapper
  let pinia: Pinia

  const mockHolidays = [
    {
      date: '2024-01-01',
      localName: "New Year's Day",
      name: "New Year's Day",
      countryCode: 'US',
      fixed: true,
      global: true,
      counties: null,
      types: ['Public'],
    },
  ]

  beforeEach(() => {
    pinia = createPinia()
    setActivePinia(pinia)

    wrapper = mount(HolidaysTableComponent, {
      global: {
        plugins: [pinia, PrimeVue],
        components: {
          DataTable,
          Column,
          Card,
          Message,
          SkeletonTable: {
            template: '<div>Loading...</div>',
          },
        },
      },
    })

    const store = usePublicHolidays()
    store.holidays = mockHolidays as PublicHolidayV3Dto[]
  })

  it('renders the component', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('displays the DataTable when holidays are available', () => {
    expect(wrapper.findComponent(DataTable).exists()).toBe(true)
  })

  it('displays holiday information correctly', () => {
    const dataTable = wrapper.findComponent(DataTable)
    expect(dataTable.props('value')).toEqual(mockHolidays)
  })

  it('shows empty message when no holidays', async () => {
    const store = usePublicHolidays()
    store.holidays = []
    await wrapper.vm.$nextTick()
    expect(wrapper.findComponent(Card).exists()).toBe(true)
    expect(wrapper.text()).toContain('Select a country')
  })

  it('shows skeleton loader when loading', async () => {
    const store = usePublicHolidays()
    store.loading = true
    await wrapper.vm.$nextTick()
    expect(wrapper.findComponent({ name: 'SkeletonTable' }).exists()).toBe(true)
  })

  it('shows error message when error occurs', async () => {
    const store = usePublicHolidays()
    store.error = "We're not able to fetch any holidays ate the moment. Please try again later."
    await wrapper.vm.$nextTick()
    expect(wrapper.findComponent(Message).exists()).toBe(true)
  })

  it('emits select-holiday event when row is clicked', async () => {
    const dataTable = wrapper.findComponent(DataTable)
    await dataTable.vm.$emit('row-click', { data: mockHolidays[0] })
    expect(wrapper.emitted('select-holiday')).toBeTruthy()
    expect(wrapper.emitted('select-holiday')![0]).toEqual([mockHolidays[0]])
  })
})
