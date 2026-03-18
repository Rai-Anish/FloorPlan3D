import React from 'react'
import { Outlet } from 'react-router'

const Layout = () => {
  return (
    <div className='flex items-center justify-center w-full h-full'>
        <Outlet />
    </div>
  )
}

export default Layout