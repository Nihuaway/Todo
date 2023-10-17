import postService from "@/services/task.service"
import { useMutation, useQueryClient } from "react-query"

export const useAddTask = () => {
	const queryClient = useQueryClient()

	return useMutation(['create'], (data) => postService.add(data), {
		onSuccess: () => {
			queryClient.invalidateQueries('tasks')
		},
		onError: (err) => {
			alert(err)
		}
	})
}