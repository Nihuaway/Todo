import postService from "@/services/post.service"
import { useMutation, useQueryClient } from "react-query"

export const useAddPost = () => {
	const queryClient = useQueryClient()

	return useMutation(['create post'], (data) => postService.add(data), {
		onSuccess: () => {
			queryClient.invalidateQueries('posts')
		},
		onError: (err) => {
			alert(err)
		}
	})
}