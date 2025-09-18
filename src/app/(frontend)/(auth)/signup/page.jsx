'use client'
import { useEffect, useState } from "react"
import axios from "axios"
import {toast} from 'react-hot-toast'
import { useRouter } from "next/navigation"
export default function SignUp() {
  const router = useRouter()
  const [user , setUser] = useState({
    email:"",
    name:"",
    password:""
  })

  const [buttonDisabled , setButtonDisabled] = useState(true)
  const [loading , setLoading] = useState(false)

  const onSignup=async()=>{
    try {
      setLoading(true)
      const response = await axios.post("/api/users/signup",user)
      console.log("Signup success", response.data)
      router.push("/login")

    } catch (error) {
      console.log("Signup failed")
      toast.error(error.message)
    }
  }

  useEffect(()=>{
   if(user.email.length>0 && user.password.length>0 && user.name.length){
    setButtonDisabled(false)
   }
  }),[user]

  if(loading){
    return(
      <div className="text-white font-bold">loading...</div>
    )
  }
  return (
    <div className="container mx-auto p-4 max-w-[750px]">
    <div className="bg-white shadow-md rounded-lg p-8">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Create Account
      </h2>
      
      <form className="space-y-6">
        {/* Name Field */}
        <div>
          <label 
            htmlFor="name" 
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out text-black"
            placeholder="Enter your full name"
            value={user.name}
            onChange={(e)=>setUser({...user , name:e.target.value})} // uuser destructured -> name , email , password
          />
        </div>

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
            minLength={8}
            className="w-full px-3 py-2 border text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
            placeholder="Enter your password (min 8 characters)"
            value={user.password}
            onChange={(e)=>setUser({...user , password:e.target.value})}
          />
        </div>

        {/* Submit Button */}
        <div>
          {buttonDisabled?<button
            type="submit"
            className="w-full bg-blue-200 text-white py-2 px-4 rounded-md hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out font-medium cursor-pointer"
          >
            No signup
          </button> :<button
            onClick={onSignup}
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out font-medium cursor-pointer"
          >
            Create Account
          </button>}
        </div>
      </form>

      {/* Login Link */}
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{' '}
          <a 
            href="/login" 
            className="text-blue-600 hover:text-blue-500 font-medium"
          >
            login here
          </a>
        </p>
      </div>
    </div>
  </div>
  )
}