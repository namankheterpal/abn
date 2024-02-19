<script setup lang="ts">
import { useRouter } from "vue-router";
import { useShowsStore } from "@/stores/shows";

const showsStore = useShowsStore();

const router = useRouter();

const showDetails = (id: number) => {
  showsStore.searchShows("");
  router.push({
    name: "showDetails",
    params: {
      id,
    },
  });
};
</script>

<template>
  <h3>Results ({{ showsStore.searchResults.length }} shows found)</h3>
  <div
    v-for="result in showsStore.searchResults"
    class="result"
    :key="result.show.id"
    @click="showDetails(result.show.id)"
  >
    <img :src="result.show?.image?.medium" />
    <div class="details">
      <h2>{{ result.show.name }}</h2>
      <label data-testid="rating"
        >Rating: {{ result.show.rating?.average || "unknown" }}</label
      >
      <br />
      <label data-testid="language">Language: {{ result.show.language }}</label>
    </div>
  </div>
</template>

<style scoped>
img {
  width: 72px;
  height: 100px;
  margin-right: 10px;
}
h3 {
  margin: 0 20px;
}
.result {
  margin: 0 20px;
  box-shadow: 10px 5px 5px lightgrey;
  display: flex;
  padding: 20px;
  border-bottom: 1px solid lightgrey;
}
</style>
