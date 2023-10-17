import taskService from "@/services/task.service"
import { useMutation, useQuery, useQueryClient } from "react-query"

export const useCompleteTask = (id) => {

	const queryClient = useQueryClient()

	return useMutation(['complete', id], () => taskService.complete(id), {
		onSuccess: () => {
			queryClient.invalidateQueries('tasks')
		},
		onError: (err) => {
			alert(err)
		}
	})

}