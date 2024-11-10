import clsx from 'clsx'
import { HEADERS } from '../constants'
import { formatCellData } from '../model/formatCellData'
import { Column, User } from '../types'

interface UsersTableCellProps {
	userData: User
	columnData: Column
	index: number
}

export function UsersTableCell({
	userData,
	columnData,
	index,
}: UsersTableCellProps) {
	const formattedData = formatCellData(userData, columnData)

	const cellContent = () => {
		if (
			columnData.header === HEADERS.GENDER &&
			typeof formattedData === 'object' &&
			'icon' in formattedData
		) {
			const { label, icon } = formattedData

			return (
				<div className='flex min-w-max'>
					<img src={icon} alt='Gender sign' className='mr-[2px] w-5 h-5' />
					<span>{label}</span>
				</div>
			)
		}

		if (
			columnData.header === HEADERS.FULL_NAME &&
			typeof formattedData === 'object' &&
			'image' in formattedData
		) {
			const { image, fullName } = formattedData

			return (
				<div className='flex items-center min-w-max'>
					<img
						src={image}
						alt="User's photo"
						className='mr-[6px] w-8 h-8 rounded-full shadow-[0_0_0_1px_inset_rgba(0,0,0,0.34)]'
					/>
					<span className='whitespace-nowrap'>{fullName}</span>
				</div>
			)
		}

		return (
			<div>{typeof formattedData === 'string' ? formattedData : 'N/A'}</div>
		)
	}

	return (
		<td
			className={clsx(
				'border-b border-stroke border-l first:shadow-[0_1px_0_1px_stroke] min-w-max py-3 px-2 whitespace-nowrap h-14',
				index === 0 && 'sticky left-0 bg-white border-l-0 min-w-[180px]'
			)}
		>
			{cellContent()}
			{index === 0 && (
				<div className='absolute top-0 -right-[1px] h-full w-[1px] bg-stroke'></div>
			)}
		</td>
	)
}
