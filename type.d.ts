export type Obj = { [key: string]: any }

type User = {
  _id: string;
  username: string;
  name: string;
  role: string;
  avatar: string;
  affiliation: string;
  createdAt: string;
  updatedAt: string;
}

export interface ResOK<Data = unknown> {
  success: true;
  data: Data;
  message: string;
}

export interface ResFail {
  success: false;
  errors: Object;
  message: string;
}

export type AxiosMethod =
  | "get"
  | "delete"
  | "head"
  | "options"
  | "post"
  | "put"
  | "patch";
