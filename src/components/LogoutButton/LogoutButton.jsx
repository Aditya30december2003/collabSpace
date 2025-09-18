import axios from 'axios'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useState } from 'react'
const LogoutButton = () => {
    const route = useRouter()
    const logout=async()=>{
     try {
        await axios.post('/api/users/logout')
        route.push('/login')
     } catch (error) {
        console.log(error)
     }
    }
  return (
    <div onClick={logout} className='bg-red-600 text-white cursor-pointer p-2 font-bold'>
      Logout
    </div>
  )
}

export default LogoutButton
