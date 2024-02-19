<script setup lang="ts">
import { computed } from "vue";
import { useShowsStore } from "@/stores/shows";

const showsStore = useShowsStore();

const props = defineProps<{
  id: number;
}>();

const show = computed(() => showsStore.shows[props.id]);
const isFavourite = computed(() => showsStore.isFavourite(props.id));
</script>

<template>
  <router-link to="/">&larr;Back to all Shows</router-link>
  <button @click="showsStore.toogleFavourite(id)">
    {{ isFavourite ? "Remove as favourite" : "Mark as favourite" }}
  </button>
  <div v-if="show">
    <div class="header">
      <img :src="show.image?.medium" />
      <div class="details">
        <h2>{{ show.name }}</h2>
        <label data-testid="rating">Rating: {{ show.rating?.average }}</label>
        <br />
        <label data-testid="type">Type: {{ show?.type }}</label>
        <br />
        <label data-testid="language">Language: {{ show.language }}</label>
        <br />
        <label>Genres:&nbsp;</label>
        <label v-for="genre in show.genres" :key="genre" data-testid="genre"
          >#{{ genre }}&nbsp;</label
        >
        <br />
      </div>
    </div>
    <div data-testid="summary" v-html="show.summary"></div>
  </div>
  <div v-if="showsStore.isShowDetailsLoading">Loading show details...</div>
</template>

<style scoped>
a,
button {
  border: none;
  background-color: lightgrey;
  padding: 10px;
  font-size: 1rem;
  margin: 0 10px;
  border-radius: 10px;
}
.header {
  padding: 20px 0;
  display: flex;
}
.details {
  padding: 0 20px;
}
img {
  width: 210px;
  border-radius: 10px;
}
</style>
