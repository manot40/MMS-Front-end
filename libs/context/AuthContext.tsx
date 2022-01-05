/* eslint-disable react-hooks/exhaustive-deps */
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import dayjs from "dayjs";
import { Obj, User } from "libs/type";
import jwtDecode from "jwt-decode";
import { useRouter } from "next/router";
import * as userApi from "../apis/user";
import * as authApi from "../apis/auth";
import Fetcher, { AxiosMethod } from "libs/utils/fetcher";

interface AuthContextType {
  user?: User;
  loading: boolean;
  error?: any;
  login: (username: string, password: string, rememberMe: boolean) => Promise<boolean>;
  fetcher: (url: string, options: Obj, method: AxiosMethod) => Promise<any>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const [user, setUser] = useState<User>();
  const [token, setToken] = useState<string>("");
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingInitial, setLoadingInitial] = useState<boolean>(true);

  const { pathname, push } = useRouter();

  useEffect(() => {
    const refresh = window ? (localStorage.getItem("refreshToken") || "") : "";
    const exp = window ? (localStorage.getItem("refreshExpiration") || 0) : 0;
    if (!checkIfExpired(exp)) refreshToken(refresh).then(() => setLoadingInitial(false));
    else push("/login?redirect=" + pathname), setLoadingInitial(false);
  }, []);

  useEffect(() => {
    if (error) setError(null);
    if (pathname === "/login" && user) push("/");
  }, [pathname, user]);

  async function login(username: string, password: string, rememberMe = false) {
    setLoading(true);
    return await authApi
      .login({ username, password, rememberMe })
      .then(({ accessToken, refreshToken }) => {
        setToken(accessToken);
        const expires = jwtDecode<any>(refreshToken).exp;
        rememberMe &&
            window &&
            localStorage.setItem("refreshToken", refreshToken),
            localStorage.setItem("refreshExpiration", expires);
        return true;
      })
      .catch((error) => {
        setError(error);
        return false;
      })
      .finally(() => setLoading(false));
  }

  async function refreshToken(refresh: string) {
    return authApi
      .refresh(refresh, token)
      .then(({ accessToken }) => {
        setToken(accessToken);
        userApi
          .getCurrentUser(accessToken)
          .then((user) => setUser(user))
          .catch((err) => setError(err))
      })
      .catch((_error) => {
        window.localStorage.clear();
        push("/login?loggedOut=true");
      })
  }

  async function fetcher(
    url: string,
    options = {},
    method: AxiosMethod = "get"
  ): Promise<any> {
    const refresh = localStorage.getItem("refreshToken") || "";
    const tokenExp = jwtDecode<any>(token)?.exp || 0;
    const refreshExp = jwtDecode<any>(refresh)?.exp || 0;
    if (!checkIfExpired(refreshExp)) {
      if (checkIfExpired(tokenExp))
        return refreshToken(refresh).then(() =>
          Fetcher(url, {method, options, token})
        );
      else return Fetcher(url, {method, options, token});
    }
  }

  async function logout() {
    await authApi
      .logout(token)
      .then(() => {
        setUser(undefined);
        window && window.localStorage.clear();
        push("/login");
      })
      .catch((error) => setError(error));
  }

  function checkIfExpired(exp: string | number) {
    return +exp - dayjs().unix() < 30;
  }

  const memoedValue = useMemo(
    () => ({
      user,
      loading,
      error,
      login,
      fetcher,
      logout,
    }),
    [user, loading, error]
  );

  return (
    <AuthContext.Provider value={memoedValue}>
      {!loadingInitial && children}
    </AuthContext.Provider>
  );
}
