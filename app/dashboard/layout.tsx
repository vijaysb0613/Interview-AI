import React, { ReactNode } from 'react'
import Header from './_components/Header'
function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div>
    <Header />
    <div className='mx-5 md:mx-20 lg:mx-36'>
    {children}
    </div>
    </div>
  )
}

export default DashboardLayout
