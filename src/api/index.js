import axios from "axios";
const localhostApi = import.meta.env.VITE_SERVER_BASE_URL;

export const api = axios.create({
  baseURL: localhostApi,
});
