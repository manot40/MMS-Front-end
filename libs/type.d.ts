export type Obj = { [key: string]: any }

export type User = {
  _id: string;
  username: string;
  name: string;
  role: string;
  avatar: string;
  affiliation: string;
  createdAt: string;
  updatedAt: string;
}

export interface BaseResponse<Data extends Obj> {
  success: boolean;
  data?: Data;
  errors?: Obj;
  message: string;
}
