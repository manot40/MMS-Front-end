/* eslint-disable react-hooks/exhaustive-deps */
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { User } from "type";
import { useRouter } from "next/router";
import * as userApi from "../apis/user";
import * as authApi from "../apis/auth";

interface AuthContextType {
  user?: User;
  loading: boolean;
  logout: () => void;
  login: (
    username: string,
    password: string,
    rememberMe: boolean
  ) => Promise<{ success: boolean; message?: string }>;
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
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingInitial, setLoadingInitial] = useState<boolean>(true);

  const { pathname, push } = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    (async () => {
      if (isLoggedIn == "true") {
        const user = await userApi.getCurrentUser();
        setUser(user.data);
      } else {
        setLoadingInitial(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (!user) {
      if (!loadingInitial && pathname != "/login")
        push("/login?redirect=" + pathname);
    } else setLoadingInitial(false);
  }, [user, loadingInitial]);

  async function login(username: string, password: string, rememberMe = false) {
    setLoading(true);
    try {
      const res = await authApi
        .login({ username, password, rememberMe })
        .finally(() => setLoading(false));

      if (res) {
        const user = await userApi.getCurrentUser();
        setUser(user.data);
        localStorage.setItem("isLoggedIn", "true");
        return { success: true, message: res.message };
      }
      return { success: false, message: res.message };
    } catch (e: any) {
      setLoading(false);
      return {
        success: false,
        message: "Server sedang bermasalah, mohon coba lagi nanti",
      };
    }
  }

  function logout() {
    authApi
      .logout()
      .then(() => {
        setUser(undefined);
        window && localStorage.removeItem("isLoggedIn"), push("/login");
      })
      .catch((err) => {
        return err.response.data;
      });
  }

  const memoedValue = useMemo(
    () => ({
      user,
      loading,
      login,
      logout,
    }),
    [user, loading]
  );

  return (
    <AuthContext.Provider value={memoedValue}>
      {!loadingInitial && children}
    </AuthContext.Provider>
  );
}
