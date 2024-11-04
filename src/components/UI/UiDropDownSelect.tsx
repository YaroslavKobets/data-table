import clsx from 'clsx'
import { useState } from 'react'
import { useClickOutside } from '../../hooks'
import { ReactNode } from 'react'

interface UiDropDownSelectProps<T extends ReactNode> {
	selected: T
	setSelected: (option: T) => void
	options: T[]
}

export function UiDropDownSelect<T extends ReactNode>({
	selected,
	setSelected,
	options,
}: UiDropDownSelectProps<T>) {
	const [isActive, setIsActive] = useState(false)
	const dropdownRef = useClickOutside(isActive, setIsActive)

	const handleClickOptions = (option: T) => {
		setSelected(option)
		setIsActive(false)
	}

	return (
		<div className='relative' ref={dropdownRef}>
			<button
				onClick={() => setIsActive(!isActive)}
				className='min-w-[88px] border border-stroke bg-bgprimary flex items-center justify-between gap-2 text-tsecondary rounded-lg p-2 pl-3 select-none duration-200 cursor-pointer'
				style={{ borderColor: isActive ? 'var(--accent)' : undefined }}
				aria-label='Select the number of items to view'
			>
				{selected}
				<img
					className={clsx('w-5 h-5', isActive && 'rotate-180')}
					src='./icons/arrow-down.svg'
					alt='arrow'
				/>
			</button>
			{isActive && (
				<div
					className={clsx(
						'absolute left-0 w-full rounded-lg border border-stroke shadow-m py-2 cursor-pointer z-10 bg-white'
					)}
				>
					{options.map((option, i) => (
						<div
							onClick={() => handleClickOptions(option)}
							key={i}
							className='px-4 py-2 hover:text-accent duration-200'
						>
							{option}
						</div>
					))}
				</div>
			)}
		</div>
	)
}
