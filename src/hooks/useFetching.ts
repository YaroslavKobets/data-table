import { useState } from 'react'

type Callback = (...args: any[]) => Promise<any>

export const useFetching = (
	callback: Callback
): [Function, boolean, boolean] => {
	const [loading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<boolean>(false)

	const fetching = async (...args: any[]) => {
		try {
			setLoading(true)
			await callback(...args)
		} catch (e: any) {
			console.log(e.message)
			setError(true)
		} finally {
			setLoading(false)
		}
	}

	return [fetching, loading, error]
}
