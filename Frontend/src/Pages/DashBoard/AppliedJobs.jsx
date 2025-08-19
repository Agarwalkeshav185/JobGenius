import React, { useState, useEffect } from 'react';
import { 
  FaSearch, 
  FaFilter, 
  FaEye, 
  FaMapMarkerAlt, 
  FaCalendarAlt, 
  FaBuilding,
  FaSpinner,
  FaExclamationTriangle,
  FaTimes,
  FaChevronLeft,
  FaChevronRight
} from 'react-icons/fa';

// Mock data - object of objects structure
const mockAppliedJobs = {
  1: {
    id: 1,
    jobTitle: 'Frontend Developer',
    company: 'Tech Corp',
    location: 'San Francisco, CA',
    applicationDate: '2024-01-15T10:30:00Z',
    status: 'under-review',
    jobType: 'Full-time',
    salary: '$80,000 - $120,000',
    description: 'We are looking for a skilled Frontend Developer to join our dynamic team. You will be responsible for creating user-friendly web applications using React, JavaScript, and modern web technologies. Experience with responsive design and cross-browser compatibility is essential.',
    requirements: ['React', 'JavaScript', 'HTML/CSS', 'Git'],
    companyLogo: null
  },
  2: {
    id: 2,
    jobTitle: 'UX Designer',
    company: 'Design Studio',
    location: 'New York, NY',
    applicationDate: '2024-01-12T09:15:00Z',
    status: 'interview',
    jobType: 'Full-time',
    salary: '$70,000 - $100,000',
    description: 'Join our creative team as a UX Designer and help create amazing user experiences for our clients. You will work closely with product managers and developers to design intuitive interfaces that delight users.',
    requirements: ['Figma', 'Adobe XD', 'User Research', 'Prototyping'],
    companyLogo: null
  },
  3: {
    id: 3,
    jobTitle: 'Full Stack Developer',
    company: 'StartupXYZ',
    location: 'Austin, TX',
    applicationDate: '2024-01-08T14:20:00Z',
    status: 'applied',
    jobType: 'Full-time',
    salary: '$90,000 - $130,000',
    description: 'Looking for a versatile Full Stack Developer to build our next-generation platform. You will work with both frontend and backend technologies, contributing to all aspects of our web application development.',
    requirements: ['React', 'Node.js', 'MongoDB', 'AWS'],
    companyLogo: null
  },
  4: {
    id: 4,
    jobTitle: 'React Developer',
    company: 'WebFlow Inc',
    location: 'Remote',
    applicationDate: '2024-01-05T11:45:00Z',
    status: 'rejected',
    jobType: 'Contract',
    salary: '$60/hour',
    description: 'Join our remote team to build cutting-edge React applications for our diverse client base. This contract position offers flexibility and the opportunity to work on exciting projects.',
    requirements: ['React', 'Redux', 'TypeScript', 'REST APIs'],
    companyLogo: null
  },
  5: {
    id: 5,
    jobTitle: 'Software Engineer',
    company: 'Google',
    location: 'Mountain View, CA',
    applicationDate: '2024-01-02T16:30:00Z',
    status: 'shortlisted',
    jobType: 'Full-time',
    salary: '$150,000 - $200,000',
    description: 'Work on large-scale distributed systems at Google. You will be part of a team that builds products used by billions of people worldwide. Strong problem-solving skills and system design knowledge required.',
    requirements: ['Java', 'Python', 'System Design', 'Algorithms'],
    companyLogo: null
  },
  6: {
    id: 6,
    jobTitle: 'Mobile App Developer',
    company: 'AppTech Solutions',
    location: 'Seattle, WA',
    applicationDate: '2024-01-01T12:00:00Z',
    status: 'accepted',
    jobType: 'Full-time',
    salary: '$95,000 - $125,000',
    description: 'Develop innovative mobile applications for iOS and Android platforms. You will work with cross-functional teams to deliver high-quality mobile experiences that engage and delight users.',
    requirements: ['React Native', 'iOS', 'Android', 'Mobile UI/UX'],
    companyLogo: null
  },
  7: {
    id: 7,
    jobTitle: 'Backend Developer',
    company: 'DataFlow Systems',
    location: 'Chicago, IL',
    applicationDate: '2023-12-28T09:30:00Z',
    status: 'withdrawn',
    jobType: 'Full-time',
    salary: '$85,000 - $115,000',
    description: 'Build robust backend systems and APIs that power our data processing platform. You will work with large datasets and ensure our systems can handle high-volume traffic efficiently.',
    requirements: ['Python', 'Django', 'PostgreSQL', 'Redis'],
    companyLogo: null
  },
  8: {
    id: 8,
    jobTitle: 'DevOps Engineer',
    company: 'CloudTech Inc',
    location: 'Denver, CO',
    applicationDate: '2023-12-25T15:45:00Z',
    status: 'under-review',
    jobType: 'Full-time',
    salary: '$100,000 - $140,000',
    description: 'Manage and optimize our cloud infrastructure while implementing CI/CD pipelines. You will ensure our applications are scalable, secure, and highly available.',
    requirements: ['AWS', 'Docker', 'Kubernetes', 'Jenkins'],
    companyLogo: null
  }
};

