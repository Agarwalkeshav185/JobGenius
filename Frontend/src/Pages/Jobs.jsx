import React, { useState, useEffect } from "react"
import JobSearch from "../Components/Layout/Jobs/job-search.jsx"
import WeAreHiring from "../Components/Layout/Jobs/we-are-hiring.jsx"
import TopCompanies from "../Components/Layout/Jobs/top-companies.jsx"
import AlertDisplay from "../Components/UI/AlertDisplay.jsx"
import JobServices from "../Services/JobServices.js"

const InitialFilters = {
  location: "",
  category: "",
  jobType: [],
  experienceLevel: [],
  salaryRanges: [],
  minSalary: null,
  maxSalary: null
}

export default function JobBoardPage() {

  const [jobs, setJobs] = useState([]);
  const [totalJobs, setTotalJobs] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [filters, setFilters] = useState(InitialFilters);

  const [pagination, setPagination] = useState({
    page: 1,            
    limit: 10,          
    totalPages: 0       
  })

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [noResults, setNoResults] = useState(false)
  const startItem = (pagination.page - 1) * pagination.limit + 1
  const endItem = Math.min(pagination.page * pagination.limit, totalJobs)
  
  const hasActiveFilters = Boolean(
    searchTerm.trim() || 
    filters.location || 
    filters.category || 
    filters.jobType.length > 0 || 
    filters.experienceLevel.length > 0 || 
    filters.salaryRanges.length > 0 || 
    filters.minSalary || 
    filters.maxSalary
  )

  const sanitizeInput = (input) => {
    if (typeof input !== 'string') return '';
    return input.trim().slice(0, 200);
  }

  const validatePagination = (page, limit) => {
    const validPage = Math.max(1, parseInt(page) || 1);
    const validLimit = Math.min(50, Math.max(5, parseInt(limit) || 10));
    return { page: validPage, limit: validLimit };
  }

  const buildSearchParams = () => {
    const params = {};
    
    // ✅ Sanitize and add search term
    const cleanSearchTerm = sanitizeInput(searchTerm);
    if (cleanSearchTerm) {
      params.searchKeyword = cleanSearchTerm;
    }
    
    // ✅ Add filters with validation
    if (filters.location) params.location = sanitizeInput(filters.location);
    if (filters.category) params.category = filters.category;
    if (filters.jobType.length > 0) params.jobType = filters.jobType.join(',');
    if (filters.experienceLevel.length > 0) params.experienceLevel = filters.experienceLevel.join(',');
    if (filters.salaryRanges.length > 0) params.salaryRanges = filters.salaryRanges.join(',');
    if (filters.minSalary) params.minSalary = parseInt(filters.minSalary) || 0;
    if (filters.maxSalary) params.maxSalary = parseInt(filters.maxSalary) || 0;
    
    return params;
  }

  const fetchJobsData = async ({ 
    page = 1, 
    limit = pagination.limit, 
    useFilters = false, 
    resetPage = false 
  }) => {
    
    try {
      setLoading(true);
      setError("");
      setNoResults(false);
      
      const { page: validPage, limit: validLimit } = validatePagination(page, limit);
      
      if (resetPage) {
        setPagination(prev => ({ ...prev, page: 1 }));
      }
      
      let response;

      if (useFilters && hasActiveFilters) {
        const searchParams = buildSearchParams();
        // console.log('🔍 Searching with params:', searchParams);
        
        response = await JobServices.getJobsByFilter(validPage, validLimit, searchParams);
        setSearchPerformed(true);
      } else {
        // console.log('📋 Loading recent jobs');
        response = await JobServices.getRecentJobs(validPage, validLimit);
        setSearchPerformed(false);
      }
      
      const jobsData = Array.isArray(response?.data) ? response.data : [];
      const totalJobsCount = parseInt(response?.pagination?.totalItems) || 0;
      const totalPagesCount = parseInt(response?.pagination?.totalPages) || Math.ceil(totalJobsCount / validLimit);
      
      setJobs(jobsData);
      setTotalJobs(totalJobsCount);
      setNoResults(jobsData.length === 0);
      
      setPagination(prev => ({
        ...prev,
        ...(resetPage && { page: 1 }),
        ...(validLimit !== prev.limit && { limit: validLimit }),
        totalPages: totalPagesCount
      }));
      
      // console.log(`✅ Loaded ${jobsData.length} jobs (${totalJobsCount} total)`);
      
    } catch (error) {
      console.error('❌ fetchJobsData failed:', error);
      setError('Failed to load jobs. Please try again.');
      setJobs([]);
      setTotalJobs(0);
      setNoResults(true);
    } finally {
      setLoading(false);
    }
  };
  
  // 🔍 Search Functions
  const handleSearchTermChange = (e) => {
    const value = sanitizeInput(e.target.value);
    setSearchTerm(value);
    setError("");
  };

  const handleSearch = async () => {
    // console.log('🔍 Search triggered');
    
    await fetchJobsData({
      page: 1,
      useFilters: true,
      resetPage: true
    });
  };

  // 🎛️ Filter Functions
  const handleFiltersChange = (newFilters) => {
    // console.log('🎛️ Filters changed:', newFilters);
    setFilters(newFilters);
    setError("");
  };

  const handleClearAllFilters = async () => {
    // console.log('🧹 Clearing all filters');
    
    setSearchTerm("");
    setFilters(InitialFilters);
    setError("");
    setSearchPerformed(false);
    setNoResults(false);
    
    await fetchJobsData({
      page: 1,
      useFilters: false,
      resetPage: true
    });
  };

  // 📄 Pagination Functions
  const handlePageChange = async (newPage, newLimit) => {
    // console.log('📄 Page change to:', newPage, 'Limit:', newLimit);
    
    const { page: validPage, limit: validLimit } = validatePagination(newPage, newLimit);
    
    setPagination(prev => ({
      ...prev,
      page: newLimit ? 1 : validPage,
      ...(newLimit && { limit: validLimit })
    }));
    
    await fetchJobsData({
      page: newLimit ? 1 : validPage,
      limit: validLimit,
      useFilters: searchPerformed
    });
  };

  const loadInitialData = async () => {
    // console.log('📊 Loading initial data');
    await fetchJobsData({
      page: 1,
      limit: pagination.limit,
      useFilters: false
    });
  };

  const handleErrorClose = () => {
    setError("");
  };
  
  useEffect(() => {
    // ensure page is at top when navigating to /jobs
    window.scrollTo({ top: 0, behavior: 'smooth' });
    loadInitialData();
  }, []); // Only run on component mount

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-black text-white py-12 text-center">
        <h1 className="text-4xl font-bold">Jobs</h1>
        <p className="mt-2 text-gray-300">Find your dream job today</p>
      </div>

      <AlertDisplay 
        message={error}
        onClose={handleErrorClose}
        variant="error"
        show={!!error}
      />

      <JobSearch
        searchTerm={searchTerm}
        onSearchTermChange={handleSearchTermChange}
        onSearch={handleSearch}
        
        filters={filters}
        setFilters={setFilters}
        onFiltersChange={handleFiltersChange}
        handleClearFilters={handleClearAllFilters}
        
        jobs={jobs}
        totalJobs={totalJobs}
        jobCount={totalJobs}
        
        pagination={pagination}
        handlePageChange={handlePageChange}
        startItem={startItem}
        endItem={endItem}
        
        loading={loading}
        error={error}
        noResults={noResults}
        searchPerformed={searchPerformed}
        hasActiveFilters={hasActiveFilters}
      />
      <WeAreHiring loading={loading} />
      <TopCompanies loading={loading} />
    </div>
  )
}