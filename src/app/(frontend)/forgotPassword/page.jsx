'use client'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
const page = () => {
    const route = useRouter()
    const [user , setUser] = useState({
        email:"",
        password:"",
        confirmPassword:"",
    })
    const [message , setMessage] = useState({
        type:'',
        text:''
    })
    const [buttonDisabled , setButtonDisabled] = useState(false)
    const [loading , setLoading] = useState(false)

    const validatePassword=()=>{
        if(user.password !== user.confirmPassword){
            setMessage({type:"error" , text:"Passwords do not match"})
               return false
        }
        return true
    }

    const updatePassword=async()=>{
        if(!validatePassword()){
            return
        }
        try {
            setLoading(true)
            setButtonDisabled(true)
            setMessage({ type: '', text: '' })
            const response = await axios.patch('/api/users/forgotPassword',{
                email:user.email,
                password:user.password
            })
            console.log(response)
            setMessage({type:"Success" , text:"Your password has been updated"})
            // Redirect after a short delay to show success message
            setTimeout(() => {
                route.push('/login')
            }, 2000)
        } catch (error) {
            setLoading(false)
            console.log("Error"+error)
        }
    }
    useEffect(()=>{
        validatePassword();
    })
    if(loading){
        return(
            <div className='text-white'>loading...</div>
        )
    }
  return (
    <div>
     <div className="max-w-md w-full rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 shadow-xl">
      <form className="space-y-5" noValidate>

        <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium text-zinc-200">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            autoComplete="new-email"
            className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-3 py-2 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
            value={user.email}
            onChange={(e)=>setUser({...user , email:e.target.value})}
          />
          <label htmlFor="newPassword" className="block text-sm font-medium text-zinc-200">
            New password
          </label>
          <input
            id="newPassword"
            name="newPassword"
            type="password"
            placeholder="At least 8 characters"
            autoComplete="new-password"
            className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-3 py-2 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
            value={user.password}
            onChange={(e)=>setUser({...user , password:e.target.value})}
          />
          <ul className="text-xs text-zinc-500 list-disc pl-5 space-y-1">
            <li>Use 8+ characters</li>
            <li>Include letters & numbers</li>
          </ul>
        </div>

        <div className="space-y-2">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-zinc-200">
            Confirm new password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Re-enter new password"
            autoComplete="new-password"
            className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-3 py-2 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
            value={user.confirmPassword}
            onChange={()=>setUser({...user , confirmPassword:e.target.value})}
          />
        </div>

        {/* Message placeholders (static UI) */}
        {message.text &&(
            <div>{message.text}</div>
        )}

        {validatePassword()?<button
          type="submit"
          onClick={updatePassword}
          className="w-full rounded-xl cursor-pointer bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-60"
        >
          Update Password
        </button>:<button
          type="submit"
          className="w-full rounded-xl cursor-pointer bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-60"
        >Update password disabled</button>}

        <p className="text-[11px] text-zinc-500">
          By updating, you agree to keep your account secure and follow our password policy.
        </p>
      </form>
    </div>
    </div>
  )
}

export default page
