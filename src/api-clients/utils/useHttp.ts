import type { AxiosResponse } from "axios";
import { ref, onMounted } from "vue";

/**
 * This functionality is so common for all kinds of API calls that we make our
 * life a lot easier by extracting it into a separate function
 */
export function useHttp<T>(cb: (...args: any) => Promise<AxiosResponse<T>>) {
  const isFetching = ref(false);
  const error = ref(false);
  const data = ref<T>();
  const dataArgs = ref<any[]>([]);

  const load = async (...args: any) => {
    isFetching.value = true;
    try {
      const { data: res } = await cb(...args);
      if (res) data.value = res;
      dataArgs.value = args;
      error.value = false;
    } catch {
      // log error to logger service or show snackbar/toast
      error.value = true;
    } finally {
      isFetching.value = false;
    }
  };

  return { isFetching, error, data, load, dataArgs };
}
