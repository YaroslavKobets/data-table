import { HEADERS, GENDER } from '../constants'
import {
	formatAddress,
	formatBirthday,
	formatFullName,
	formatGender,
	formatGeneralInfo,
	formatPhoneNumber,
	GenderType,
	getNestedValue,
} from './utils'
import { User } from '../../../types/userTypes'

interface DataType {
	header: keyof typeof HEADERS
	accessorKey: string[]
}

type FormattedData =
	| string
	| { label: string; icon: string }
	| { image: string; fullName: string }

export const formatCellData = (
	data: User,
	dataType: DataType
): FormattedData => {
	const accessorKey = dataType.accessorKey

	const value = getNestedValue(data, accessorKey)

	switch (dataType.header) {
		case HEADERS.GENDER:
			if (
				typeof value === 'string' &&
				(value === GENDER.MALE || value === GENDER.FEMALE)
			) {
				return formatGender(value as GenderType)
			}
			return 'N/A'
		case HEADERS.BIRTHDAY:
			if (typeof value === 'string') {
				return formatBirthday(value)
			}
			return 'N/A'
		case HEADERS.PHONE:
			if (typeof value === 'string') {
				return formatPhoneNumber(value)
			}
			return 'N/A'
		case HEADERS.GENERAL_INFO:
			return formatGeneralInfo(data)
		case HEADERS.ADDRESS:
			return formatAddress(data, accessorKey)
		case HEADERS.FULL_NAME:
			return formatFullName(data)
		default:
			return value || 'N/A'
	}
}
