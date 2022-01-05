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

export interface IFetcher {
  (
    url: string,
    options?: {
      method?: AxiosMethod;
      data?: Obj;
      config?: Obj,
      token?: string;
    }
  ): Promise<any>;
}

const fetcher: IFetcher = async (
  url,
  options = { data: {}, config: {}, token: "" }
) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${options.token}`;
  switch(options.method) {
    case "post" || "put" || "patch":
      return axios[options.method](url, options.data, options.config).then(res => res.data);
    default:
      return axios[options.method || "get"](url, options.config).then(res => res.data);
  }
};

export default fetcher;
