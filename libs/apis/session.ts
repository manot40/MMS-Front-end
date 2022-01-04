import axios from "axios";

type LoginType = {
  username: string;
  password: string;
}

export type Token = {
  accessToken: string;
  refreshToken: string;
}

export const useLogin = (args: LoginType) => {

}
