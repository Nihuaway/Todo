import { useQuery } from "react-query";
import postService from "@/services/task.service";

export const useGetTasks = () => {
	return useQuery(['tasks'], postService.getAll, { select: ({ data }) => data });
}



