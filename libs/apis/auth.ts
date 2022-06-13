import axios from "libs/utils/axiosFetcher";

interface LoginInfo {
  username: string;
  password: string;
  rememberMe: boolean;
}

export type Token = {
  accessToken: string;
  refreshToken: string;
};

export const login = async (loginInfo: LoginInfo) => {
  return await axios.post("/auth/login", loginInfo).then(res => res.data);
};

export const logout = async () => {
  return await axios.delete("/auth/logout");
};
