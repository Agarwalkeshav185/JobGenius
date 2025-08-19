import React from 'react';
import { FaBriefcase, FaUsers, FaEye, FaChartBar } from 'react-icons/fa';
import DashboardLayout from '../../Components/Layout/DashBoard.jsx';

const EmployerDashboard = () => {
  const stats = [
    { label: 'Active Jobs', value: '6', icon: FaBriefcase, color: 'blue' },
    { label: 'Total Applications', value: '142', icon: FaUsers, color: 'green' },
    { label: 'Profile Views', value: '1,234', icon: FaEye, color: 'purple' },
    { label: 'Interviews Scheduled', value: '8', icon: FaChartBar, color: 'red' },
  ];

  const recentJobs = [
    { id: 1, title: 'Senior React Developer', applications: 23, status: 'Active', date: '3 days ago' },
    { id: 2, title: 'Product Manager', applications: 18, status: 'Active', date: '1 week ago' },
    { id: 3, title: 'UI/UX Designer', applications: 31, status: 'Closed', date: '2 weeks ago' },
  ];

  return (
    <DashboardLayout activeTab="dashboard">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Employer Dashboard</h1>
        
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

        {/* Recent Job Posts */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Recent Job Posts</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentJobs.map((job) => (
                <div key={job.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">{job.title}</h3>
                    <p className="text-sm text-gray-500">{job.applications} applications</p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      job.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {job.status}
                    </span>
                    <p className="text-sm text-gray-500 mt-1">{job.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EmployerDashboard;