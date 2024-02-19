<script setup lang="ts">
import { useRouter } from "vue-router";
import { useShowsStore } from "@/stores/shows";

const showsStore = useShowsStore();
const router = useRouter();

const props = defineProps<{
  id: number;
}>();

const show = showsStore.shows[props.id];

const showDetails = () => {
  router.push({
    name: "showDetails",
    params: {
      id: props.id,
    },
  });
};
</script>

<template>
  <div v-if="show" class="card" @click="showDetails">
    <img :src="show.image?.medium" />
    <h3 data-testid="show-name">{{ show.name }}</h3>
    <label data-testid="rating">Rating: {{ show.rating?.average }}</label>
  </div>
</template>

<style scoped>
.card {
  padding: 10px;
  border-radius: 10px;
}
img {
  border-radius: 10px;
}
.card:hover img {
  transform: scale(1.05);
}
</style>
