import { AxiosError } from "axios";
import { $host } from "../http";
import { IUser } from "../types/user";

export const getUser = async (id: number): Promise<IUser> => {
  try {
    const { data } = await $host.get(`/users/${id}`);

    if (data instanceof AxiosError) {
      throw new AxiosError("Server Error ! Sumsing was wrong! ");
    }

    return {
      username: data.username,
      id: data.id,
      tel: data.phone,
      email: data.email,
    };
  } catch (error) {
    throw error;
  }
};
