import { ExerciseService } from "@/services/exercise.service";
import { useQuery } from "@tanstack/react-query";

export const useExercise = (id: number) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["get exercises", id],
    queryFn: () => ExerciseService.getExerciseById(id),
    select: ({ data }) => data,
  });

  return { data, isLoading, isError };
};
