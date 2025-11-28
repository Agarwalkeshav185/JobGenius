import React , {useState, useEffect} from 'react';
import { FaBriefcase, FaFileAlt, FaEye, FaHeart } from 'react-icons/fa';
import RecentApplications from '../../../Components/Layout/JobSeekerDashBoard/RecentApplications';
import applicationServices from '../../../Services/applyServices';

const JobSeekerDashboard = () => {
  const [recentApplications, setRecentApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    appliedJobs: 0,
    jobAlerts: 5,
    profileViews: 48,
    savedJobs: 0,
  });

  const fetchRecentApplications = async () =>{
      try{
        setLoading(true);
        setError(null);

        const response = await applicationServices.getSeekerApplicationsById();

        if(response.success){
          const applications = response.applications || [];
          setRecentApplications(applications);

          setStats(prevStats => ({
            ...prevStats,
            appliedJobs : applications.length,
          }));
        }else{
          throw new Error(response.message || "Failed to fetch applications");
        }
      }catch(error){
        // console.log("Error in Fetching the Applications");
        setError(error.message || 'Failed to load applications');
        // alert('Failed to load applications. Please try again.');
      }
      finally{
        setLoading(false);
      }
  };

  // Handle withdraw application
  const handleWithdraw = async (applicationId) => {
    try {
      console.log('Withdrawing application:', applicationId);

      const response = await applicationServices.WithdrawApplication(applicationId);

      if (response.success) {
        alert('Application withdrawn successfully!');
        
        // Refresh applications list
        await fetchRecentApplications();
      } else {
        throw new Error(response.message || 'Failed to withdraw application');
      }
    } catch (error) {
      console.error('Error withdrawing application:', error);
      alert(error.message || 'Failed to withdraw application. Please try again.');
      throw error; // Re-throw so child component knows it failed
    }
  };

  // Stats cards configuration
  const statsCards = [
    { label: 'Applied Jobs', value: stats.appliedJobs, icon: FaFileAlt, color: 'blue' },
    { label: 'Job Alerts', value: stats.jobAlerts, icon: FaBriefcase, color: 'green' },
    { label: 'Profile Views', value: stats.profileViews, icon: FaEye, color: 'purple' },
    { label: 'Saved Jobs', value: stats.savedJobs, icon: FaHeart, color: 'red' },
  ];

  useEffect(()=>{
    fetchRecentApplications();
  },[]);


  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        {!loading && (
          <button
            onClick={fetchRecentApplications}
            className="text-sm text-teal-600 hover:text-teal-700 font-medium"
          >
            Refresh
          </button>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600">{error}</p>
          <button
            onClick={fetchRecentApplications}
            className="mt-2 text-sm text-red-700 underline"
          >
            Try again
          </button>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
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

      {/* Loading State */}
      {loading && (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading applications...</p>
        </div>
      )}

      {/* Recent Applications */}
      {!loading && (
        <RecentApplications 
          recentApplications={recentApplications}
          onWithdraw={handleWithdraw}
        />
      )}
    </div>
  );
};

export default JobSeekerDashboard;