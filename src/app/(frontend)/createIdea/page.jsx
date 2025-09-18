'use client'
import React, { useEffect, useState } from 'react';
import { PlusCircle, Lightbulb, FileText } from 'lucide-react';
import axios from 'axios';
import {UseUser} from '../../context/useContext'
import { useRouter } from 'next/navigation';
const CreateIdeaPage = () => {
    const route = useRouter()
  const {profile} = UseUser()
  const [idea , setIdea] = useState({
    title:"",
    description:"",
  })

  const handlePublish = async () => {
    if (!idea.title.trim() || !idea.description.trim()) {
      alert('Please fill in both title and description');
      return;
    }
    // Simulate API call
    try {
        console.log(profile)
        const response = await axios.post(`/api/ideas?userId=${profile._id}`,{
          title:idea.title,
          description:idea.description
        })
        console.log(response.data.data)
        setIdea(response.data.data)
        route.push("/home")
    } catch (error) {
        console.log(error)
    }
  };

  

  const handleReset = () => {
    setTitle('');
    setDescription('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full mb-4 shadow-lg">
            <Lightbulb className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Create Your Idea</h1>
          <p className="text-gray-600">Share your innovative thoughts with the world</p>
        </div>

        {/* Success Message */}
        {/* {isPublished && (
          <div className="mb-6 p-4 bg-green-100 border border-green-300 rounded-lg text-center">
            <div className="text-green-800 font-semibold">🎉 Idea Published Successfully!</div>
            <div className="text-green-600 text-sm mt-1">Your idea is now live and ready to inspire others</div>
          </div>
        )} */}

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="space-y-6">
            {/* Title Input */}
            <div className="space-y-2">
              <label htmlFor="title" className="flex items-center text-sm font-semibold text-gray-700">
                <FileText className="w-4 h-4 mr-2 text-purple-500" />
                Idea Title
              </label>
              <input
                id="title"
                type="text"
                value={idea?.title}
                onChange={(e) => setIdea({...idea , title:e.target.value})}
                placeholder="Enter your brilliant idea title..."
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-gray-800 placeholder-gray-400"
                maxLength={100}
              />
              <div className="text-right text-xs text-gray-500">
                {idea?.title.length}/100 characters
              </div>
            </div>

            {/* Description Input */}
            <div className="space-y-2">
              <label htmlFor="description" className="flex items-center text-sm font-semibold text-gray-700">
                <FileText className="w-4 h-4 mr-2 text-blue-500" />
                Description
              </label>
              <textarea
                id="description"
                 value={idea?.description}
                onChange={(e) => setIdea({...idea , description:e.target.value})}
                placeholder="Describe your idea in detail. What problem does it solve? How would it work? What makes it unique?"
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-800 placeholder-gray-400 resize-none"
                maxLength={500}
              />
              <div className="text-right text-xs text-gray-500">
                {idea?.description.length}/500 characters
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={handleReset}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200 font-medium"
              >
                Reset
              </button>
              
              <button
                type="button"
                onClick={handlePublish}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
              >
                
                    <PlusCircle className="w-5 h-5" />
                    Publish Idea
              </button>
            </div>
          </div>

        {/* Tips */}
        <div className="mt-8 bg-blue-50 rounded-xl p-6 border border-blue-100">
          <h3 className="font-semibold text-blue-800 mb-3">💡 Tips for a Great Idea</h3>
          <ul className="space-y-2 text-blue-700 text-sm">
            <li>• Be specific and clear about what your idea solves</li>
            <li>• Include practical details about implementation</li>
            <li>• Explain what makes your idea unique or innovative</li>
            <li>• Consider the potential impact and benefits</li>
          </ul>
        </div>
      </div>
    </div>
    </div>
  )
};

export default CreateIdeaPage;