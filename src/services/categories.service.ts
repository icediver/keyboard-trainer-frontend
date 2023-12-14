import { getCategoriesUrl } from "@/config/api.config";
import { axiosClassic } from "@/helpers/api/api.interceptor";
import { ICategory } from "@/types/exercise.interface";

export const CategoriesService = {
  async getCategories() {
    return axiosClassic.get<ICategory[]>(getCategoriesUrl(""));
  },
  async getCategoriesById(id: number) {
    return axiosClassic.get<ICategory>(getCategoriesUrl(`/${id}`));
  },
};
