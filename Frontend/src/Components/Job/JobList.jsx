import { useState } from "react"
import JobCard from "../Job/JobCard"
import { Button } from "../UI/Button"

export default function JobList({ jobs, totalResults, resultsPerPage, currentPage, onPageChange }) {
  const [sortBy, setSortBy] = useState("latest")
  const totalPages = Math.ceil(totalResults / resultsPerPage)

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm text-gray-600">
          Showing {(currentPage - 1) * resultsPerPage + 1} to {Math.min(currentPage * resultsPerPage, totalResults)} of{" "}
          {totalResults} results
        </p>
        <div className="flex items-center gap-2">
          <span className="text-sm">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-300 rounded p-1 text-sm"
          >
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
            <option value="salary-high">Salary: High to Low</option>
            <option value="salary-low">Salary: Low to High</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {jobs.map((job) => (
          <JobCard
            key={job.id}
            id={job.id}
            title={job.title}
            company={job.company}
            companyLogo={job.companyLogo}
            category={job.category}
            jobType={job.jobType}
            salary={job.salary}
            location={job.location}
            postedTime={job.postedTime}
            isFeatured={job.isFeatured}
          />
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <div className="flex gap-2">
          {currentPage > 1 && (
            <Button variant="outline" onClick={() => onPageChange(currentPage - 1)} className="border-gray-300">
              Previous
            </Button>
          )}

          {Array.from({ length: Math.min(totalPages, 5) }).map((_, index) => {
            const pageNumber = currentPage > 3 && totalPages > 5 ? currentPage - 3 + index + 1 : index + 1

            if (pageNumber <= totalPages) {
              return (
                <Button
                  key={pageNumber}
                  variant={currentPage === pageNumber ? "default" : "outline"}
                  onClick={() => onPageChange(pageNumber)}
                  className={currentPage === pageNumber ? "bg-green-600 hover:bg-green-700" : "border-gray-300"}
                >
                  {pageNumber}
                </Button>
              )
            }
            return null
          })}

          {currentPage < totalPages && (
            <Button variant="outline" onClick={() => onPageChange(currentPage + 1)} className="border-gray-300">
              Next
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
