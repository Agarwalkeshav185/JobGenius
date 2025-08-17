import { Link } from "react-router-dom"
import { Button } from "../UI/Button"
import { Input } from "../UI/Input"
import { Briefcase } from "lucide-react"
import NewsletterForm from "../../Components/Cards/NewsLetterForm"

export default function Footer() {
  return (
      <footer className="bg-black text-white p-4">
        <div className="container mx-auto p-4">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Briefcase className="h-5 w-5" />
                <span className="font-bold">JobGenius</span>
              </div>
              <p className="text-gray-400 mb-4 text-justify">
                Connecting talented professionals with top companies worldwide. 
                Our platform helps job seekers find their dream roles & empowers employers to hire the best talent with ease.
              </p>
            </div>

            <div>
              <h3 className="font-bold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link to="/about" className="hover:text-white">
                    About us
                  </Link>
                </li>
                <li>
                  <Link to="/team" className="hover:text-white">
                    Our team
                  </Link>
                </li>
                <li>
                  <Link to="/partners" className="hover:text-white">
                    Partners
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="hover:text-white">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link to="/employers" className="hover:text-white">
                    For Employers
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Job Categories</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link to="/jobs/administration" className="hover:text-white">
                    Administration
                  </Link>
                </li>
                <li>
                  <Link to="/jobs/hotels-tourism" className="hover:text-white">
                    Hotels & Tourism
                  </Link>
                </li>
                <li>
                  <Link to="/jobs/construction" className="hover:text-white">
                    Construction
                  </Link>
                </li>
                <li>
                  <Link to="/jobs/commerce" className="hover:text-white">
                    Commerce
                  </Link>
                </li>
                <li>
                  <Link to="/jobs/financial-services" className="hover:text-white">
                    Financial Services
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Newsletter</h3>
              <p className="text-gray-400 mb-4">Get latest updates, jobs, offers and special announcements.</p>
              <NewsletterForm />
            </div>
          </div>

          <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© Copyright Job Genius, 2025. Designed by Keshav Agarwal</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Link to="/privacy" className="text-gray-400 text-sm hover:text-white">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 text-sm hover:text-white">
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </footer>
  )
}
