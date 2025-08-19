export default function JobListings({ searchTerm, filters }) {
  const jobs = [
    {
      id: 1,
      title: "Forward Security Director",
      company: "TechCorp",
      location: "New York, NY",
      type: "Full-time",
      salary: "$120k - $150k",
      posted: "2 days ago",
    },
    {
      id: 2,
      title: "Regional Creative Facilitator",
      company: "Creative Agency",
      location: "Los Angeles, CA",
      type: "Full-time",
      salary: "$80k - $100k",
      posted: "3 days ago",
    },
    {
      id: 3,
      title: "Internal Integration Planner",
      company: "Global Solutions",
      location: "Chicago, IL",
      type: "Contract",
      salary: "$90k - $110k",
      posted: "1 week ago",
    },
    {
      id: 4,
      title: "District Internal Director",
      company: "Business Corp",
      location: "Houston, TX",
      type: "Full-time",
      salary: "$100k - $130k",
      posted: "4 days ago",
    },
    {
      id: 5,
      title: "Corporate Tactics Facilitator",
      company: "Strategy Inc",
      location: "Seattle, WA",
      type: "Part-time",
      salary: "$70k - $90k",
      posted: "5 days ago",
    },
    {
      id: 6,
      title: "Forward Accounts Consultant",
      company: "Finance Pro",
      location: "Miami, FL",
      type: "Full-time",
      salary: "$85k - $105k",
      posted: "1 week ago",
    },
  ]

  return (
    <div className="flex-1">
      <div className="space-y-4">
        {jobs.map((job) => (
          <div key={job.id} className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{job.title}</h3>
                <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-6a1 1 0 00-1-1H9a1 1 0 00-1 1v6a1 1 0 01-1 1H4a1 1 0 110-2V4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {job.company}
                  </span>
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {job.location}
                  </span>
                  <span className="bg-gray-100 px-2 py-1 rounded text-xs">{job.type}</span>
                  <span className="text-green-600 font-medium">{job.salary}</span>
                </div>
                <p className="text-gray-600 text-sm">{job.posted}</p>
              </div>
              <button className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 ml-4">View Job</button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <div className="flex space-x-2">
          <button className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50">Previous</button>
          <button className="px-3 py-2 bg-teal-500 text-white rounded-md">1</button>
          <button className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50">2</button>
          <button className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50">3</button>
          <button className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50">Next</button>
        </div>
      </div>
    </div>
  )
}
