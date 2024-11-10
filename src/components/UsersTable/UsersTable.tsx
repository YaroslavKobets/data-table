import { useEffect, useState } from 'react'
import { UiInfoSigns, UiTextField } from '../UI'
import { COLUMNS, ITEMS_PER_VIEW } from './constants'
import {
	UsersTableData,
	UsersTableLayout,
	UsersTablePagination,
	UsersTableSettings,
} from './ui'
import { useFetching } from '../../hooks/useFetching'
import UserService from '../../API/UserService'
import { useDebounce } from '../../hooks/useDebounce'
import { User, UsersResponse } from './types'

export function UsersTable() {
	const [users, setUsers] = useState<User[]>([])
	const [searchUsers, setSearchUsers] = useState<string>('')
	const [currentPage, setCurrentPage] = useState<number>(1)
	const [itemsPerPage, setItemsPerPage] = useState<number>(ITEMS_PER_VIEW[0])
	const [totalUsers, setTotalUsers] = useState<number>(0)
	const [selectedColumns, setSelectedColumns] = useState<string[]>(() => {
		const savedColumns = localStorage.getItem('selectedColumns')
		return savedColumns
			? JSON.parse(savedColumns)
			: COLUMNS.map(column => column.accessorKey.join('.'))
	})

	const debouncedSearchUsers = useDebounce(searchUsers, 300)
	const [fetchUser, loading, error] = useFetching(
		async (page: number, limit: number): Promise<void> => {
			let response: UsersResponse
			if (searchUsers) {
				response = await UserService.searchUsers(searchUsers, page, limit)
			} else {
				response = await UserService.getAll(page, limit)
			}
			setUsers(response.users)
			setTotalUsers(response.total)
		}
	)

	useEffect(() => {
		fetchUser(currentPage, itemsPerPage)
	}, [currentPage, itemsPerPage, debouncedSearchUsers])

	useEffect(() => {
		localStorage.setItem('selectedColumns', JSON.stringify(selectedColumns))
	}, [selectedColumns])

	const handlePageChange = (pageNumber: number): void => {
		setCurrentPage(pageNumber)
	}

	const handleItemsPerPageChange = (count: number): void => {
		setItemsPerPage(Number(count))
		setCurrentPage(1)
	}

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setSearchUsers(e.target.value)
		setCurrentPage(1)
	}

	const handleCheckboxChange = (accessorKey: string[]): void => {
		setSelectedColumns(prevSelected => {
			const accessorString = accessorKey.join('.')
			if (prevSelected.includes(accessorString)) {
				return prevSelected.filter(key => key !== accessorString)
			} else {
				return [...prevSelected, accessorString]
			}
		})
	}

	const getInfoSigns = (): JSX.Element => {
		if (loading) return <UiInfoSigns.Loading />
		if (error) return <UiInfoSigns.Error />
		return <UiInfoSigns.NotFound />
	}
	const columnsToDisplay = COLUMNS.filter(column =>
		selectedColumns.includes(column.accessorKey.join('.'))
	)
	return (
		<UsersTableLayout
			search={
				<UiTextField
					value={searchUsers}
					onChange={handleSearchChange}
					placeholder='Search...'
					label
				/>
			}
			table={
				users.length ? (
					<UsersTableData
						users={users}
						columns={columnsToDisplay}
						tableSettings={
							<UsersTableSettings
								selectedColumns={selectedColumns}
								onCheckboxChange={handleCheckboxChange}
								columns={COLUMNS}
							/>
						}
					/>
				) : (
					<UiInfoSigns>{getInfoSigns()}</UiInfoSigns>
				)
			}
			pagination={
				<UsersTablePagination
					currentPage={currentPage}
					totalPages={Math.ceil(totalUsers / itemsPerPage)}
					itemsPerPage={itemsPerPage}
					onPageChange={handlePageChange}
					totalUsers={totalUsers}
					onItemsPerPageChange={handleItemsPerPageChange}
				/>
			}
		/>
	)
}
