import React, { useState, useEffect } from 'react';
import { 
  Grid, 
  Paper, 
  Typography, 
  Box, 
  Card, 
  CardContent,
  LinearProgress,
  Chip,
  Avatar,
  IconButton,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Tooltip
} from '@mui/material';
import { 
  TrendingUp as TrendingUpIcon,
  WorkOutline as WorkOutlineIcon,
  PeopleAlt as PeopleAltIcon,
  Visibility as VisibilityIcon,
  Notifications as NotificationsIcon,
  MoreVert as MoreVertIcon,
  Launch as LaunchIcon,
  Edit as EditIcon,
  Person as PersonIcon,
  Business as BusinessCenterIcon, // Changed from BusinessCenterIcon to Business
  LocationOn as LocationOnIcon,
  Schedule as ScheduleIcon,
  PostAdd as PostAddIcon 
} from '@mui/icons-material';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart
} from 'recharts';
import { useAuth } from '../../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

const EmployerDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [dashboardStats, setDashboardStats] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock employer dashboard data
  useEffect(() => {
    const fetchEmployerData = async () => {
      setLoading(true);
      
      // Simulate API call delay
      setTimeout(() => {
        setDashboardStats({
          overview: {
            postedJobs: 18,
            activeJobs: 12,
            totalApplications: 247,
            companyViews: 1847,
            growthPercentage: {
              jobs: 15.2,
              applications: 28.5,
              views: 12.8
            }
          },
          recentJobs: [
            {
              id: 1,
              title: "Senior Frontend Developer",
              department: "Engineering",
              applicants: 42,
              status: "Active",
              posted: "2 days ago",
              salary: "$85k - $120k",
              location: "Remote",
              urgent: true
            },
            {
              id: 2,
              title: "Product Manager",
              department: "Product",
              applicants: 28,
              status: "Active",
              posted: "5 days ago",
              salary: "$95k - $130k",
              location: "New York, NY",
              urgent: false
            },
            {
              id: 3,
              title: "UX/UI Designer",
              department: "Design",
              applicants: 35,
              status: "Draft",
              posted: "1 week ago",
              salary: "$70k - $95k",
              location: "San Francisco, CA",
              urgent: false
            },
            {
              id: 4,
              title: "DevOps Engineer",
              department: "Engineering",
              applicants: 19,
              status: "Paused",
              posted: "3 days ago",
              salary: "$90k - $125k",
              location: "Austin, TX",
              urgent: false
            }
          ],
          topCandidates: [
            {
              id: 1,
              name: "Sarah Johnson",
              role: "Frontend Developer",
              experience: "5 years",
              rating: 4.8,
              appliedFor: "Senior Frontend Developer",
              avatar: null,
              skills: ["React", "TypeScript", "Node.js"]
            },
            {
              id: 2,
              name: "Michael Chen",
              role: "Product Manager",
              experience: "7 years",
              rating: 4.9,
              appliedFor: "Product Manager",
              avatar: null,
              skills: ["Strategy", "Analytics", "Leadership"]
            },
            {
              id: 3,
              name: "Emily Rodriguez",
              role: "UX Designer",
              experience: "4 years",
              rating: 4.7,
              appliedFor: "UX/UI Designer",
              avatar: null,
              skills: ["Figma", "User Research", "Prototyping"]
            }
          ],
          applicationTrends: [
            { month: 'Jan', applications: 45, views: 180 },
            { month: 'Feb', applications: 52, views: 220 },
            { month: 'Mar', applications: 61, views: 275 },
            { month: 'Apr', applications: 48, views: 195 },
            { month: 'May', applications: 67, views: 310 },
            { month: 'Jun', applications: 73, views: 285 }
          ],
          jobStatusDistribution: [
            { name: 'Active', value: 12, color: '#14b8a6' },
            { name: 'Draft', value: 3, color: '#f59e0b' },
            { name: 'Paused', value: 2, color: '#ef4444' },
            { name: 'Closed', value: 1, color: '#6b7280' }
          ]
        });
        setLoading(false);
      }, 1000);
    };

    fetchEmployerData();
  }, []);

  const StatCard = ({ title, value, growth, icon, color, subtitle }) => (
    <Card sx={{ 
      height: '100%',
      background: `linear-gradient(135deg, ${color}15, ${color}05)`,
      border: `1px solid ${color}30`,
      borderRadius: '16px',
      overflow: 'hidden',
      position: 'relative',
      transition: 'all 0.3s ease-in-out',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: `0 12px 24px ${color}20`,
        border: `1px solid ${color}50`,
      }
    }}>
      <CardContent sx={{ p: 3, pb: '24px !important' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box>
            <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 500, mb: 1 }}>
              {title}
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 700, color: '#1e293b', mb: 0.5 }}>
              {value}
            </Typography>
            {subtitle && (
              <Typography variant="body2" sx={{ color: '#64748b', fontSize: '0.8rem' }}>
                {subtitle}
              </Typography>
            )}
          </Box>
          <Avatar sx={{ 
            bgcolor: `${color}20`, 
            color: color,
            width: 48,
            height: 48,
            borderRadius: '14px'
          }}>
            {icon}
          </Avatar>
        </Box>
        
        {growth && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Chip
              icon={<TrendingUpIcon sx={{ fontSize: '16px !important' }} />}
              label={`+${growth}%`}
              size="small"
              sx={{
                backgroundColor: growth > 0 ? '#dcfce7' : '#fee2e2',
                color: growth > 0 ? '#15803d' : '#dc2626',
                fontWeight: 600,
                fontSize: '0.75rem',
                height: 24
              }}
            />
            <Typography variant="body2" sx={{ color: '#64748b', fontSize: '0.75rem' }}>
              vs last month
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );

  const JobCard = ({ job }) => (
    <Card sx={{ 
      borderRadius: '12px',
      border: '1px solid #e2e8f0',
      transition: 'all 0.2s ease-in-out',
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
      height: '100%',
      minWidth: 0, // Prevent overflow
      '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
        border: '1px solid #14b8a6'
      }
    }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e293b' }}>
                {job.title}
              </Typography>
              {job.urgent && (
                <Chip 
                  label="Urgent" 
                  size="small" 
                  sx={{ 
                    backgroundColor: '#fef2f2', 
                    color: '#dc2626',
                    fontWeight: 600,
                    fontSize: '0.7rem'
                  }} 
                />
              )}
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
              <Typography variant="body2" sx={{ color: '#64748b', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <BusinessCenterIcon sx={{ fontSize: 16 }} />
                {job.department}
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748b', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <LocationOnIcon sx={{ fontSize: 16 }} />
                {job.location}
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: '#059669', fontWeight: 600 }}>
              {job.salary}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Chip
              label={job.status}
              size="small"
              sx={{
                backgroundColor: job.status === 'Active' ? '#dcfce7' : 
                                job.status === 'Draft' ? '#fef3c7' : 
                                job.status === 'Paused' ? '#fee2e2' : '#f1f5f9',
                color: job.status === 'Active' ? '#15803d' : 
                       job.status === 'Draft' ? '#d97706' : 
                       job.status === 'Paused' ? '#dc2626' : '#64748b',
                fontWeight: 600
              }}
            />
            <IconButton size="small" sx={{ color: '#64748b' }}>
              <MoreVertIcon />
            </IconButton>
          </Box>
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body2" sx={{ color: '#64748b', display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <PeopleAltIcon sx={{ fontSize: 16 }} />
              {job.applicants} applicants
            </Typography>
            <Typography variant="body2" sx={{ color: '#64748b', display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <ScheduleIcon sx={{ fontSize: 16 }} />
              {job.posted}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button 
              size="small" 
              startIcon={<VisibilityIcon />}
              onClick={() => navigate(`/dashboard/employer/jobs/${job.id}`)}
              sx={{ 
                color: '#14b8a6',
                fontWeight: 500,
                textTransform: 'none',
                '&:hover': { backgroundColor: '#14b8a610' }
              }}
            >
              View
            </Button>
            <Button 
              size="small" 
              startIcon={<EditIcon />}
              onClick={() => navigate(`/dashboard/employer/jobs/${job.id}/edit`)}
              sx={{ 
                color: '#0ea5e9',
                fontWeight: 500,
                textTransform: 'none',
                '&:hover': { backgroundColor: '#0ea5e910' }
              }}
            >
              Edit
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  const CandidateCard = ({ candidate }) => (
    <ListItem sx={{ 
      px: 0, 
      py: 1.5,
      borderRadius: '8px',
      '&:hover': { backgroundColor: '#f8fafc' }
    }}>
      <ListItemAvatar>
        <Avatar sx={{ 
          bgcolor: '#14b8a6',
          fontWeight: 600
        }}>
          {candidate.name.split(' ').map(n => n[0]).join('')}
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#1e293b' }}>
              {candidate.name}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2" sx={{ color: '#f59e0b', fontWeight: 600 }}>
                ★ {candidate.rating}
              </Typography>
              <IconButton size="small">
                <LaunchIcon sx={{ fontSize: 16 }} />
              </IconButton>
            </Box>
          </Box>
        }
        secondary={
          <Box sx={{ mt: 0.5 }}>
            <Typography variant="body2" sx={{ color: '#64748b', mb: 0.5 }}>
              {candidate.role} • {candidate.experience} • Applied for {candidate.appliedFor}
            </Typography>
            <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
              {candidate.skills.map((skill) => (
                <Chip
                  key={skill}
                  label={skill}
                  size="small"
                  sx={{
                    height: 20,
                    fontSize: '0.65rem',
                    backgroundColor: '#f1f5f9',
                    color: '#475569'
                  }}
                />
              ))}
            </Box>
          </Box>
        }
      />
    </ListItem>
  );

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <Box sx={{ textAlign: 'center' }}>
          <LinearProgress sx={{ mb: 2, width: 200 }} />
          <Typography variant="body2" sx={{ color: '#64748b' }}>
            Loading your dashboard...
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 0 }}>
      {/* Welcome Header */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700, color: '#1e293b', mb: 0.5 }}>
              Welcome back, {user?.companyName || 'Company'}! 👋
            </Typography>
            <Typography variant="body1" sx={{ color: '#64748b' }}>
              Here's what's happening with your job postings and candidates today.
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<PostAddIcon />}
            onClick={() => navigate('/dashboard/employer/create-job')}
            sx={{
              backgroundColor: '#14b8a6',
              color: 'white',
              fontWeight: 600,
              textTransform: 'none',
              borderRadius: '12px',
              px: 3,
              py: 1.5,
              '&:hover': {
                backgroundColor: '#0f9488',
                transform: 'translateY(-1px)',
                boxShadow: '0 8px 16px rgba(20, 184, 166, 0.3)'
              },
              transition: 'all 0.2s ease-in-out'
            }}
          >
            Post New Job
          </Button>
        </Box>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard
            title="Posted Jobs"
            value={dashboardStats?.overview.postedJobs}
            growth={dashboardStats?.overview.growthPercentage.jobs}
            icon={<WorkOutlineIcon />}
            color="#14b8a6"
            subtitle="Total positions"
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard
            title="Active Jobs"
            value={dashboardStats?.overview.activeJobs}
            icon={<TrendingUpIcon />}
            color="#0ea5e9"
            subtitle="Currently hiring"
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard
            title="Applications"
            value={dashboardStats?.overview.totalApplications}
            growth={dashboardStats?.overview.growthPercentage.applications}
            icon={<PeopleAltIcon />}
            color="#8b5cf6"
            subtitle="Total received"
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard
            title="Company Views"
            value={dashboardStats?.overview.companyViews}
            growth={dashboardStats?.overview.growthPercentage.views}
            icon={<VisibilityIcon />}
            color="#f59e0b"
            subtitle="Profile visits"
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Recent Jobs */}
        <Grid item xs={12} lg={8}>
          <Paper sx={{ 
            p: 3, 
            borderRadius: '16px',
            border: '1px solid #e2e8f0',
            height: 'fit-content'
          }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e293b' }}>
                Recent Job Postings
              </Typography>
              <Button 
                size="small"
                endIcon={<LaunchIcon />}
                onClick={() => navigate('/dashboard/employer/manage-jobs')}
                sx={{ 
                  color: '#14b8a6',
                  fontWeight: 500,
                  textTransform: 'none'
                }}
              >
                View All
              </Button>
            </Box>
            
            <Box sx={{ width: '100%' }}>
              <Grid container spacing={3} sx={{ width: '100%', margin: 0 }}>
                {dashboardStats?.recentJobs.map((job) => (
                  <Grid 
                    item 
                    xs={12} 
                    md={6} 
                    key={job.id}
                    sx={{
                      display: 'flex',
                    }}
                  >
                    <JobCard job={job} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Paper>
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} lg={4}>
          <Grid container spacing={3}>
            {/* Top Candidates */}
            <Grid item xs={12}>
              <Paper sx={{ 
                p: 3, 
                borderRadius: '16px',
                border: '1px solid #e2e8f0'
              }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e293b' }}>
                    Top Candidates
                  </Typography>
                  <IconButton size="small">
                    <NotificationsIcon sx={{ fontSize: 20, color: '#14b8a6' }} />
                  </IconButton>
                </Box>
                
                <List sx={{ p: 0 }}>
                  {dashboardStats?.topCandidates.map((candidate, index) => (
                    <React.Fragment key={candidate.id}>
                      <CandidateCard candidate={candidate} />
                      {index < dashboardStats.topCandidates.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
                
                <Button 
                  fullWidth 
                  variant="outlined"
                  onClick={() => navigate('/dashboard/employer/candidates')}
                  sx={{ 
                    mt: 2,
                    color: '#14b8a6',
                    borderColor: '#14b8a6',
                    fontWeight: 500,
                    textTransform: 'none',
                    borderRadius: '8px'
                  }}
                >
                  View All Candidates
                </Button>
              </Paper>
            </Grid>

            {/* Job Status Chart */}
            <Grid item xs={12}>
              <Paper sx={{ 
                p: 3, 
                borderRadius: '16px',
                border: '1px solid #e2e8f0'
              }}>
                <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e293b', mb: 2 }}>
                  Job Status Distribution
                </Typography>
                
                <Box sx={{ height: 200, display: 'flex', justifyContent: 'center' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={dashboardStats?.jobStatusDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {dashboardStats?.jobStatusDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <RechartsTooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>
                
                <Box sx={{ mt: 2 }}>
                  {dashboardStats?.jobStatusDistribution.map((item) => (
                    <Box key={item.name} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box sx={{ 
                          width: 12, 
                          height: 12, 
                          borderRadius: '50%', 
                          backgroundColor: item.color 
                        }} />
                        <Typography variant="body2" sx={{ color: '#64748b' }}>
                          {item.name}
                        </Typography>
                      </Box>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: '#1e293b' }}>
                        {item.value}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Grid>

        {/* Application Trends Chart */}
        <Grid item xs={12}>
          <Paper sx={{ 
            p: 3, 
            borderRadius: '16px',
            border: '1px solid #e2e8f0',
            mt: 3
          }}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e293b', mb: 3 }}>
              Application Trends (Last 6 Months)
            </Typography>
            
            <Box sx={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={dashboardStats?.applicationTrends}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <RechartsTooltip 
                    contentStyle={{ 
                      backgroundColor: '#1e293b', 
                      border: 'none', 
                      borderRadius: '8px',
                      color: '#fff'
                    }} 
                  />
                  <Area
                    type="monotone"
                    dataKey="applications"
                    stroke="#14b8a6"
                    fill="url(#colorApplications)"
                    strokeWidth={3}
                  />
                  <Area
                    type="monotone"
                    dataKey="views"
                    stroke="#0ea5e9"
                    fill="url(#colorViews)"
                    strokeWidth={3}
                  />
                  <defs>
                    <linearGradient id="colorApplications" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#14b8a6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                </AreaChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EmployerDashboard;

// import React from 'react';
// import { FaBriefcase, FaUsers, FaEye, FaChartBar, FaStar } from 'react-icons/fa';

// // Mock data
// const stats = [
//   { label: 'Posted Jobs', value: '18', icon: FaBriefcase, color: 'blue' },
//   { label: 'Active Jobs', value: '12', icon: FaChartBar, color: 'green' },
//   { label: 'Applications Received', value: '247', icon: FaUsers, color: 'purple' },
//   { label: 'Company Views', value: '1847', icon: FaEye, color: 'red' },
// ];

// const recentJobs = [
//     { id: 1, title: 'Senior Frontend Developer', applicants: 42, status: 'Active', posted: '2 days ago' },
//     { id: 2, title: 'Product Manager', applicants: 28, status: 'Active', posted: '5 days ago' },
//     { id: 3, title: 'UX/UI Designer', applicants: 35, status: 'Draft', posted: '1 week ago' },
//     { id: 4, title: 'DevOps Engineer', applicants: 19, status: 'Paused', posted: '3 days ago' },
//   ];

// const topCandidates = [
//   {
//     id: 1,
//     name: 'Sarah Johnson',
//     role: 'Frontend Developer',
//     experience: '5 years',
//     rating: 4.8,
//     appliedFor: 'Senior Frontend Developer',
//     skills: ['React', 'TypeScript', 'Node.js'],
//   },
//   {
//     id: 2,
//     name: 'Michael Chen',
//     role: 'Product Manager',
//     experience: '7 years',
//     rating: 4.9,
//     appliedFor: 'Product Manager',
//     skills: ['Strategy', 'Analytics', 'Leadership'],
//   },
//   {
//     id: 3,
//     name: 'Emily Rodriguez',
//     role: 'UX Designer',
//     experience: '4 years',
//     rating: 4.7,
//     appliedFor: 'UX/UI Designer',
//     skills: ['Figma', 'User Research', 'Prototyping'],
//   },
// ];

// const jobStatusSummary = [
//   { status: 'Active', count: 12, color: 'green' },
//   { status: 'Draft', count: 3, color: 'yellow' },
//   { status: 'Paused', count: 2, color: 'red' },
//   { status: 'Closed', count: 1, color: 'gray' },
// ];

// const applicationTrends = [
//   { month: 'Jan', applications: 45 },
//   { month: 'Feb', applications: 52 },
//   { month: 'Mar', applications: 61 },
//   { month: 'Apr', applications: 48 },
//   { month: 'May', applications: 67 },
//   { month: 'Jun', applications: 73 },
// ];

// const EmployerDashboard = () => (
//   <div className="space-y-6">
//     {/* <h1 className="text-2xl font-bold text-gray-900">Employer Dashboard</h1> */}
    
//     {/* Stats Cards */}
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//       {stats.map((stat, index) => {
//         const Icon = stat.icon;
//         return (
//           <div key={index} className="bg-white p-6 rounded-lg shadow">
//             <div className="flex items-center">
//               <div className={`flex-shrink-0 p-3 rounded-full bg-${stat.color}-100`}>
//                 <Icon className={`h-6 w-6 text-${stat.color}-600`} />
//               </div>
//               <div className="ml-4">
//                 <p className="text-sm font-medium text-gray-500">{stat.label}</p>
//                 <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
//               </div>
//             </div>
//           </div>
//         );
//       })}
//     </div>

//     {/* Main Grid */}

//     {/* Recent Jobs */}
//       <div className="bg-white rounded-lg shadow">
//         <div className="px-6 py-4 border-b border-gray-200">
//           <h2 className="text-lg font-medium text-gray-900">Recent Job Postings</h2>
//         </div>
//         <div className="p-6">
//     <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {recentJobs.map((job) => (
//               <div key={job.id} className="flex flex-col justify-between p-4 border border-gray-200 rounded-lg h-full">
//                 <div>
//                   <h3 className="text-sm font-medium text-gray-900">{job.title}</h3>
//                   <p className="text-sm text-gray-500">{job.applicants} applicants</p>
//                 </div>
//                 <div className="text-right mt-2">
//                   <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
//                     job.status === 'Active' ? 'bg-green-100 text-green-800' :
//                     job.status === 'Draft' ? 'bg-yellow-100 text-yellow-800' :
//                     job.status === 'Paused' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
//                   }`}>
//                     {job.status}
//                   </span>
//                   <p className="text-sm text-gray-500 mt-1">{job.posted}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>


//       {/* Left Side: Top Candidates */}
//       <div className="bg-white rounded-lg shadow p-6 col-span-1">
//         <h2 className="text-lg font-medium text-gray-900 mb-4">Top Candidates</h2>
//         <div className="space-y-4">
//           {topCandidates.map((candidate) => (
//             <div key={candidate.id} className="flex items-center justify-between">
//               <div className="flex items-center">
//                 <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center font-bold text-white mr-3">
//                   {candidate.name.split(' ').map(n => n[0]).join('')}
//                 </div>
//                 <div>
//                   <div className="font-semibold text-gray-900">{candidate.name}</div>
//                   <div className="text-sm text-gray-500">
//                     {candidate.role} • {candidate.experience} • Applied for {candidate.appliedFor}
//                   </div>
//                   <div className="flex flex-wrap gap-1 mt-1">
//                     {candidate.skills.map(skill => (
//                       <span key={skill} className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-xs">{skill}</span>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//               <div className="flex items-center gap-1">
//                 <FaStar className="text-yellow-400" />
//                 <span className="font-semibold text-gray-700">{candidate.rating}</span>
//               </div>
//             </div>
//           ))}
//         </div>
//         <button className="mt-4 w-full border border-blue-400 text-blue-600 py-2 rounded hover:bg-blue-50 transition">
//           View All Candidates
//         </button>
//       </div>

//       {/* Middle: Job Status Distribution */}
//       <div className="bg-white rounded-lg shadow p-6 col-span-1">
//         <h2 className="text-lg font-medium text-gray-900 mb-4">Job Status Distribution</h2>
//         <div className="flex flex-col items-center">
//           {/* Simple Pie Chart Substitute */}
//           <div className="flex gap-2 mb-4">
//             {jobStatusSummary.map((item, idx) => (
//               <div key={idx} className={`w-6 h-6 rounded-full bg-${item.color}-400`} title={item.status}></div>
//             ))}
//           </div>
//           <div className="w-full">
//             {jobStatusSummary.map((item, idx) => (
//               <div key={idx} className="flex justify-between items-center mb-2">
//                 <span className={`flex items-center gap-2 text-${item.color}-700`}>
//                   <span className={`w-3 h-3 rounded-full bg-${item.color}-400 inline-block`} />
//                   {item.status}
//                 </span>
//                 <span className="font-semibold text-gray-700">{item.count}</span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Right Side: Application Trends */}
//       <div className="bg-white rounded-lg shadow p-6 col-span-1">
//         <h2 className="text-lg font-medium text-gray-900 mb-4">Application Trends (Last 6 Months)</h2>
//         <div className="w-full h-32 flex items-end gap-2">
//           {applicationTrends.map((trend, idx) => (
//             <div key={trend.month} className="flex flex-col items-center justify-end h-full">
//               <div
//                 className="w-6 rounded bg-blue-300"
//                 style={{ height: `${trend.applications / 2}px` }}
//                 title={`${trend.applications} applications`}
//               ></div>
//               <span className="text-xs text-gray-500 mt-1">{trend.month}</span>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   </div>
// );

// export default EmployerDashboard;