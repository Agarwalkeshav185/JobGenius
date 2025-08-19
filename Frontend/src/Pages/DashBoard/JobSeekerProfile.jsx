import React, { useState, useEffect } from 'react';
import { 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaBuilding, 
  FaFileUpload, 
  FaEye, 
  FaEyeSlash, 
  FaSave,
  FaSpinner,
  FaEdit,
  FaCheck,
  FaTimes,
  FaDownload,
  FaExclamationTriangle,
  FaCheckCircle
} from 'react-icons/fa';

// Mock user data for testing
const mockUserData = {
  _id: '66e1234567890abcdef12345',
  name: 'John Smith',
  email: 'john.smith@example.com',
  phoneNumber: '+1-555-0123',
  address: '123 Main Street, Apt 4B, New York, NY 10001, United States',
  role: 'Job Seeker',
  coverLetter: 'Experienced software developer with 5+ years in full-stack development. Passionate about creating scalable web applications and learning new technologies. Strong background in React, Node.js, and cloud platforms.',
  resume: {
    url: 'https://example.com/resume.pdf',
    public_id: 'resume_123'
  },
  emailVerified: true,
  createdAt: '2024-01-15T08:30:00Z',
  updatedAt: '2024-08-15T14:22:00Z'
};

// Mock employer data
const mockEmployerData = {
  _id: '66e1234567890abcdef54321',
  name: 'Sarah Johnson',
  email: 'sarah.johnson@techcorp.com',
  phoneNumber: '+1-555-0456',
  role: 'Employer',
  companyName: 'TechCorp Solutions',
  logo: {
    url: 'https://example.com/logo.png',
    public_id: 'logo_456'
  },
  emailVerified: true,
  createdAt: '2024-02-10T10:15:00Z',
  updatedAt: '2024-08-18T16:45:00Z'
};

