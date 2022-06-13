import axios from "libs/utils/axiosFetcher";
import { ResOK, User } from "type";

interface IUserRegister {
  username: string;
  name: string;
  role: string;
  password: string;
  affiliation: string;
}

export const getCurrentUser = async () => {
  return await axios.get("/user/me");
};

export const register = async (
  user: IUserRegister,
  token: string
): Promise<User> => {
  const { data } = await axios.post<ResOK<User>>("/user/register", user);
  return data;
};
