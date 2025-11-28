import React, { useState, useEffect } from 'react';
import { 
  FaBell, 
  FaBellSlash, 
  FaBuilding, 
  FaSearch, 
  FaFilter, 
  FaPlus, 
  FaTimes, 
  FaEdit, 
  FaSave, 
  FaTrash, 
  FaSpinner,
  FaCheckCircle,
  FaExclamationTriangle,
  FaMapMarkerAlt,
  FaBriefcase,
  FaDollarSign,
  FaClock,
  FaTag
} from 'react-icons/fa';

// Mock job alerts data
const mockJobAlerts = {
  1: {
    id: 1,
    title: 'Frontend Developer - React',
    company: 'Google',
    companyLogo: '/api/placeholder/40/40', // Using placeholder instead of external service
    location: 'Mountain View, CA',
    jobType: 'Full-time',
    salaryRange: '$120,000 - $180,000',
    keywords: ['React', 'JavaScript', 'TypeScript', 'Frontend'],
    frequency: 'Daily',
    isActive: true,
    alertsCount: 12,
    lastAlert: '2024-08-18T10:30:00Z',
    createdAt: '2024-08-01T09:00:00Z'
  },
  2: {
    id: 2,
    title: 'Full Stack Developer',
    company: 'Microsoft',
    companyLogo: '/api/placeholder/40/40',
    location: 'Seattle, WA',
    jobType: 'Full-time',
    salaryRange: '$110,000 - $160,000',
    keywords: ['Node.js', 'React', 'Azure', 'Full Stack'],
    frequency: 'Weekly',
    isActive: true,
    alertsCount: 8,
    lastAlert: '2024-08-17T14:15:00Z',
    createdAt: '2024-07-15T11:20:00Z'
  },
  3: {
    id: 3,
    title: 'Software Engineer',
    company: 'Meta',
    companyLogo: '/api/placeholder/40/40',
    location: 'Menlo Park, CA',
    jobType: 'Full-time',
    salaryRange: '$130,000 - $200,000',
    keywords: ['Python', 'Machine Learning', 'AI', 'Backend'],
    frequency: 'Daily',
    isActive: false,
    alertsCount: 5,
    lastAlert: '2024-08-10T16:45:00Z',
    createdAt: '2024-07-20T13:30:00Z'
  },
  4: {
    id: 4,
    title: 'DevOps Engineer',
    company: 'Amazon',
    companyLogo: '/api/placeholder/40/40',
    location: 'Austin, TX',
    jobType: 'Full-time',
    salaryRange: '$100,000 - $150,000',
    keywords: ['AWS', 'Docker', 'Kubernetes', 'CI/CD'],
    frequency: 'Weekly',
    isActive: true,
    alertsCount: 15,
    lastAlert: '2024-08-19T08:20:00Z',
    createdAt: '2024-06-25T10:10:00Z'
  },
  5: {
    id: 5,
    title: 'UI/UX Designer',
    company: 'Apple',
    companyLogo: '/api/placeholder/40/40',
    location: 'Cupertino, CA',
    jobType: 'Contract',
    salaryRange: '$80,000 - $120,000',
    keywords: ['Figma', 'Design Systems', 'Prototyping', 'UI/UX'],
    frequency: 'Daily',
    isActive: true,
    alertsCount: 6,
    lastAlert: '2024-08-18T12:00:00Z',
    createdAt: '2024-08-05T15:45:00Z'
  },
  6: {
    id: 6,
    title: 'Data Scientist',
    company: 'Netflix',
    companyLogo: '/api/placeholder/40/40',
    location: 'Los Gatos, CA',
    jobType: 'Full-time',
    salaryRange: '$140,000 - $190,000',
    keywords: ['Python', 'R', 'Machine Learning', 'Statistics'],
    frequency: 'Weekly',
    isActive: false,
    alertsCount: 3,
    lastAlert: '2024-08-12T09:30:00Z',
    createdAt: '2024-07-08T14:20:00Z'
  }
};

