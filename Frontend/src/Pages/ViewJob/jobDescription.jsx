import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  FaMapMarkerAlt, 
  FaBriefcase, 
  FaClock, 
  FaDollarSign, 
  FaBuilding, 
  FaCalendar, 
  FaArrowLeft,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaLink,
  FaBookmark,
  FaRegBookmark
} from 'react-icons/fa';
import JobServices from '../../Services/JobServices';

// ✅ Sample/Mock Data
const SAMPLE_JOB = {
  _id: '123456',
  title: 'Senior Full Stack Developer',
  location: 'New York, NY',
  jobType: 'Full-Time',
  experienceLevel: 'Senior Level',
  salary: '$120,000 - $160,000',
  createdAt: '2024-11-20T10:00:00Z',
  introduction: `We are seeking an experienced Senior Full Stack Developer to join our dynamic team. This role offers the opportunity to work on cutting-edge technologies and lead complex projects that impact millions of users worldwide.

As a key member of our engineering team, you will be responsible for designing, developing, and maintaining scalable web applications. You'll collaborate with cross-functional teams including designers, product managers, and other engineers to deliver high-quality software solutions.`,
  
  responsibilities: [
    'Design and develop full-stack web applications using React, Node.js, and MongoDB',
    'Lead technical discussions and provide mentorship to junior developers',
    'Collaborate with product managers to define project requirements and technical specifications',
    'Write clean, maintainable, and well-documented code following best practices',
    'Conduct code reviews and ensure code quality across the team',
    'Optimize application performance and troubleshoot production issues',
    'Participate in agile ceremonies including sprint planning, daily standups, and retrospectives',
    'Stay updated with emerging technologies and propose innovative solutions'
  ],
  
  qualifications: [
    '5+ years of professional experience in full-stack development',
    'Strong proficiency in JavaScript/TypeScript, React, and Node.js',
    'Experience with MongoDB, PostgreSQL, or other database systems',
    'Solid understanding of RESTful APIs and microservices architecture',
    'Experience with cloud platforms (AWS, Azure, or GCP)',
    'Familiarity with Docker, Kubernetes, and CI/CD pipelines',
    'Excellent problem-solving skills and attention to detail',
    'Strong communication and collaboration skills',
    'Bachelor\'s degree in Computer Science or equivalent experience'
  ],
  
  companyId: {
    _id: 'company123',
    name: 'TechCorp Innovation',
    logo: 'https://via.placeholder.com/100x100/14B8A6/ffffff?text=TC',
    location: 'San Francisco, CA',
    description: 'TechCorp Innovation is a leading technology company specializing in cutting-edge software solutions. We pride ourselves on fostering a culture of innovation, collaboration, and continuous learning. Our team of talented professionals works on projects that make a real difference in people\'s lives.',
    website: 'https://techcorp.example.com'
  },
  
  categoryId: {
    _id: 'cat123',
    name: 'Software Engineering'
  }
};

const SAMPLE_RELATED_JOBS = [
  {
    _id: 'job1',
    title: 'Frontend Developer',
    location: 'Remote',
    salary: '$90,000 - $130,000',
    companyId: {
      name: 'StartupXYZ',
      logo: 'https://via.placeholder.com/50x50/6366F1/ffffff?text=SX'
    }
  },
  {
    _id: 'job2',
    title: 'Backend Engineer',
    location: 'Boston, MA',
    salary: '$100,000 - $140,000',
    companyId: {
      name: 'DataFlow Inc',
      logo: 'https://via.placeholder.com/50x50/EC4899/ffffff?text=DF'
    }
  },
  {
    _id: 'job3',
    title: 'DevOps Engineer',
    location: 'Austin, TX',
    salary: '$110,000 - $150,000',
    companyId: {
      name: 'CloudNine',
      logo: 'https://via.placeholder.com/50x50/F59E0B/ffffff?text=CN'
    }
  }
];

