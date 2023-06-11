import axios, { AxiosInstance } from "axios";

const instance: AxiosInstance = axios.create({
  baseURL: "http://couponapi.textura-art.com/",
  headers: { "X-Requested-With": "XMLHttpRequest" },
});

export { instance as axios };
