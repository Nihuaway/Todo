import { useQuery } from "react-query";
import postService from "@/services/post.service";

export const usePosts = () => {
	return useQuery(['posts'], postService.getAll, { select: ({ data }) => data });
}