export default function JobDetails() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [relatedJobs, setRelatedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [useMockData, setUseMockData] = useState(true); // ✅ Toggle for mock data

  useEffect(() => {
    if (useMockData) {
      // ✅ Use sample data
      setTimeout(() => {
        setJob(SAMPLE_JOB);
        setRelatedJobs(SAMPLE_RELATED_JOBS);
        setLoading(false);
      }, 500); // Simulate loading delay
    } else {
      // Use real API
      fetchJobDetails();
    }
  }, [jobId, useMockData]);

  const fetchJobDetails = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await JobServices.getJobByIdForDescription(jobId);
      console.log(response.data);
      setJob(response.data);
      
      // Fetch related jobs based on category
      if (response.data?.categoryId?._id) {
        fetchRelatedJobs(response.data.categoryId._id);
      }
    } catch (err) {
      console.error('Error fetching job details:', err);
      setError('Failed to load job details');
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedJobs = async (categoryId) => {
    try {
      const response = await JobServices.getJobsByFilter(1, 3, { category: categoryId });
      setRelatedJobs(response.data?.filter(j => j._id !== jobId) || []);
    } catch (err) {
      console.error('Error fetching related jobs:', err);
    }
  };

  const handleApply = () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/login', { state: { from: `/jobs/${jobId}` } });
      return;
    }
    navigate(`/jobs/${jobId}/apply`);
  };

  // const handleSaveJob = () => {
  //   setIsSaved(!isSaved);
  //   // TODO: Call API to save/unsave job
  // };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const shareOnSocial = (platform) => {
    const url = window.location.href;
    const text = `Check out this job: ${job?.title}`;
    
    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      copy: url
    };

    if (platform === 'copy') {
      navigator.clipboard.writeText(url);
      alert('Link copied to clipboard!');
    } else {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-teal-500 border-t-transparent mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading job details...</p>
        </div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Job Not Found</h2>
          <p className="text-gray-600 mb-6">{error || 'This job posting may have been removed.'}</p>
          <button
            onClick={() => navigate('/jobs')}
            className="px-6 py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
          >
            Back to Jobs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <button
            onClick={() => navigate('/jobs')}
            className="mb-8 text-white hover:text-teal-400 flex items-center gap-2 font-medium transition-colors group"
          >
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" /> 
            Back to Jobs
          </button>
          
          {/* Job Header Card - Elevated Design */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-gray-200/20">
            <div className="flex items-start justify-between gap-6">
              {/* Left Side: Company Logo + Job Details + Tags */}
              <div className="flex flex-col gap-5 flex-1">
                <div className="flex items-start gap-5">
                  {job.companyId?.logo && (
                    <div className="flex-shrink-0">
                      <img
                        src={job.companyId?.logo.url || job.companyId?.logo}
                        alt={job.companyId.name}
                        className="w-20 h-20 object-contain rounded-xl border-2 border-gray-200 bg-white p-2 shadow-sm"
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h1 className="text-3xl font-bold text-gray-900 mb-3 leading-tight">{job.title}</h1>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg">
                        <FaBuilding className="text-teal-600" />
                        <span className="font-medium">{job.companyId?.name}</span>
                      </span>
                      <span className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg">
                        <FaMapMarkerAlt className="text-teal-600" />
                        <span className="font-medium">{job.location}</span>
                      </span>
                      <span className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg">
                        <FaClock className="text-teal-600" />
                        <span className="font-medium">{formatDate(job.createdAt)}</span>
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Job Meta Tags */}
                <div className="flex flex-wrap gap-3">
                  <span className="px-5 py-2.5 bg-gradient-to-r from-teal-50 to-teal-100 text-teal-700 rounded-full text-sm font-semibold border border-teal-200">
                    {job.jobType}
                  </span>
                  <span className="px-5 py-2.5 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 rounded-full text-sm font-semibold border border-blue-200">
                    {job.salary || `$ ${job.minSalary} - $ ${job.maxSalary}`}
                  </span>
                  {job.categoryId?.name && (
                    <span className="px-5 py-2.5 bg-gradient-to-r from-orange-50 to-orange-100 text-orange-700 rounded-full text-sm font-semibold border border-orange-200">
                      {job.categoryId.name}
                    </span>
                  )}
                </div>
              </div>

              {/* Right Side: Share Icons + Apply Button */}
              <div className="flex flex-col gap-4 items-end">
                {/* Share Icons */}
                <div className="flex flex-col gap-3">
                  <p className="text-xs text-gray-500 font-semibold text-center uppercase tracking-wider">Share</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => shareOnSocial('facebook')}
                      className="w-10 h-10 flex items-center justify-center bg-blue-600 text-white rounded-lg hover:bg-blue-700 hover:scale-110 transition-all shadow-md"
                      aria-label="Share on Facebook"
                    >
                      <FaFacebookF className="text-sm" />
                    </button>
                    <button
                      onClick={() => shareOnSocial('twitter')}
                      className="w-10 h-10 flex items-center justify-center bg-sky-500 text-white rounded-lg hover:bg-sky-600 hover:scale-110 transition-all shadow-md"
                      aria-label="Share on Twitter"
                    >
                      <FaTwitter className="text-sm" />
                    </button>
                    <button
                      onClick={() => shareOnSocial('linkedin')}
                      className="w-10 h-10 flex items-center justify-center bg-blue-700 text-white rounded-lg hover:bg-blue-800 hover:scale-110 transition-all shadow-md"
                      aria-label="Share on LinkedIn"
                    >
                      <FaLinkedinIn className="text-sm" />
                    </button>
                    <button
                      onClick={() => shareOnSocial('copy')}
                      className="w-10 h-10 flex items-center justify-center bg-gray-700 text-white rounded-lg hover:bg-gray-800 hover:scale-110 transition-all shadow-md"
                      aria-label="Copy link"
                    >
                      <FaLink className="text-sm" />
                    </button>
                  </div>
                </div>
                
                {/* Apply Button */}
                <button
                  onClick={handleApply}
                  className="px-8 py-3.5 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white rounded-xl font-bold transition-all whitespace-nowrap shadow-lg hover:shadow-xl hover:scale-105"
                >
                  Apply Now
                </button>

              </div>
            </div>
          </div>

          {/* Toggle button for demo purposes */}
          <button
            onClick={() => setUseMockData(!useMockData)}
            className="mt-6 px-5 py-2.5 bg-teal-600/90 hover:bg-teal-700 text-white text-sm rounded-lg transition-colors shadow-md"
          >
            {useMockData ? 'Switch to Real API' : 'Switch to Mock Data'}
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">

                        

            {/* Job Description */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Job Description</h3>
              <div className="prose max-w-none text-gray-700 leading-relaxed">
                <p className="whitespace-pre-line">{job.introduction || job.description}</p>
              </div>
            </div>

            {/* Responsibilities */}
            {job.responsibilities && job.responsibilities.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Key Responsibilities</h3>
                <ul className="space-y-3">
                  {job.responsibilities.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="inline-block w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Qualifications */}
            {job.qualifications && job.qualifications.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Professional Skills</h3>
                <ul className="space-y-3">
                  {job.qualifications.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="inline-block w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Apply Card */}
            {/* <div className=" bg-white rounded-lg shadow-sm p-6 top-4">
              <div className="flex gap-3 ">
                <button
                  onClick={handleApply}
                  className="w-full py-3 bg-teal-500 hover:bg-teal-600 text-white rounded-lg font-semibold transition-colors"
                >
                  Apply Now
                </button>
                <button
                  onClick={handleSaveJob}
                  className="w-full py-3 border-2 border-teal-500 text-teal-600 hover:bg-teal-50 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  {isSaved ? <FaBookmark /> : <FaRegBookmark />}
                  {isSaved ? 'Saved' : 'Save Job'}
                </button>
              </div>
            </div> */}

            {/* Job Overview and Location Map Side by Side */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="grid grid-cols-2 gap-6">
                {/* Job Overview - Left Side */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Job Overview</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-2">
                      <FaCalendar className="text-teal-500 mt-1 text-sm" />
                      <div>
                        <p className="text-xs text-gray-500">Date Posted</p>
                        <p className="font-medium text-gray-900 text-sm">{formatDate(job.createdAt)}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <FaMapMarkerAlt className="text-teal-500 mt-1 text-sm" />
                      <div>
                        <p className="text-xs text-gray-500">Location</p>
                        <p className="font-medium text-gray-900 text-sm">{job.location}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <FaBriefcase className="text-teal-500 mt-1 text-sm" />
                      <div>
                        <p className="text-xs text-gray-500">Job Type</p>
                        <p className="font-medium text-gray-900 text-sm">{job.jobType}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <FaDollarSign className="text-teal-500 mt-1 text-sm" />
                      <div>
                        <p className="text-xs text-gray-500">Salary</p>
                        <p className="font-medium text-gray-900 text-sm">{`$ ${job.minSalary} - $ ${job.maxSalary}`}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Location Map - Right Side */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Location</h3>
                  <div className="h-3/4 min-h-[100px] bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
                    <div className="text-center px-2">
                      <FaMapMarkerAlt className="text-3xl mx-auto mb-2 text-teal-500" />
                      <p className="text-xs font-medium">{job.location}</p>
                      <p className="text-xs mt-1">Map integration coming soon</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Company Info */}
            {job.companyId && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Company Information</h3>
                <div className="text-center mb-4">
                  {job.companyId.logo && (
                    <img
                      src={job.companyId.logo.url}
                      alt={job.companyId.name}
                      className="w-20 h-20 object-contain mx-auto rounded-lg border mb-3"
                    />
                  )}
                  <h4 className="font-semibold text-gray-900">{job.companyId.name}</h4>
                </div>
                <div className="space-y-3 text-sm">
                  {job.companyId.location && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <FaMapMarkerAlt className="text-teal-500" />
                      <span>{job.companyId.location}</span>
                    </div>
                  )}
                  {job.companyId.website && (
                    <a
                      href={job.companyId.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-teal-600 hover:text-teal-700"
                    >
                      <FaLink />
                      Visit Website
                    </a>
                  )}
                </div>
                {job.companyId.description && (
                  <p className="text-sm text-gray-600 mt-4 leading-relaxed">
                    {job.companyId.description}
                  </p>
                )}
              </div>
            )}
            {/* Related Jobs */}
            {relatedJobs.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Related Jobs</h3>
                  <button
                    onClick={() => navigate('/jobs')}
                    className="text-teal-600 hover:text-teal-700 font-medium text-sm"
                  >
                    View All Jobs
                  </button>
                </div>
                <div className="space-y-4">
                  {relatedJobs.map((relatedJob) => (
                    <div
                      key={relatedJob._id}
                      className="p-4 border border-gray-200 rounded-lg hover:border-teal-500 transition-colors cursor-pointer"
                      onClick={() => navigate(`/jobs/${relatedJob._id}`)}
                    >
                      <div className="flex items-start gap-3">
                        {relatedJob.companyId?.logo && (
                          <img
                            src={relatedJob.companyId.logo}
                            alt={relatedJob.companyId.name}
                            className="w-12 h-12 object-contain rounded border"
                          />
                        )}
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-1">{relatedJob.title}</h4>
                          <div className="flex flex-wrap gap-3 text-xs text-gray-600">
                            <span className="flex items-center gap-1">
                              <FaBuilding /> {relatedJob.companyId?.name}
                            </span>
                            <span className="flex items-center gap-1">
                              <FaMapMarkerAlt /> {relatedJob.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <FaDollarSign /> {relatedJob.salary}
                            </span>
                          </div>
                        </div>
                        <button className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600 text-sm font-medium">
                          Apply
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}