"use client"

export default function JobFilters({ filters = {}, setFilters = () => {} }) {
  const categories = [
    "Accounting/Finance",
    "Customer Service",
    "Data Science",
    "Design",
    "Engineering",
    "Healthcare",
    "Human Resources",
    "Marketing",
    "Operations",
    "Product",
    "Sales",
    "Other",
  ]

  const jobTypes = ["Full-time", "Part-time", "Contract", "Freelance", "Internship"]
  const experienceLevels = ["Entry Level", "Mid Level", "Senior Level", "Executive"]
  const salaryRanges = ["$0-$50k", "$50k-$100k", "$100k-$150k", "$150k+"]

  // Handle checkbox changes for arrays
  const handleCheckboxChange = (filterType, value) => {
    const currentValues = filters[filterType] || []
    let updatedValues
    
    if (currentValues.includes(value)) {
      // Remove if already selected
      updatedValues = currentValues.filter(item => item !== value)
    } else {
      // Add if not selected
      updatedValues = [...currentValues, value]
    }
    
    setFilters({ 
      ...filters, 
      [filterType]: updatedValues 
    })
  }

  // Apply filters function
  const handleApplyFilters = () => {
    // This will trigger the parent component to search with current filters
    // The parent should have an onApplyFilters prop or handle this via onSearch
    console.log('Applying filters:', filters)
  }

  // Clear all filters
  const handleClearFilters = () => {
    setFilters({
      location: '',
      category: '',
      jobType: [],
      experienceLevel: [],
      salaryRange: []
    })
  }

  return (
    <div className="w-80 bg-white p-6 rounded-lg shadow-sm border">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-lg">Filters</h3>
        <button 
          onClick={handleClearFilters}
          className="text-sm text-teal-600 hover:text-teal-700"
        >
          Clear All
        </button>
      </div>

      <div className="space-y-6">
        {/* Location Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
          <input
            type="text"
            placeholder="Enter location"
            value={filters.location || ''}
            onChange={(e) => setFilters({ ...filters, location: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        {/* Category Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
          <select
            value={filters.category || ''}
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Job Type Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Job Type</label>
          <div className="space-y-2">
            {jobTypes.map((type) => (
              <label key={type} className="flex items-center">
                <input 
                  type="checkbox" 
                  checked={(filters.jobType || []).includes(type)}
                  onChange={() => handleCheckboxChange('jobType', type)}
                  className="mr-2 text-teal-500 focus:ring-teal-500" 
                />
                <span className="text-sm text-gray-700">{type}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Experience Level Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Experience Level</label>
          <div className="space-y-2">
            {experienceLevels.map((level) => (
              <label key={level} className="flex items-center">
                <input 
                  type="checkbox" 
                  checked={(filters.experienceLevel || []).includes(level)}
                  onChange={() => handleCheckboxChange('experienceLevel', level)}
                  className="mr-2 text-teal-500 focus:ring-teal-500" 
                />
                <span className="text-sm text-gray-700">{level}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Salary Range Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Salary Range</label>
          <div className="space-y-2">
            {salaryRanges.map((range) => (
              <label key={range} className="flex items-center">
                <input 
                  type="checkbox" 
                  checked={(filters.salaryRange || []).includes(range)}
                  onChange={() => handleCheckboxChange('salaryRange', range)}
                  className="mr-2 text-teal-500 focus:ring-teal-500" 
                />
                <span className="text-sm text-gray-700">{range}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Apply Filters Button */}
        <button 
          onClick={handleApplyFilters}
          className="w-full bg-teal-500 text-white py-2 rounded-md hover:bg-teal-600 transition-colors"
        >
          Apply Filters
        </button>
      </div>
    </div>
  )
}
