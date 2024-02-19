<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { onMounted } from "vue";
import ShowSearch from "@/components/ShowSearch.vue";
import { useShowsStore } from "@/stores/shows";

const showsStore = useShowsStore();

onMounted(() => {
  showsStore.loadShows();
});
</script>

<template>
  <header>
    <router-link to="/">
      <h1>TV maze</h1>
    </router-link>
    <div class="search">
      <ShowSearch />
    </div>
  </header>

  <main>
    <RouterView />
  </main>
</template>

<style scoped>
main {
  padding-top: 4rem;
}
h1 {
  color: white;
}
header {
  z-index: 100;
  padding: 0 2rem;
  background-color: #006d67;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
}
.search {
  margin: 0 10px;
  flex-grow: 1;
}
</style>
