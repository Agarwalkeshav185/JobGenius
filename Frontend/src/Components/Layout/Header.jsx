import { Link, useNavigate } from "react-router-dom"
import { Briefcase } from "lucide-react"
import { FaBars, FaTimes, FaUser, FaSignOutAlt, FaTachometerAlt} from "react-icons/fa"
import { useState, useRef, useEffect } from "react"
import { useAuth } from "../../Context/AuthContext"

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setIsProfileDropdownOpen(false);
    navigate('/');
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };
  
  return (
    <header className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-black text-white">
        <div className="container mx-auto px-4 relative">
          {/* Navigation */}
          <nav className="flex items-center justify-between py-6">
            <div className="flex items-center gap-2">
              <Briefcase className="h-6 w-6" />
              <span className="text-lg font-bold">JobGenius</span>
            </div>
            
            {/* ✅ Navigation Links */}
            <div className="hidden md:flex items-center justify-center flex-1 mx-8">
              <div className="flex items-center space-x-8">
                <Link to="/" className="font-medium hover:text-teal-400 transition-colors">
                  Home
                </Link>
                <Link to="/jobs" className="font-medium hover:text-teal-400 transition-colors">
                  Jobs
                </Link>
                <Link to="/about" className="font-medium hover:text-teal-400 transition-colors">
                  About Us
                </Link>
                <Link to="/contact" className="font-medium hover:text-teal-400 transition-colors">
                  Contact Us
                </Link>
              </div>
            </div>
            
            {/* ✅ Auth Section - Desktop */}
            <div className="hidden md:flex items-center gap-3">
              {isAuthenticated && user ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={toggleProfileDropdown}
                    className="flex items-center gap-2 text-white hover:text-teal-400 transition-colors"
                  >
                    <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center text-white font-medium text-sm">
                      {user.name?.charAt(0)?.toUpperCase() || user.companyName?.charAt(0)?.toUpperCase() || 'U'}
                    </div>
                    <span className="font-medium">
                      {user.name || user.companyName || 'User'}
                    </span>
                  </button>

                  {isProfileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                      <div className="px-4 py-2 border-b border-gray-200">
                        <p className="text-sm font-medium text-gray-900">
                          {user.name || user.companyName}
                        </p>
                        <p className="text-xs text-gray-500 capitalize">
                          {user.role === 'Job Seeker' ? 'Job Seeker' : 'Employer'}
                        </p>
                      </div>
                      
                      <button
                        onClick={() => {
                          navigate(user.role === 'employer' ? '/dashboard/employer' : '/dashboard');
                          setIsProfileDropdownOpen(false);
                        }}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                      >
                        <FaTachometerAlt className="h-4 w-4" />
                        Dashboard
                      </button>
                      
                      <button
                        onClick={() => {
                          navigate('/dashboard/profile');
                          setIsProfileDropdownOpen(false);
                        }}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                      >
                        <FaUser className="h-4 w-4" />
                        My Profile
                      </button>
                      
                      <hr className="my-1" />
                      
                      <button
                        onClick={handleLogout}
                        className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                      >
                        <FaSignOutAlt className="h-4 w-4" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <button 
                    className="text-white bg-transparent hover:bg-gray-700 px-4 py-2 rounded transition-colors" 
                    onClick={() => navigate('/login')}
                  >
                    Login
                  </button>
                  <button 
                    className="bg-teal-500 hover:bg-teal-600 px-4 py-2 rounded text-white transition-colors"
                    onClick={() => navigate('/register')}
                  >
                    Register
                  </button>
                </>
              )}
            </div>

            {/* ✅ Hamburger Icon - Mobile */}
            <div className="md:hidden z-50 relative cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </div>
          </nav>

          {/* ✅ Mobile Menu */}
          {isOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
              onClick={() => setIsOpen(false)}
            >
              <ul
                className={`fixed top-0 right-0 w-2/3 h-full bg-gray-800 p-6 transition-transform duration-300 ease-in-out ${
                  isOpen ? "translate-x-0" : "translate-x-full"
                } md:hidden overflow-y-auto`}
                onClick={(e) => e.stopPropagation()}
              >
                {/* ✅ Mobile User Info */}
                {isAuthenticated && user && (
                  <li className="py-4 border-b border-gray-600 list-none">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center text-white font-medium">
                        {user.name?.charAt(0)?.toUpperCase() || user.companyName?.charAt(0)?.toUpperCase() || 'U'}
                      </div>
                      <div>
                        <p className="text-white font-medium text-sm">
                          {user.name || user.companyName}
                        </p>
                        <p className="text-gray-400 text-xs capitalize">
                          {user.role === 'Job Seeker' ? 'Job Seeker' : 'Employer'}
                        </p>
                      </div>
                    </div>
                  </li>
                )}

                <li className="py-4 border-b border-gray-600 hover:text-teal-400 cursor-pointer list-none">
                  <Link to="/" className="font-medium" onClick={() => setIsOpen(false)}>
                    Home
                  </Link>
                </li>
                <li className="py-4 border-b border-gray-600 hover:text-teal-400 cursor-pointer list-none">
                  <Link to="/jobs" className="font-medium" onClick={() => setIsOpen(false)}>
                    Jobs
                  </Link>
                </li>
                <li className="py-4 border-b border-gray-600 hover:text-teal-400 cursor-pointer list-none">
                  <Link to="/about" className="font-medium" onClick={() => setIsOpen(false)}>
                    About Us
                  </Link>
                </li>
                <li className="py-4 border-b border-gray-600 hover:text-teal-400 cursor-pointer list-none">
                  <Link to="/contact" className="font-medium" onClick={() => setIsOpen(false)}>
                    Contact Us
                  </Link>
                </li>

                {isAuthenticated && user ? (
                  <>
                    <li className="py-4 border-b border-gray-600 hover:text-teal-400 cursor-pointer list-none">
                      <Link 
                        to={user.role === 'Employer' ? '/dashboard/employer' : '/dashboard/jobseeker'}
                        className="font-medium flex items-center gap-2" 
                        onClick={() => setIsOpen(false)}
                      >
                        <FaTachometerAlt className="h-4 w-4" />
                        Dashboard
                      </Link>
                    </li>
                    <li className="py-4 border-b border-gray-600 hover:text-teal-400 cursor-pointer list-none">
                      <Link 
                        to="/dashboard/profile" 
                        className="font-medium flex items-center gap-2" 
                        onClick={() => setIsOpen(false)}
                      >
                        <FaUser className="h-4 w-4" />
                        My Profile
                      </Link>
                    </li>
                    <li className="py-4 hover:text-red-400 cursor-pointer list-none">
                      <button 
                        className="font-medium flex items-center gap-2" 
                        onClick={() => {
                          handleLogout();
                          setIsOpen(false);
                        }}
                      >
                        <FaSignOutAlt className="h-4 w-4" />
                        Logout
                      </button>
                    </li>
                  </>
                ) : (
                  <li className="py-4 border-b border-gray-600 hover:text-teal-400 cursor-pointer list-none">
                    <Link 
                      to="/login" 
                      className="font-medium" 
                      onClick={() => setIsOpen(false)}
                    >
                      Login / Register
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      </section>
    </header>
  )
}

export default Header