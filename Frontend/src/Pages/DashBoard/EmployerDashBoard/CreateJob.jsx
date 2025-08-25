import React, { useState } from 'react';

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
  deadline: '',
  remote: false,
};
const companies = [
  "Tech Corp",
  "InnovateX",
  "Designify",
  "MarketHub",
  "SalesForce",
  "HR Solutions"
];

const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Internship', 'Temporary'];
const categories = ['Engineering', 'Design', 'Product', 'Marketing', 'Sales', 'HR', 'Other'];

const CreateJob = () => {
  const [job, setJob] = useState(initialJob);
  const [requirementsList, setRequirementsList] = useState([]);
  const [requirementInput, setRequirementInput] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setJob(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
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

  // Submit job (mock)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    // Combine requirements
    const jobData = { ...job, requirements: requirementsList };
    // TODO: Send jobData to backend API
    setTimeout(() => {
      alert('Job posted successfully!');
      setJob(initialJob);
      setRequirementsList([]);
      setSubmitting(false);
    }, 1200);
  };

  // Example: get company name from context or props
  const companyName = "Tech Corp"; // Replace with actual context/prop value

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

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select
            name="category"
            value={job.category}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
          >
            <option value="">Select category</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Location & Remote */}
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
          <div className="flex items-center mt-6 md:mt-0">
            <input
              type="checkbox"
              name="remote"
              checked={job.remote}
              onChange={handleChange}
              className="mr-2"
            />
            <label className="text-sm text-gray-700">Remote</label>
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
            name="deadline"
            value={job.deadline}
            onChange={handleChange}
            required
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
          <label className="block text-sm font-medium text-gray-700 mb-1">Requirements</label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={requirementInput}
              onChange={e => setRequirementInput(e.target.value)}
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
          {/* Preview as tick list with remove button */}
          {requirementsList.length > 0 && (
            <div className="mt-2">
              <span className="block text-sm text-gray-500 mb-1">Preview:</span>
              <ul className="text-gray-700">
                {requirementsList.map((req, idx) => (
                  <li key={idx} className="flex items-center justify-between mb-1">
                    <span className="flex items-center gap-2">
                      {/* Tick icon */}
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

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition"
          >
            {submitting ? 'Posting...' : 'Post Job'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateJob;