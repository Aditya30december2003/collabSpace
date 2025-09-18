'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

const Page = ({ params }) => {
  const { userId } = params
  const router = useRouter()
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [ideas, setIdeas] = useState([])
  const [ideasLoading, setIdeasLoading] = useState(true)

  const fetchData = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`/api/users/profile?userId=${userId}`)
      console.log(response.data)
      setData(response.data?.data || response.data || {})
      setError('')
    } catch (error) {
      console.log(error)
      setError('Failed to load user profile. User may not exist or be private.')
    } finally {
      setLoading(false)
    }
  }

  const fetchIdea = async () => {
    try {
      setIdeasLoading(true)
      const response = await axios.get(`/api/ideas?userId=${userId}`)
      console.log(response.data)
      setIdeas(response.data?.data || response.data || [])
    } catch (error) {
      console.log(error)
      setIdeas([])
    } finally {
      setIdeasLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
    fetchIdea()
  }, [userId])

  const handleIdeaClick = (ideaId) => {
    router.push(`/IdeaPage/${ideaId}`)
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/60 backdrop-blur sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold">
            <span className="text-indigo-400">Collab</span>Space
            <span className="ml-2 text-sm text-gray-400">User Profile</span>
          </h1>
          <div>
            <button
              onClick={() => router.back()}
              className="rounded-xl border border-gray-700 hover:border-gray-600 transition px-4 py-2 text-sm"
            >
              ← Back
            </button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-lg">
          {loading ? (
            // Loading Skeleton
            <div className="animate-pulse space-y-6">
              <div className="flex items-center space-x-4">
                <div className="h-16 w-16 bg-gray-800 rounded-full" />
                <div className="space-y-2">
                  <div className="h-6 bg-gray-800 rounded w-48" />
                  <div className="h-4 bg-gray-800 rounded w-32" />
                </div>
              </div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-800 rounded w-1/3" />
                <div className="h-10 bg-gray-800 rounded w-2/3" />
                <div className="h-4 bg-gray-800 rounded w-1/4" />
                <div className="h-10 bg-gray-800 rounded w-1/2" />
              </div>
            </div>
          ) : error ? (
            // Error State
            <div className="text-center py-12">
              <div className="rounded-lg border border-red-800 bg-red-900/30 text-red-200 p-6 max-w-md mx-auto">
                <div className="text-4xl mb-4">⚠️</div>
                <h3 className="font-semibold mb-2">Profile Not Found</h3>
                <p className="text-sm">{error}</p>
                <button
                  onClick={() => router.push('/home')}
                  className="mt-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 transition px-4 py-2 text-sm font-medium"
                >
                  Go to Home
                </button>
              </div>
            </div>
          ) : (
            // Profile Content
            <div className="space-y-6">
              {/* Profile Header */}
              <div className="flex items-center space-x-6">
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
                  {data.name?.charAt(0)?.toUpperCase() || data.email?.charAt(0)?.toUpperCase() || '?'}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    {data.name || 'Unknown User'}
                  </h2>
                  <p className="text-gray-400">{data.email || 'No email available'}</p>
                  {data.createdAt && (
                    <p className="text-sm text-gray-500 mt-1">
                      Joined {new Date(data.createdAt).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>

              {/* Profile Details */}
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Name</label>
                  <div className="w-full rounded-xl border border-gray-800 bg-gray-950 px-4 py-2.5 text-gray-200">
                    {data.name || 'Not provided'}
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Email</label>
                  <div className="w-full rounded-xl border border-gray-800 bg-gray-950 px-4 py-2.5 text-gray-200">
                    {data.email || 'Not provided'}
                  </div>
                </div>
                {data.bio && (
                  <div className="sm:col-span-2">
                    <label className="block text-sm text-gray-400 mb-1">Bio</label>
                    <div className="w-full rounded-xl border border-gray-800 bg-gray-950 px-4 py-2.5 text-gray-200">
                      {data.bio}
                    </div>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-800">
                <button
                  onClick={() => router.push('/home')}
                  className="rounded-xl bg-indigo-600 hover:bg-indigo-700 transition px-4 py-2.5 font-medium"
                >
                  Back to Home
                </button>
                <button
                  onClick={() => router.push('/profile')}
                  className="rounded-xl border border-gray-700 hover:border-gray-600 transition px-4 py-2.5"
                >
                  My Profile
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User's Ideas Section */}
        {!loading && !error && data.email && (
          <div className="mt-8">
            <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <span className="mr-2">💡</span>
                {data.name ? `${data.name}'s Ideas` : 'User Ideas'}
              </h3>
              
              {ideasLoading ? (
                // Ideas Loading Skeleton
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="animate-pulse border border-gray-800 rounded-xl p-4">
                      <div className="h-4 bg-gray-800 rounded w-3/4 mb-2" />
                      <div className="h-3 bg-gray-800 rounded w-1/2" />
                    </div>
                  ))}
                </div>
              ) : ideas.length > 0 ? (
                <div className="space-y-3">
                  {ideas.map((idea) => (
                    <div
                      key={idea.ideaId || idea._id}
                      onClick={() => handleIdeaClick(idea.ideaId || idea._id)}
                      className="border border-gray-800 rounded-xl p-4 hover:border-gray-700 hover:bg-gray-800/50 cursor-pointer transition-all group"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-white group-hover:text-indigo-300 transition-colors">
                            {idea.title || 'Untitled Idea'}
                          </h4>
                          {idea.description && (
                            <p className="text-sm text-gray-400 mt-1 line-clamp-2">
                              {idea.description}
                            </p>
                          )}
                          <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                            {idea.createdAt && (
                              <span>
                                {new Date(idea.createdAt).toLocaleDateString()}
                              </span>
                            )}
                            {idea.category && (
                              <span className="px-2 py-1 bg-gray-800 rounded">
                                {idea.category}
                              </span>
                            )}
                            {idea.collaborators && (
                              <span>
                                {idea.collaborators.length} collaborator{idea.collaborators.length !== 1 ? 's' : ''}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="text-gray-500 group-hover:text-indigo-400 transition-colors ml-4">
                          →
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <div className="text-4xl mb-2">💡</div>
                  <p>No ideas shared yet</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Stats Section */}
        {!loading && !error && data.email && (
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-gray-800 bg-gray-900 p-5">
              <h3 className="font-semibold mb-2 flex items-center">
                <span className="mr-2">📊</span>
                Ideas Shared
              </h3>
              <p className="text-2xl font-bold text-indigo-400">
                {ideas.length || 0}
              </p>
              <p className="text-sm text-gray-400">
                {ideas.length === 0 ? 'No ideas yet' : 
                 ideas.length === 1 ? '1 idea shared' : 
                 `${ideas.length} ideas shared`}
              </p>
            </div>
            <div className="rounded-2xl border border-gray-800 bg-gray-900 p-5">
              <h3 className="font-semibold mb-2 flex items-center">
                <span className="mr-2">🤝</span>
                Collaboration
              </h3>
              <p className="text-2xl font-bold text-purple-400">
                {data.collaborationCount || 0}
              </p>
              <p className="text-sm text-gray-400">
                {data.collaborationCount ? 
                  `Active in ${data.collaborationCount} project${data.collaborationCount !== 1 ? 's' : ''}` : 
                  'Not collaborating yet'
                }
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default Page