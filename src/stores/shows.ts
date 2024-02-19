import { ref, watch, watchEffect } from "vue";
import { defineStore } from "pinia";
import type { TShowMap } from "@/types/shows";
import { searchShowsHelper } from "./helpers/searchShowsHelper";
import { showsHelper } from "./helpers/showsHelper";
import { showDetailsHelper } from "./helpers/showDetailsHelper";
import { favouriteShowsHelper } from "./helpers/favouriteShowsHelper";

export const useShowsStore = defineStore("shows", () => {
  const shows = ref<TShowMap>({});
  const { showIdsByGenres, areShowsLoading, loadShows } = showsHelper(shows);
  const { isShowDetailsLoading, loadShowDetails } = showDetailsHelper(shows);
  const { isFavourite, toogleFavourite, favouriteShowIds } =
    favouriteShowsHelper(shows);
  const { searchQuery, searchShows, searchResults, searchLoading } =
    searchShowsHelper();

  return {
    shows,
    loadShows,
    showIdsByGenres,
    searchQuery,
    searchShows,
    areShowsLoading,
    searchResults,
    isShowDetailsLoading,
    isFavourite,
    toogleFavourite,
    favouriteShowIds,
    loadShowDetails,
    searchLoading,
  };
});
