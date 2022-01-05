import { Obj } from "libs/type";
import fetcher from "libs/utils/fetcher";

export const getItemList = async (token: string, params: Obj): Promise<any> => {
  const response = await fetcher(`/item`, {
    token,
    config: { params },
  }).then((res) => res.data);
  return response;
};
