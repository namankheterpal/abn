import { ref, watch } from "vue";
import { getSearchResults } from "@/api-clients/getSearchResults";
import { debounce } from "@/api-clients/utils/debounce";
import type { TShow } from "@/types/shows";

export const searchShowsHelper = () => {
  const searchQuery = ref<string>("");
  const searchResults = ref<{ show: TShow }[]>([]);
  let cancelFetchSearchResultsCall: () => void;

  const {
    isFetching: searchLoading,
    load: fetchSearchResults,
    data,
    dataArgs,
  } = getSearchResults();

  watch(data, () => {
    if (data.value && dataArgs.value[0] == searchQuery.value) {
      searchResults.value = data.value;
    }
  });

  // debounced the search query to avoid multiple calls while user is typing
  const debouncedFetchSearchResults = debounce(fetchSearchResults, 300);

  const searchShows = (query: string) => {
    searchResults.value = [];
    searchQuery.value = query;
    searchLoading.value = true;

    if (query == "" && cancelFetchSearchResultsCall) {
      cancelFetchSearchResultsCall();
      searchLoading.value = false;
    } else {
      cancelFetchSearchResultsCall = debouncedFetchSearchResults(query);
    }
  };

  return {
    searchQuery,
    searchShows,
    searchResults,
    searchLoading,
  };
};
