import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { ADMIN_PANEL_URL } from "@/config/url.config";
import { createContext, FC, PropsWithChildren, useEffect } from "react";

import { IContext } from "./auth.interface";
import { usePathname } from "next/navigation";

export const AuthContext = createContext({} as IContext);
import { protectedRoutes } from "./protected-routes.data";
import { REFRESH_TOKEN } from "@/constants/token.constant";
import { useAuth } from "@/hooks/useAuth";
import { useActions } from "@/hooks/useActions";
import { getAccessToken } from "@/helpers/auth.helper";

const AuthProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
  const { user } = useAuth();
  const { checkAuth, logout } = useActions();

  const pathname = usePathname();

  useEffect(() => {
    const accessToken = getAccessToken();
    if (accessToken) checkAuth();
  }, []);

  useEffect(() => {
    const refreshToken = Cookies.get(REFRESH_TOKEN);
    if (!refreshToken && user) logout();
  }, [pathname, logout, user]);

  // const router = useRouter();

  const isProtectedRoute = protectedRoutes.some(
    (route) => pathname?.startsWith(route),
  );

  const isAdminRoute = pathname?.startsWith(ADMIN_PANEL_URL);

  if (!isProtectedRoute && !isAdminRoute) return <>{children}</>;

  if (user?.isAdmin) return <>{children}</>;
  if (user && isProtectedRoute) return <>{children}</>;

  // if (user && isAdminRoute) return <NotFound />;

  // if (pathname !== "/auth") return <Auth />;

  return null;
};

export default AuthProvider;
