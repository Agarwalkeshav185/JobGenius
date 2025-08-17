import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaUser, FaBuilding, FaArrowLeft, FaUpload, FaEnvelope } from "react-icons/fa";
import authService from "../../Services/authServices";

const AdditionalDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get basic data from previous page
  const basicData = location.state?.basicData;
  
  // If no basic data, redirect back to signup
  if (!basicData) {
    navigate('/register');
    return null;
  }

  // Form states
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isJobSeeker = basicData.role === 'Job Seeker';
  const isEmployer = basicData.role === 'Employer';

  const handlePhoneChange = (e) => {
    let value = e.target.value;
    
    // Remove any non-digit characters except +
    value = value.replace(/[^\d]/g, '');
    
    // Limit to 10 digits
    if (value.length <= 10) {
      setPhoneNumber(value);
      setError(""); // Clear any previous phone-related errors
    }
  };

  const formatPhoneDisplay = (phone) => {
    if (!phone) return "";
    // Add spaces for better readability: +91 XXXXX XXXXX
    if (phone.length <= 5) {
      return phone;
    } else {
      return `${phone.slice(0, 5)} ${phone.slice(5)}`;
    }
  };

  // Validate phone number
  const validatePhone = (phone) => {
    if (phone.length !== 10) {
      return "Phone number must be exactly 10 digits";
    }
    if (!phone.match(/^[6-9]\d{9}$/)) {
      return "Please enter a valid Indian mobile number";
    }
    return null;
  };

  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError("File size should be less than 5MB");
        e.target.value = "";
        return;
      }
      
      if (file.type === 'application/pdf') {
        setResume(file);
        setError("");
      } else {
        setError("Please upload a PDF file only");
        e.target.value = ""; // Reset file input
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validation based on role
    const phoneError = validatePhone(phoneNumber);
    if (phoneError) {
      setError(phoneError);
      setLoading(false);
      return;
    }

    if (isJobSeeker) {
      if (!name || !phoneNumber || !address) {
        setError("Please fill in all required fields");
        setLoading(false);
        return;
      }
    } else if (isEmployer) {
      if (!companyName || !phoneNumber || !address) {
        setError("Please fill in all required fields");
        setLoading(false);
        return;
      }
    }

    try {
      const formData = new FormData();
      
      // Add basic data from previous step
      formData.append('name', name);
      formData.append('email', basicData.email);
      formData.append('password', basicData.password);
      formData.append('role', basicData.role);
      
      // Add common fields
      formData.append('phoneNumber', `+91${phoneNumber}`);
      formData.append('address', address);
      
      if (isJobSeeker) {
        formData.append('coverLetter', coverLetter);
        if (resume) {
          formData.append('resume', resume);
        }
      } else if (isEmployer) {
        formData.append('companyName', companyName); // Company name for employer
        // For employers, you might want to add a contact person name too
        // formData.append('name', name); // Uncomment if you want contact person name
      }

      console.log('FormData contents:');
      for (let pair of formData.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
      }

      const response = await authService.register(formData);
      
      if (response.success) {
        // Redirect to email verification page
        navigate('/verifyEmail', { 
          state: { 
            email: basicData.email,
            message: "Account created successfully! Please verify your email to continue."
          } 
        });
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    navigate('/register', { 
      state: { 
        prefillData: basicData 
      } 
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <button
            onClick={handleGoBack}
            className="flex items-center text-[#14b8a6] hover:text-[#119a87] transition-colors"
          >
            <FaArrowLeft className="mr-2" />
            Back
          </button>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Complete Your Profile
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {isJobSeeker 
              ? "Tell us more about yourself to get better job recommendations" 
              : "Complete your company profile to start posting jobs"
            }
          </p>
          <p className="mt-1 text-center text-xs text-gray-500">
            Role: <span className="font-medium">{basicData.role === 'Job Seeker' ? 'Job Seeker' : 'Employer'}</span>
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="w-full p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm space-y-4">
            <div className="relative">
                    <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                    <input
                    type="text"
                    placeholder="Full Name *"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#14b8a6] text-sm"
                    />
                </div>
            
            {/* Job Seeker: Name Field | Employer: Company Name Field */}
            {isJobSeeker ? 
                <></> : (
              <div className="relative">
                <FaBuilding className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Company Name *"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#14b8a6] text-sm"
                />
              </div>
            )}
            
            {/* Phone Number Field with +91 prefix */}
            <div className="relative">
              <div className="flex">
                <span className="inline-flex items-center px-3 py-3 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm rounded-l-md">
                  +91
                </span>
                <input
                  type="tel"
                  placeholder="Enter 10-digit mobile number"
                  value={formatPhoneDisplay(phoneNumber)}
                  onChange={handlePhoneChange}
                  required
                  maxLength="11" // 10 digits + 1 space
                  className="flex-1 pl-3 pr-4 py-3 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-[#14b8a6] text-sm"
                />
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Enter your 10-digit mobile number (without +91)
              </p>
              {phoneNumber && phoneNumber.length === 10 && (
                <p className="mt-1 text-xs text-green-600">
                  Complete number: +91 {formatPhoneDisplay(phoneNumber)}
                </p>
              )}
            </div>
            
            {/* Address Field - Common for both */}
            <div className="relative">
              <FaBuilding className="absolute left-3 top-3 text-gray-400 pointer-events-none" />
              <textarea
                placeholder={isJobSeeker ? "Your Address *" : "Company Address *"}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                rows={3}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#14b8a6] text-sm resize-none"
              />
            </div>
            
            {/* Job Seeker Specific Fields */}
            {isJobSeeker && (
              <>
                {/* Cover Letter Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cover Letter
                  </label>
                  <textarea
                    placeholder="Write a brief introduction about yourself and your career goals..."
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#14b8a6] text-sm resize-none"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    This will be visible to employers when you apply for jobs.
                  </p>
                </div>
                
                {/* Resume Upload Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FaUpload className="inline mr-2" />
                    Resume Upload (PDF only)
                  </label>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleResumeChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#14b8a6] text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-[#14b8a6] file:text-white hover:file:bg-[#119a87] file:cursor-pointer"
                  />
                  {resume && (
                    <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded">
                      <p className="text-sm text-green-700">
                        ✓ Selected: <span className="font-medium">{resume.name}</span>
                      </p>
                      <p className="text-xs text-green-600">
                        Size: {(resume.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>
                  )}
                  <p className="mt-1 text-xs text-gray-500">
                    Upload your resume in PDF format (max 5MB). This is optional but highly recommended.
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#14b8a6] hover:bg-[#119a87] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#14b8a6] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <FaEnvelope className="mr-2" />
            {loading ? "Creating Account..." : "Complete Registration & Verify Email"}
          </button>
        </form>

        {/* Info Message */}
        <div className="text-center">
          <p className="text-xs text-gray-500">
            After registration, you'll need to verify your email address to activate your account.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdditionalDetails;