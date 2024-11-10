import { Column } from './types'

export const HEADERS = {
	FULL_NAME: 'Full Name',
	BIRTHDAY: 'Birthday',
	GENDER: 'Gender',
	EMAIL: 'Email',
	PHONE: 'Phone',
	USERNAME: 'Username',
	GENERAL_INFO: 'General info',
	IP: 'IP',
	MAC_IP: 'Mac ip',
	ADDRESS: 'Address',
	BANK: 'Bank',
	UNIVERSITY: 'University',
	COMPANY: 'Company',
	EIN: 'EIN',
	SSN: 'SSN',
} as const

export const COLUMNS: Column[] = [
	{
		accessorKey: ['image', 'firstName', 'lastName'],
		header: HEADERS.FULL_NAME,
		size: 180,
		lock: true,
	},
	{
		accessorKey: ['birthDate', 'age'],
		header: HEADERS.BIRTHDAY,
		size: 170,
	},
	{
		accessorKey: ['gender'],
		header: HEADERS.GENDER,
		size: 80,
	},
	{
		accessorKey: ['email'],
		header: HEADERS.EMAIL,
		size: 180,
		lock: true,
	},
	{
		accessorKey: ['phone'],
		header: HEADERS.PHONE,
		size: 130,
	},
	{
		accessorKey: ['username'],
		header: HEADERS.USERNAME,
		size: 130,
		lock: true,
	},
	{
		accessorKey: ['bloodGroup', 'height', 'weight', 'hair.color'],
		header: HEADERS.GENERAL_INFO,
		size: 352,
	},
	{
		accessorKey: ['ip'],
		header: HEADERS.IP,
		size: 112,
	},
	{
		accessorKey: ['macAddress'],
		header: HEADERS.MAC_IP,
		size: 112,
	},
	{
		accessorKey: [
			'address.address',
			'address.city',
			'address.state',
			'address.postalCode',
		],
		header: HEADERS.ADDRESS,
		size: 322,
	},
	{
		accessorKey: ['bank.cardType'],
		header: HEADERS.BANK,
		size: 100,
	},
	{
		accessorKey: ['university'],
		header: HEADERS.UNIVERSITY,
		size: 100,
	},
	{
		accessorKey: ['company.name'],
		header: HEADERS.COMPANY,
		size: 168,
	},
	{
		accessorKey: ['ein'],
		header: HEADERS.EIN,
		size: 112,
	},
	{
		accessorKey: ['ssn'],
		header: HEADERS.SSN,
		size: 112,
	},
]

export const ITEMS_PER_VIEW: number[] = [10, 20, 50]

export const GENDER = {
	MALE: 'male',
	FEMALE: 'female',
} as const
