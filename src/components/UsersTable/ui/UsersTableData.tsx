import clsx from 'clsx'
import { UsersTableCell } from '.'
import { Column, User } from '../types'

interface UsersTableDataProps {
	users: User[]
	columns: Column[]
	tableSettings?: React.ReactNode
}

export function UsersTableData({
	columns,
	users,
	tableSettings,
}: UsersTableDataProps) {
	return (
		<table className='overflow-scroll border-collapse table-row'>
			<thead className='sticky top-0 z-20'>
				<tr>
					{columns.map((column, index) => (
						<th
							key={`${String(column.header)}-${index}`}
							className={clsx(
								'w-full bg-bgprimary whitespace-nowrap px-2 py-[6px] text-10 leading-12 text-tsecondary uppercase font-semibold tracking-wide text-left border-stroke border-l last:pr-9',
								index === 0 && 'sticky left-0 z-20 border-l-0 min-w-[180px]',
								columns.at(-2) && 'pr-11'
							)}
						>
							{column.header.split('_').join(' ').toLowerCase()}
							{index === 1 && (
								<div className='absolute -bottom-[1px] right-0 h-[1px] w-full bg-stroke'></div>
							)}
							{index === 0 && (
								<div className='absolute top-0 -right-[1px] h-full w-[1px] bg-stroke'></div>
							)}
						</th>
					))}
					<th className='sticky right-0 p-0'>{tableSettings}</th>
				</tr>
			</thead>
			<tbody>
				{users.map(user => (
					<tr key={user.id}>
						{columns.map((column, index) => (
							<UsersTableCell
								key={`${column.header}-${index}`}
								userData={user}
								columnData={column}
								index={index}
							/>
						))}
					</tr>
				))}
			</tbody>
		</table>
	)
}
