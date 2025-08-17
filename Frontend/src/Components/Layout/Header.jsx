import { Link, useNavigate } from "react-router-dom"
import { Briefcase } from "lucide-react"
import { FaBars, FaTimes} from "react-icons/fa"
import { useState } from "react"

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();
  
  return (
    <header className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-black text-white">
        <div className="container mx-auto px-4 relative">

          {/* Navigation */}
          <nav className="flex items-center justify-between py-6">
            <div className="flex items-center gap-2">
              <Briefcase className="h-6 w-6" />
              <span className="text-lg font-bold">Job Portal</span>
            </div>
            
            <div className="hidden md:flex items-center justify-center flex-1 mx-8">
              <div className="flex items-center space-x-8">
                  <Link to="/" className="font-medium">
                    Home
                  </Link>
                  <Link to="/jobs" className="font-medium">
                    Jobs
                  </Link>
                  <Link to="/about" className="font-medium">
                    About Us
                  </Link>
                  <Link to="/contact" className="font-medium">
                    Contact Us
                  </Link>
              </div>
            </div>
            
            <div className="hidden md:flex items-center gap-3">
              <button 
                className="text-white bg-transparent hover:bg-gray-700 px-4 py-2 rounded" 
                onClick={() => navigate('/login')}
              >
                Login
              </button>
              <button 
                className="bg-teal-500 hover:bg-teal-600 px-4 py-2 rounded text-white"
                onClick={() => navigate('/register')}
              >
                Register
              </button>
            </div>

            

            {/* Hamburger Icon (Mobile) */}
            <div className="md:hidden z-50" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </div>

            {/* Mobile Menu */}
            <ul
              className={`fixed top-0 right-0 w-2/3 h-full bg-gray-800 p-6 transition-transform duration-300 ease-in-out ${
                isOpen ? "translate-x-0" : "translate-x-full"
              } md:hidden`}
            >
              <li className="py-4 border-b border-gray-600 hover:text-teal-400 cursor-pointer">
                <Link to="/" className="font-medium">
                  Home
                </Link>
              </li>
              <li className="py-4 border-b border-gray-600 hover:text-teal-400 cursor-pointer">
                <Link to="/jobs" className="font-medium">
                  Jobs
                </Link>
              </li>
              <li className="py-4 border-b border-gray-600 hover:text-teal-400 cursor-pointer">
                <Link to="/about" className="font-medium">
                  About Us
                </Link>
              </li>
              <li className="py-4 border-b border-gray-600 hover:text-teal-400 cursor-pointer">
                <Link to="/contact" className="font-medium">
                  Contact Us
                </Link>
              </li>
              <li className="py-4 border-b border-gray-600 hover:text-teal-400 cursor-pointer">
                <Link to="/signup" className="font-medium">
                  Login/Signup
                </Link>
              </li>

            </ul>
          </nav>
        </div>
      </section>
      </header>
  )
}

export default Header
