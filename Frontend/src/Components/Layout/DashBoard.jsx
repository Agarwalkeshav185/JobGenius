import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaTachometerAlt, 
  FaBriefcase, 
  FaUser, 
  FaFileAlt, 
  FaCog, 
  FaSignOutAlt, 
  FaBars,
  FaTimes,
  FaBuilding,
  FaUsers,
  FaChartBar,
  FaPlus
} from 'react-icons/fa';
import { AuthContext } from '../../Context/AuthContext.jsx' // You'll need to create this

const DashboardLayout = ({ children, activeTab }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // Job Seeker Menu Items
  const jobSeekerMenuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: FaTachometerAlt, path: '/dashboard' },
    { id: 'find-jobs', label: 'Find Jobs', icon: FaBriefcase, path: '/dashboard/find-jobs' },
    { id: 'applied-jobs', label: 'Applied Jobs', icon: FaFileAlt, path: '/dashboard/applied-jobs' },
    { id: 'saved-jobs', label: 'Saved Jobs', icon: FaFileAlt, path: '/dashboard/saved-jobs' },
    { id: 'profile', label: 'My Profile', icon: FaUser, path: '/dashboard/profile' },
    { id: 'resume', label: 'Resume', icon: FaFileAlt, path: '/dashboard/resume' },
    { id: 'settings', label: 'Settings', icon: FaCog, path: '/dashboard/settings' },
  ];

  // Employer Menu Items
  const employerMenuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: FaTachometerAlt, path: '/dashboard' },
    { id: 'post-job', label: 'Post New Job', icon: FaPlus, path: '/dashboard/post-job' },
    { id: 'manage-jobs', label: 'Manage Jobs', icon: FaBriefcase, path: '/dashboard/manage-jobs' },
    { id: 'applications', label: 'Applications', icon: FaUsers, path: '/dashboard/applications' },
    { id: 'company-profile', label: 'Company Profile', icon: FaBuilding, path: '/dashboard/company-profile' },
    { id: 'analytics', label: 'Analytics', icon: FaChartBar, path: '/dashboard/analytics' },
    { id: 'settings', label: 'Settings', icon: FaCog, path: '/dashboard/settings' },
  ];

  const menuItems = user?.role === 'Job Seeker' ? jobSeekerMenuItems : employerMenuItems;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleMenuClick = (path) => {
    navigate(path);
    setSidebarOpen(false);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          <div className="flex items-center">
            <FaBriefcase className="h-8 w-8 text-[#14b8a6]" />
            <span className="ml-2 text-xl font-bold text-gray-800">JobGenius</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-2 rounded-md text-gray-400 lg:hidden hover:text-gray-600 hover:bg-gray-100"
          >
            <FaTimes className="h-6 w-6" />
          </button>
        </div>

        {/* User Info */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-10 w-10 rounded-full bg-[#14b8a6] flex items-center justify-center">
                <span className="text-white font-medium text-sm">
                  {user?.name?.charAt(0) || user?.companyName?.charAt(0)}
                </span>
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700">
                {user?.name || user?.companyName}
              </p>
              <p className="text-xs text-gray-500 capitalize">
                {user?.role}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="mt-4 px-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => handleMenuClick(item.path)}
                    className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                      activeTab === item.id
                        ? 'bg-[#14b8a6] text-white'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="mr-3 h-5 w-5" />
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-3 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition-colors"
          >
            <FaSignOutAlt className="mr-3 h-5 w-5" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden lg:ml-0">
        {/* Top Header */}
        <header className="flex items-center justify-between h-16 px-4 bg-white border-b border-gray-200 lg:px-6">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-md text-gray-400 lg:hidden hover:text-gray-600 hover:bg-gray-100"
          >
            <FaBars className="h-6 w-6" />
          </button>
          
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-700">
                Welcome back, {user?.name || user?.companyName}!
              </p>
              <p className="text-xs text-gray-500">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          {children}
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default DashboardLayout;