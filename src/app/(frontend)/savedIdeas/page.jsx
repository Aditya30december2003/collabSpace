'use client'
import React, { useState, useEffect } from 'react'
import { UseUser } from '../../context/useContext'
import axios from 'axios'
import Link from 'next/link'
import { Bookmark } from 'lucide-react';
import { Trash2 } from 'lucide-react';
import { Calendar } from 'lucide-react';
import { useRouter } from 'next/navigation'

const SavedIdeasPage = () => {
    const router = useRouter()
    const [saved, setSaved] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const { profile, loading: userLoading } = UseUser()

    const fetchSave = async () => {
        if (!profile?._id) return
        
        setLoading(true)
        try {
            const response = await axios.get(`/api/save?userId=${profile._id}`)
            console.log(response.data)
            setSaved(response.data)
            setError('')
        } catch (error) {
            console.log("Error:", error)
            setError(error.response?.data?.message || "Failed to fetch saved ideas")
            setSaved([])
        } finally {
            setLoading(false)
        }
    }

    const handleUnsave = async (ideaId) => {
        try {
            await axios.delete(`/api/save?userId=${profile._id}&ideaId=${ideaId}`)
            setSaved(prev => prev.filter(s => s?.idea?._id !== ideaId)); // instant UI update
        } catch (error) {
            console.log("Error unsaving:", error)
        }
    }

    useEffect(() => {
        if (profile?._id) {
            fetchSave()
        }
    }, [profile])

    if (userLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading...</p>
                </div>
            </div>
        )
    }

    if (!profile) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-600">Please log in to view saved ideas</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                        <Bookmark className="h-8 w-8 text-blue-600" />
                        My Saved Ideas
                    </h1>
                    <p className="mt-2 text-gray-600">
                        Ideas you've bookmarked for later reference
                    </p>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="text-center py-12">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                        <p className="mt-4 text-gray-600">Loading your saved ideas...</p>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                        <p className="text-red-700">{error}</p>
                        <button 
                            onClick={fetchSave}
                            className="mt-2 text-red-600 hover:text-red-700 underline"
                        >
                            Try again
                        </button>
                    </div>
                )}

                {/* Empty State */}
                {!loading && !error && saved.length === 0 && (
                    <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                        <Bookmark className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            No saved ideas yet
                        </h3>
                        <p className="text-gray-600 mb-4">
                            Start exploring and save ideas you find interesting!
                        </p>
                    </div>
                )}

                {/* Ideas Grid */}
                {!loading && saved.length > 0 && (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {saved.map((save, index) => (
                            <div 
                                key={save._id || index} 
                                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
                            >
                                {/* Card Header */}
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                                        {save.idea?.title || 'Untitled Idea'}
                                    </h3>
                                    <button
                                        onClick={()=>handleUnsave(save.idea?._id)}

                                        className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded cursor-pointer"
                                        title="Remove from saved"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>

                                {/* Description */}
                                {save.idea?.description && (
                                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                        {save.idea.description}
                                    </p>
                                )}

                                {/* Footer */}
                                <div className="flex items-center justify-between text-xs text-gray-500">
                                    <div className="flex items-center gap-1">
                                        <Calendar className="h-3 w-3" />
                                        <span>
                                            Saved {new Date(save.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Bookmark className="h-3 w-3 fill-current text-blue-500" />
                                        <span>Saved</span>
                                    </div>
                                </div>

                                {/* View Details Button */}
                                <Link href={`/IdeaPage/${save.idea._id}`}>
                                <button className="w-full mt-4 bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors rounded-md py-2 text-sm font-medium">
                                    View Details
                                </button>
                                </Link>
                            </div>
                        ))}
                    </div>
                )}

                {/* Stats */}
                {saved.length > 0 && (
                    <div className="mt-8 text-center text-sm text-gray-500">
                        You have {saved.length} saved idea{saved.length !== 1 ? 's' : ''}
                    </div>
                )}
            </div>
        </div>
    )
}

export default SavedIdeasPage
