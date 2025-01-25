import { test, expect } from '@playwright/test'

test.describe('Holiday Finder App', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should load the application', async ({ page }) => {
    await expect(page).toHaveTitle('Public Holidays Finder')
    await expect(page.getByRole('heading', { name: /Public Holidays/i })).toBeVisible()
  })

  test('should search and display holidays for a country', async ({ page }) => {
    // Find and click the autocomplete input
    const searchInput = page.getByPlaceholder('Select a country')
    await searchInput.click()
    await searchInput.fill('Nether')

    // Wait for and select "United States" from dropdown
    const usOption = page.getByText('Netherlands', { exact: true })
    await expect(usOption).toBeVisible()
    await usOption.click()

    // Verify that holidays are displayed
    const holidayTable = page.getByTestId('holidays-table')
    await expect(holidayTable).toBeVisible()

    // Verify some common US holidays are present
    const newYearsDay = page.getByRole('cell', { name: 'Good Friday' })
    const independenceDay = page.getByRole('cell', { name: 'Whit Monday' })
    await expect(newYearsDay).toBeVisible()
    await expect(independenceDay).toBeVisible()
  })

  test('should change year and update holidays', async ({ page }) => {
    // Select a country first
    const searchInput = page.getByPlaceholder('Select a country')
    await searchInput.click()
    await searchInput.fill('United States')
    await page.getByText('United States', { exact: true }).click()

    // Find and click the year dropdown
    const yearDropdown = page.getByTestId('year-select')
    await yearDropdown.click()

    // Select next year
    const nextYear = (new Date().getFullYear() + 1).toString()
    await page.getByText(nextYear, { exact: true }).click()

    // Verify that holidays table updates
    const holidayTable = page.locator('.p-datatable')
    await expect(holidayTable).toBeVisible()

    // Verify the year in the date column
    const dateCell = page.locator('.p-datatable td').first()
    await expect(dateCell).toContainText(nextYear)
  })

  test('should show loading state', async ({ page }) => {
    // Add artificial delay to API response
    await page.route('**/api/v3/PublicHolidays/**', async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      route.continue()
    })

    // Select a country
    const searchInput = page.getByPlaceholder('Select a country')
    await searchInput.click()
    await searchInput.fill('United States')
    await page.getByText('United States', { exact: true }).click()

    // Verify loading state is shown
    const loadingState = page.getByTestId('skeleton-table')
    await expect(loadingState).toBeVisible()
  })

  test('should allow holiday selection', async ({ page }) => {
    // Select a country
    const searchInput = page.locator('[data-testid="country-select"] input')
    await searchInput.click()
    await searchInput.fill('United States')
    await page.getByText('United States', { exact: true }).click()

    // Wait for table to load
    const holidayTable = page.getByTestId('holidays-table')
    await expect(holidayTable).toBeVisible()

    // Click on a holiday row
    const firstHolidayRow = page.locator('.p-datatable-tbody tr').first()
    await firstHolidayRow.click()

    await expect(firstHolidayRow).toHaveClass(/p-row-even/)
  })

  test('should be responsive', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })

    // Verify responsive layout
    const searchInput = page.getByPlaceholder('Select a country')
    await expect(searchInput).toBeVisible()

    // Select a country
    await searchInput.click()
    await searchInput.fill('United States')
    await page.getByText('United States', { exact: true }).click()

    // Verify table is still visible and usable
    const holidayTable = page.locator('.p-datatable')
    await expect(holidayTable).toBeVisible()
  })
})
