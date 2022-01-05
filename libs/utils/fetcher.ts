import axios from "axios";
import { Obj } from "libs/type";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export type AxiosMethod =
  | "get"
  | "delete"
  | "head"
  | "options"
  | "post"
  | "put"
  | "patch";

export interface IFetcher {
  (
    url: string,
    config: {
      method?: AxiosMethod;
      data?: Obj;
      options?: Obj,
      token?: string;
    }
  ): Promise<any>;
}

const fetcher: IFetcher = async (
  url,
  { method: type = "get", data = {}, options = {}, token = "" }
) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  switch(type) {
    case "post" || "put" || "patch":
      return axios[type](url, data, options).then(res => res.data);
    default:
      return axios[type](url, options).then(res => res.data);
  }
};

export default fetcher;
