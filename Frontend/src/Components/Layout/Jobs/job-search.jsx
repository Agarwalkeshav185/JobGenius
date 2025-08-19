"use client"

import { useState } from "react"
import JobFilters from "./job-filters.jsx"
import JobListings from "./job-listings.jsx"

export default function JobSearch() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState({
    location: "",
    category: "",
    jobType: "",
    experienceLevel: "",
    salaryRange: "",
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <div className="flex gap-4 mb-4">
          <input
            type="text"
            placeholder="Search by Job Title"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <button className="bg-teal-500 text-white px-6 py-2 rounded-md hover:bg-teal-600">Search</button>
        </div>
        <p className="text-gray-600">Showing 1-10 of 1,234 results</p>
      </div>

      <div className="flex gap-8">
        <JobFilters filters={filters} setFilters={setFilters} />
        <JobListings searchTerm={searchTerm} filters={filters} />
      </div>
    </div>
  )
}
