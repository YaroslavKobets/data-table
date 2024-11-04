import React from 'react'

interface UsersTableLayoutProps {
	search: React.ReactNode
	table: React.ReactNode
	pagination: React.ReactNode
}

export function UsersTableLayout({
	search,
	table,
	pagination,
}: UsersTableLayoutProps) {
	return (
		<div className='flex flex-col p-8 my-auto gap-3 text-13 leading-20 text-tprimary min-w-[1024px]'>
			{search}
			<div className='grid grid-rows-[550px_auto] bg-bgprimary rounded-xl'>
				<div className='relative grid border border-stroke rounded-tr-xl rounded-tl-xl border-b-0 overflow-scroll bg-white'>
					{table}
				</div>
				<div className='border border-stroke rounded-br-xl rounded-bl-xl bg-white'>
					{pagination}
				</div>
			</div>
		</div>
	)
}
