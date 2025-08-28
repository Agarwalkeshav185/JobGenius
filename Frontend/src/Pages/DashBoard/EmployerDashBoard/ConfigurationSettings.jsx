import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../Context/AuthContext';
import EmployerServices from '../../../Services/EmployerServices';

const EmployerProfileSettings = () => {
  const { user, updateUser } = useAuth();
  
  const [profile, setProfile] = useState({
    // Personal Info
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    position: '',
    bio: '',
    profileImage: null,
    
    // Company Info (if user can edit company details)
    company: {
      name: '',
      description: '',
      website: '',
      industry: '',
      location: '',
      foundedYear: '',
      sizeRange: '1-10',
      logo: null
    },
    
    // Professional Preferences
    preferences: {
      defaultJobDuration: 30,
      autoApproveApplications: false,
      preferredCommunication: 'email',
      timeZone: 'UTC',
      language: 'en'
    }
  });

  const [activeTab, setActiveTab] = useState('personal');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Load user profile data
  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);
        // Load user data and company data
        const userData = await EmployerServices.getProfile();
        const companyData = user?.companyId ? 
          await EmployerServices.getCompanyById(user.companyId) : null;
        
        setProfile({
          firstName: userData.firstName || '',
          lastName: userData.lastName || '',
          email: userData.email || '',
          phone: userData.phone || '',
          position: userData.position || '',
          bio: userData.bio || '',
          profileImage: userData.profileImage || null,
          company: {
            name: companyData?.name || '',
            description: companyData?.description || '',
            website: companyData?.website || '',
            industry: companyData?.industry || '',
            location: companyData?.location || '',
            foundedYear: companyData?.foundedYear || '',
            sizeRange: companyData?.sizeRange || '1-10',
            logo: companyData?.logo || null
          },
          preferences: {
            defaultJobDuration: userData.preferences?.defaultJobDuration || 30,
            autoApproveApplications: userData.preferences?.autoApproveApplications || false,
            preferredCommunication: userData.preferences?.preferredCommunication || 'email',
            timeZone: userData.preferences?.timeZone || 'UTC',
            language: userData.preferences?.language || 'en'
          }
        });
      } catch (error) {
        console.error('Error loading profile:', error);
        setMessage({ type: 'error', text: 'Failed to load profile data' });
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [user]);

  // Handle input changes
  const handleInputChange = (section, field, value) => {
    setProfile(prev => ({
      ...prev,
      [section]: section === 'company' || section === 'preferences' ? {
        ...prev[section],
        [field]: value
      } : section === field ? value : prev[section]
    }));
  };

  // Handle direct field changes
  const handleDirectChange = (field, value) => {
    setProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle image uploads
  const handleImageUpload = (field, file) => {
    setProfile(prev => ({
      ...prev,
      [field]: file
    }));
  };

  // Save profile changes
  const handleSave = async () => {
    try {
      setSaving(true);
      
      // Create FormData for file uploads
      const formData = new FormData();
      
      // Add profile fields
      Object.keys(profile).forEach(key => {
        if (key === 'company' || key === 'preferences') {
          Object.keys(profile[key]).forEach(subKey => {
            if (profile[key][subKey] instanceof File) {
              formData.append(`${key}.${subKey}`, profile[key][subKey]);
            } else {
              formData.append(`${key}.${subKey}`, profile[key][subKey]);
            }
          });
        } else if (profile[key] instanceof File) {
          formData.append(key, profile[key]);
        } else {
          formData.append(key, profile[key]);
        }
      });

      const response = await EmployerServices.updateProfile(formData);
      
      if (response.success) {
        setMessage({ type: 'success', text: 'Profile updated successfully!' });
        // Update auth context
        updateUser(response.user);
      }
    } catch (error) {
      console.error('Error saving profile:', error);
      setMessage({ type: 'error', text: 'Failed to save profile changes' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg">
        <div className="border-b border-gray-200 px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
          <p className="text-gray-600 mt-1">Manage your employer profile and company information</p>
        </div>

        {/* Message Display */}
        {message.text && (
          <div className={`mx-6 mt-4 p-4 rounded-lg ${
            message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
          }`}>
            {message.text}
          </div>
        )}

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="px-6 flex space-x-8">
            {[
              { id: 'personal', label: 'Personal Info' },
              { id: 'company', label: 'Company Details' },
              { id: 'preferences', label: 'Preferences' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-teal-500 text-teal-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Personal Information Tab */}
          {activeTab === 'personal' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
              
              {/* Profile Image */}
              <div className="flex items-center space-x-6">
                <div className="flex-shrink-0">
                  {profile.profileImage ? (
                    <img
                      src={typeof profile.profileImage === 'string' ? profile.profileImage : URL.createObjectURL(profile.profileImage)}
                      alt="Profile"
                      className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-teal-100 flex items-center justify-center text-2xl font-bold text-teal-700">
                      {profile.firstName[0] || 'U'}
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Profile Photo
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload('profileImage', e.target.files[0])}
                    className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
                  />
                </div>
              </div>

              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={profile.firstName}
                    onChange={(e) => handleDirectChange('firstName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                    placeholder="Enter your first name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={profile.lastName}
                    onChange={(e) => handleDirectChange('lastName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                    placeholder="Enter your last name"
                  />
                </div>
              </div>

              {/* Contact Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => handleDirectChange('email', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => handleDirectChange('phone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              {/* Position */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Title/Position
                </label>
                <input
                  type="text"
                  value={profile.position}
                  onChange={(e) => handleDirectChange('position', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                  placeholder="e.g. HR Manager, Talent Acquisition Specialist"
                />
              </div>

              {/* Bio */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Professional Bio
                </label>
                <textarea
                  value={profile.bio}
                  onChange={(e) => handleDirectChange('bio', e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                  placeholder="Tell candidates about yourself and your role in the company..."
                />
              </div>
            </div>
          )}

          {/* Company Details Tab */}
          {activeTab === 'company' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Company Information</h3>
              
              {/* Company Logo */}
              <div className="flex items-center space-x-6">
                <div className="flex-shrink-0">
                  {profile.company.logo ? (
                    <img
                      src={typeof profile.company.logo === 'string' ? profile.company.logo : URL.createObjectURL(profile.company.logo)}
                      alt="Company Logo"
                      className="w-20 h-20 rounded-lg object-cover border-2 border-gray-200"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-lg bg-teal-100 flex items-center justify-center text-2xl font-bold text-teal-700">
                      {profile.company.name[0] || 'C'}
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company Logo
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleInputChange('company', 'logo', e.target.files[0])}
                    className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
                  />
                </div>
              </div>

              {/* Company Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={profile.company.name}
                    onChange={(e) => handleInputChange('company', 'name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                    placeholder="Enter company name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Industry
                  </label>
                  <input
                    type="text"
                    value={profile.company.industry}
                    onChange={(e) => handleInputChange('company', 'industry', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                    placeholder="e.g. Technology, Healthcare, Finance"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Website
                  </label>
                  <input
                    type="url"
                    value={profile.company.website}
                    onChange={(e) => handleInputChange('company', 'website', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                    placeholder="https://www.company.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Founded Year
                  </label>
                  <input
                    type="text"
                    value={profile.company.foundedYear}
                    onChange={(e) => handleInputChange('company', 'foundedYear', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                    placeholder="e.g. 2020"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={profile.company.location}
                    onChange={(e) => handleInputChange('company', 'location', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                    placeholder="e.g. San Francisco, CA"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company Size
                  </label>
                  <select
                    value={profile.company.sizeRange}
                    onChange={(e) => handleInputChange('company', 'sizeRange', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                  >
                    <option value="1-10">1-10 employees</option>
                    <option value="11-50">11-50 employees</option>
                    <option value="51-200">51-200 employees</option>
                    <option value="201-500">201-500 employees</option>
                    <option value="501-1000">501-1000 employees</option>
                    <option value="1000+">1000+ employees</option>
                  </select>
                </div>
              </div>

              {/* Company Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Description
                </label>
                <textarea
                  value={profile.company.description}
                  onChange={(e) => handleInputChange('company', 'description', e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                  placeholder="Describe your company's mission, values, and culture..."
                />
              </div>
            </div>
          )}

          {/* Preferences Tab */}
          {activeTab === 'preferences' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Hiring Preferences</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Default Job Posting Duration (days)
                  </label>
                  <select
                    value={profile.preferences.defaultJobDuration}
                    onChange={(e) => handleInputChange('preferences', 'defaultJobDuration', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                  >
                    <option value={15}>15 days</option>
                    <option value={30}>30 days</option>
                    <option value={45}>45 days</option>
                    <option value={60}>60 days</option>
                    <option value={90}>90 days</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Communication
                  </label>
                  <select
                    value={profile.preferences.preferredCommunication}
                    onChange={(e) => handleInputChange('preferences', 'preferredCommunication', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                  >
                    <option value="email">Email</option>
                    <option value="phone">Phone</option>
                    <option value="platform">Platform Messages</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time Zone
                  </label>
                  <select
                    value={profile.preferences.timeZone}
                    onChange={(e) => handleInputChange('preferences', 'timeZone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                  >
                    <option value="UTC">UTC</option>
                    <option value="EST">Eastern Time (EST)</option>
                    <option value="PST">Pacific Time (PST)</option>
                    <option value="CST">Central Time (CST)</option>
                    <option value="MST">Mountain Time (MST)</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Language
                  </label>
                  <select
                    value={profile.preferences.language}
                    onChange={(e) => handleInputChange('preferences', 'language', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                    <option value="zh">Chinese</option>
                  </select>
                </div>
              </div>

              {/* Toggle Settings */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Auto-approve Applications</h4>
                    <p className="text-sm text-gray-500">Automatically approve applications from qualified candidates</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleInputChange('preferences', 'autoApproveApplications', !profile.preferences.autoApproveApplications)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      profile.preferences.autoApproveApplications ? 'bg-teal-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
                        profile.preferences.autoApproveApplications ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Save Button */}
        <div className="border-t border-gray-200 px-6 py-4">
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              onClick={() => window.location.reload()}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerProfileSettings;