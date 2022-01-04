import axios from "axios";
import { Obj } from "libs/type";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

type AxiosMethod =
  | "get"
  | "delete"
  | "head"
  | "options"
  | "post"
  | "put"
  | "patch";

interface Fetcher {
  (
    url: string,
    options: Obj,
    config: {
      method?: AxiosMethod;
      data?: Obj;
      token?: string;
    }
  ): Promise<any>;
}

const fetcher: Fetcher = async (
  url,
  options,
  { method: type = "get", data = {}, token = "" }
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
