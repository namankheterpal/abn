import type { TShow } from "@/types/shows";

import httpClient from "./utils/httpClient";
import { useHttp } from "./utils/useHttp";
import { SHOWS_DOMAIN, URLS } from "./utils/constants";

export const getShowDetails = () => {
  const { isFetching, error, data, load, dataArgs } = useHttp<TShow>(
    (id: string) => httpClient.get(SHOWS_DOMAIN + URLS.showDetail + id)
  );

  return { isFetching, error, data, load, dataArgs };
};
