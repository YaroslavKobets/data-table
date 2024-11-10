import axios from 'axios'
import { UsersResponse } from '../components/UsersTable/types'
export default class UserService {
	static async getAll(
		page: number = 1,
		limit: number = 10
	): Promise<UsersResponse> {
		const response = await axios.get<UsersResponse>(
			`https://dummyjson.com/users?limit=${limit}&skip=${(page - 1) * limit}`
		)
		return response.data
	}

	static async searchUsers(
		query: string,
		page: number = 1,
		limit: number = 10
	): Promise<UsersResponse> {
		const response = await axios.get<UsersResponse>(
			`https://dummyjson.com/users/search?q=${query}&limit=${limit}&skip=${
				(page - 1) * limit
			}`
		)
		return response.data
	}
}
