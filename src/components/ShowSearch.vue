<script setup lang="ts">
import ShowSearchResult from "@/components/ShowSearchResult.vue";
import { useShowsStore } from "@/stores/shows";

const showsStore = useShowsStore();

const onSearchInput = (e: Event) => {
  const query = (e.target as HTMLInputElement).value;

  showsStore.searchShows(query);
};
</script>

<template>
  <div class="root">
    <input name="search" placeholder="Search shows" @input="onSearchInput" />

    <div class="results">
      <div
        class="title"
        data-testid="searching"
        v-if="showsStore.searchLoading"
      >
        Searching...
      </div>
      <ShowSearchResult v-if="showsStore.searchResults.length > 0" />
      <div
        class="title"
        v-if="
          !showsStore.searchLoading &&
          showsStore.searchResults.length == 0 &&
          showsStore.searchQuery.length > 0
        "
      >
        No results found
      </div>
    </div>
  </div>
</template>

<style scoped>
.root {
  position: relative;
  color: black;
}
input {
  width: 100%;
  height: 2rem;
  margin: 0.5rem 0;
}
.title {
  padding: 20px;
}
.results {
  z-index: 10;
  width: 100%;
  background: white;
  position: absolute;
  box-shadow: 0px 10px 5px lightgrey;
  max-height: 80vh;
  overflow: auto;
  border-top: none;
}
</style>