const JobSeekerProfile = () => {
  // Use mock data - you can switch between Job Seeker and Employer data
  const [user, setUser] = useState(mockUserData); // Change to mockEmployerData to test employer view
  
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  // Profile form data
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    address: '',
    companyName: '',
    coverLetter: ''
  });

  // Password form data
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // File handling
  const [resumeFile, setResumeFile] = useState(null);
  const [logoFile, setLogoFile] = useState(null);

  // Initialize form data when user data is available
  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || '',
        email: user.email || '',
        phoneNumber: user.phoneNumber || '',
        address: user.address || '',
        companyName: user.companyName || '',
        coverLetter: user.coverLetter || ''
      });
    }
  }, [user]);

  // Clear messages after 5 seconds
  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess('');
        setError('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [success, error]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle password input changes
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle file selection
  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    
    if (!file) return;

    // File size validation
    const maxSize = type === 'resume' ? 5 * 1024 * 1024 : 2 * 1024 * 1024; // 5MB for resume, 2MB for logo
    if (file.size > maxSize) {
      setError(`File size must be less than ${type === 'resume' ? '5MB' : '2MB'}`);
      return;
    }

    // File type validation
    const allowedTypes = type === 'resume' 
      ? ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
      : ['image/jpeg', 'image/png', 'image/gif'];
    
    if (!allowedTypes.includes(file.type)) {
      setError(`Invalid file type. Please select a valid ${type} file.`);
      return;
    }

    if (type === 'resume') {
      setResumeFile(file);
    } else if (type === 'logo') {
      setLogoFile(file);
    }

    setError('');
  };

  // Validate profile data
  const validateProfileData = () => {
    if (!profileData.name?.trim()) {
      setError('Name is required');
      return false;
    }

    if (profileData.name.length < 3 || profileData.name.length > 30) {
      setError('Name must be between 3 and 30 characters');
      return false;
    }

    if (!profileData.email?.trim()) {
      setError('Email is required');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(profileData.email)) {
      setError('Please enter a valid email address');
      return false;
    }

    if (!profileData.phoneNumber?.trim()) {
      setError('Phone number is required');
      return false;
    }

    if (profileData.phoneNumber.length < 10) {
      setError('Phone number must be at least 10 digits');
      return false;
    }

    if (user?.role === 'Job Seeker' && !profileData.address?.trim()) {
      setError('Address is required for job seekers');
      return false;
    }

    return true;
  };

  // Save profile changes (Mock implementation)
  const handleSaveProfile = async () => {
    setError('');
    setSuccess('');

    if (!validateProfileData()) {
      return;
    }

    setLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update user data with form data
      const updatedUser = {
        ...user,
        ...profileData,
        updatedAt: new Date().toISOString()
      };

      // If files were selected, simulate file upload
      if (resumeFile) {
        updatedUser.resume = {
          url: 'https://example.com/new-resume.pdf',
          public_id: 'new_resume_' + Date.now()
        };
      }
      
      if (logoFile) {
        updatedUser.logo = {
          url: 'https://example.com/new-logo.png',
          public_id: 'new_logo_' + Date.now()
        };
      }

      setUser(updatedUser);
      setIsEditing(false);
      setResumeFile(null);
      setLogoFile(null);
      setSuccess('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  // Update password (Mock implementation)
  const handleUpdatePassword = async () => {
    setError('');
    setSuccess('');

    if (!passwordData.currentPassword) {
      setError('Current password is required');
      return;
    }

    if (!passwordData.newPassword) {
      setError('New password is required');
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    if (passwordData.newPassword.length < 8 || passwordData.newPassword.length > 32) {
      setError('New password must be between 8 and 32 characters');
      return;
    }

    setPasswordLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setSuccess('Password updated successfully!');
    } catch (error) {
      console.error('Error updating password:', error);
      setError('Failed to update password');
    } finally {
      setPasswordLoading(false);
    }
  };

  // Cancel editing
  const handleCancelEdit = () => {
    // Reset to original user data
    setProfileData({
      name: user.name || '',
      email: user.email || '',
      phoneNumber: user.phoneNumber || '',
      address: user.address || '',
      companyName: user.companyName || '',
      coverLetter: user.coverLetter || ''
    });
    setIsEditing(false);
    setResumeFile(null);
    setLogoFile(null);
    setError('');
  };

  // Remove file selection
  const removeFile = (type) => {
    if (type === 'resume') {
      setResumeFile(null);
    } else if (type === 'logo') {
      setLogoFile(null);
    }
  };

  // Switch between Job Seeker and Employer data for testing
  const switchUserType = () => {
    const newUser = user.role === 'Job Seeker' ? mockEmployerData : mockUserData;
    setUser(newUser);
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center p-8">
        <FaSpinner className="animate-spin text-teal-600 text-2xl" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
          <p className="text-gray-600 mt-1">Manage your profile information and preferences</p>
        </div>
        
        <div className="flex gap-2 mt-4 md:mt-0">
          {/* Demo switch button */}
          <button
            onClick={switchUserType}
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors text-sm"
          >
            Switch to {user.role === 'Job Seeker' ? 'Employer' : 'Job Seeker'}
          </button>
          
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <FaEdit />
              Edit Profile
            </button>
          )}
        </div>
      </div>

      {/* Success/Error Messages */}
      {success && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
          <FaCheckCircle className="text-green-600" />
          <p className="text-green-800">{success}</p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
          <FaExclamationTriangle className="text-red-600" />
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {/* Profile Form */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
            
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FaUser className="inline mr-2 text-gray-400" />
                Full Name *
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={profileData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Enter your full name"
                  maxLength={30}
                />
              ) : (
                <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">{user.name || 'Not provided'}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FaEnvelope className="inline mr-2 text-gray-400" />
                Email Address *
              </label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Enter your email address"
                />
              ) : (
                <div className="flex items-center gap-2">
                  <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-lg flex-1">{user.email || 'Not provided'}</p>
                  {user.emailVerified && (
                    <span className="text-green-600 text-sm">
                      <FaCheckCircle className="inline" /> Verified
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FaPhone className="inline mr-2 text-gray-400" />
                Phone Number *
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  name="phoneNumber"
                  value={profileData.phoneNumber}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Enter your phone number"
                />
              ) : (
                <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">{user.phoneNumber || 'Not provided'}</p>
              )}
            </div>

            {/* Role Display */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Role
              </label>
              <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">{user.role || 'Not specified'}</p>
            </div>
          </div>

          {/* Role-specific Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {user.role === 'Job Seeker' ? 'Job Seeker Information' : 'Employer Information'}
            </h3>
            
            {user.role === 'Job Seeker' ? (
              <>
                {/* Address for Job Seekers */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FaMapMarkerAlt className="inline mr-2 text-gray-400" />
                    Address *
                  </label>
                  {isEditing ? (
                    <textarea
                      name="address"
                      value={profileData.address}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="Enter your full address"
                    />
                  ) : (
                    <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">{user.address || 'Not provided'}</p>
                  )}
                </div>

                {/* Cover Letter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cover Letter
                  </label>
                  {isEditing ? (
                    <textarea
                      name="coverLetter"
                      value={profileData.coverLetter}
                      onChange={handleInputChange}
                      rows="4"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="Write a brief cover letter about yourself..."
                      maxLength={500}
                    />
                  ) : (
                    <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-lg min-h-[100px]">
                      {user.coverLetter || 'No cover letter provided'}
                    </p>
                  )}
                </div>

                {/* Resume Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FaFileUpload className="inline mr-2 text-gray-400" />
                    Resume
                  </label>
                  
                  {user.resume?.url && !resumeFile && (
                    <div className="flex items-center gap-3 mb-3 p-3 bg-green-50 rounded-lg">
                      <FaFileUpload className="text-green-600" />
                      <span className="text-green-800 text-sm flex-1">Resume uploaded</span>
                      <button
                        onClick={() => window.open(user.resume.url, '_blank')}
                        className="text-green-600 hover:text-green-700 text-sm"
                        title="View Resume"
                      >
                        <FaDownload />
                      </button>
                    </div>
                  )}
                  
                  {isEditing && (
                    <div>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => handleFileChange(e, 'resume')}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />
                      <p className="text-xs text-gray-500 mt-1">Supported formats: PDF, DOC, DOCX (Max 5MB)</p>
                      {resumeFile && (
                        <div className="flex items-center justify-between bg-teal-50 p-2 rounded-lg mt-2">
                          <p className="text-sm text-teal-600">Selected: {resumeFile.name}</p>
                          <button
                            onClick={() => removeFile('resume')}
                            className="text-red-500 hover:text-red-700"
                          >
                            <FaTimes />
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                {/* Company Name for Employers */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FaBuilding className="inline mr-2 text-gray-400" />
                    Company Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="companyName"
                      value={profileData.companyName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="Enter your company name"
                    />
                  ) : (
                    <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">{user.companyName || 'Not provided'}</p>
                  )}
                </div>

                {/* Company Logo Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FaFileUpload className="inline mr-2 text-gray-400" />
                    Company Logo
                  </label>
                  
                  {user.logo?.url && !logoFile && (
                    <div className="flex items-center gap-3 mb-3 p-3 bg-green-50 rounded-lg">
                      <img src={user.logo.url} alt="Company Logo" className="w-10 h-10 object-cover rounded" />
                      <span className="text-green-800 text-sm flex-1">Logo uploaded</span>
                    </div>
                  )}
                  
                  {isEditing && (
                    <div>
                      <input
                        type="file"
                        accept=".jpg,.jpeg,.png,.gif"
                        onChange={(e) => handleFileChange(e, 'logo')}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />
                      <p className="text-xs text-gray-500 mt-1">Supported formats: JPG, PNG, GIF (Max 2MB)</p>
                      {logoFile && (
                        <div className="flex items-center justify-between bg-teal-50 p-2 rounded-lg mt-2">
                          <p className="text-sm text-teal-600">Selected: {logoFile.name}</p>
                          <button
                            onClick={() => removeFile('logo')}
                            className="text-red-500 hover:text-red-700"
                          >
                            <FaTimes />
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        {isEditing && (
          <div className="flex flex-col md:flex-row gap-3 mt-6 pt-6 border-t border-gray-200">
            <button
              onClick={handleSaveProfile}
              disabled={loading}
              className="flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg transition-colors disabled:opacity-50"
            >
              {loading ? <FaSpinner className="animate-spin" /> : <FaSave />}
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
            
            <button
              onClick={handleCancelEdit}
              disabled={loading}
              className="flex items-center justify-center gap-2 bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors"
            >
              <FaTimes />
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* Change Password Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Change Password</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
          {/* Current Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Password *
            </label>
            <div className="relative">
              <input
                type={showCurrentPassword ? "text" : "password"}
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="Enter current password"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Password *
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="Enter new password"
                maxLength={32}
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                {showNewPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm New Password *
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="Confirm new password"
                maxLength={32}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
        </div>

        <button
          onClick={handleUpdatePassword}
          disabled={passwordLoading}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors mt-4 disabled:opacity-50"
        >
          {passwordLoading ? <FaSpinner className="animate-spin" /> : <FaCheck />}
          {passwordLoading ? 'Updating...' : 'Update Password'}
        </button>

        <div className="mt-4 text-sm text-gray-500">
          Password must be between 8-32 characters long.
        </div>
      </div>

      {/* Account Information */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Account Created</label>
            <p className="text-gray-900">{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Last Updated</label>
            <p className="text-gray-900">{user.updatedAt ? new Date(user.updatedAt).toLocaleDateString() : 'N/A'}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Verified</label>
            <p className={`font-medium ${user.emailVerified ? 'text-green-600' : 'text-red-600'}`}>
              {user.emailVerified ? 'Verified' : 'Not Verified'}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Account ID</label>
            <p className="text-gray-900 font-mono text-sm">{user._id || user.id || 'N/A'}</p>
          </div>
        </div>
      </div>

      {/* Demo Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <div className="text-blue-600 mt-1">ℹ️</div>
          <div>
            <h4 className="text-blue-900 font-medium">Demo Mode</h4>
            <p className="text-blue-800 text-sm mt-1">
              This profile page is using static mock data for UI testing. 
              Use the "Switch to Employer/Job Seeker" button to test different user roles.
              All form interactions work but data changes are only simulated.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobSeekerProfile;