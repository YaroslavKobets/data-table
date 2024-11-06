import React from 'react'
import { UiTextField } from './UiTextField'

interface UiPaginationProps {
	currentPage: number
	totalPages: number
	onPageChange: (page: number) => void
	totalUsers: number
	itemsPerPage: number
}

export function UiPagination({
	currentPage,
	totalPages,
	onPageChange,
	totalUsers,
	itemsPerPage,
}: UiPaginationProps) {
	const handlePreviousPage = () => {
		if (currentPage > 1) {
			onPageChange(currentPage - 1)
		}
	}

	const handleNextPage = () => {
		if (currentPage < totalPages) {
			onPageChange(currentPage + 1)
		}
	}

	const handleFirstPage = () => {
		onPageChange(1)
	}

	const handleLastPage = () => {
		onPageChange(totalPages)
	}

	const handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		const pageNumber = Number(value)

		if (!isNaN(pageNumber) && pageNumber > 0 && pageNumber <= totalPages) {
			onPageChange(pageNumber)
		}
	}

	const startUserIndex = (currentPage - 1) * itemsPerPage + 1
	const endUserIndex = Math.min(currentPage * itemsPerPage, totalUsers)

	return (
		<div className='flex items-center gap-3'>
			<div className='text-10 leading-12 text-tsecondary uppercase font-semibold'>
				{startUserIndex} - {endUserIndex} of {totalUsers}
			</div>
			<div className='flex items-center gap-[2px] select-none'>
				<button
					onClick={handleFirstPage}
					className='w-8 h-8 flex justify-center items-center rounded-lg disabled:opacity-50 disabled:pointer-events-none duration-200 hover:bg-bgprimary'
					disabled={currentPage === 1 || totalPages === 1}
				>
					<img
						className='rotate-180 w-5 h-5'
						src='./icons/arrow-end.svg'
						alt='First Page'
					/>
				</button>
				<button
					onClick={handlePreviousPage}
					className='w-8 h-8 flex justify-center items-center rounded-lg disabled:opacity-50 disabled:pointer-events-none duration-200 hover:bg-bgprimary'
					disabled={currentPage === 1 || totalPages === 1}
				>
					<img
						className='rotate-180 w-5 h-5'
						src='./icons/arrow-right.svg'
						alt='Previous Page'
					/>
				</button>
				<UiTextField
					className='max-w-16'
					type='number'
					value={currentPage}
					onChange={handlePageInputChange}
					aria-label='Enter page number'
					disabled={totalPages === 1}
				/>
				<button
					onClick={handleNextPage}
					className='w-8 h-8 flex justify-center items-center rounded-lg disabled:opacity-50 disabled:pointer-events-none duration-200 hover:bg-bgprimary'
					disabled={currentPage === totalPages || totalPages === 1}
				>
					<img
						className='w-5 h-5'
						src='./icons/arrow-right.svg'
						alt='Next Page'
					/>
				</button>
				<button
					onClick={handleLastPage}
					className='w-8 h-8 flex justify-center items-center rounded-lg disabled:opacity-50 disabled:pointer-events-none duration-200 hover:bg-bgprimary'
					disabled={currentPage === totalPages || totalPages === 1}
				>
					<img
						className='w-5 h-5'
						src='./icons/arrow-end.svg'
						alt='Last Page'
					/>
				</button>
			</div>
		</div>
	)
}
