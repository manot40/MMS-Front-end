import { User } from "libs/type";
import fetcher from "libs/utils/fetcher";

interface IUserRegister {
  username: string;
  name: string;
  role: string;
  password: string;
  affiliation: string;
}

export const getCurrentUser = async (token: string): Promise<User> => {
  const { data } = await fetcher("/user/me", {}, {type: "get", token});
  return data;
}

export const register = async (user: IUserRegister, token: string): Promise<User> => {
  const { data } = await fetcher("/user/register", {}, {type: "post", data: user, token});
  return data;
}
