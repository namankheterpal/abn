<script setup lang="ts">
import { computed, onMounted } from "vue";
import ShowList from "@/components/ShowList.vue";
import { useShowsStore } from "@/stores/shows";

const showsStore = useShowsStore();

const genres = computed(() => Object.keys(showsStore.showIdsByGenres));
</script>

<template>
  <div v-if="showsStore.areShowsLoading">Loading shows...</div>
  <div v-else>
    <ShowList
      v-if="showsStore.favouriteShowIds.length > 0"
      :name="'Favourites'"
      :show-ids="showsStore.favouriteShowIds"
    />
    <ShowList
      v-for="genre in genres"
      :key="genre"
      :name="genre"
      :show-ids="showsStore.showIdsByGenres[genre]"
    />
  </div>
</template>
