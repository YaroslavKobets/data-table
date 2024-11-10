import clsx from 'clsx'
import { useState, useRef } from 'react'
import { UiTextField } from '../../UI'
import { useClickOutside } from '../../../hooks'
import { Column } from '../types'

interface UsersTableSettingsProps {
	className?: string
	selectedColumns: string[]
	onCheckboxChange: (accessorKey: string[]) => void
	columns: Column[]
}

export function UsersTableSettings({
	className,
	selectedColumns,
	onCheckboxChange,
	columns,
}: UsersTableSettingsProps) {
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const [searchQuery, setSearchQuery] = useState<string>('')

	const buttonRef = useRef<HTMLButtonElement | null>(null)
	const settingsRef = useClickOutside(isOpen, setIsOpen, buttonRef)

	const toggleDropdown = () => {
		setIsOpen(prev => !prev)
	}

	const sortedColumns = [...columns].sort((a, b) => {
		if (a.lock && !b.lock) return -1
		if (!a.lock && b.lock) return 1
		return 0
	})

	return (
		<div className={clsx(className, 'z-10 h-full flex -ml-9')}>
			<button
				ref={buttonRef}
				className='min-w-9 px-2 py-1 border-l bg-bgprimary'
				onClick={toggleDropdown}
				aria-label='Table Settings'
			>
				<img className='w-4 h-4' src='./icons/gear.svg' alt='' />
			</button>
			{isOpen && (
				<div
					ref={settingsRef}
					className='absolute top-8 right-2 bg-white w-56 min-h-96 rounded-xl border border-stroke border-solid p-2'
				>
					<UiTextField
						placeholder='Search...'
						value={searchQuery}
						onChange={e => setSearchQuery(e.target.value)}
						label
					/>
					<ul className='max-h-80 overflow-y-scroll'>
						{sortedColumns.filter(column =>
							column.header.toLowerCase().includes(searchQuery.toLowerCase())
						).length > 0 ? (
							sortedColumns
								.filter(column =>
									column.header
										.toLowerCase()
										.includes(searchQuery.toLowerCase())
								)
								.map(column => {
									const accessorString = column.accessorKey.join('.')

									return (
										<li
											key={accessorString}
											className={
												column.lock ? 'pointer-events-none opacity-50' : ''
											}
										>
											<label
												className='w-full flex flex-row-reverse justify-between px-2 py-[6px] gap-2 font-normal cursor-pointer hover:text-accent capitalize'
												aria-label={column.header}
											>
												<input
													type='checkbox'
													checked={selectedColumns.includes(accessorString)}
													onChange={() => {
														if (!column.lock) {
															onCheckboxChange(column.accessorKey)
														}
													}}
													disabled={column.lock}
													className='absolute hidden'
												/>
												<img
													className={`w-5 h-5 transition-opacity duration-200 ${
														selectedColumns.includes(accessorString)
															? 'opacity-100'
															: 'opacity-0'
													}`}
													src='./icons/check.svg'
													alt=''
												/>
												{column.header.split('_').join(' ').toLowerCase()}
											</label>
										</li>
									)
								})
						) : (
							<li className='text-left py-3 px-2 font-normal text-tsecondary'>
								Not found...
							</li>
						)}
					</ul>
				</div>
			)}
		</div>
	)
}
