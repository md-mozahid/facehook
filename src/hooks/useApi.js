import { useEffect } from "react";
import { api } from "../api";
import { useAuth } from "./useAuth";

export const useApi = () => {
  const { auth, setAuth } = useAuth();
  useEffect(() => {
    // add a request interceptor
    api.interceptors.request.use(
      (config) => {
        const authToken = auth?.authToken;

        if (authToken) {
          config.headers.Authorization = `Bearer ${authToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // add a response interceptor
  }, [auth?.authToken]);
};
