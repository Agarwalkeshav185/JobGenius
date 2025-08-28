import React, { useState, useEffect } from 'react';
import EmployerServices from '../../../Services/EmployerServices';
import JobFilterBar from '../../../Components/Layout/EmployerDashBoard/JobManagement/SearchJobComponent';
import JobTable from '../../../Components/Layout/EmployerDashBoard/JobManagement/JobTableComponent';
import AlertDisplay from '../../../Components/UI/AlertDisplay';
import { useAuth } from '../../../Context/AuthContext';

const JobManagement = () => {
  const { user } = useAuth();
  
  // State management
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Filter states
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalJobs, setTotalJobs] = useState(0);
  
  // Fetch jobs from API
  const fetchJobs = async (searchTerm = '', statusFilter = '', currentPage = 1) => {
    try {
      setLoading(true);
      setError('');
      
      const params = {
        page: currentPage,
        limit: 10,
        ...(searchTerm && { search: searchTerm }),
        ...(statusFilter && { status: statusFilter })
      };
      
      console.log('📡 Fetching jobs with params:', params);
      
      const response = await EmployerServices.getMyJobs(params);
      console.log('✅ Jobs response:', response.data);
      if (response.success) {
        setJobs(response.data || []);
        setTotalPages(response.pagination?.totalPages || 1);
        setTotalJobs(response.pagination?.totalItems || 0);
      } else {
        throw new Error(response.message || 'Failed to fetch jobs');
      }
    } catch (err) {
      console.error('❌ Error fetching jobs:', err);
      setError('Failed to fetch jobs. Please try again.');
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchJobs();
  }, []);


  // Handle search and filter changes with debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setPage(1);
      fetchJobs(search, filter, 1);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [search, filter]);

  // Handle pagination
  const handlePageChange = (newPage) => {
    setPage(newPage);
    fetchJobs(search, filter, newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle job actions
  const handleJobAction = async (jobId, action) => {
    try {
      let result;
      
      switch (action) {
        case 'delete':
          if (window.confirm('Are you sure you want to delete this job?')) {
            result = await EmployerServices.deleteJob(jobId);
            if (result.success) {
              fetchJobs(search, filter, page);
            }
          }
          break;
          
        case 'edit':
          window.location.href = `/dashboard/jobs/edit/${jobId}`;
          break;
          
        case 'pause':
          result = await EmployerServices.updateJobStatus(jobId, 'Paused');
          if (result.success) {
            fetchJobs(search, filter, page);
          }
          break;
          
        case 'activate':
          result = await EmployerServices.updateJobStatus(jobId, 'Open');
          if (result.success) {
            fetchJobs(search, filter, page);
          }
          break;
          
        case 'view-applications':
          window.location.href = `/dashboard/jobs/${jobId}/applications`;
          break;
          
        default:
          console.warn('Unknown action:', action);
      }
    } catch (err) {
      console.error(`❌ Error performing ${action}:`, err);
      setError(`Failed to ${action} job. Please try again.`);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Job Management</h1>
      </div>
      
      {/* Error Display */}
      <AlertDisplay 
        message={error} 
        onClose={() => setError('')} 
        variant="error"
      />
      
      {/* Filter Bar */}
      <JobFilterBar
        filter={filter}
        setFilter={setFilter}
        search={search}
        setSearch={setSearch}
        loading={loading}
      />
      
      {/* Stats */}
      {!loading && (
        <div className="mb-4 text-sm text-gray-600">
          Showing {jobs.length} of {totalJobs} jobs
          {(search || filter) && (
            <span className="ml-2">
              (filtered {search && `by "${search}"`} {filter && `• ${filter} status`})
            </span>
          )}
        </div>
      )}
      
      {/* Jobs Table - Using your reusable components */}
      <JobTable 
        jobs={jobs}
        loading={loading}
        onJobAction={handleJobAction}
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        emptyMessage={
          jobs.length === 0 && !loading 
            ? (search || filter) 
              ? 'No jobs match your search criteria' 
              : 'No jobs posted yet. Create your first job!'
            : null
        }
      />
    </div>
  );
};

export default JobManagement;