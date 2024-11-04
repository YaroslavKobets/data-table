import { ReactNode } from 'react'

interface UiInfoSignsProps {
	children?: ReactNode
}

export function UiInfoSigns({ children }: UiInfoSignsProps) {
	return (
		<div className='grid justify-items-center content-center gap-5'>
			{children}
		</div>
	)
}

UiInfoSigns.Loading = function UiInfoSignsLoading() {
	return (
		<>
			<div className='grid place-items-center w-16 h-16 rounded-full border border-black border-solid bg-done'>
				<img
					src='./icons/loading.svg'
					className='w-8 h-8 text-black'
					alt='Loading'
				/>
			</div>
			<p className='text-xl font-semibold'>Loading Page</p>
		</>
	)
}

UiInfoSigns.Error = function UiInfoSignsError() {
	return (
		<>
			<div className='grid place-items-center w-16 h-16 rounded-full border border-black border-solid bg-wrong'>
				<img
					src='./icons/error.svg'
					className='w-8 h-8 text-black'
					alt='Error'
				/>
			</div>
			<p className='text-xl font-semibold'>Oops, something went wrong</p>
		</>
	)
}

UiInfoSigns.NotFound = function UiInfoSignsNotFound() {
	return (
		<>
			<div className='grid place-items-center w-16 h-16 rounded-full border border-black border-solid bg-alert'>
				<img
					src='./icons/not-found.svg'
					className='w-8 h-8 text-black'
					alt='Not Found'
				/>
			</div>
			<p className='text-xl font-semibold'>Not found</p>
		</>
	)
}
