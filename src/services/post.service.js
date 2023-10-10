import axios from "axios"

class PostService {
	URL = 'https://6520fe01a4199548356cb166.mockapi.io/posts'

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
}

export default new PostService()