import React, { useState, useEffect } from "react";
import JobListingCard from "../../Cards/JobListingCard";
import { Link } from "react-router-dom";
import formatTimeAgo from "../../../utils/formatDate";
import JobServices from "../../../Services/JobServices";

function RecentJobsSection() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchRecentJobs = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await JobServices.getRecentJobs(1, 5);
      const jobsData = Array.isArray(response?.data) ? response.data : [];
      setJobs(jobsData);

    } catch (error) {
      console.error('❌ Failed to fetch recent jobs:', error);
      setError('Failed to load recent jobs');
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecentJobs();
  }, []);

  // 🎨 LOADING SKELETON
  const LoadingSkeleton = () => (
    <div className="space-y-4">
      {[...Array(5)].map((_, index) => (
        <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 animate-pulse">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gray-300 rounded-lg"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-300 rounded w-48"></div>
                <div className="h-3 bg-gray-300 rounded w-32"></div>
              </div>
            </div>
            <div className="text-right space-y-2">
              <div className="h-3 bg-gray-300 rounded w-20"></div>
              <div className="h-4 bg-gray-300 rounded w-24"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  // 🚨 ERROR STATE
  const ErrorState = () => (
    <div className="text-center py-8">
      <div className="text-red-500 mb-4">
        <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      </div>
      <p className="text-gray-600 mb-4">{error}</p>
      <button 
        onClick={fetchRecentJobs}
        className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg transition-colors"
      >
        Try Again
      </button>
    </div>
  );

  // 📝 EMPTY STATE
  const EmptyState = () => (
    <div className="text-center py-8">
      <div className="text-gray-400 mb-4">
        <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6.294a23.931 23.931 0 01-8 1.706 23.931 23.931 0 01-8-1.706V8a2 2 0 012-2V6" />
        </svg>
      </div>
      <p className="text-gray-600 mb-4">No recent jobs available at the moment</p>
      <Link 
        to="/jobs" 
        className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg transition-colors inline-block"
      >
        Browse All Jobs
      </Link>
    </div>
  );

  return (
    <section className="py-12 container mx-auto px-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Recent Jobs Available</h2>
        <Link to="/jobs" className="text-teal-500 hover:underline">
          View all
        </Link>
      </div>
      <p className="text-gray-500 mb-8">Browse the latest opportunities matched to your skills and location.</p>

      {/* ✅ CONDITIONAL RENDERING BASED ON STATE */}
      {loading ? (
        <LoadingSkeleton />
      ) : error ? (
        <ErrorState />
      ) : jobs.length === 0 ? (
        <EmptyState />
      ) : (
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
        )}
    </section>
  );
}

export default RecentJobsSection;