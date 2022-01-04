/* eslint-disable react-hooks/exhaustive-deps */
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { User } from "libs/type";
import { useRouter } from "next/router";
import * as userApi from "../apis/user";
import * as sessionApi from "../apis/session";

interface AuthContextType {
  user?: User;
  token: string;
  loading: boolean;
  error?: any;
  login: (username: string, password: string, rememberMe: boolean) => Promise<boolean>;
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
    const refresh = window.localStorage.getItem("refreshToken");
    refresh
      ? sessionApi
          .refresh(refresh, token)
          .then(({ accessToken }) => {
            setToken(accessToken);
            userApi
              .getCurrentUser(accessToken)
              .then((user) => setUser(user))
              .catch((err) => setError(err))
              .finally(() => setLoadingInitial(false));
          })
          .catch((_error) => {
            window.localStorage.clear();
            push("/login?loggedOut=true");
            setLoadingInitial(false);
          })
      : pathname !== "/login" && push("/login?redirect=" + pathname),
      setLoadingInitial(false);
  }, []);

  useEffect(() => {
    if (error) setError(null);
    if (pathname === "/login" && user) push("/");
  }, [pathname, user]);

  async function login(username: string, password: string, rememberMe = false) {
    setLoading(true);
    return await sessionApi
      .login({ username, password, rememberMe })
      .then(({ accessToken, refreshToken }) => {
        window && window.localStorage.setItem("refreshToken", refreshToken);
        setToken(accessToken);
        return true;
      })
      .catch((error) => {
        setError(error);
        return false;
      })
      .finally(() => setLoading(false));
  }

  async function logout() {
    await sessionApi
      .logout(token)
      .then(() => {
        setUser(undefined);
        window && window.localStorage.clear();
        push("/login");
      })
      .catch((error) => setError(error));
  }

  const memoedValue = useMemo(
    () => ({
      user,
      token,
      loading,
      error,
      login,
      logout,
    }),
    [user, loading, error, token]
  );

  return (
    <AuthContext.Provider value={memoedValue}>
      {!loadingInitial && children}
    </AuthContext.Provider>
  );
}
