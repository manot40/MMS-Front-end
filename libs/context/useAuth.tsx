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
  login: (username: string, password: string, rememberMe: boolean) => void;
  logout: () => void;
  // signUp: (email: string, name: string, password: string) => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({
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
    const refresh = window.sessionStorage.getItem("refreshToken");
    refresh
      ? sessionApi
          .refresh(refresh, token)
          .then(({ accessToken }) => {
            userApi
              .getCurrentUser(accessToken)
              .then((user) => setUser(user))
              .catch((_error) => {})
              .finally(() => setLoadingInitial(false));
          })
          .catch((_error) => {
            window.sessionStorage.clear();
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

  function login(username: string, password: string, rememberMe = false) {
    setLoading(true);
    sessionApi
      .login({ username, password, rememberMe })
      .then(({ accessToken, refreshToken }) => {
        window && window.sessionStorage.setItem("refreshToken", refreshToken);
        setToken(accessToken);
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }

  // function signUp(email: string, name: string, password: string) {
  //   setLoading(true);

  //   userApi
  //     .signUp({ email, name, password })
  //     .then((user) => {
  //       setUser(user);
  //       history.push("/");
  //     })
  //     .catch((error) => setError(error))
  //     .finally(() => setLoading(false));
  // }

  function logout() {
    sessionApi.logout(token).then(() => setUser(undefined));
  }

  const memoedValue = useMemo(
    () => ({
      user,
      token,
      loading,
      error,
      login,
      logout,
      // signUp,
    }),
    [user, loading, error, token]
  );

  return (
    <AuthContext.Provider value={memoedValue}>
      {!loadingInitial && children}
    </AuthContext.Provider>
  );
}

export default function useAuth() {
  return useContext(AuthContext);
}
