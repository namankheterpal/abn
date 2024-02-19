# ABN

This project is build using Vite template for Vue3.
Pinia store, vue-router, vitest and typescript are used for the project.

All the components are designed by using native css properties.

## Feature

- The app fetches 250 shows from "https://api.tvmaze.com/".
- The shows marked as favourite are shown in top.
- Favourite shows only appear if ther is at least one show marked as favourite.
- You can mark any show favourite in show details page.
- The shows with rating more than 8.5 are shown in Popular column.
- The shows are categorised by the genres.
- The list of shows are horizontally scrollable.
- You can search for shows that are even not loaded yet as search is powered by server.
- Once you select a show from search result or from result you can see further details of the show.
- Clicking the logo or any wrong url will redirect you back to home page.
- Favourites are be saved on localstorage to preview even if they are not in first 250 shows list.

## Notes

- All the components are extensively unit tested
- Pinia store is used to cache the loaded data and share it among various components.
- Data is processed and stores as a form of map for easy accessing.

## Project Setup

### Prerequisites

- Node version 14 or higher

## Setup

```sh
yarn
```

### Compile and Hot-Reload for Development

```sh
yarn dev
```

### Type-Check, Compile and Minify for Production

```sh
yarn build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
yarn test:unit
```
