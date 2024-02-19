import { ref, watch, type Ref } from "vue";
import type { TGenresMap, TShow, TShowMap } from "@/types/shows";
import { getShows } from "@/api-clients/getShows";

const getShowMap = (shows: TShow[]): TShowMap => {
  return shows.reduce((ac: TShowMap, cv) => {
    ac[cv.id] = cv;
    return ac;
  }, {});
};

const getShowIdsByGenres = (shows: TShow[]) => {
  const showsIdsByGenres: TGenresMap = {};
  showsIdsByGenres["Popular"] = [];

  shows.forEach((show) => {
    show.genres.forEach((genre) => {
      showsIdsByGenres[genre] = showsIdsByGenres[genre] || [];
      showsIdsByGenres[genre].push(show.id);
    });
    if (show.rating?.average > 8.5) {
      showsIdsByGenres["Popular"].push(show.id);
    }
  });

  return showsIdsByGenres;
};

export const showsHelper = (shows: Ref<TShowMap>) => {
  const showIdsByGenres = ref<TGenresMap>({});

  const { isFetching: areShowsLoading, load: loadShows, data } = getShows();

  watch(data, () => {
    if (data.value) {
      shows.value = { ...shows.value, ...getShowMap(data.value) };
      showIdsByGenres.value = getShowIdsByGenres(data.value);
    }
  });

  return { showIdsByGenres, areShowsLoading, loadShows };
};
