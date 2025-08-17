import { Bookmark, Clock, MapPin, DollarSign } from "lucide-react"

function JobListingCard({ logo, title, company, timeAgo, category, timeType, salary, location }) {
  return (
    <div className="border rounded-md p-4 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="flex-1">
          <div className="flex justify-between">
            <div className="flex gap-3 items-start">
              <img src={logo || "/placeholder-company.png"} alt={company} className="w-[50px] h-[50px] rounded-md" />
              <div>
                <p className="text-xs text-gray-500">{timeAgo}</p>
                <h3 className="font-bold text-lg">{title}</h3>
                <p className="text-sm text-gray-600">{company}</p>
              </div>
            </div>
            <button className="h-8 w-8 text-gray-500 hover:text-gray-700">
              <Bookmark className="h-4 w-4" />
            </button>
          </div>

          <div className="flex flex-wrap gap-4 mt-4">
            <div className="flex items-center text-xs text-gray-600">
              <div className="bg-teal-50 p-1 rounded mr-2">
                <img src="/placeholder-icon.png" alt="" className="w-4 h-4" />
              </div>
              {category}
            </div>

            <div className="flex items-center text-xs text-gray-600">
              <Clock className="h-4 w-4 mr-1 text-gray-400" />
              {timeType}
            </div>

            <div className="flex items-center text-xs text-gray-600">
              <DollarSign className="h-4 w-4 mr-1 text-gray-400" />
              {salary}
            </div>

            <div className="flex items-center text-xs text-gray-600">
              <MapPin className="h-4 w-4 mr-1 text-gray-400" />
              {location}
            </div>
          </div>
        </div>

        <button className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded self-end md:self-center">
          Job Details
        </button>
      </div>
    </div>
  )
}

export default JobListingCard