const JobAlerts = () => {
  const [jobAlerts, setJobAlerts] = useState(mockJobAlerts);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all'); // all, active, inactive
  const [showFilters, setShowFilters] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingAlert, setEditingAlert] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [imageErrors, setImageErrors] = useState({}); // Track failed images

  // New alert form data
  const [newAlert, setNewAlert] = useState({
    title: '',
    company: '',
    location: '',
    jobType: 'Full-time',
    salaryMin: '',
    salaryMax: '',
    keywords: '',
    frequency: 'Daily'
  });

  // Company Logo Component with proper fallback
  const CompanyLogo = ({ company, className = "w-10 h-10 rounded-lg" }) => {
    const [showFallback, setShowFallback] = useState(false);
    
    if (showFallback) {
      // Return a styled div with company initial
      return (
        <div className={`${className} bg-teal-100 flex items-center justify-center text-teal-600 font-semibold`}>
          {company.charAt(0).toUpperCase()}
        </div>
      );
    }

    return (
      <img 
        src={`https://via.placeholder.com/40x40/14b8a6/ffffff?text=${company.charAt(0)}`}
        alt={`${company} logo`}
        className={`${className} object-cover`}
        onError={() => setShowFallback(true)}
        onLoad={() => setShowFallback(false)}
      />
    );
  };

  // Filter options
  const statusOptions = [
    { value: 'all', label: 'All Alerts' },
    { value: 'active', label: 'Active Only' },
    { value: 'inactive', label: 'Inactive Only' }
  ];

  const frequencyOptions = [
    { value: 'Daily', label: 'Daily' },
    { value: 'Weekly', label: 'Weekly' },
    { value: 'Monthly', label: 'Monthly' }
  ];

  const jobTypeOptions = [
    'Full-time',
    'Part-time',
    'Contract',
    'Freelance',
    'Internship'
  ];

  // Filter alerts based on search and status
  const filteredAlerts = Object.values(jobAlerts).filter(alert => {
    const matchesSearch = !searchTerm || 
      alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = filterStatus === 'all' || 
      (filterStatus === 'active' && alert.isActive) ||
      (filterStatus === 'inactive' && !alert.isActive);

    return matchesSearch && matchesStatus;
  });

  // Clear messages after 5 seconds
  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess('');
        setError('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [success, error]);

  // Handle search
  const handleSearch = () => {
    // Search is handled automatically via filteredAlerts
    setSuccess('Search updated!');
  };

  // Handle key press in search
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Toggle alert status
  const toggleAlertStatus = async (alertId) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setJobAlerts(prev => ({
        ...prev,
        [alertId]: {
          ...prev[alertId],
          isActive: !prev[alertId].isActive
        }
      }));
      
      const alert = jobAlerts[alertId];
      setSuccess(`Alert "${alert.title}" ${alert.isActive ? 'deactivated' : 'activated'} successfully!`);
    } catch (err) {
      setError('Failed to update alert status');
    } finally {
      setLoading(false);
    }
  };

  // Delete alert
  const deleteAlert = async (alertId) => {
    if (!window.confirm('Are you sure you want to delete this job alert?')) {
      return;
    }

    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const alertTitle = jobAlerts[alertId].title;
      const newAlerts = { ...jobAlerts };
      delete newAlerts[alertId];
      setJobAlerts(newAlerts);
      
      setSuccess(`Alert "${alertTitle}" deleted successfully!`);
    } catch (err) {
      setError('Failed to delete alert');
    } finally {
      setLoading(false);
    }
  };

  // Handle new alert form input
  const handleNewAlertChange = (e) => {
    const { name, value } = e.target;
    setNewAlert(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Create new alert
  const createAlert = async () => {
    if (!newAlert.title.trim()) {
      setError('Job title is required');
      return;
    }

    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newId = Math.max(...Object.keys(jobAlerts).map(Number)) + 1;
      const alertData = {
        id: newId,
        title: newAlert.title,
        company: newAlert.company || 'Any Company',
        companyLogo: '', // Will be handled by CompanyLogo component
        location: newAlert.location || 'Any Location',
        jobType: newAlert.jobType,
        salaryRange: newAlert.salaryMin && newAlert.salaryMax 
          ? `$${newAlert.salaryMin} - $${newAlert.salaryMax}` 
          : 'Not specified',
        keywords: newAlert.keywords ? newAlert.keywords.split(',').map(k => k.trim()) : [],
        frequency: newAlert.frequency,
        isActive: true,
        alertsCount: 0,
        lastAlert: null,
        createdAt: new Date().toISOString()
      };

      setJobAlerts(prev => ({
        ...prev,
        [newId]: alertData
      }));

      setNewAlert({
        title: '',
        company: '',
        location: '',
        jobType: 'Full-time',
        salaryMin: '',
        salaryMax: '',
        keywords: '',
        frequency: 'Daily'
      });

      setShowCreateModal(false);
      setSuccess('Job alert created successfully!');
    } catch (err) {
      setError('Failed to create alert');
    } finally {
      setLoading(false);
    }
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'Never';
    
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return '1 day ago';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Job Alerts</h1>
          <p className="text-gray-600 mt-1">
            {filteredAlerts.length > 0 
              ? `${filteredAlerts.length} alert${filteredAlerts.length !== 1 ? 's' : ''} found`
              : 'No alerts configured yet'
            }
          </p>
        </div>
        
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg transition-colors mt-4 md:mt-0"
        >
          <FaPlus />
          Create Alert
        </button>
      </div>

      {/* Success/Error Messages */}
      {success && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
          <FaCheckCircle className="text-green-600" />
          <p className="text-green-800">{success}</p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
          <FaExclamationTriangle className="text-red-600" />
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Bar */}
          <div className="flex-1">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by job title, company, or keywords..."
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
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
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

      {/* Job Alerts Grid */}
      {filteredAlerts.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <div className="text-gray-400 text-4xl mb-4">🔔</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No job alerts found</h3>
          <p className="text-gray-600 mb-6">
            {searchTerm || filterStatus !== 'all' 
              ? 'No alerts match your search criteria. Try adjusting your filters.' 
              : 'Create your first job alert to get notified about relevant opportunities.'}
          </p>
          {!searchTerm && filterStatus === 'all' && (
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Create Your First Alert
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAlerts.map((alert) => (
            <div 
              key={alert.id} 
              className={`bg-white rounded-lg shadow hover:shadow-md transition-shadow p-6 border-l-4 ${
                alert.isActive ? 'border-green-500' : 'border-gray-300'
              }`}
            >
              {/* Alert Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <CompanyLogo company={alert.company} />
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm">{alert.title}</h3>
                    <p className="text-gray-600 text-sm">{alert.company}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleAlertStatus(alert.id)}
                    className={`p-1 rounded ${
                      alert.isActive 
                        ? 'text-green-600 hover:bg-green-50' 
                        : 'text-gray-400 hover:bg-gray-50'
                    }`}
                    title={alert.isActive ? 'Deactivate Alert' : 'Activate Alert'}
                  >
                    {alert.isActive ? <FaBell /> : <FaBellSlash />}
                  </button>
                  <button
                    onClick={() => deleteAlert(alert.id)}
                    className="p-1 text-red-500 hover:bg-red-50 rounded"
                    title="Delete Alert"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>

              {/* Alert Details */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FaMapMarkerAlt className="text-gray-400" />
                  {alert.location}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FaBriefcase className="text-gray-400" />
                  {alert.jobType}
                </div>
                {alert.salaryRange !== 'Not specified' && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <FaDollarSign className="text-gray-400" />
                    {alert.salaryRange}
                  </div>
                )}
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FaClock className="text-gray-400" />
                  {alert.frequency} notifications
                </div>
              </div>

              {/* Keywords */}
              {alert.keywords.length > 0 && (
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {alert.keywords.slice(0, 3).map((keyword, index) => (
                      <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-teal-100 text-teal-800">
                        {keyword}
                      </span>
                    ))}
                    {alert.keywords.length > 3 && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                        +{alert.keywords.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Alert Stats */}
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <span>{alert.alertsCount} alerts received</span>
                  <span>Last: {formatDate(alert.lastAlert)}</span>
                </div>
              </div>

              {/* Status Badge */}
              <div className="mt-3">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  alert.isActive 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {alert.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Alert Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Create Job Alert</h2>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FaTimes />
                </button>
              </div>

              <div className="space-y-4">
                {/* Job Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={newAlert.title}
                    onChange={handleNewAlertChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="e.g., Frontend Developer"
                  />
                </div>

                {/* Company */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company (Optional)
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={newAlert.company}
                    onChange={handleNewAlertChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="Leave blank for any company"
                  />
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location (Optional)
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={newAlert.location}
                    onChange={handleNewAlertChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="e.g., New York, NY"
                  />
                </div>

                {/* Job Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Type
                  </label>
                  <select
                    name="jobType"
                    value={newAlert.jobType}
                    onChange={handleNewAlertChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  >
                    {jobTypeOptions.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                {/* Salary Range */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Min Salary
                    </label>
                    <input
                      type="number"
                      name="salaryMin"
                      value={newAlert.salaryMin}
                      onChange={handleNewAlertChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="50000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Max Salary
                    </label>
                    <input
                      type="number"
                      name="salaryMax"
                      value={newAlert.salaryMax}
                      onChange={handleNewAlertChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="100000"
                    />
                  </div>
                </div>

                {/* Keywords */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Keywords (Optional)
                  </label>
                  <input
                    type="text"
                    name="keywords"
                    value={newAlert.keywords}
                    onChange={handleNewAlertChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="React, JavaScript, TypeScript (comma separated)"
                  />
                </div>

                {/* Frequency */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notification Frequency
                  </label>
                  <select
                    name="frequency"
                    value={newAlert.frequency}
                    onChange={handleNewAlertChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  >
                    {frequencyOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex gap-3 mt-6">
                <button
                  onClick={createAlert}
                  disabled={loading}
                  className="flex-1 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? <FaSpinner className="animate-spin" /> : <FaSave />}
                  {loading ? 'Creating...' : 'Create Alert'}
                </button>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Demo Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <div className="text-blue-600 mt-1">ℹ️</div>
          <div>
            <h4 className="text-blue-900 font-medium">Demo Mode</h4>
            <p className="text-blue-800 text-sm mt-1">
              This Job Alerts page is using static mock data for UI testing. 
              All interactions work including creating, activating/deactivating, and deleting alerts, 
              but changes are only simulated and will reset on page refresh.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobAlerts;
