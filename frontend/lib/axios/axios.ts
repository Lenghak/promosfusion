import axios, { AxiosInstance } from "axios";

/**
 * @author @Lenghak
 * @description Axios instance for associating with api call
 */
const instance: AxiosInstance = axios.create({
  baseURL: "http://couponapi.textura-art.com",
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    "Content-Type": "application/json",
  },
});

export { instance as axios };
