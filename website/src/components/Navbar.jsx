'use client'
import React from 'react'
import { useUser } from '@auth0/nextjs-auth0/client';
import LoggedInMenu from './LoggedInMenu';
import LoginBtn from './LoginBtn';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const { user } = useUser()
    const path = usePathname()

    if (path == '/') {
        return
    }

    return (
        <nav className='p-5'>
            <div className='container mx-auto flex flex-row align-center justify-between'>
                <div className='my-auto'>
                    <h1 className=''><a href="/site">MidFade</a></h1>
                </div>
                <div className='z-10'>
                    {!user && <LoginBtn />}
                    {user && <LoggedInMenu />}
                </div>
            </div>
        </nav>
    )
}
