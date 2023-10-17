import taskService from "@/services/task.service"
import { useMutation, useQueryClient } from "react-query"

export const useRemoveTask = (id) => {
	const client = useQueryClient()
	return useMutation(['remove', id], () => taskService.remove(id), {
		onSuccess: () => {
			client.invalidateQueries('tasks')
		},
		onError: (err) => {
			alert(err)
		}
	})
}