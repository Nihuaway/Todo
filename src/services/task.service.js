import 'dotenv/config'
import axios from "axios"

class TaskService {
	URL = process.env.NEXT_PUBLIC_NOT_SECRET_MOCKAPI_URL

	getById = async (id) => {
		return await axios.get(`${this.URL}/${id}`)
	}

	getAll = async () => {
		return await axios.get(`${this.URL}`)
	}

	add = async (data) => {
		return await axios.post(`${this.URL}`, data, {
			headers: {
				'Content-Type': 'application/json;charset=utf-8'
			}
		})
	}

	complete = async (id) => {
		return await axios.put(`${this.URL}/${id}`, { isCompleted: true })
	}

	revert = async (id) => {
		return await axios.put(`${this.URL}/${id}`, { isCompleted: false })
	}

	remove = async (id) => {
		return await axios.delete(`${this.URL}/${id}`)
	}
}

export default new TaskService()