import { Button } from "../UI/Button"
import { Link } from "react-router-dom"
// import Image from "next/image"

export default function JobCard({
  id,
  title,
  company,
  companyLogo,
  category,
  jobType,
  salary,
  location,
  postedTime,
  isFeatured = false,
}) {
  return (
    <div className="bg-white p-4 rounded-lg border border-gray-100 mb-4 relative">
      <div className="flex justify-between">
        <div className="flex gap-4">
          <div className="h-12 w-12 rounded-full overflow-hidden flex-shrink-0">
            <img
              src={companyLogo || "/placeholder.svg"}
              alt={company}
              width={48}
              height={48}
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-bold text-lg">{title}</h3>
            <p className="text-gray-600 text-sm">{company}</p>
          </div>
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
          </svg>
        </button>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-y-2">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-green-600"
          >
            <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
            <line x1="16" x2="16" y1="2" y2="6" />
            <line x1="8" x2="8" y1="2" y2="6" />
            <line x1="3" x2="21" y1="10" y2="10" />
          </svg>
          {category}
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-green-600"
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          {jobType}
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-green-600"
          >
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="M12 4v16" />
          </svg>
          {salary}
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-green-600"
          >
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          {location}
        </div>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <span className="text-sm text-gray-500">{postedTime}</span>
        <Link href={`/jobs/${id}`}>
          <Button className="bg-green-600 hover:bg-green-700">Job Details</Button>
        </Link>
      </div>

      {isFeatured && (
        <div className="absolute top-0 right-0 bg-yellow-500 text-white text-xs px-2 py-1 rounded-bl-lg rounded-tr-lg">
          Featured
        </div>
      )}
    </div>
  )
}
