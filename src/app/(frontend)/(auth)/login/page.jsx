// src/app/login/page.tsx
'use client'
import {useEffect, useState} from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
export default function Login() {
  const router = useRouter()
  const [user , setUser] = useState({
    email:"",
    password:""
  })
  const [buttonDisabled , setButtonDisabled]=useState(true)
  const [loading , setLoading] = useState(false)

  const onLogin=async(e)=>{
    e.preventDefault()
    try {
      setLoading(true)
      const response = await axios.post("/api/users/login",user)
      console.log(response.data)
      router.push("/profile")
    } catch (error) {
      router.push("/login")
      setLoading(false)
      alert("Error"+error.message)
      console.log("Error:"+error)
    }
  }
  useEffect(()=>{
  if(user.email.length>0 && user.password.length>0){
    setButtonDisabled(false)
  }
  },[user])

  if(loading){
    return(
      <div className="text-white font-bold">loading...</div>
    )
  }
  return (
      <div className="container mx-auto p-4 max-w-[750px]">
    <div className="bg-white shadow-md rounded-lg p-8">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Sign In
      </h2>
      
      <form className="space-y-6">
        {/* Email Field */}
        <div>
          <label 
            htmlFor="email" 
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-3 py-2 border text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
            placeholder="Enter your email"
            value={user.email}
            onChange={(e)=>setUser({...user , email:e.target.value})}
          />
        </div>

        {/* Password Field */}
        <div>
          <label 
            htmlFor="password" 
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            className="w-full px-3 py-2 border text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
            placeholder="Enter your password"
            value={user.password}
            onChange={(e)=>setUser({...user , password:e.target.value})}
          />
        </div>

        {/* Forgot Password Link */}
        <div className="text-right">
          <a 
            href="/forgotPassword" 
            className="text-sm text-blue-600 hover:text-blue-500 font-medium"
          >
            Forgot your password?
          </a>
        </div>

        {/* Submit Button */}
        <div>
          {buttonDisabled?<button
            type="submit"
            className="w-full bg-blue-200 text-white py-2 px-4 rounded-md hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out font-medium cursor-pointer"
          >
            No login
          </button> :<button
            onClick={onLogin}
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out font-medium cursor-pointer"
          >
            Login
          </button>}
        </div>
      </form>

      {/* Signup Link */}
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Don't have an account?{' '}
          <a 
            href="/signup" 
            className="text-blue-600 hover:text-blue-500 font-medium"
          >
            Create one here
          </a>
        </p>
      </div>
    </div>
  </div>

  );
}
