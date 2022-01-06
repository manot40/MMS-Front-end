import axios from "axios";
import { AxiosMethod, Obj } from "type";

axios.defaults.baseURL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export type FetcherOptions = {
  method?: AxiosMethod;
  data?: Obj;
  config?: Obj;
  token?: string;
};

async function axiosFetcher<T = unknown>(
  url: string,
  options: FetcherOptions
): Promise<T> {
  axios.defaults.headers.common["Authorization"] = `Bearer ${options.token}`;
  switch (options.method) {
    case "post" || "put" || "patch":
      const res = await axios[options.method](url, options.data, options.config);
      return res.data;
    default:
      const res_1 = await axios[options.method || "get"](url, options.config);
      return res_1.data;
  }
};

export default axiosFetcher;
