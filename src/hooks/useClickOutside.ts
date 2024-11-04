import { useEffect, useRef } from 'react'

type UseClickOutside = (
	isActive: boolean,
	setIsActive: (active: boolean) => void,
	ignoreRef?: React.RefObject<HTMLElement>
) => React.RefObject<HTMLDivElement>

export const useClickOutside: UseClickOutside = (
	isActive,
	setIsActive,
	ignoreRef
) => {
	const ref = useRef<HTMLDivElement>(null)

	const handleClickOutside = (event: MouseEvent) => {
		if (
			ref.current &&
			!ref.current.contains(event.target as Node) &&
			!(ignoreRef?.current && ignoreRef.current.contains(event.target as Node))
		) {
			setIsActive(false)
		}
	}

	useEffect(() => {
		if (isActive) {
			document.addEventListener('mousedown', handleClickOutside)
		} else {
			document.removeEventListener('mousedown', handleClickOutside)
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [isActive])

	return ref
}
