import type { TShowMap } from "@/types/shows";
import { computed, ref, type Ref } from "vue";

const StorageKey = "favouriteShows";

export const favouriteShowsHelper = (shows: Ref<TShowMap>) => {
  const favouriteShows = ref<TShowMap>({});

  const saveFavouriteShows = () => {
    window.localStorage.setItem(
      StorageKey,
      JSON.stringify(favouriteShows.value)
    );
  };

  const loadFavouriteShows = () => {
    const storedShows = window.localStorage.getItem(StorageKey);
    if (storedShows) {
      favouriteShows.value = JSON.parse(storedShows);
      shows.value = { ...shows.value, ...favouriteShows.value };
    }
  };
  const removeFavouriteShows = (id: number) => {
    delete favouriteShows.value[id];
    saveFavouriteShows();
  };

  const addFavouriteShows = (id: number) => {
    favouriteShows.value[id] = shows.value[id];
    saveFavouriteShows();
  };

  const isFavourite = (id: number) => {
    return !!favouriteShows.value[id];
  };

  const toogleFavourite = (id: number) => {
    if (favouriteShows.value[id]) {
      removeFavouriteShows(id);
    } else {
      addFavouriteShows(id);
    }
  };

  loadFavouriteShows();

  const favouriteShowIds = computed(() =>
    Object.keys(favouriteShows.value).map(Number)
  );

  return { isFavourite, toogleFavourite, favouriteShowIds };
};
