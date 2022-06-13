import axios, { AxiosResponse } from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

const Axios = axios.create({
  baseURL,
  withCredentials: true,
});

const fetcher = {
  get: <R = any>(url: string): Promise<R> => {
    return Axios.get(url).then(handleResponse);
  },
  delete: <R = any>(url: string): Promise<R> => {
    return Axios.delete(url).then(handleResponse);
  },
  post: <R = any, T = unknown>(url: string, data: T): Promise<R> => {
    return Axios.post(url, data).then(handleResponse);
  },
  put: <R = any, T = unknown>(url: string, data: T): Promise<R> => {
    return Axios.put(url, data).then(handleResponse);
  },
  patch: <R = any, T = unknown>(url: string, data: T): Promise<R> => {
    return Axios.patch(url, data).then(handleResponse);
  },
  default: Axios,
};

function handleResponse(res: AxiosResponse) {
  const token = res.headers["x-access-token"];
  if (token) Axios.defaults.headers.common["authorization"] = token;
  if (res.status == 401) localStorage.removeItem("isLoggedIn");
  return res.data;
}

export default fetcher;
