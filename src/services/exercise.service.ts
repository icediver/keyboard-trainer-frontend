import { getExerciseUrl } from "@/config/api.config";
import { IExercise } from "../types/exercise.interface";
import { axiosClassic, instance } from "@/helpers/api/api.interceptor";

export const ExerciseService = {
  async getExercises() {
    return axiosClassic.get<IExercise[]>(getExerciseUrl(""));
  },
  async getExerciseById(id: number) {
    return instance.get<IExercise>(getExerciseUrl(`/${id}`));
  },
};
