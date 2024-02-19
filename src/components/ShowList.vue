<script setup lang="ts">
import ShowCard from "@/components/ShowCard.vue";

defineProps<{
  name: string;
  showIds: number[];
}>();
</script>

<template>
  <div class="genre">
    <h2 class="green" data-testid="genre-name">{{ name }}</h2>
    <label data-testid="genre-count">({{ showIds.length }} shows)</label>
    <div class="shows">
      <ShowCard v-for="id in showIds" :key="id" :id="id" />
    </div>
  </div>
</template>

<style scoped>
.genre {
  margin-bottom: 20px;
}
.shows::-webkit-scrollbar {
  display: none;
}

h2 {
  font-weight: 500;
  display: inline;
}
.shows {
  display: flex;
  overflow: auto;
}
</style>
