'use client'
import React from 'react'
import Image from 'next/image'
import { UserButton } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'

function Header() {
    const path=usePathname();
  return (
    <div className='flex flex-row items-center p-6 justify-between bg-secondary shadow-md'>
        <Image src={'./logo.svg'}
        width={160}
        height={100}
        alt="logo"
        />
        <ul className='hidden md:flex gap-6'>
            <li className={`hover:text-orange-600 hover:font-bold transition-all cursor-pointer ${path=='/dashboard' && 'text-orange-400 font-bold'}`}>DashBoard</li>
            <li className={`hover:text-orange-600 hover:font-bold transition-all cursor-pointer ${path=='/dashboard/Questions' && 'text-orange-400 font-bold'}`}>Questions</li>
            <li className={`hover:text-orange-600 hover:font-bold transition-all cursor-pointer ${path=='/dashboard/Upgrade' && 'text-orange-400 font-bold'}`}>Upgrade</li>
            <li className={`hover:text-orange-600 hover:font-bold transition-all cursor-pointer ${path=='/dashboard/How-it-Works' && 'text-orange-400 font-bold'}`}>How it Works</li>

        </ul>
        <UserButton></UserButton>

    </div>
  )
}

export default Header