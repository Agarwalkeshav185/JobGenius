import React, { useState, useContext } from 'react';

// Example company data (replace with backend data or context)
const initialCompany = {
  name: "Tech Corp",
  logo: "",
  description: "Tech Corp is a leading provider of innovative software solutions for businesses worldwide.",
  industry: "Information Technology",
  website: "https://techcorp.com",
  email: "contact@techcorp.com",
  phone: "+1 555-123-4567",
  address: "123 Silicon Valley, San Francisco, CA",
  founded: "2012",
  size: "201-500",
  social: {
    linkedin: "https://linkedin.com/company/techcorp",
    twitter: "https://twitter.com/techcorp",
    facebook: "https://facebook.com/techcorp"
  }
};

// Simulate user role (replace with context or props)
const userRole = "admin"; // "admin" can edit, "employee" cannot

const CompanyProfile = () => {
  const [company, setCompany] = useState(initialCompany);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(company);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle social links
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

  // Save changes (simulate backend update)
  const handleSave = (e) => {
    e.preventDefault();
    setCompany(form);
    setEditing(false);
    // TODO: Send updated data to backend if needed
  };

  // Cancel editing
  const handleCancel = () => {
    setForm(company);
    setEditing(false);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8 my-10">
      <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
        <div className="flex-shrink-0">
          {company.logo ? (
            <img src={company.logo} alt="Company Logo" className="w-32 h-32 rounded-full object-cover border" />
          ) : (
            <div className="w-32 h-32 rounded-full bg-teal-100 flex items-center justify-center text-4xl font-bold text-teal-700 border">
              {company.name[0]}
            </div>
          )}
        </div>
        <div>
          <h1 className="text-3xl font-extrabold text-teal-700 mb-2">{company.name}</h1>
          <p className="text-gray-600 mb-2">{company.industry}</p>
          <p className="text-gray-500">{company.description}</p>
        </div>
      </div>

      {/* Only show edit button for admin/owner */}
      {userRole === "admin" && !editing && (
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
                value={form.description}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
              <label className="block text-sm font-medium text-gray-700 mb-1 mt-4">Industry</label>
              <input
                type="text"
                name="industry"
                value={form.industry}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
              <label className="block text-sm font-medium text-gray-700 mb-1 mt-4">Website</label>
              <input
                type="url"
                name="website"
                value={form.website}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
              <label className="block text-sm font-medium text-gray-700 mb-1 mt-4">Address</label>
              <input
                type="text"
                name="address"
                value={form.address}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
              <label className="block text-sm font-medium text-gray-700 mb-1 mt-4">Phone</label>
              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
              <label className="block text-sm font-medium text-gray-700 mb-1 mt-4">Founded</label>
              <input
                type="text"
                name="founded"
                value={form.founded}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
              <label className="block text-sm font-medium text-gray-700 mb-1 mt-4">Company Size</label>
              <input
                type="text"
                name="size"
                value={form.size}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Social Links</h2>
            <div className="flex gap-4">
              <input
                type="url"
                name="linkedin"
                value={form.social.linkedin}
                onChange={handleSocialChange}
                placeholder="LinkedIn"
                className="px-3 py-2 border border-gray-300 rounded-lg w-1/3"
              />
              <input
                type="url"
                name="twitter"
                value={form.social.twitter}
                onChange={handleSocialChange}
                placeholder="Twitter"
                className="px-3 py-2 border border-gray-300 rounded-lg w-1/3"
              />
              <input
                type="url"
                name="facebook"
                value={form.social.facebook}
                onChange={handleSocialChange}
                placeholder="Facebook"
                className="px-3 py-2 border border-gray-300 rounded-lg w-1/3"
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
              <div className="text-gray-600 mb-1"><span className="font-medium">Email:</span> {company.email}</div>
              <div className="text-gray-600 mb-1"><span className="font-medium">Phone:</span> {company.phone}</div>
              <div className="text-gray-600 mb-1"><span className="font-medium">Website:</span> <a href={company.website} className="text-teal-600 hover:underline" target="_blank" rel="noopener noreferrer">{company.website}</a></div>
              <div className="text-gray-600 mb-1"><span className="font-medium">Address:</span> {company.address}</div>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-700 mb-2">Company Details</h2>
              <div className="text-gray-600 mb-1"><span className="font-medium">Founded:</span> {company.founded}</div>
              <div className="text-gray-600 mb-1"><span className="font-medium">Company Size:</span> {company.size} employees</div>
              <div className="text-gray-600 mb-1"><span className="font-medium">Industry:</span> {company.industry}</div>
            </div>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Social Links</h2>
            <div className="flex gap-4">
              {company.social.linkedin && (
                <a href={company.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">
                  LinkedIn
                </a>
              )}
              {company.social.twitter && (
                <a href={company.social.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                  Twitter
                </a>
              )}
              {company.social.facebook && (
                <a href={company.social.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  Facebook
                </a>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CompanyProfile;