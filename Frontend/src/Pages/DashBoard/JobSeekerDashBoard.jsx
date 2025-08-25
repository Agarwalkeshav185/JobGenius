import React from 'react';
import { FaBriefcase, FaFileAlt, FaEye, FaHeart } from 'react-icons/fa';

const JobSeekerDashboard = () => {
  const stats = [
    { label: 'Applied Jobs', value: '12', icon: FaFileAlt, color: 'blue' },
    { label: 'Job Alerts', value: '5', icon: FaBriefcase, color: 'green' },
    { label: 'Profile Views', value: '48', icon: FaEye, color: 'purple' },
    { label: 'Saved Jobs', value: '8', icon: FaHeart, color: 'red' },
  ];

  const recentApplications = [
    { id: 1, title: 'Frontend Developer', company: 'Tech Corp', status: 'Under Review', date: '2 days ago' },
    { id: 2, title: 'UX Designer', company: 'Design Studio', status: 'Interview', date: '5 days ago' },
    { id: 3, title: 'Full Stack Developer', company: 'StartupXYZ', status: 'Applied', date: '1 week ago' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center">
                <div className={`flex-shrink-0 p-3 rounded-full bg-${stat.color}-100`}>
                  <Icon className={`h-6 w-6 text-${stat.color}-600`} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Applications */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Recent Applications</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentApplications.map((application) => (
              <div key={application.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">{application.title}</h3>
                  <p className="text-sm text-gray-500">{application.company}</p>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {application.status}
                  </span>
                  <p className="text-sm text-gray-500 mt-1">{application.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobSeekerDashboard;