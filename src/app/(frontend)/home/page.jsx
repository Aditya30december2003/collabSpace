'use client'

import Link from "next/link"
import {useState , useEffect} from 'react'
import axios from "axios"
import {UseUser} from '../../context/useContext'
import { Save } from 'lucide-react';

export default function CollabSpace() {
  const {profile , loading} = UseUser()
  const [ideas , setIdeas] = useState([])
  const [users , setUsers] = useState([])
  const [loadingIdea , setLoadingIdea] = useState(false)

  const fetchUsers=async()=>{
    try {
      const response = await axios.get('/api/users')
      setUsers(response.data)
    } catch (error) {
      console.log("Error"+error)
    }
  }

  const fetchIdeas=async()=>{
    try {
      setLoadingIdea(true)
      const response = await axios.get(`/api/ideas?userId=${profile._id}`)
      console.log(response.data)
      setIdeas(response.data)
    } catch (error) {
      console.log("Error"+error)
    }
    finally{
      setLoadingIdea(false)
    }
  }
  
useEffect(()=>{
  fetchUsers()
},[])

useEffect(()=>{
  if (profile && profile._id) {
    fetchIdeas()
  }
},[profile])

  if (loading && loadingIdea) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-sky-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-500 mx-auto mb-4"></div>
          <p className="text-zinc-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-sky-50 selection:bg-sky-200/40">
      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* top bar */}
        <div className="mb-10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-500" />
            <span className="text-lg font-semibold tracking-tight text-zinc-900">collabspace</span>
          </div>

          <div className="flex items-center gap-3">
            <Link
            href='/profile'
              type="button"
              className="cursor-pointer rounded-xl bg-white/70 px-4 py-2 text-sm text-zinc-800 shadow-sm backdrop-blur transition hover:bg-white hover:shadow-md active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
             
            >
              {profile?.email}
            </Link>

            <Link
            href='/createIdea'
              type="button"
              aria-label="Create idea"
            >
              <button className="cursor-pointer h-10 w-10 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-500 text-white text-xl leading-none shadow-sm transition hover:shadow-lg active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400">
              +
              </button>
            </Link>

            <Link
            href='/savedIdeas'
              type="button"
              aria-label="Create idea"
            >
              <button className="cursor-pointer p-[0.53rem] rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-500 text-white text-xl leading-none shadow-sm transition hover:shadow-lg active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400">
              <Save />
              </button>
            </Link>
          </div>
        </div>

        {/* body */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <section>
            <h2 className="mb-4 text-3xl font-semibold tracking-tight text-zinc-900">My Ideas</h2>
            <div className="space-y-4">
              {ideas.length>0?ideas.map((it, i) => (
                <article
                  key={i}
                  className="group cursor-pointer rounded-2xl bg-white/70 p-5 shadow-sm backdrop-blur transition hover:bg-white hover:shadow-lg"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-medium text-zinc-900">{it.title}</h3>
                      <p className="mt-0.5 text-sm text-zinc-600">{it.blurb}</p>
                    </div>
                    <Link href={`/IdeaPage/${it._id}`}>
                    <span className="mt-0.5 inline-flex h-8 items-center justify-center rounded-xl bg-zinc-900/5 px-3 text-xs font-medium text-zinc-700 transition group-hover:bg-zinc-900/10">
                      Open
                    </span>
                    </Link>
                  </div>
                </article>
              )):<>
              <div>No Ideas available</div>
              </>}
            </div>
          </section>

          {/* All users */}
          <section>
            <h2 className="mb-4 text-3xl font-semibold tracking-tight text-zinc-900">All users</h2>
            <div className="overflow-hidden rounded-2xl bg-white/70 shadow-sm backdrop-blur">
              {users.length>0 ?users.map((u, i) => (
                <Link href={`/profile/${u._id}`}
                  key={i}
                  className="flex cursor-pointer items-center gap-3 p-4 transition hover:bg-white"
                >
                  <div className="relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900/5 text-sm font-semibold text-zinc-700">
                    {u.name[0]}
                    <span className="absolute -inset-0.5 -z-10 rounded-full bg-gradient-to-tr from-sky-500/0 to-indigo-500/0 blur transition group-hover/from-sky-500/10 group-hover/to-indigo-500/10" />
                  </div>
                  <div className="truncate">
                    <div className="truncate text-sm font-medium text-zinc-900">{u.name}</div>
                    <div className="truncate text-xs text-zinc-600">{u.email}</div>
                  </div>
                </Link>
              )) : <>
              <div>No users in this site</div>
              </>}
            </div>
          </section>
        </div>

        {/* subtle footer */}
      </div>
    </div>
  )
}
