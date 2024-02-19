import { watch, type Ref } from "vue";
import type { TShowMap } from "@/types/shows";
import { getShowDetails } from "@/api-clients/getShowDetails";

export const showDetailsHelper = (shows: Ref<TShowMap>) => {
  const {
    isFetching: isShowDetailsLoading,
    load,
    data,
    dataArgs,
  } = getShowDetails();

  const loadShowDetails = async (id: string) => {
    // check if the detail is already present
    if (shows.value[id]) return;
    load(id);
  };

  watch(data, () => {
    if (data.value) {
      shows.value[dataArgs.value[0]] = data.value;
    }
  });

  return { isShowDetailsLoading, loadShowDetails };
};
