export interface Hair {
	color: string
}

export interface Address {
	address: string
	city: string
	state: string
	postalCode: string
}

export interface Company {
	name: string
}

export interface Bank {
	cardType: string
}

export interface User {
	id: number
	firstName: string
	lastName: string
	gender: 'male' | 'female'
	email: string
	phone: string
	username: string
	birthDate: string
	image: string
	bloodGroup: string
	height: number
	weight: number
	hair: Hair
	ip: string
	address: Address
	macAddress: string
	university: string
	bank: Bank
	company: Company
	ein: string
	ssn: string
}

export interface UsersResponse {
	users: User[]
	total: number
	skip: number
	limit: number
}
