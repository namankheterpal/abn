import type { TShow } from "@/types/shows";

import httpClient from "./utils/httpClient";
import { useHttp } from "./utils/useHttp";
import { SHOWS_DOMAIN, URLS } from "./utils/constants";

export const getShows = () => {
  const { isFetching, error, data, load } = useHttp<TShow[]>(() =>
    httpClient.get(SHOWS_DOMAIN + URLS.showsList)
  );

  return { isFetching, error, data, load };
};
