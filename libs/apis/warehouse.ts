import fetcher from "libs/utils/fetcher";

export const getWarehouseList = async (token: string): Promise<any> => {
  const response = await fetcher(`/warehouse`, { token }).then(
    (res) => res.data
  );
  return response;
};
