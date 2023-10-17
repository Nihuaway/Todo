import { useQuery } from "react-query";
import postService from "@/services/task.service";

export const useTaskById = (id) => {
	return useQuery(['tasks', id], () => postService.getById(id), { select: ({ data }) => data, enabled: !!id });
}