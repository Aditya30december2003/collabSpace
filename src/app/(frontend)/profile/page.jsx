'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import LogoutButton from '../../../components/LogoutButton/LogoutButton'
import { useRouter } from 'next/navigation'

const Page = () => {
  const router = useRouter()
  const [profile, setProfile] = useState({ email: '', name: '' })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false

    const fetchUser = async () => {
      try {
        setLoading(true)
        const res = await axios.post('/api/users/profile')
        const data = res?.data?.data || {}
        if (!cancelled) {
          setProfile({ email: data.email || '', name: data.name || '' })
          setError('')
        }
      } catch (err) {
        if (!cancelled) {
          setError('Failed to load profile. Please try again.')
          // Optional: redirect on 401/403
          if (err?.response?.status === 401 || err?.response?.status === 403) {
            router.push('/login')
          }
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchUser()
    return () => {
      cancelled = true
    }
  }, [router])

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/60 backdrop-blur sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold">
            <span className="text-indigo-400">Collab</span>Space
            <span className="ml-2 text-sm text-gray-400">Profile</span>
          </h1>
          <div>
            <LogoutButton />
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-lg">
          <h2 className="text-lg font-semibold mb-4">Your Account</h2>

          {loading ? (
            // Skeleton
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-gray-800 rounded w-1/3" />
              <div className="h-10 bg-gray-800 rounded w-2/3" />
              <div className="h-4 bg-gray-800 rounded w-1/4" />
              <div className="h-10 bg-gray-800 rounded w-1/2" />
            </div>
          ) : error ? (
            <div className="rounded-lg border border-red-800 bg-red-900/30 text-red-200 p-4">
              {error}
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Name</label>
                <input
                  type="text"
                  value={profile.name}
                  disabled
                  className="w-full rounded-xl border border-gray-800 bg-gray-950 px-4 py-2.5 text-gray-200 disabled:opacity-80"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Email</label>
                <input
                  type="email"
                  value={profile.email}
                  disabled
                  className="w-full rounded-xl border border-gray-800 bg-gray-950 px-4 py-2.5 text-gray-200 disabled:opacity-80"
                />
              </div>

              {/* Actions row */}
              <div className="sm:col-span-2 flex items-center gap-3">
                <button
                  onClick={() => router.push('/settings')}
                  className="rounded-xl bg-indigo-600 hover:bg-indigo-700 transition px-4 py-2.5 font-medium"
                >
                  Account Settings
                </button>
                <button
                  onClick={() => router.push('/home')}
                  className="cursor-pointer rounded-xl border border-gray-700 hover:border-gray-600 transition px-4 py-2.5"
                >
                  Back to Home
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Extra: quick panels (optional) */}
        {!loading && !error && (
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-gray-800 bg-gray-900 p-5">
              <h3 className="font-semibold mb-2">My Ideas</h3>
              <p className="text-sm text-gray-400">You haven’t created any ideas yet.</p>
            </div>
            <div className="rounded-2xl border border-gray-800 bg-gray-900 p-5">
              <h3 className="font-semibold mb-2">All Users</h3>
              <p className="text-sm text-gray-400">Invite your teammates to start collaborating.</p>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default Page
