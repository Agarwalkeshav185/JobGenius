import React, { useState, useEffect, useContext } from 'react';
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
  FaDownload
} from 'react-icons/fa';
import FormField from '../../../Components/UI/FormField';
import AlertDisplay from '../../../Components/UI/AlertDisplay';
import { AuthContext } from '../../../Context/AuthContext'; // added - adjust if exported differently

const JobSeekerProfile = () => {
  // Use actual logged-in user from AuthContext
  const auth = useContext(AuthContext) || {};
  const contextUser = auth.user ?? auth.currentUser ?? null;

  // helper: find a load function in context (common names)
  const loadUserFn = auth.loadUser ?? auth.fetchUser ?? auth.getProfile ?? auth.getUser;

  const [user, setUser] = useState(contextUser);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Profile form data
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    address: '',
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

  // Form validation errors
  const [validationErrors, setValidationErrors] = useState({});

  // sync local user state when context user changes
  useEffect(() => {
    if (contextUser) {
      setUser(contextUser);
      // also initialize form fields when context user is present
      setProfileData({
        name: contextUser.name || '',
        email: contextUser.email || '',
        phoneNumber: contextUser.phoneNumber || '',
        address: contextUser.address || '',
        companyName: contextUser.companyName || '',
        coverLetter: contextUser.coverLetter || ''
      });
    } else if (loadUserFn) {
      // call context loader if provided (once)
      let mounted = true;
      (async () => {
        try {
          const res = await loadUserFn(); // expect user object or sets context internally
          // if function returns user object, use it
          const fetched = res?.data ?? res ?? auth.user ?? null;
          if (mounted && fetched) {
            setUser(fetched);
            setProfileData({
              name: fetched.name || '',
              email: fetched.email || '',
              phoneNumber: fetched.phoneNumber || '',
              address: fetched.address || '',
              companyName: fetched.companyName || '',
              coverLetter: fetched.coverLetter || ''
            });
          }
        } catch (err) {
          console.error('Failed to load logged-in user from AuthContext:', err);
        }
      })();
      return () => { mounted = false; };
    }
  }, [contextUser, loadUserFn, auth.user]);

  // Clear messages after 5 seconds
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear validation error for this field
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Handle password input changes
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
    setPasswordError('');
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
    const errors = {};

    if (!profileData.name?.trim()) {
      errors.name = 'Name is required';
    } else if (profileData.name.length < 3 || profileData.name.length > 30) {
      errors.name = 'Name must be between 3 and 30 characters';
    }

    if (!profileData.email?.trim()) {
      errors.email = 'Email is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(profileData.email)) {
        errors.email = 'Please enter a valid email address';
      }
    }

    if (!profileData.phoneNumber?.trim()) {
      errors.phoneNumber = 'Phone number is required';
    } else if (profileData.phoneNumber.length < 10) {
      errors.phoneNumber = 'Phone number must be at least 10 digits';
    }

    if (user?.role === 'Job Seeker' && !profileData.address?.trim()) {
      errors.address = 'Address is required for job seekers';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Save profile changes (Mock implementation)
  const handleSaveProfile = async () => {
    setError('');
    setSuccess('');

    if (!validateProfileData()) {
      setError('Please fix the validation errors below');
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
      setValidationErrors({});
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
    setPasswordError('');

    if (!passwordData.currentPassword) {
      setPasswordError('Current password is required');
      return;
    }

    if (!passwordData.newPassword) {
      setPasswordError('New password is required');
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError('New passwords do not match');
      return;
    }

    if (passwordData.newPassword.length < 8 || passwordData.newPassword.length > 32) {
      setPasswordError('New password must be between 8 and 32 characters');
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
      setPasswordError('Failed to update password');
    } finally {
      setPasswordLoading(false);
    }
  };

  // Cancel editing
  const handleCancelEdit = () => {
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
    setValidationErrors({});
  };

  // Remove file selection
  const removeFile = (type) => {
    if (type === 'resume') {
      setResumeFile(null);
    } else if (type === 'logo') {
      setLogoFile(null);
    }
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

      {/* Success/Error Messages using AlertDisplay */}
      <AlertDisplay 
        message={success} 
        onClose={() => setSuccess('')} 
        variant="success"
      />

      <AlertDisplay 
        message={error} 
        onClose={() => setError('')} 
        variant="error"
      />

      {/* Profile Form */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
            
            {/* Full Name using FormField */}
            <FormField
              label="Full Name"
              name="name"
              type="text"
              value={profileData.name}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              required
              editable={isEditing}
              error={validationErrors.name}
              icon={FaUser}
              maxLength={30}
            />

            {/* Email using FormField */}
            <FormField
              label="Email Address"
              name="email"
              type="email"
              value={profileData.email}
              onChange={handleInputChange}
              placeholder="Enter your email address"
              required
              editable={isEditing}
              error={validationErrors.email}
              icon={FaEnvelope}
              autoComplete="email"
              helpText={user.emailVerified ? "✓ Email verified" : "Email not verified"}
            />

            {/* Phone Number using FormField */}
            <FormField
              label="Phone Number"
              name="phoneNumber"
              type="tel"
              value={profileData.phoneNumber}
              onChange={handleInputChange}
              placeholder="Enter your phone number"
              required
              editable={isEditing}
              error={validationErrors.phoneNumber}
              icon={FaPhone}
              autoComplete="tel"
            />

            {/* Role Display */}
            <FormField
              label="Role"
              name="role"
              value={user.role || 'Not specified'}
              editable={false}
              helpText="Contact support to change your account type"
            />
          </div>

          {/* Role-specific Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {user.role === 'Job Seeker' ? 'Job Seeker Information' : 'Employer Information'}
            </h3>
                {/* Address for Job Seekers using FormField */}
                <FormField
                  label="Address"
                  name="address"
                  type="textarea"
                  value={profileData.address}
                  onChange={handleInputChange}
                  placeholder="Enter your full address"
                  required
                  editable={isEditing}
                  error={validationErrors.address}
                  icon={FaMapMarkerAlt}
                  rows={3}
                />
                {/* Cover Letter using FormField */}
                <FormField
                  label="Cover Letter"
                  name="coverLetter"
                  type="textarea"
                  value={profileData.coverLetter}
                  onChange={handleInputChange}
                  placeholder="Write a brief cover letter about yourself..."
                  editable={isEditing}
                  rows={4}
                  maxLength={500}
                  helpText="Tell employers about your experience and skills"
                />
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
        
        {/* Password Error Display */}
        <AlertDisplay 
          message={passwordError} 
          onClose={() => setPasswordError('')} 
          variant="error"
        />
        
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
      <div className="bg-white rounded-lg shadow p-6 mb-5">
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

    </div>
  );
};

export default JobSeekerProfile;