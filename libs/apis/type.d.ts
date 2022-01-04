export type Obj = { [key: string]: string }

export interface BaseResponse<Data extends Obj> {
  success: boolean;
  data?: Data;
  errors?: Obj;
  message: string;
}
