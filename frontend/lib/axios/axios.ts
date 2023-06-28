import axios, { AxiosInstance } from "axios";

/**
 * @author @Lenghak
 * @description Axios instance for associating with api call
 */
const instance: AxiosInstance = axios.create({
  baseURL: "https://couponapi.textura-art.com",
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    "Content-Type": "application/json",
  },
});

const authorizedInstance: AxiosInstance = axios.create({
  baseURL: "https://couponapi.textura-art.com",
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export { instance as axios, authorizedInstance as authorizedAxios };
