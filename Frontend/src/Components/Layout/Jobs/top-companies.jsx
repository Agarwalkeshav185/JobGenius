export default function TopCompanies() {
  const companies = [
    {
      name: "Microsoft",
      logo: "MS",
      description: "Leading technology company focused on productivity and platform technologies",
      openJobs: 45,
    },
    {
      name: "Apple",
      logo: "A",
      description: "Innovative technology company designing and manufacturing consumer electronics",
      openJobs: 32,
    },
    {
      name: "Meta",
      logo: "M",
      description: "Social technology company connecting people through apps and technologies",
      openJobs: 28,
    },
    {
      name: "Google",
      logo: "G",
      description: "Multinational technology company specializing in internet-related services",
      openJobs: 67,
    },
  ]

  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Top Company</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join industry-leading companies that are shaping the future of technology and innovation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {companies.map((company, index) => (
            <div
              key={index}
              className="text-center p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow"
            >
              <div className="w-16 h-16 bg-gray-900 text-white rounded-lg flex items-center justify-center text-xl font-bold mx-auto mb-4">
                {company.logo}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{company.name}</h3>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">{company.description}</p>
              <div className="text-teal-500 font-medium text-sm">{company.openJobs} Open Jobs</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
