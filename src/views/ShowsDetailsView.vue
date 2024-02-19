<script setup lang="ts">
import { watchEffect } from "vue";
import ShowDetails from "@/components/ShowDetails.vue";
import { useShowsStore } from "@/stores/shows";

const showsStore = useShowsStore();

const props = defineProps<{
  id: string;
}>();

watchEffect(() => showsStore.loadShowDetails(props.id));
</script>

<template>
  <ShowDetails :id="id" />
</template>
