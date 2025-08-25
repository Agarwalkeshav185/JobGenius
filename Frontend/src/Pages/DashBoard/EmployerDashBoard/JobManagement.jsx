import React, { useState } from 'react';

// Mock job data
const mockJobs = [
  {
    id: 1,
    title: 'Senior Frontend Developer',
    status: 'Active',
    applicants: 42,
    posted: '2025-08-20',
    location: 'Remote',
    category: 'Engineering',
  },
  {
    id: 2,
    title: 'Product Manager',
    status: 'Draft',
    applicants: 28,
    posted: '2025-08-15',
    location: 'New York, NY',
    category: 'Product',
  },
  {
    id: 3,
    title: 'UX/UI Designer',
    status: 'Paused',
    applicants: 35,
    posted: '2025-08-10',
    location: 'San Francisco, CA',
    category: 'Design',
  },
  {
    id: 4,
    title: 'DevOps Engineer',
    status: 'Closed',
    applicants: 19,
    posted: '2025-08-05',
    location: 'Austin, TX',
    category: 'Engineering',
  },
];

// Status chip colors
const statusColors = {
  Active: 'bg-green-100 text-green-800',
  Draft: 'bg-yellow-100 text-yellow-800',
  Paused: 'bg-red-100 text-red-800',
  Closed: 'bg-gray-100 text-gray-800',
};

// Job Table Row Component
function JobTableRow({ job, onView, onEdit, onDelete, onStatusChange }) {
  return (
    <tr className="hover:bg-gray-50 transition">
      <td className="px-4 py-4 font-semibold text-gray-900">{job.title}</td>
      <td className="px-4 py-4 text-gray-700">{job.category}</td>
      <td className="px-4 py-4 text-gray-700">{job.location}</td>
      <td className="px-4 py-4">
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColors[job.status]} shadow`}>
          {job.status}
        </span>
      </td>
      <td className="px-4 py-4 text-center font-medium text-teal-700">{job.applicants}</td>
      <td className="px-4 py-4 text-gray-500">{job.posted}</td>
      <td className="px-4 py-4 flex gap-2">
        <button
          className="bg-teal-50 text-teal-700 px-3 py-1 rounded hover:bg-teal-100 transition font-medium"
          onClick={() => onView(job.id)}
          title="View"
        >
          View
        </button>
        <button
          className="bg-blue-50 text-blue-700 px-3 py-1 rounded hover:bg-blue-100 transition font-medium"
          onClick={() => onEdit(job.id)}
          title="Edit"
        >
          Edit
        </button>
        <button
          className="bg-yellow-50 text-yellow-700 px-3 py-1 rounded hover:bg-yellow-100 transition font-medium"
          onClick={() => onStatusChange(job.id)}
          title="Change Status"
        >
          Status
        </button>
        <button
          className="bg-red-50 text-red-700 px-3 py-1 rounded hover:bg-red-100 transition font-medium"
          onClick={() => onDelete(job.id)}
          title="Delete"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

// Job Table Component
function JobTable({ jobs, onView, onEdit, onDelete, onStatusChange }) {
  return (
    <div className="overflow-x-auto rounded-xl shadow-lg bg-white">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gradient-to-r from-teal-50 to-blue-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-bold text-teal-700 uppercase">Title</th>
            <th className="px-4 py-3 text-left text-xs font-bold text-teal-700 uppercase">Category</th>
            <th className="px-4 py-3 text-left text-xs font-bold text-teal-700 uppercase">Location</th>
            <th className="px-4 py-3 text-left text-xs font-bold text-teal-700 uppercase">Status</th>
            <th className="px-4 py-3 text-center text-xs font-bold text-teal-700 uppercase">Applicants</th>
            <th className="px-4 py-3 text-left text-xs font-bold text-teal-700 uppercase">Posted</th>
            <th className="px-4 py-3 text-left text-xs font-bold text-teal-700 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.length === 0 ? (
            <tr>
              <td colSpan={7} className="text-center py-8 text-gray-400 font-semibold">
                No jobs found.
              </td>
            </tr>
          ) : (
            jobs.map(job => (
              <JobTableRow
                key={job.id}
                job={job}
                onView={onView}
                onEdit={onEdit}
                onDelete={onDelete}
                onStatusChange={onStatusChange}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

// Filter/Search Bar Component
function JobFilterBar({ filter, setFilter, search, setSearch }) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <input
        type="text"
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="🔍 Search jobs by title..."
        className="px-4 py-2 border border-teal-200 rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500 flex-1"
      />
      <select
        value={filter}
        onChange={e => setFilter(e.target.value)}
        className="px-4 py-2 border border-teal-200 rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500"
      >
        <option value="">All Status</option>
        <option value="Active">Active</option>
        <option value="Draft">Draft</option>
        <option value="Paused">Paused</option>
        <option value="Closed">Closed</option>
      </select>
    </div>
  );
}

// Main Job Management Page
const JobManagement = () => {
  const [jobs, setJobs] = useState(mockJobs);
  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState('');

  // Actions
  const handleView = (id) => {
    alert(`View job ${id}`);
    // Navigate to job details page
  };
  const handleEdit = (id) => {
    alert(`Edit job ${id}`);
    // Navigate to job edit page
  };
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      setJobs(jobs.filter(job => job.id !== id));
    }
  };
  const handleStatusChange = (id) => {
    setJobs(jobs.map(job => {
      if (job.id === id) {
        // Cycle through statuses for demo
        const statusOrder = ['Active', 'Paused', 'Closed', 'Draft'];
        const nextStatus = statusOrder[(statusOrder.indexOf(job.status) + 1) % statusOrder.length];
        return { ...job, status: nextStatus };
      }
      return job;
    }));
  };

  // Filter and search logic
  const filteredJobs = jobs.filter(job => {
    const matchesFilter = filter ? job.status === filter : true;
    const matchesSearch = job.title.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-teal-700 tracking-tight mb-2">Manage Jobs</h2>
        <p className="text-gray-500 text-base">View, edit, and manage all your posted jobs in one place.</p>
      </div>
      <JobFilterBar
        filter={filter}
        setFilter={setFilter}
        search={search}
        setSearch={setSearch}
      />
      <JobTable
        jobs={filteredJobs}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
};

export default JobManagement;