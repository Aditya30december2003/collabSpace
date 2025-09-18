'use client'
import axios from 'axios'
import React from 'react'
import { useState } from 'react'

const page = () => {
  const [token , setToken] = useState("")
  const [verified , setVerified] = useState(false)
  const [error , setError] = useState(false)

  const verifyToken = async()=>{
    try {
        await axios.post('/api/users/verifyEmail',{token})
    setVerified(true)
    } catch (error) {
        setError(true)
    }
  }
  return (
    <div className='flex flex-col gap-2'>
        <div>Click to get verified</div>
        <button className='bg-white text-black cursor-pointer w-[25%] mx-auto font-bold'>Verify</button>
    </div>
  )
}

export default page
