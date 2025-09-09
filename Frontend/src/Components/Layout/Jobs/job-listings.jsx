import JobListingCard from "../../Cards/JobListingCard";
import Pagination from "../../UI/Pagination";
import { Button } from "../../UI/Button";
import formatTimeAgo from "../../../utils/formatDate";

export default function JobListings({ 
  jobs, 
  totalJobs, 
  pagination = { page: 1, limit: 2, totalPages: 5 },
  onPageChange = () => {},
  paginationLoading = false,
  startItem = 0,
  endItem = 0,
  onClearFilters = () => {}
}) {

  return (
    <div className="flex-1">
      <div className="space-y-4">
        {/* Show loading skeleton while pagination is loading */}
        {paginationLoading ? (
          <div className="space-y-4">
            {[...Array(pagination.limit)].map((_, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm border animate-pulse">
                <div className="h-6 bg-gray-200 rounded mb-4 w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2 w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              </div>
            ))}
          </div>
        ) : jobs.length > 0 ? (
            jobs.map((job) => {
            const salary = job.salary || `$${job.minSalary || 0} - $${job.maxSalary || 0}`
            const timeAgo = formatTimeAgo(job.updatedAt);
            return (
              <JobListingCard 
                key={job._id}
                id={job._id}
                title={job.title}
                companyId={job.companyId}
                timeAgo={timeAgo}
                jobType={job.jobType}
                salary={salary}
                location={job.location}
              />
            )
          })
        ) : (
          // ✅ Enhanced No jobs found section with Button component
          <div className="text-center py-16">
            <div className="mb-6">
              <svg 
                className="mx-auto h-12 w-12 text-gray-400 mb-4" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                />
              </svg>
              <div className="text-gray-500 text-xl font-medium mb-2">
                No jobs found matching your criteria
              </div>
              <div className="text-gray-400 text-base mb-6">
                Try adjusting your search or filters to find more opportunities
              </div>
            </div>
            
            {/* Action buttons using Button component */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <Button 
                variant="outline" 
                size="default"
                onClick={onClearFilters}
                className="w-half sm:w-auto"
              >
                Clear All Filters
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* ✅ Replace all pagination code with reusable Pagination component */}
      <Pagination
        totalItems={totalJobs}
        currentPage={pagination.page}
        itemsPerPage={pagination.limit}
        totalPages={pagination.totalPages}
        startItem={startItem}
        endItem={endItem}
        itemName="results"
        onPageChange={onPageChange}
        loading={paginationLoading}
        showPageSize={true}
        pageSizeOptions={[5, 10, 25, 50]}
        maxPagesToShow={5}
        className="mt-8"
        variant="default"
      />
    </div>
  )
}
