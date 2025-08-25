import React, { useState } from 'react';

// Mock jobs and candidates data
const jobsWithCandidates = [
  {
    id: 1,
    title: 'Senior Frontend Developer',
    candidates: [
      {
        id: 101,
        name: 'Sarah Johnson',
        experience: '5 years',
        skills: ['React', 'TypeScript', 'Node.js'],
        appliedDate: '2025-08-21',
        status: 'Shortlisted',
        rating: 4.8,
      },
      {
        id: 102,
        name: 'Emily Rodriguez',
        experience: '4 years',
        skills: ['Figma', 'User Research', 'Prototyping'],
        appliedDate: '2025-08-22',
        status: 'Applied',
        rating: 4.7,
      },
    ],
  },
  {
    id: 2,
    title: 'Product Manager',
    candidates: [
      {
        id: 201,
        name: 'Michael Chen',
        experience: '7 years',
        skills: ['Strategy', 'Analytics', 'Leadership'],
        appliedDate: '2025-08-20',
        status: 'Interviewed',
        rating: 4.9,
      },
    ],
  },
  {
    id: 3,
    title: 'UX/UI Designer',
    candidates: [],
  },
];

const statusColors = {
  Applied: 'bg-gray-100 text-gray-800',
  Shortlisted: 'bg-green-100 text-green-800',
  Interviewed: 'bg-blue-100 text-blue-800',
  Rejected: 'bg-red-100 text-red-800',
};

function CandidateCard({ candidate }) {
  return (
    <div className="bg-white rounded-lg shadow p-4 mb-4 flex flex-col md:flex-row md:items-center justify-between">
      <div>
        <div className="font-bold text-teal-700">{candidate.name}</div>
        <div className="text-sm text-gray-500 mb-1">{candidate.experience} experience</div>
        <div className="flex flex-wrap gap-2 mb-1">
          {candidate.skills.map(skill => (
            <span key={skill} className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-xs">{skill}</span>
          ))}
        </div>
        <div className="text-xs text-gray-400">Applied: {candidate.appliedDate}</div>
      </div>
      <div className="flex flex-col items-end gap-2 mt-2 md:mt-0">
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColors[candidate.status]}`}>
          {candidate.status}
        </span>
        <span className="flex items-center gap-1 text-yellow-500 font-semibold">
          ★ {candidate.rating}
        </span>
        <div className="flex gap-2 mt-2">
          <button className="bg-blue-50 text-blue-700 px-3 py-1 rounded hover:bg-blue-100 text-xs font-medium">View</button>
          <button className="bg-green-50 text-green-700 px-3 py-1 rounded hover:bg-green-100 text-xs font-medium">Shortlist</button>
          <button className="bg-red-50 text-red-700 px-3 py-1 rounded hover:bg-red-100 text-xs font-medium">Reject</button>
        </div>
      </div>
    </div>
  );
}

const ViewCandidates = () => {
  const [selectedJobId, setSelectedJobId] = useState(jobsWithCandidates[0]?.id || null);

  const selectedJob = jobsWithCandidates.find(job => job.id === selectedJobId);

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-extrabold text-teal-700 mb-2">View Candidates</h2>
      <p className="text-gray-500 mb-6">Select a job to view and manage its candidates.</p>
      {/* Job Selector */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-2">Select Job</label>
        <select
          value={selectedJobId}
          onChange={e => setSelectedJobId(Number(e.target.value))}
          className="w-full md:w-1/2 px-4 py-2 border border-teal-200 rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500"
        >
          {jobsWithCandidates.map(job => (
            <option key={job.id} value={job.id}>{job.title}</option>
          ))}
        </select>
      </div>
      {/* Candidates List */}
      <div>
        {selectedJob && selectedJob.candidates.length > 0 ? (
          selectedJob.candidates.map(candidate => (
            <CandidateCard key={candidate.id} candidate={candidate} />
          ))
        ) : (
          <div className="text-gray-400 text-center py-10 font-semibold">
            No candidates have applied for this job yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewCandidates;