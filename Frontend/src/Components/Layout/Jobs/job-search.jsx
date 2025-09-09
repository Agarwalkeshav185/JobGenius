"use client"
import { FaSearch } from "react-icons/fa"
import JobFilters from "./job-filters.jsx"
import JobListings from "./job-listings.jsx"
import FormField from "../../UI/FormField.jsx"

export default function JobSearch({
  searchTerm,
  onSearchTermChange,
  onSearch,
  loading,
  filters,
  onFiltersChange,
  handleClearFilters,
  hasActiveFilters,
  jobs,
  totalJobs,
  searchPerformed = false,
  noResults = false,
  pagination,
  handlePageChange,
  paginationLoading,
  startItem,
  endItem
}) {

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  const handleFilterChange = (newFilters) => {
    // console.log('🎛️ JobSearch: Filter changed:', newFilters);
    
    if (onFiltersChange) {
      onFiltersChange(newFilters);
    }
    
    // ✅ Auto-search when filters change (optional)
    // You can remove this if you want manual search only
    setTimeout(() => {
      onSearch();
    }, 100);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <div className="flex gap-3 mb-4 items-end">
          <div className="flex-1">
            <FormField
              name="searchTerm"
              type="text"
              placeholder="Search by Job Title, Keywords, Company..."
              value={searchTerm}
              onChange={onSearchTermChange}
              onKeyPress={handleKeyPress}
              icon={FaSearch}
              className="mb-0"
              showOptional={false}
            />
          </div>

          <button
            onClick={onSearch}
            disabled={loading}
            className="h-12 mb-6 bg-teal-600 hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
            ) : (
              <FaSearch size={16} />
            )}
            {loading ? "Searching..." : "Search"}
          </button>
        </div>

        {searchPerformed && (
          <div className="mb-4 text-sm text-gray-600">
            {noResults ? (
              <p className="text-red-600">No jobs found matching your criteria.</p>
            ) : (
              <p>
                {hasActiveFilters ? (
                  <>Found <span className="font-semibold">{totalJobs}</span> jobs matching your search</>
                ) : (
                  <>Showing <span className="font-semibold">{totalJobs}</span> recent jobs</>
                )}
              </p>
            )}
          </div>
        )}
      </div>

      <div className="flex gap-8">
        {/* ✅ Filters Sidebar */}
        <div className="w-80 flex-shrink-0">
          <JobFilters 
            filters={filters} 
            setFilters={handleFilterChange}
            onClearFilters={handleClearFilters}
            hasActiveFilters={hasActiveFilters}
          />
        </div>

        {/* ✅ Job Listings */}
        <div className="flex-1">
          <JobListings  
            jobs={jobs} 
            totalJobs={totalJobs} 
            pagination={pagination} 
            onPageChange={handlePageChange}
            paginationLoading={paginationLoading} 
            startItem={startItem} 
            endItem={endItem} 
            onClearFilters={handleClearFilters}
            loading={loading}
            noResults={noResults}
            searchPerformed={searchPerformed}
            hasActiveFilters={hasActiveFilters}
          />
        </div>
      </div>
    </div>
  )
}