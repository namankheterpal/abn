import type { TShow } from "@/types/shows";

import httpClient from "./utils/httpClient";
import { useHttp } from "./utils/useHttp";
import { SHOWS_DOMAIN, URLS } from "./utils/constants";

export const getSearchResults = () => {
  const { isFetching, error, data, load, dataArgs } = useHttp<
    { show: TShow }[]
  >((query: string) => httpClient.get(SHOWS_DOMAIN + URLS.searchShows + query));

  return { isFetching, error, data, load, dataArgs };
};
