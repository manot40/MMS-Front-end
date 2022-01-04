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
    {},
    { type: "post", data: loginInfo }
  );
  return response;
};

export const logout = async (token: string): Promise<void> => {
  await fetcher("/user/logout", {}, { type: "delete", token });
};

export const refresh = async (refreshToken: string, token?: string): Promise<Token> => {
  const response = await fetcher(
    "/auth/refresh",
    {},
    { type: "post", token, data: { refreshToken } }
  );
  return response;
};
