import React, { useState, InputHTMLAttributes } from 'react'
import clsx from 'clsx'

interface UiTextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
	className?: string
	required?: boolean
	errorText?: string
	value: string | number
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
	label?: boolean
}

export function UiTextField({
	className,
	required,
	errorText,
	value,
	onChange,
	label,
	...inputProps
}: UiTextFieldProps) {
	const [isTyping, setIsTyping] = useState(false)

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setIsTyping(e.target.value.length > 0)
		onChange(e)
	}

	return (
		<div className={clsx('grid gap-[2px] relative', className)}>
			{label && (
				<div className='absolute top-2 left-2'>
					<img src='./icons/search.svg' className='w-5 h-5' alt='Search' />
				</div>
			)}
			<input
				className={clsx(
					'w-full py-[7px] font-normal px-3 border border-stroke border-solid bg-bg-primary rounded-lg placeholder:text-tsecondary',
					{
						'pl-9': label,
						'border-error': errorText,
						'focus:border-accent': true,
						'focus:caret-tsecondary': true,
					}
				)}
				required={required}
				type='text'
				value={value}
				onChange={handleInputChange}
				style={{
					caretColor: isTyping ? 'var(--tprimary)' : '',
				}}
				{...inputProps}
			/>
			{errorText && (
				<p className='text-10 leading-12 text-error'>{errorText}</p>
			)}
		</div>
	)
}
