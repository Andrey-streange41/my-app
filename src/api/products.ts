import { AxiosError } from "axios";
import { $host } from "../http";
import { IProduct } from "../types/products";

export const getProducts = async (query: any) : Promise<IProduct[]> => {
  try {
    const { data } = await $host.get(
      `/products` +
        (query.category.replace("all", "") ? `/category/${query.category}` : "")
    );

    if (data instanceof AxiosError) {
      throw new AxiosError("Server Error ! Sumsing was wrong! ");
    }

    return data.rows ? data.rows : data;
  } catch (error) {
    throw error;
  }
};

export const getProductById = async (id: number) => {
  try {
    const { data } = await $host.get("/products/" + id);
    
    return data;
  } catch (error) {
    return error;
  }
};
