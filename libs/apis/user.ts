import axiosFetcher from "libs/utils/axiosFetcher";
import { ResOK, User } from "type";

interface IUserRegister {
  username: string;
  name: string;
  role: string;
  password: string;
  affiliation: string;
}

export const getCurrentUser = async (token: string): Promise<User> => {
  const { data } = await axiosFetcher<ResOK<User>>("/user/me", { token });
  return data;
};

export const register = async (
  user: IUserRegister,
  token: string
): Promise<User> => {
  const { data } = await axiosFetcher<ResOK<User>>("/user/register", {
    method: "post",
    data: user,
    token,
  });
  return data;
};
