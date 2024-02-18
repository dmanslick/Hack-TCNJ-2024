import { Menu } from '@headlessui/react'
import React from 'react'

export default function LoggedInMenu() {
    const items = [
        { text: 'Post', href: '/create' },
        { text: 'Feed', href: '/site' },
        { text: 'Logout', href: '/api/auth/logout' },
    ]

    return (
        <Menu>
            <Menu.Button>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                </svg>
            </Menu.Button>
            <Menu.Items className='absolute z-10 right-2 flex flex-col shadow p-2 rounded text-sm gap-y-2 bg-white'>
                {items.map(item => {
                    return (
                        <Menu.Item key={crypto.randomUUID}>
                            {({ active }) => (
                                <a href={item.href} className={`${active && 'bg-zinc-100'} px-3 py-2 rounded`}>{item.text}</a>
                            )}
                        </Menu.Item>
                    )
                })}
            </Menu.Items>
        </Menu >
    )
}
