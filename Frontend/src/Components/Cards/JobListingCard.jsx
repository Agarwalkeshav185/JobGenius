import { Bookmark, Clock, MapPin, DollarSign } from "lucide-react"

function JobListingCard({ id, title, companyId, timeAgo, jobType, salary, location }) {
  return (
    <div key={id} className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-6a1 1 0 00-1-1H9a1 1 0 00-1 1v6a1 1 0 01-1 1H4a1 1 0 110-2V4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {companyId?.name || companyId}
                    </span>
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {location}
                    </span>
                    <span className="bg-gray-100 px-2 py-1 rounded text-xs">{jobType}</span>
                    <span className="text-green-600 font-medium">{salary}</span>
                  </div>
                  <p className="text-gray-600 text-sm">{timeAgo}</p> {/* ✅ Show formatted time */}
                </div>
                <button className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 ml-4">
                  View Job
                </button>
              </div>
            </div>
  )
}

export default JobListingCard
