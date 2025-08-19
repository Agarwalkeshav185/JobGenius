import React, { useState, useEffect } from "react";
import LoginImage from "../../assets/Login.png";
import { FaEnvelope, FaKey, FaGoogle, FaFacebookF, FaUser, FaChevronDown } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import authService from "../../Services/authServices";
import { useAuth } from "../../Context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [selectedRole, setSelectedRole] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated, loading, user } = useAuth();

  const roles = [
    { value: "Job Seeker", label: "Job Seeker" },
    { value: "Employer", label: "Employer" }
  ];

  useEffect(() => {
    if (location.state?.message) {
      setSuccess(location.state.message);
    }
    if (location.state?.email) {
      setEmail(location.state.email);
    }
  }, [location.state]);

  useEffect(() => {
    if (isAuthenticated && !loading && user) {
      if (user.role === 'Employer') {
        navigate('/dashboard/employer');
      } else if (user.role === 'Job Seeker') {
        navigate('/dashboard');
      } else {
        // Default fallback
        navigate('/dashboard');
      }
    }
  }, [isAuthenticated, loading, user, navigate]);

  // ✅ LOADING STATE: Show loading while checking auth status
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#14b8a6]"></div>
      </div>
    );
  }

  const handleRoleSelect = (role) => {
    setSelectedRole(role.value);
    setIsDropdownOpen(false);
    setError(""); // Clear any previous errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    // Validation
    if (!email || !password || !selectedRole) {
      setError("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email address");
      setIsLoading(false);
      return;
    }

    try {
      const loginData = {
        email,
        password,
        role: selectedRole
      };
    const response = await authService.login(loginData);
    console.log(response);

      if (response.success) {
        // Store user data
        console.log('User data:', response.user);
        console.log('Token:', response.token);
        login(response.user, response.token);
        setSuccess("Login successful! Redirecting...");
  
      }
    } catch (err) {
        setError(err.message || 'Login failed. Please try again.');
        console.error('Login error:', err);
    } finally {
        setIsLoading(false);
      }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row w-full bg-cover">
      {/* Left Side - Login Form */}
      <div className="flex flex-col justify-center items-center px-4 py-8 sm:px-8 md:px-20 md:w-1/2 bg-white relative z-0">
        <h2 className="text-2xl md:text-3xl font-semibold mb-8">Log In</h2>
        {success && (
          <div className="w-full max-w-md p-3 mb-4 bg-green-100 border border-green-400 text-green-700 rounded">
            {success}
          </div>
        )}
        {error && (
          <div className="w-full max-w-md p-3 mb-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
          <div className="relative z-0">
            <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                setError(""); // Clear error on input change
              }}
              required
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#14b8a6] text-sm md:text-base relative z-0"
            />
          </div>
          <div className="relative">
            <FaKey className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setError(""); // Clear error on input change
              }}
              required
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#14b8a6] text-sm md:text-base"
            />
          </div>
          {/* Role Selection Dropdown */}
          <div className="relative">
            <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full pl-9 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#14b8a6] text-sm md:text-base text-left bg-white"
            >
              {selectedRole ? 
                roles.find(role => role.value === selectedRole)?.label : 
                "Select your role"
              }
            </button>
            <FaChevronDown 
              className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 transition-transform ${
                isDropdownOpen ? 'rotate-180' : ''
              }`} 
            />
            {isDropdownOpen && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                {roles.map((role) => (
                  <button
                    key={role.value}
                    type="button"
                    onClick={() => handleRoleSelect(role)}
                    className="w-full px-4 py-2 text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none first:rounded-t-md last:rounded-b-md"
                  >
                    {role.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#14b8a6] text-white py-2 rounded-md font-semibold hover:bg-blue-600 transition text-sm md:text-base"
          >
            {isLoading ? 'Logging in...' : 'Log In'}
          </button>
          <div className="text-right">
            <Link to="/forgot-password" className="text-[#14b8a6] text-sm hover:underline">
              Forgot password?
            </Link>
          </div>
          <div className="flex items-center my-4">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-3 text-gray-500 text-sm">or</span>
            <hr className="flex-grow border-gray-300" />
          </div>
          <div className="flex gap-4 flex-col sm:flex-row">
            <button
              type="button"
              className="flex items-center justify-center gap-2 w-full sm:w-1/2 border border-gray-300 rounded-md py-2 hover:bg-gray-100 transition"
            >
              <FaGoogle className="text-red-500" />
              Google
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-2 w-full sm:w-1/2 border border-gray-300 rounded-md py-2 hover:bg-gray-100 transition"
            >
              <FaFacebookF className="text-blue-600" />
              Facebook
            </button>
          </div>
          <p className="text-gray-600 text-sm mt-6 text-center md:text-left">
            Don’t have an account?{" "}
            <Link to="/register" className="text-[#14b8a6] font-semibold hover:underline">
              Sign Up
            </Link>
          </p>
        </form>
      </div>

      {/* Right Side - Quote and Image */}
      <div
        className="hidden md:flex flex-col items-center w-1/2 p-10 bg-cover bg-center"
        style={{ backgroundImage: `url(${LoginImage})` }}
      >
        <div className="text-center text-gray-800 text-lg font-medium bg-opacity-80 rounded-lg p-6">
          <span className="text-6xl text-gray-300 select-none">“</span>
          The future belongs to those who{" "}
          <span className="font-bold text-[#14b8a6]">believe</span> in the{" "}
          <span className="font-bold text-[#14b8a6]">beauty of their dreams</span>.
          <span className="block mt-4 text-right text-gray-600 font-normal text-base">
            - Eleanor Roosevelt
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;