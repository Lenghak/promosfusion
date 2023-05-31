import { useEffect, useState } from "react";

/**
 * @description useGetStore hook give access to the store return persisted value from zustand, which prevented the server-client DOM mismatched
 *
 * @param store - the desired store from zustand
 * @param callback - the callback for getting the value from the store
 * @returns returned value of Store
 *
 */
const useGetStore = <T, F>(
  store: (callback: (state: T) => unknown) => unknown,
  callback: (state: T) => F
) => {
  const result = store(callback) as F;
  const [data, setData] = useState<F>();

  useEffect(() => {
    setData(result);
  }, [result]);

  return data;
};

export { useGetStore };
