import { errorCatch } from "./api.helper";
import { AuthService } from "@/services/auth/auth.service";
import { instance } from "./api.interceptor";
import { removeFromStorage } from "../auth.helper";

instance.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;

    if (
      (error?.response?.status === 401 ||
        errorCatch(error) === "jwt expired" ||
        errorCatch(error) === "jwt must be provided") &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        await AuthService.getNewTokens();
        return instance.request(originalRequest);
      } catch (error) {
        if (errorCatch(error) === "jwt expired") removeFromStorage();
        console.log("delete token");
      }
    }
    throw error;
  },
);
