export type Obj = { [key: string]: any };

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
