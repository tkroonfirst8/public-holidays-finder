# public-holidays-finder

This is a simple app to find public holidays for any country.

prerequisites:

- node 22
- npm 9+
- vue 3
- primevue
- tailwindcss
- pinia
- playwright

```
.
├── README.md
├── e2e
│   ├── holidays-finder.spec.ts
│   └── tsconfig.json
├── env.d.ts
├── eslint.config.ts
├── index.html
├── package-lock.json
├── package.json
├── playwright.config.ts
├── postcss.config.ts
├── public
│   └── favicon.ico
├── src
│   ├── App.vue
│   ├── api
│   │   └── Nager.Date API - V3.json
│   ├── assets
│   │   ├── logo.svg
│   │   └── main.css
│   ├── components
│   │   ├── HolidaysTableComponent.vue
│   │   ├── SearchCombobox.vue
│   │   ├── SkeletonTable.vue
│   │   ├── UpNext.vue
│   │   ├── YearDropdown.vue
│   │   ├── __tests__
│   │   └── icons
│   ├── env.d.ts
│   ├── lib.ts
│   ├── main.ts
│   ├── router
│   │   └── index.ts
│   ├── stores
│   │   ├── counter.ts
│   │   ├── useCountries.ts
│   │   ├── usePublicHolidays.ts
│   │   ├── useUpNext.ts
│   │   └── useYears.ts
│   └── types
│       └── Api.ts
├── tailwind.config.ts
├── test-results
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── tsconfig.vitest.json
├── vite.config.ts
└── vitest.config.ts
```

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Playwright](https://playwright.dev)

```sh
# Install browsers for the first run
npx playwright install

# When testing on CI, must build the project first
npm run build

# Runs the end-to-end tests
npm run test:e2e
# Runs the tests only on Chromium
npm run test:e2e -- --project=chromium
# Runs the tests of a specific file
npm run test:e2e -- tests/example.spec.ts
# Runs the tests in debug mode
npm run test:e2e -- --debug
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

### Format with [Prettier](https://prettier.io/)

```sh
npm run format
```

## Features of the app

- Retrieve public holidays for any supported country
- Change the year to view holidays for a different year (ten years back and forward)
- Show the next upcoming public holiday worldwide

## Public Holiday API Integration

This project integrates with the [Nager.Date API](https://date.nager.at/), a comprehensive public holiday web service that provides worldwide holiday data.

### API Documentation

This project uses the Nager.Date API (https://date.nager.at/), which provides:

- Free access to worldwide public holiday data
- RESTful API endpoints
- JSON response format
- Comprehensive country coverage

#### Main Endpoints

- Get holidays for a specific year and country:

  ```
  GET /api/v3/PublicHolidays/{year}/{countryCode}
  ```

- Check if today is a public holiday:

  ```
  GET /api/v3/IsTodayPublicHoliday/{countryCode}
  ```

- Get upcoming public holidays:
  ```
  GET /api/v3/NextPublicHolidays/{countryCode}
  ```

## Getting Started

1. Clone this repository
2. No API key required for basic usage
3. Make requests to the API endpoints

## Example Usage

```
npm install
npm run dev
```
