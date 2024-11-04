import { GENDER } from '../constants'

type NestedValue = any
export type GenderType = (typeof GENDER)[keyof typeof GENDER]

export const getNestedValue = (obj: NestedValue, path: string[]): any => {
	const fullPath = path.flatMap(key => key.split('.'))
	return fullPath.reduce((acc, key) => acc?.[key], obj)
}

export const formatBirthday = (birthDate: string): string => {
	const parts = birthDate.split('-')

	const year = parts[0]
	const month = String(parts[1].padStart(2, '0'))
	const day = String(parts[2].padStart(2, '0'))

	const formattedBirthDate = `${year}-${month}-${day}`

	const date = new Date(formattedBirthDate)

	if (isNaN(date.getTime())) {
		console.error(`Invalid date format: ${birthDate}`)
		return 'Invalid date'
	}

	const formattedDate = `${String(date.getDate()).padStart(2, '0')}.${String(
		date.getMonth() + 1
	).padStart(2, '0')}.${date.getFullYear()}`

	const today = new Date()
	let age = today.getFullYear() - date.getFullYear()

	const hasHadBirthdayThisYear =
		today.getMonth() > date.getMonth() ||
		(today.getMonth() === date.getMonth() && today.getDate() >= date.getDate())

	if (!hasHadBirthdayThisYear) {
		age--
	}

	return `${formattedDate} (${age} years old)`
}

interface GenderInfo {
	label: string
	icon: string
}

export const formatGender = (gender: GenderType): GenderInfo | 'N/A' => {
	const genderIcons: Record<GenderType, GenderInfo> = {
		[GENDER.MALE]: {
			label: 'Male',
			icon: './icons/male.svg',
		},
		[GENDER.FEMALE]: {
			label: 'Female',
			icon: './icons/female.svg',
		},
	}

	return genderIcons[gender] || 'N/A'
}

export const formatPhoneNumber = (phoneNumber: string): string => {
	const match = phoneNumber.match(/\d{3}-\d{3}-\d{4}$/)
	if (!match) return 'Invalid number'

	const cleanedNumber = match[0].replace(/-/g, '')
	const areaCode = cleanedNumber.slice(0, 3)
	const firstPart = cleanedNumber.slice(3, 6)
	const secondPart = cleanedNumber.slice(6)

	return `(${areaCode}) ${firstPart}-${secondPart}`
}

export const formatGeneralInfo = (data: any): string => {
	const getValue = (obj: any, path: string[]): any =>
		path.reduce((acc, key) => acc?.[key], obj)

	const keys: Record<string, string> = {
		bloodGroup: 'Bloodgroup',
		height: 'Height',
		weight: 'Weight',
		'hair.color': 'Hair color',
	}

	return Object.entries(keys)
		.map(
			([key, label]) => `${label} ${getValue(data, key.split('.')) || 'N/A'}`
		)
		.join('; ')
}

export const formatAddress = (data: any, accessorKeys: string[]): string => {
	const addressComponents = accessorKeys.map(
		key => getNestedValue(data, key.split('.')) || 'N/A'
	)

	return `${addressComponents[0]}, ${addressComponents[1]}, ${addressComponents[2]} ${addressComponents[3]}`
}

interface FullNameInfo {
	image: string
	fullName: string
}

export const formatFullName = (data: any): FullNameInfo => {
	const image = getNestedValue(data, ['image']) || './icons/loading.svg'
	const firstName = getNestedValue(data, ['firstName']) || 'N/A'
	const lastName = getNestedValue(data, ['lastName']) || 'N/A'

	return {
		image,
		fullName: `${firstName} ${lastName}`,
	}
}
