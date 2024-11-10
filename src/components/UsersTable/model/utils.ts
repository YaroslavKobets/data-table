import { GENDER } from '../constants'

export type NestedValue = Record<string, any>
export type GenderType = (typeof GENDER)[keyof typeof GENDER]

export const getNestedValue = (obj: NestedValue, path: string[]): unknown => {
	const fullPath = path.flatMap(key => key.split('.'))
	return fullPath.reduce((acc: unknown, key: string) => {
		if (acc && typeof acc === 'object' && key in acc) {
			return (acc as NestedValue)[key]
		}
		return undefined
	}, obj)
}

export const formatBirthday = ({
	birthDate,
	age,
}: {
	birthDate: string
	age: number
}): string => {
	const [year, month, day] = birthDate
		.split('-')
		.map(part => part.padStart(2, '0'))
	const formattedDate = `${day}.${month}.${year}`

	return `${formattedDate} (${age} years old)`
}

export const formatGender = (
	gender: GenderType
): { label: string; icon: string } | 'N/A' => {
	const genderIcons: Record<GenderType, { label: string; icon: string }> = {
		[GENDER.MALE]: { label: 'Male', icon: './icons/male.svg' },
		[GENDER.FEMALE]: { label: 'Female', icon: './icons/female.svg' },
	}
	return genderIcons[gender] || 'N/A'
}

export const formatPhoneNumber = (phoneNumber: string): string => {
	const cleanedNumber = phoneNumber.replace(/\D/g, '')
	return cleanedNumber.length === 10
		? `(${cleanedNumber.slice(0, 3)}) ${cleanedNumber.slice(
				3,
				6
		  )}-${cleanedNumber.slice(6)}`
		: 'Invalid number'
}

export const formatGeneralInfo = (data: NestedValue): string => {
	const keys: Record<string, string> = {
		bloodGroup: 'Bloodgroup',
		height: 'Height',
		weight: 'Weight',
		'hair.color': 'Hair color',
	}
	return Object.entries(keys)
		.map(
			([key, label]) =>
				`${label}: ${getNestedValue(data, key.split('.')) || 'N/A'}`
		)
		.join('; ')
}

export const formatAddress = (
	data: NestedValue,
	accessorKeys: string[]
): string => {
	const addressComponents = accessorKeys.map(
		key => getNestedValue(data, key.split('.')) || 'N/A'
	)
	return addressComponents.join(', ')
}

export const formatFullName = (
	data: NestedValue
): { image: string; fullName: string } => {
	const image =
		(getNestedValue(data, ['image']) as string) || './icons/loading.svg'
	const firstName = (getNestedValue(data, ['firstName']) as string) || 'N/A'
	const lastName = (getNestedValue(data, ['lastName']) as string) || 'N/A'
	return {
		image,
		fullName: `${firstName} ${lastName}`,
	}
}
