import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaEnvelope, FaKey, FaArrowLeft, FaCheckCircle, FaSpinner } from "react-icons/fa";
import authService from "../../Services/authServices";

const VerifyEmail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get email from previous page
  const email = location.state?.email;
  const message = location.state?.message;
  
  // If no email, redirect back
  if (!email) {
    navigate('/signup');
    return null;
  }

  // Form states
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [countdown, setCountdown] = useState(0);

  // Start countdown for resend button
  useEffect(() => {
    // Start with 60 second countdown
    setCountdown(60);
    
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Handle OTP input - only allow numbers and limit to 6 digits
  const handleOtpChange = (e) => {
    const value = e.target.value;
    // Only allow numbers and limit to 6 digits
    if (value.match(/^\d*$/) && value.length <= 6) {
      setOtp(value);
      setError(""); // Clear error when user types
    }
  };

  // Handle OTP verification
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    // Validation
    if (!otp || otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP");
      setLoading(false);
      return;
    }

    try {
      const response = await authService.verifyEmail({
        email: email,
        otp: otp
      });

      if (response.success) {
        setSuccess("Email verified successfully! Redirecting to login...");
        
        // Redirect to login after 2 seconds
        setTimeout(() => {
          navigate('/login', {
            state: {
              message: "Email verified successfully! You can now login.",
              email: email
            }
          });
        }, 2000);
      }
    } catch (err) {
      console.error('OTP verification error:', err);
      setError(err.message || 'Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle resend OTP
  const handleResendOtp = async () => {
    setResendLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await authService.resendVerificationOtp({
        email: email
      });

      if (response.success) {
        setSuccess("New OTP sent successfully! Please check your email.");
        setOtp(""); // Clear current OTP
        
        // Restart countdown
        setCountdown(60);
        const timer = setInterval(() => {
          setCountdown((prev) => {
            if (prev <= 1) {
              clearInterval(timer);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      }
    } catch (err) {
      console.error('Resend OTP error:', err);
      setError(err.message || 'Failed to resend OTP. Please try again.');
    } finally {
      setResendLoading(false);
    }
  };

  // Go back to registration
  const handleGoBack = () => {
    navigate('/additionalDetails', {
      state: {
        basicData: location.state?.basicData || {}
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <button
            onClick={handleGoBack}
            className="flex items-center text-[#14b8a6] hover:text-[#119a87] transition-colors mb-6"
          >
            <FaArrowLeft className="mr-2" />
            Back to Registration
          </button>

          <div className="text-center">
            <div className="mx-auto h-16 w-16 bg-[#14b8a6] rounded-full flex items-center justify-center mb-4">
              <FaEnvelope className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900">
              Verify Your Email
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              We've sent a 6-digit verification code to:
            </p>
            <p className="mt-1 text-sm font-medium text-[#14b8a6]">
              {email}
            </p>
            <p className="mt-2 text-xs text-gray-500">
              Please check your inbox and enter the code below
            </p>
          </div>
        </div>

        {/* Success message from registration */}
        {message && (
          <div className="w-full p-3 bg-green-100 border border-green-400 text-green-700 rounded">
            {message}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="w-full p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="w-full p-3 bg-green-100 border border-green-400 text-green-700 rounded flex items-center">
            <FaCheckCircle className="mr-2" />
            {success}
          </div>
        )}

        <form onSubmit={handleVerifyOtp} className="mt-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter Verification Code
            </label>
            <div className="relative">
              <FaKey className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={handleOtpChange}
                required
                maxLength="6"
                className="w-full pl-10 pr-4 py-4 text-center text-2xl font-mono tracking-widest border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#14b8a6] focus:border-transparent"
              />
            </div>
            <p className="mt-1 text-xs text-gray-500">
              Enter the 6-digit code sent to your email
            </p>
          </div>

          <button
            type="submit"
            disabled={loading || otp.length !== 6}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#14b8a6] hover:bg-[#119a87] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#14b8a6] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? (
              <>
                <FaSpinner className="animate-spin mr-2" />
                Verifying...
              </>
            ) : (
              <>
                <FaCheckCircle className="mr-2" />
                Verify Email
              </>
            )}
          </button>
        </form>

        {/* Resend OTP Section */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Didn't receive the code?
          </p>
          {countdown > 0 ? (
            <p className="text-sm text-gray-500 mt-1">
              Resend available in <span className="font-medium text-[#14b8a6]">{countdown}s</span>
            </p>
          ) : (
            <button
              type="button"
              onClick={handleResendOtp}
              disabled={resendLoading}
              className="mt-1 text-sm text-[#14b8a6] hover:text-[#119a87] font-medium transition-colors disabled:opacity-50"
            >
              {resendLoading ? (
                <>
                  <FaSpinner className="animate-spin inline mr-1" />
                  Sending...
                </>
              ) : (
                "Resend OTP"
              )}
            </button>
          )}
        </div>

        {/* Help Section */}
        <div className="text-center">
          <p className="text-xs text-gray-500">
            Having trouble? Check your spam folder or{" "}
            <a href="/contact" className="text-[#14b8a6] hover:text-[#119a87] font-medium">
              contact support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;