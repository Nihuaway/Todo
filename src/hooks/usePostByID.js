import { useQuery } from "react-query";
import postService from "@/services/post.service";

export const usePostByID = (id) => {
	return useQuery(['posts', id], () => postService.getById(id), { select: ({ data }) => data, enabled: !!id });
}