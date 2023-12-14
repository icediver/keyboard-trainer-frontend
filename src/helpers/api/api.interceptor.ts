import axios from "axios";

import { getContentType } from "./api.helper";
import { getAccessToken } from "../auth.helper";

const axiosOptions = {
  baseURL: process.env.SERVER_URL,
  headers: getContentType(),
};

export const axiosClassic = axios.create(axiosOptions);

export const instance = axios.create(axiosOptions);

instance.interceptors.request.use((config) => {
  const accessToken = getAccessToken();

  if (config.headers && accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});
