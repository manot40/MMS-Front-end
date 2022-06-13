export type Obj = { [key: string]: any };

export type ChangeType<T extends object, Keys extends keyof T, NewType> = {
  [key in keyof T]: key extends Keys ? NewType : T[key];
};

type User = {
  _id: string;
  username: string;
  name: string;
  role: string;
  avatar: string;
  affiliation: string;
  createdAt: string;
  updatedAt: string;
};

export interface ResOK<Data = unknown> {
  success: true;
  data: Data;
  message: string;
  totalPages?: number;
  itemCount?: number;
}

export interface ResFail {
  success: false;
  errors: Object;
  message: string;
}

export type Pagination<T = unknown> = {
  page?: number | string;
  limit?: number | string;
  order?: "asc" | "desc";
  sort?: keyof T;
};

export type AxiosMethod =
  | "get"
  | "delete"
  | "head"
  | "options"
  | "post"
  | "put"
  | "patch";

export type Item = {
  _id: string;
  name: string;
  sku: string;
  user: {
    _id: string;
    name: string;
  };
  unit: string;
  type: "chemical" | "consumable";
  bufferStock: number;
  warehouse: any[];
  createdAt: string;
  updatedAt: string;
};

export type Transaction = {
  _id: string;
  txId: string;
  name: string;
  user: {
    _id: string;
    name: string;
  };
  status: string;
  type: "in" | "out";
  bufferStock: number;
  description: string;
  warehouse: { _id: string; name: string };
  items: { item: { _id: string; name: string } | string; quantity: number }[];
  txDate: string;
  createdAt: string;
  updatedAt: string;
};
