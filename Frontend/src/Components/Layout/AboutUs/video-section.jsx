"use client"

import { useState } from "react"

export default function VideoSection() {
  const [isPlaying, setIsPlaying] = useState(false)

  const features = [
    "Professional development programs and career growth opportunities",
    "Comprehensive health benefits and wellness programs",
    "Flexible work arrangements and work-life balance",
  ]

  return (
    <section className="bg-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="relative mb-12">
          <img
            src="/professional-office-meeting.png"
            alt="Company culture video"
            className="w-full h-96 object-cover rounded-lg"
          />
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-lg hover:bg-opacity-40 transition-all"
          >
            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
              <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </button>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Good Life Begins With A Good Company</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-800 p-6 rounded-lg">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-gray-300">{feature}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
