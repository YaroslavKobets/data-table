export const HEADERS = {
	FULL_NAME: 'FULL_NAME',
	BIRTHDAY: 'BIRTHDAY',
	GENDER: 'GENDER',
	EMAIL: 'EMAIL',
	PHONE: 'PHONE',
	USERNAME: 'USERNAME',
	GENERAL_INFO: 'GENERAL_INFO',
	IP: 'IP',
	MAC: 'MAC',
	ADDRESS: 'ADDRESS',
	BANK: 'BANK',
	UNIVERSITY: 'UNIVERSITY',
	COMPANY: 'COMPANY',
	EIN: 'EIN',
	SSN: 'SSN',
} as const

export const DISPLAY_HEADERS = {
	[HEADERS.FULL_NAME]: 'Full Name',
	[HEADERS.BIRTHDAY]: 'Birthday',
	[HEADERS.GENDER]: 'Gender',
	[HEADERS.EMAIL]: 'Email',
	[HEADERS.PHONE]: 'Phone',
	[HEADERS.USERNAME]: 'Username',
	[HEADERS.GENERAL_INFO]: 'General Info',
	[HEADERS.IP]: 'IP',
	[HEADERS.MAC]: 'MAC',
	[HEADERS.ADDRESS]: 'Address',
	[HEADERS.BANK]: 'Bank',
	[HEADERS.UNIVERSITY]: 'University',
	[HEADERS.COMPANY]: 'Company',
	[HEADERS.EIN]: 'EIN',
	[HEADERS.SSN]: 'SSN',
} as const

export type HeaderType = keyof typeof HEADERS

interface Column {
	accessorKey: string[]
	header: HeaderType
	size: number
	lock?: boolean
}

export const COLUMNS: Column[] = [
	{
		accessorKey: ['image', 'firstName', 'lastName'],
		header: HEADERS.FULL_NAME,
		size: 180,
		lock: true,
	},
	{
		accessorKey: ['birthDate'],
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
		header: HEADERS.MAC,
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
	MALE: 'male' as const,
	FEMALE: 'female' as const,
}
