import React, { useState, useEffect } from 'react';
import EmployerServices from "../../../Services/EmployerServices";
import { useAuth } from '../../../Context/AuthContext';

const initialJob = {
  title: '',
  description: '',
  requirements: '',
  location: '',
  jobType: '',
  salaryMin: '',
  salaryMax: '',
  category: '',
  company: '',
  jobPostingDeadline: '',
  remote: false,
};

const jobTypes = ['Full-Time', 'Part-Time', 'Contract', 'Internship', 'Temporary', 'Remote'];

const CreateJob = () => {
  const { user, isJobSeeker } = useAuth();
  const [job, setJob] = useState(initialJob);
  const [requirementsList, setRequirementsList] = useState([]);
  const [requirementInput, setRequirementInput] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [hiringMultiple, setHiringMultiple] = useState(false);
  const [responsibilitiesList, setResponsibilitiesList] = useState([]);
  const [responsibilityInput, setResponsibilityInput] = useState('');
  const [offersList, setOffersList] = useState([]);
  const [offerInput, setOfferInput] = useState('');

  // Category states
  const [popularCategories, setPopularCategories] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [categorySearch, setCategorySearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [searchingCategories, setSearchingCategories] = useState(false);

  if (isJobSeeker() || !user) {
    return <div>Access Denied. Only Employer and Manager can post the jobs.</div>;
  }

  // Load popular categories on mount
  useEffect(() => {
    const loadPopularCategories = async () => {
      try {
        setLoadingCategories(true);
        const response = await EmployerServices.getPopularCategories();
        console.log("Popular Categories:", response);
        
        setPopularCategories(response.data || []);
      } catch (error) {
        console.error("Error fetching popular categories:", error);
        // Fallback to static categories
        setPopularCategories([
          { _id: 'temp1', name: 'Engineering', jobCount: 25 },
          { _id: 'temp2', name: 'Design', jobCount: 18 },
          { _id: 'temp3', name: 'Marketing', jobCount: 15 }
        ]);
      } finally {
        setLoadingCategories(false);
      }
    };

    loadPopularCategories();
  }, []);

  // Debounced search for categories
  useEffect(() => {
    if (categorySearch.trim() === '') {
      setSearchResults([]);
      return;
    }

    const timeoutId = setTimeout(async () => {
      try {
        setSearchingCategories(true);
        const response = await EmployerServices.searchCategories(categorySearch);
        setSearchResults(response || []);
      } catch (error) {
        console.error("Error searching categories:", error);
        setSearchResults([]);
      } finally {
        setSearchingCategories(false);
      }
    }, 600); // 600ms debounce

    return () => clearTimeout(timeoutId);
  }, [categorySearch]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setJob(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Handle category search input - Updated
  const handleCategorySearch = (e) => {
    const value = e.target.value;
    setCategorySearch(value);
    setShowDropdown(true);
    
    // Clear selected category if user is typing
    if (selectedCategory && value !== (selectedCategory.name || selectedCategory.categoryName)) {
      setSelectedCategory(null);
      setJob(prev => ({ ...prev, category: '' }));
    }
  };

  // Handle category selection - Updated
  const handleCategorySelect = (category) => {
    console.log("🎯 Category selected:", category);
    
    setSelectedCategory(category);
    setCategorySearch(category.name || category.categoryName);
    setJob(prev => ({ ...prev, category: category._id }));
    setShowDropdown(false);
    setSearchResults([]);
  };

  // Get categories to display (popular + search results)
  const getCategoriesToShow = () => {
    if (categorySearch.trim() === '') {
      return popularCategories;
    }
    
    // Filter popular categories that match search + search results
    const filteredPopular = popularCategories.filter(cat => 
      (cat.name || cat.categoryName).toLowerCase().includes(categorySearch.toLowerCase())
    );
    
    // Combine and remove duplicates
    const combined = [...filteredPopular, ...searchResults];
    const unique = combined.filter((cat, index, arr) => 
      arr.findIndex(c => c._id === cat._id) === index
    );
    
    return unique;
  };

  // Add requirement to list
  const handleAddRequirement = () => {
    if (requirementInput.trim()) {
      setRequirementsList(prev => [...prev, requirementInput.trim()]);
      setRequirementInput('');
    }
  };

  // Remove requirement
  const handleRemoveRequirement = (idx) => {
    setRequirementsList(prev => prev.filter((_, i) => i !== idx));
  };

  // Add responsibility to list
  const handleAddResponsibility = () => {
    if (responsibilityInput.trim()) {
      setResponsibilitiesList(prev => [...prev, responsibilityInput.trim()]);
      setResponsibilityInput('');
    }
  };

  // Remove responsibility
  const handleRemoveResponsibility = (idx) => {
    setResponsibilitiesList(prev => prev.filter((_, i) => i !== idx));
  };

  // Add offer to list
  const handleAddOffer = () => {
    if (offerInput.trim()) {
      setOffersList(prev => [...prev, offerInput.trim()]);
      setOfferInput('');
    }
  };

  // Remove offer
  const handleRemoveOffer = (idx) => {
    setOffersList(prev => prev.filter((_, i) => i !== idx));
  };

  // Reset form
  const resetForm = () => {
    setJob(initialJob);
    setRequirementsList([]);
    setResponsibilitiesList([]);
    setOffersList([]);
    setHiringMultiple(false);
    setRequirementInput('');
    setResponsibilityInput('');
    setOfferInput('');
    setCategorySearch('');
    setSelectedCategory(null);
    setSearchResults([]);
    setShowDropdown(false);
  };

  // Submit job
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!selectedCategory) {
      alert('Please select a category');
      return;
    }

    if (requirementsList.length === 0) {
      alert('Please add at least one requirement');
      return;
    }

    if (responsibilitiesList.length === 0) {
      alert('Please add at least one responsibility');
      return;
    }

    setSubmitting(true);
    
    const jobData = { 
      title: job.title,
      companyId: user?.companyId?._id || user?.companyId,
      categoryId: selectedCategory._id,
      categoryName: selectedCategory.name || selectedCategory.categoryName,
      location: job.location,
      jobType: job.jobType,
      minSalary: Number(job.salaryMin),
      maxSalary: Number(job.salaryMax),
      jobPostDeadline: job.jobPostingDeadline,
      introduction: job.description,
      responsibilities: responsibilitiesList,
      qualifications: requirementsList,
      offers: offersList,
      hiringMultipleCandidates: hiringMultiple ? 'Yes' : 'No'
    };

    try {
      // console.log('Sending job data:', jobData);
      const response = await EmployerServices.createJob(jobData);
      // console.log('Job creation response:', response);
      
      alert('Job posted successfully!');
      resetForm();
    } catch (error) {
      console.error('Error posting job:', error);
      const errorMessage = error.response?.data?.message || 'Failed to post job. Please try again.';
      alert(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const companyName = user?.companyId?.name || user?.companyName || "Company not found";

  // Add this useEffect to handle clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const dropdown = document.querySelector('.category-dropdown');
      const input = document.querySelector('.category-input');
      
      if (dropdown && !dropdown.contains(event.target) && !input.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6 my-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Create New Job</h2>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Job Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
          <input
            type="text"
            name="title"
            value={job.title}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
            placeholder="e.g. Frontend Developer"
          />
        </div>

        {/* Company Name (read-only) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
          <input
            type="text"
            name="company"
            value={companyName}
            readOnly
            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700"
          />
        </div>

        {/* Category - Search Dropdown */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={categorySearch}
            onChange={handleCategorySearch}
            onFocus={() => setShowDropdown(true)}
            placeholder={loadingCategories ? "Loading categories..." : "Search or select category..."}
            disabled={loadingCategories}
            className="category-input w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 disabled:bg-gray-100"
          />
          
          {/* Dropdown */}
          {showDropdown && (
            <div className="category-dropdown absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {categorySearch === '' && (
                <div className="px-3 py-2 text-sm text-gray-500 bg-gray-50">
                  Popular Categories
                </div>
              )}
              
              {searchingCategories ? (
                <div className="px-3 py-2 text-sm text-gray-500">
                  Searching...
                </div>
              ) : (
                <>
                  {getCategoriesToShow().length > 0 ? (
                    getCategoriesToShow().map(category => (
                      <div
                        key={category._id}
                        onMouseDown={(e) => e.preventDefault()} // Prevent blur when clicking
                        onClick={() => handleCategorySelect(category)}
                        className="px-3 py-2 hover:bg-teal-50 cursor-pointer border-b border-gray-100 last:border-0"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium">
                            {category.name || category.categoryName}
                          </span>
                          {category.jobCount && (
                            <span className="text-xs text-gray-500">
                              {category.jobCount} jobs
                            </span>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="px-3 py-2 text-sm text-gray-500">
                      {categorySearch ? 'No categories found' : 'No popular categories available'}
                    </div>
                  )}
                </>
              )}
            </div>
          )}
          
          {/* Selected category display */}
          {selectedCategory && (
            <div className="mt-1 text-sm text-green-600">
              ✓ Selected: {selectedCategory.name || selectedCategory.categoryName}
            </div>
          )}
        </div>

        {/* Location & Hiring Multiple */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input
              type="text"
              name="location"
              value={job.location}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
              placeholder="e.g. San Francisco, CA"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Hiring Multiple?</label>
            <button
              type="button"
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                hiringMultiple
                  ? 'bg-teal-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-teal-50'
              }`}
              onClick={() => setHiringMultiple((prev) => !prev)}
            >
              {hiringMultiple ? 'Yes' : 'No'}
            </button>
          </div>
        </div>

        {/* Job Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Job Type</label>
          <select
            name="jobType"
            value={job.jobType}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
          >
            <option value="">Select job type</option>
            {jobTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* Salary Range */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Salary Min</label>
            <input
              type="number"
              name="salaryMin"
              value={job.salaryMin}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
              placeholder="e.g. 80000"
              min="0"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Salary Max</label>
            <input
              type="number"
              name="salaryMax"
              value={job.salaryMax}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
              placeholder="e.g. 120000"
              min="0"
            />
          </div>
        </div>

        {/* Deadline */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Application Deadline</label>
          <input
            type="date"
            name="jobPostingDeadline"
            value={job.jobPostingDeadline}
            onChange={handleChange}
            required
            min={new Date().toISOString().split('T')[0]}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Job Description</label>
          <textarea
            name="description"
            value={job.description}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
            placeholder="Describe the job responsibilities and expectations..."
          />
        </div>

        {/* Requirements */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Requirements <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={requirementInput}
              onChange={e => setRequirementInput(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), handleAddRequirement())}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
              placeholder="e.g. React, Node.js"
            />
            <button
              type="button"
              onClick={handleAddRequirement}
              className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700"
            >
              Add
            </button>
          </div>
          {requirementsList.length > 0 && (
            <div className="mt-2">
              <span className="block text-sm text-gray-500 mb-1">Preview:</span>
              <ul className="text-gray-700">
                {requirementsList.map((req, idx) => (
                  <li key={idx} className="flex items-center justify-between mb-1">
                    <span className="flex items-center gap-2">
                      <span className="text-green-600 font-bold text-lg">&#10003;</span>
                      {req}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveRequirement(idx)}
                      className="ml-2 text-red-500 hover:text-red-700 text-xs"
                      title="Remove"
                    >
                      &times;
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Responsibilities */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Responsibilities <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={responsibilityInput}
              onChange={e => setResponsibilityInput(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), handleAddResponsibility())}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
              placeholder="e.g. Build UI components"
            />
            <button
              type="button"
              onClick={handleAddResponsibility}
              className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700"
            >
              Add
            </button>
          </div>
          {responsibilitiesList.length > 0 && (
            <div className="mt-2">
              <span className="block text-sm text-gray-500 mb-1">Preview:</span>
              <ul className="text-gray-700">
                {responsibilitiesList.map((resp, idx) => (
                  <li key={idx} className="flex items-center justify-between mb-1">
                    <span className="flex items-center gap-2">
                      <span className="text-green-600 font-bold text-lg">&#10003;</span>
                      {resp}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveResponsibility(idx)}
                      className="ml-2 text-red-500 hover:text-red-700 text-xs"
                      title="Remove"
                    >
                      &times;
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Offers / Perks */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Offers / Perks</label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={offerInput}
              onChange={e => setOfferInput(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), handleAddOffer())}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
              placeholder="e.g. Health Insurance, Remote Work, Gym Membership"
            />
            <button
              type="button"
              onClick={handleAddOffer}
              className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700"
            >
              Add
            </button>
          </div>
          {offersList.length > 0 && (
            <div className="mt-2">
              <span className="block text-sm text-gray-500 mb-1">Preview:</span>
              <ul className="text-gray-700">
                {offersList.map((offer, idx) => (
                  <li key={idx} className="flex items-center justify-between mb-1">
                    <span className="flex items-center gap-2">
                      <span className="text-green-600 font-bold text-lg">&#10003;</span>
                      {offer}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveOffer(idx)}
                      className="ml-2 text-red-500 hover:text-red-700 text-xs"
                      title="Remove"
                    >
                      &times;
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={submitting || !selectedCategory}
            className="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? 'Posting...' : 'Post Job'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateJob;