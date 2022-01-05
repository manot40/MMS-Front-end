import fetcher from "libs/utils/fetcher";

interface LoginInfo {
  username: string;
  password: string;
  rememberMe: boolean;
}

export type Token = {
  accessToken: string;
  refreshToken: string;
};

export const login = async (loginInfo: LoginInfo): Promise<Token> => {
  const response = await fetcher(
    "/auth/login",
    { method: "post", data: loginInfo }
  );
  return response;
};

export const logout = async (token: string): Promise<void> => {
  await fetcher("/auth/logout", {}, { method: "delete", token });
};

export const refresh = async (refreshToken: string, token?: string): Promise<Token> => {
  const response = await fetcher(
    "/auth/refresh",
    { method: "post", token, data: { refreshToken } }
  );
  return response;
};
