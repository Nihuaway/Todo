import taskService from "@/services/task.service"
import { useMutation, useQueryClient } from "react-query"

export const useRevertTask = (id) => {
	const queryClient = useQueryClient()

	return useMutation(['revert', id], () => taskService.revert(id), {
		onSuccess: () => {
			queryClient.invalidateQueries('tasks')
		},
		onError: (err) => {
			alert(err)
		}
	})
}