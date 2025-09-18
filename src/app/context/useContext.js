'use client'
import { useState, useEffect,createContext, useContext } from "react"
import axios from "axios"

const UserContext = createContext()
export const UserProvider=({children})=>{
  
  const [profile , setProfile] = useState({})
  const [loading , setLoading] = useState(true)

useEffect(()=>{
const fetchUser=async()=>{
  try {
    console.log("Hwllo")
    const response = await axios.post("/api/users/profile")
    console.log(response)
    setProfile(response.data.data)
  } catch (error) {
    console.log(error)
  }
  finally{
    setLoading(false)
  }
}
fetchUser()
},[])

  return(
 <UserContext.Provider value={{profile , loading , setLoading}}>
    {children}
  </UserContext.Provider>
  )
  
}
 export const UseUser=()=>{
  const context = useContext(UserContext)
  if(!context){
    console.log("Error")
  }
  return context
 }