// import Header from "../Components/Layout/Header"
// import Footer from "../Components/Layout/Footer"
// import JobFilter from "../Components/Job/JobFilter"
// import JobList from "../Components/Job/JobList"

// // Mock data for demonstration
// const mockLocations = [
//   { id: "new-york", label: "New York", count: 10 },
//   { id: "los-angeles", label: "Los Angeles", count: 8 },
//   { id: "chicago", label: "Chicago", count: 6 },
//   { id: "boston", label: "Boston", count: 5 },
//   { id: "texas", label: "Texas", count: 4 },
//   { id: "florida", label: "Florida", count: 3 },
// ]

// const mockCategories = [
//   { id: "telecommunications", label: "Telecommunications", count: 10 },
//   { id: "hotels-tourism", label: "Hotels & Tourism", count: 10 },
//   { id: "education", label: "Education", count: 10 },
//   { id: "financial-services", label: "Financial Services", count: 10 },
//   { id: "construction", label: "Construction", count: 10 },
//   { id: "media", label: "Media", count: 10 },
//   { id: "commerce", label: "Commerce", count: 10 },
// ]

// const mockJobTypes = [
//   { id: "full-time", label: "Full Time", count: 10 },
//   { id: "part-time", label: "Part Time", count: 10 },
//   { id: "freelance", label: "Freelance", count: 10 },
//   { id: "seasonal", label: "Seasonal", count: 10 },
//   { id: "fixed-price", label: "Fixed-Price", count: 10 },
// ]

// const mockExperienceLevels = [
//   { id: "no-experience", label: "No-experience", count: 10 },
//   { id: "fresher", label: "Fresher", count: 10 },
//   { id: "intermediate", label: "Intermediate", count: 10 },
//   { id: "expert", label: "Expert", count: 10 },
// ]

// const mockDatePeriods = [
//   { id: "all", label: "All", count: 10 },
//   { id: "last-hour", label: "Last Hour", count: 10 },
//   { id: "last-24-hours", label: "Last 24 Hours", count: 10 },
//   { id: "last-7-days", label: "Last 7 Days", count: 10 },
//   { id: "last-30-days", label: "Last 30 Days", count: 10 },
// ]

// const mockTags = ["engineering", "design", "ux/ui", "marketing", "management", "soft", "construction"]

// const mockJobs = [
//   {
//     id: "1",
//     title: "Forward Security Director",
//     company: "Marsh, Simpson and Schultz Co",
//     companyLogo: "/placeholder.svg?height=48&width=48",
//     category: "Hotels & Tourism",
//     jobType: "Full time",
//     salary: "$40000-$42000",
//     location: "New York, USA",
//     postedTime: "10 min ago",
//     isFeatured: false,
//   },
//   {
//     id: "2",
//     title: "Regional Creative Facilitator",
//     company: "Marsh - Becker Co",
//     companyLogo: "/placeholder.svg?height=48&width=48",
//     category: "Media",
//     jobType: "Part time",
//     salary: "$28000-$35000",
//     location: "Los Angeles, USA",
//     postedTime: "17 min ago",
//     isFeatured: false,
//   },
//   {
//     id: "3",
//     title: "Internal Integration Planner",
//     company: "Maier, Dursley and Feest Inc.",
//     companyLogo: "/placeholder.svg?height=48&width=48",
//     category: "Construction",
//     jobType: "Full time",
//     salary: "$48000-$55000",
//     location: "Texas, USA",
//     postedTime: "19 min ago",
//     isFeatured: false,
//   },
//   {
//     id: "4",
//     title: "District Intranet Director",
//     company: "VanRueden - Weber Co",
//     companyLogo: "/placeholder.svg?height=48&width=48",
//     category: "Commerce",
//     jobType: "Full time",
//     salary: "$42000-$48000",
//     location: "Florida, USA",
//     postedTime: "24 min ago",
//     isFeatured: false,
//   },
//   {
//     id: "5",
//     title: "Corporate Tactics Facilitator",
//     company: "Conner, Turner and Flatley Inc",
//     companyLogo: "/placeholder.svg?height=48&width=48",
//     category: "Commerce",
//     jobType: "Full time",
//     salary: "$39000-$40000",
//     location: "Boston, USA",
//     postedTime: "28 min ago",
//     isFeatured: false,
//   },
// ]

// export default function JobsPage() {
//   // In a real application, these would be handled with state and API calls
//   const handleFilterChange = (filters) => {
//     console.log("Filters changed:", filters)
//     // Would typically fetch filtered jobs from an API
//   }

//   const handlePageChange = (page) => {
//     console.log("Page changed:", page)
//     // Would typically fetch jobs for the selected page from an API
//   }

//   return (
//     <>
//       <Header />
//       <main>
//         <div className="bg-black text-white py-12 text-center">
//           <h1 className="text-4xl font-bold">Jobs</h1>
//         </div>

//         <div className="container mx-auto py-8 px-4">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             <div className="md:col-span-1">
//               <JobFilter
//                 locations={mockLocations}
//                 categories={mockCategories}
//                 jobTypes={mockJobTypes}
//                 experienceLevels={mockExperienceLevels}
//                 datePeriods={mockDatePeriods}
//                 tags={mockTags}
//                 onFilterChange={handleFilterChange}
//               />
//             </div>
//             <div className="md:col-span-2">
//               <JobList
//                 jobs={mockJobs}
//                 totalResults={25}
//                 resultsPerPage={5}
//                 currentPage={1}
//                 onPageChange={handlePageChange}
//               />
//             </div>
//           </div>
//         </div>
//       </main>
//       <Footer />
//     </>
//   )
// }


import JobSearch from "../Components/Layout/Jobs/job-search.jsx"
import WeAreHiring from "../Components/Layout/Jobs/we-are-hiring.jsx"
import TopCompanies from "../Components/Layout/Jobs/top-companies.jsx"

export default function JobBoardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <JobSearch />
      <WeAreHiring />
      <TopCompanies />
    </div>
  )
}