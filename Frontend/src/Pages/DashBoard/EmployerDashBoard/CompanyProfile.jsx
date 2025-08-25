import React, { useState, useEffect } from 'react';
import EmployerServices from '../../../Services/EmployerServices';
import { useAuth } from '../../../Context/AuthContext';
import UrlInput from '../../../Components/UI/UrlInput';

const initialCompany = {
  name: "Company Name",
  logo: "",
  description: "No description available",
  category: { name: "Not specified" },
  website: "",
  email: "",
  phone: "",
  location: "",
  founded: "",
  size: "",
  social: {
    linkedin: "",
    twitter: "",
    facebook: ""
  }
};

const CompanyProfile = () => {
  const { user } = useAuth();
  const [company, setCompany] = useState(initialCompany);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(initialCompany);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCompany = async () => {
      try {
        const companyId = user?.companyId?._id || user?.companyId;
        
        if (!companyId) {
          console.warn('No company ID found for user');
          setError('No company associated with this user');
          setLoading(false);
          return;
        }
        // console.log('Fetching company with ID:', companyId);
        const data = await EmployerServices.getCompanyById(companyId);
        // console.log("API Response:", data);
        
        const companyData = data.company || data;
        
        // Ensure all expected fields exist
        const processedCompanyData = {
          ...initialCompany,
          ...companyData, // Override with actual initial data
          social: {
            ...initialCompany.social,
            ...(companyData.social || {})
          }
        };
        
        setCompany(processedCompanyData);
        setForm(processedCompanyData);
        setError(null);
      } catch (error) {
        console.error("Error fetching company data:", error);
        console.error("Error details:", error.response?.data);
        setError("Failed to load company data");
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      getCompany();
    }
  }, [user]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle social links with safe checks
  const handleSocialChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      social: {
        ...prev.social,
        [name]: value
      }
    }));
  };

  // Save changes
  const handleSave = (e) => {
    e.preventDefault();
    setCompany(form);
    setEditing(false);
    const updateCompany = async () => {
      try {
        const companyId = user?.companyId?._id || user?.companyId;
        if (!companyId) {
          console.warn('No company ID found for user');
          setError('No company associated with this user');
          return;
        }
        const response = await EmployerServices.updateCompanyDetails(companyId, form);
        // console.log("Update Response:", response);
      } catch (error) {
        console.error("Error updating company data:", error);
        setError("Failed to update company data");
      }
    };
    updateCompany();
  };

  // Cancel editing
  const handleCancel = () => {
    setForm(company);
    setEditing(false);
  };

  // Safe access to company data
  const safeName = company?.name || "Company Name";
  const safeIndustry = company?.category?.name || company?.industry || "Not specified";
  const safeDescription = company?.description || "No description available";
  const safeEmail = company?.email || "Not provided";
  const safePhone = company?.phone || "Not provided";
  const safeWebsite = company?.website || "Not provided";
  const safeAddress = company?.location || company?.address || "Not provided";
  const safeFounded = company?.founded || "Not specified";
  const safeSize = company?.size || "Not specified";
  
  // Safe social media access
  const safeSocial = company?.social || {};
  const hasLinkedIn = safeSocial.linkedin && safeSocial.linkedin.trim() !== '';
  const hasTwitter = safeSocial.twitter && safeSocial.twitter.trim() !== '';
  const hasFacebook = safeSocial.facebook && safeSocial.facebook.trim() !== '';
  const hasSocialMedia = hasLinkedIn || hasTwitter || hasFacebook;

  // Safe logo rendering
  const renderLogo = () => {
    if (company?.logo) {
      // Handle both string and object logo formats
      const logoUrl = typeof company.logo === 'string' ? company.logo : company.logo?.url;
      if (logoUrl) {
        return <img src={logoUrl} alt="Company Logo" className="w-32 h-32 rounded-full object-cover border" />;
      }
    }
    return (
      <div className="w-32 h-32 rounded-full bg-teal-100 flex items-center justify-center text-4xl font-bold text-teal-700 border">
        {safeName[0] || 'C'}
      </div>
    );
  };

  // Loading state
  if (loading) {
    return (
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8 my-10">
        <div className="text-center">Loading company profile...</div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8 my-10">
        <div className="text-center text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8 my-10">
      <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
        <div className="flex-shrink-0">
          {renderLogo()}
        </div>
        <div>
          <h1 className="text-3xl font-extrabold text-teal-700 mb-2">{safeName}</h1>
          <p className="text-gray-600 mb-2">{safeIndustry}</p>
          <p className="text-gray-500">{safeDescription}</p>
        </div>
      </div>

      {/* Only show edit button for admin/owner */}
      {(user?.role === "Manager" || user?.role === "Admin") && !editing && (
        <div className="mb-6 text-right">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
            onClick={() => setEditing(true)}
          >
            Edit Profile
          </button>
        </div>
      )}

      {/* Edit Form */}
      {editing ? (
        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                value={form.description || ''}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
              <label className="block text-sm font-medium text-gray-700 mb-1 mt-4">Website</label>
              <input
                type="url"
                name="website"
                value={form.website || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
              <label className="block text-sm font-medium text-gray-700 mb-1 mt-4">Address</label>
              <input
                type="text"
                name="location" // Changed to match backend field
                value={form.location || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={form.email || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
              <label className="block text-sm font-medium text-gray-700 mb-1 mt-4">Phone</label>
              <input
                type="text"
                name="phone"
                value={form.phone || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
              <label className="block text-sm font-medium text-gray-700 mb-1 mt-4">Founded</label>
              <input
                type="text"
                name="founded"
                value={form.founded || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
              <label className="block text-sm font-medium text-gray-700 mb-1 mt-4">Company Size</label>
              <input
                type="text"
                name="size"
                value={form.size || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>
          
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Social Links</h2>
            <div className="flex gap-4">
              <UrlInput
                name='linkedin'
                value={form.social?.linkedin}
                onChange={handleSocialChange}
                placeholder="LinkedIn"
              />
              <UrlInput
                name='twitter'
                value={form.social?.twitter}
                onChange={handleSocialChange}
                placeholder="Twitter"
              />
              <UrlInput
                name='facebook'
                value={form.social?.facebook}
                onChange={handleSocialChange}
                placeholder="Facebook"
              />
            </div>
          </div>
          
          <div className="flex gap-4 mt-6">
            <button
              type="submit"
              className="bg-teal-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-teal-700 transition"
            >
              Save Changes
            </button>
            <button
              type="button"
              className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-300 transition"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <h2 className="text-lg font-semibold text-gray-700 mb-2">Contact Info</h2>
              <div className="text-gray-600 mb-1"><span className="font-medium">Email:</span> {safeEmail}</div>
              <div className="text-gray-600 mb-1"><span className="font-medium">Phone:</span> {safePhone}</div>
              <div className="text-gray-600 mb-1">
                <span className="font-medium">Website:</span> 
                {safeWebsite !== "Not provided" ? (
                  <a href={safeWebsite} className="text-teal-600 hover:underline ml-1" target="_blank" rel="noopener noreferrer">
                    {safeWebsite}
                  </a>
                ) : (
                  <span className="ml-1">{safeWebsite}</span>
                )}
              </div>
              <div className="text-gray-600 mb-1"><span className="font-medium">Address:</span> {safeAddress}</div>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-700 mb-2">Company Details</h2>
              <div className="text-gray-600 mb-1"><span className="font-medium">Founded:</span> {safeFounded}</div>
              <div className="text-gray-600 mb-1"><span className="font-medium">Company Size:</span> {safeSize} employees</div>
              <div className="text-gray-600 mb-1"><span className="font-medium">Industry:</span> {safeIndustry}</div>
            </div>
          </div>
          
          {/* Social Links Section */}
          {hasSocialMedia ? (
            <div>
              <h2 className="text-lg font-semibold text-gray-700 mb-2">Social Links</h2>
              <div className="flex gap-4">
                {hasLinkedIn && (
                  <a href={safeSocial.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">
                    LinkedIn
                  </a>
                )}
                {hasTwitter && (
                  <a href={safeSocial.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                    Twitter
                  </a>
                )}
                {hasFacebook && (
                  <a href={safeSocial.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    Facebook
                  </a>
                )}
              </div>
            </div>
          ) : (
            <div>
              <h2 className="text-lg font-semibold text-gray-700 mb-2">Social Links</h2>
              <p className="text-gray-500">No social media links available.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CompanyProfile;