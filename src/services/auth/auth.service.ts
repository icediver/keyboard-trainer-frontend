import axios from "axios";
import Cookies from "js-cookie";

import { IAuthResponse, IEmailPassword } from "@/store/user/user.interface";

import { REFRESH_TOKEN } from "@/constants/token.constant";
import { axiosClassic } from "@/helpers/api/api.interceptor";
import { saveToStorage } from "@/helpers/auth.helper";

export const AuthService = {
  async main(type: "login" | "register", data: IEmailPassword) {
    const response = await axiosClassic.post<IAuthResponse>(
      `/auth/${type}`,
      data,
    );

    if (response.data.accessToken) saveToStorage(response.data);
    return response.data;
  },

  async getNewTokens() {
    const refreshToken = Cookies.get(REFRESH_TOKEN);

    const response = await axiosClassic.post<string, { data: IAuthResponse }>(
      "/auth/login/access-token",
      { refreshToken },
    );

    if (response.data.accessToken) saveToStorage(response.data);

    return response;
  },
};