const AppliedJobs = () => {
  // State management
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const jobsPerPage = 5;

  // Status options for filtering
  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'applied', label: 'Applied' },
    { value: 'under-review', label: 'Under Review' },
    { value: 'interview', label: 'Interview' },
    { value: 'shortlisted', label: 'Shortlisted' },
    { value: 'rejected', label: 'Rejected' },
    { value: 'accepted', label: 'Accepted' },
    { value: 'withdrawn', label: 'Withdrawn' }
  ];

  // Load mock data
  useEffect(() => {
    setLoading(true);
    // Simulate API delay
    setTimeout(() => {
      const jobsArray = Object.values(mockAppliedJobs);
      setAppliedJobs(jobsArray);
      setFilteredJobs(jobsArray);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter and search logic
  useEffect(() => {
    let filtered = appliedJobs;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(job => 
        job.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter) {
      filtered = filtered.filter(job => job.status === statusFilter);
    }

    setFilteredJobs(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, statusFilter, appliedJobs]);

  // Pagination logic
  const totalJobs = filteredJobs.length;
  const totalPages = Math.ceil(totalJobs / jobsPerPage);
  const startIndex = (currentPage - 1) * jobsPerPage;
  const currentJobs = filteredJobs.slice(startIndex, startIndex + jobsPerPage);

  // Handle search
  const handleSearch = () => {
    // Search is handled by useEffect, but we can add additional logic here if needed
    console.log('Searching for:', searchTerm);
  };

  // Handle Enter key for search
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Get status badge styling
  const getStatusBadge = (status) => {
    const statusColors = {
      'applied': 'bg-blue-100 text-blue-800',
      'under-review': 'bg-yellow-100 text-yellow-800',
      'interview': 'bg-purple-100 text-purple-800',
      'shortlisted': 'bg-green-100 text-green-800',
      'rejected': 'bg-red-100 text-red-800',
      'accepted': 'bg-emerald-100 text-emerald-800',
      'withdrawn': 'bg-gray-100 text-gray-800'
    };

    return statusColors[status] || 'bg-gray-100 text-gray-800';
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return '1 day ago';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    return date.toLocaleDateString();
  };

  // Withdraw application (mock functionality)
  const handleWithdraw = async (applicationId) => {
    if (window.confirm('Are you sure you want to withdraw this application?')) {
      // Update the job status to withdrawn
      const updatedJobs = appliedJobs.map(job => 
        job.id === applicationId ? { ...job, status: 'withdrawn' } : job
      );
      setAppliedJobs(updatedJobs);
      alert('Application withdrawn successfully!');
    }
  };

  // View job details (mock functionality)
  const handleViewDetails = (jobId) => {
    const job = appliedJobs.find(j => j.id === jobId);
    alert(`Viewing details for: ${job.jobTitle} at ${job.company}\n\nRequirements: ${job.requirements.join(', ')}\n\nDescription: ${job.description}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Applied Jobs</h1>
          <p className="text-gray-600 mt-1">
            {totalJobs > 0 ? `${totalJobs} applications found` : 'No applications yet'}
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Bar */}
          <div className="flex-1">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by job title or company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Filter Toggle Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <FaFilter className="text-gray-400" />
            Filters
          </button>

          {/* Search Button */}
          <button
            onClick={handleSearch}
            className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Search
          </button>
        </div>

        {/* Expandable Filters */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                >
                  {statusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <FaSpinner className="animate-spin mx-auto text-teal-600 text-2xl mb-4" />
          <p className="text-gray-600">Loading your applications...</p>
        </div>
      )}

      {/* Jobs List */}
      {!loading && (
        <>
          {currentJobs.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <div className="text-gray-400 text-4xl mb-4">📄</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No applications found</h3>
              <p className="text-gray-600">
                {searchTerm || statusFilter 
                  ? 'No jobs match your search criteria. Try adjusting your filters.' 
                  : 'You haven\'t applied to any jobs yet.'}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {currentJobs.map((job) => (
                <div key={job.id} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    {/* Job Info */}
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            {job.jobTitle}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <FaBuilding className="text-gray-400" />
                              {job.company}
                            </div>
                            {job.location && (
                              <div className="flex items-center gap-1">
                                <FaMapMarkerAlt className="text-gray-400" />
                                {job.location}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-3 mt-2 md:mt-0">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(job.status)}`}>
                            {job.status.replace('-', ' ').toUpperCase()}
                          </span>
                        </div>
                      </div>

                      {/* Job Details */}
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                        {job.jobType && (
                          <span className="bg-gray-100 px-2 py-1 rounded">
                            {job.jobType}
                          </span>
                        )}
                        {job.salary && (
                          <span className="font-medium text-green-600">
                            {job.salary}
                          </span>
                        )}
                        <div className="flex items-center gap-1">
                          <FaCalendarAlt className="text-gray-400" />
                          Applied {formatDate(job.applicationDate)}
                        </div>
                      </div>

                      {/* Requirements */}
                      {job.requirements && (
                        <div className="flex flex-wrap gap-1 mb-3">
                          {job.requirements.map((req, index) => (
                            <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-teal-100 text-teal-800">
                              {req}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Job Description Preview */}
                      {job.description && (
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {job.description}
                        </p>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleViewDetails(job.id)}
                        className="flex items-center gap-2 bg-teal-100 hover:bg-teal-200 text-teal-700 px-4 py-2 rounded-lg transition-colors text-sm"
                      >
                        <FaEye />
                        View Details
                      </button>
                      {(job.status === 'applied' || job.status === 'under-review') && (
                        <button
                          onClick={() => handleWithdraw(job.id)}
                          className="flex items-center gap-2 bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-lg transition-colors text-sm"
                        >
                          <FaTimes />
                          Withdraw
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  Showing page {currentPage} of {totalPages} ({totalJobs} total applications)
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="flex items-center gap-1 px-3 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    <FaChevronLeft />
                    Previous
                  </button>
                  
                  <div className="flex gap-1">
                    {[...Array(Math.min(5, totalPages))].map((_, i) => {
                      const page = i + 1;
                      return (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`px-3 py-2 rounded-lg ${
                            currentPage === page 
                              ? 'bg-teal-600 text-white' 
                              : 'border border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          {page}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-1 px-3 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Next
                    <FaChevronRight />
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AppliedJobs;
