'use client'
import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { ArrowLeft, Lightbulb, User, Calendar, Heart, Share2 } from 'lucide-react';
import Link from 'next/link';
import { Save } from 'lucide-react';
import { UseUser } from '../../../context/useContext';
import { useRouter } from 'next/navigation';
const IdeaPage = ({ params }) => {
    const { ideaId } = params;
    const [idea, setIdea] = useState(null)
    const [loading, setLoading] = useState(true)
    const {profile} = UseUser()
    const route = useRouter()

    const fetchIdea = async () => {
        try {
            console.log("Fetching idea...")
            const response = await axios.get(`/api/ideas/${ideaId}`)
            console.log(response.data)
            setIdea(response.data)
        } catch (error) {
            console.log("Error: " + error)
        } finally {
            setLoading(false)
        }
    }

    const handleSave=async()=>{
      try {
        const response = await axios.post(`/api/save?userId=${profile._id}&ideaId=${ideaId}`)
        route.push('/savedIdeas')
        console.log(response)
      } catch (error) {
        console.log("Error: " + error)
      }
    }

    useEffect(() => {
        if (ideaId) {
            fetchIdea()
        }
    }, [ideaId]) // Added dependency array

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading idea...</p>
                </div>
            </div>
        )
    }

    if (!idea) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                        <span className="text-2xl">😞</span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Idea Not Found</h2>
                    <p className="text-gray-600 mb-4">The idea you're looking for doesn't exist.</p>
                    <Link href="/home" className="text-purple-600 hover:text-purple-700 font-medium">
                        ← Back to Home
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
            {/* Header */}
            <div className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-10">
                <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link 
                        href="/home" 
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span>Back to Home</span>
                    </Link>
                    
                    <div className="flex items-center gap-3">
                        <button className="flex cursor-pointer items-center gap-2 px-4 py-2 text-gray-600 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                            <Heart className="w-4 h-4" />
                            <span className="text-sm">Like</span>
                        </button>
                        <button onClick={handleSave} className="flex items-center cursor-pointer gap-2 px-4 py-2 text-gray-600 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all">
                            <Save className="w-4 h-4" />
                            <span className="text-sm">Save</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-6 py-8">
                {/* Idea Header */}
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-6 border border-gray-100">
                    <div className="flex items-start gap-4 mb-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                            <Lightbulb className="w-8 h-8 text-white" />
                        </div>
                        <div className="flex-1">
                            <h1 className="text-3xl font-bold text-gray-800 mb-2 leading-tight">
                                {idea.title}
                            </h1>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                                <div className="flex items-center gap-1">
                                    <User className="w-4 h-4" />
                                    <span>By {idea.user?.name || 'Anonymous'}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4" />
                                    <span>{new Date(idea.createdAt || Date.now()).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Idea Description */}
                    <div className="prose prose-gray max-w-none">
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">Description</h3>
                        <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                                {idea.description}
                            </p>
                        </div>
                    </div>


                </div>

                {/* Action Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Collaborate Card */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
                        <div className="text-center">
                            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">🤝</span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Want to Collaborate?</h3>
                            <p className="text-gray-600 text-sm mb-4">
                                Connect with the idea creator and bring this vision to life together.
                            </p>
                            <button className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium">
                                Contact Creator
                            </button>
                        </div>
                    </div>

                    {/* Feedback Card */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
                        <div className="text-center">
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">💭</span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Share Feedback</h3>
                            <p className="text-gray-600 text-sm mb-4">
                                Have thoughts or suggestions? Your feedback can help improve this idea.
                            </p>
                            <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium">
                                Give Feedback
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default IdeaPage