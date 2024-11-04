import { UiDropDownSelect, UiPagination } from '../../UI'
import { ITEMS_PER_VIEW } from '../constants'

interface UsersTablePaginationProps {
	currentPage: number
	totalPages: number
	itemsPerPage: number
	onPageChange: (page: number) => void
	onItemsPerPageChange: (itemsPerPage: number) => void
	totalUsers: number
}

export function UsersTablePagination({
	currentPage,
	totalPages,
	itemsPerPage,
	onPageChange,
	onItemsPerPageChange,
	totalUsers,
}: UsersTablePaginationProps) {
	const handleItemsPerPageChange = (count: string) => {
		onItemsPerPageChange(Number(count))
	}

	return (
		<div className='flex items-center justify-between gap-4 p-2'>
			<div className='flex items-center gap-3'>
				<UiDropDownSelect
					options={ITEMS_PER_VIEW.map(String)}
					selected={String(itemsPerPage)}
					setSelected={handleItemsPerPageChange}
				/>
				<span className='uppercase text-10 font-semibold text-tsecondary'>
					Items per page
				</span>
			</div>
			<UiPagination
				currentPage={currentPage}
				totalPages={totalPages}
				onPageChange={onPageChange}
				totalUsers={totalUsers}
				itemsPerPage={itemsPerPage}
			/>
		</div>
	)
}
