/* eslint-disable no-console */
import { envVars } from "@/config/envVarriables";
import axios, { type AxiosRequestConfig } from "axios";

export const axiosInstance = axios.create({
  baseURL: `${envVars.baseUrl}`,
  withCredentials: true,
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

let isRefreshing = false;

let pendingQueue: {
  resolve: (value: unknown) => void;
  reject: (value: unknown) => void;
}[] = [];

const processQueue = (error: unknown) => {
  pendingQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(null);
    }
  });
  pendingQueue = []
};

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config as AxiosRequestConfig;

    if (
      error.response.status === 501 &&
      error.response.data.message === "jwt expired"
    ) {
      console.log("Your token is expired");

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          pendingQueue.push({ resolve, reject });
        })
          .then(() => axiosInstance(originalRequest))
          .catch((error) => Promise.reject(error));
      }

      isRefreshing = true;

      try {
        const res = await axiosInstance.post("/auth/refresh-token");
        console.log("new token arrived", res);
        processQueue(null);
        return axiosInstance(originalRequest);
      } catch (error) {
        processQueue(error);
        console.error(error);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);
