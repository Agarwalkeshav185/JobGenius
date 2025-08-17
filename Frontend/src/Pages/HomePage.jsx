import { Link } from "react-router-dom"
import { Search, Briefcase, Users, Building2 } from "lucide-react"
import JobListingCard from "../Components/Cards/JobListingCard"
import TestimonialCard from "../Components/Cards/TestimonialCard"
import BlogCard from "../Components/Cards/BlogCard"

import Header from "../Components/Layout/Header";
import Footer from "../Components/Layout/Footer";
import CategorySection from "../Components/Layout/Home/CategorySection";

function HomePage() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative bg-black text-white">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: "url('/placeholder.jpg')" }}
        ></div>
        <div className="container mx-auto px-4 relative z-10">
          {/* Hero Content */}
          <div className="py-20 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Find Your Dream Job Today!</h1>
            <p className="text-lg mb-12 max-w-2xl mx-auto">
              Connecting Talent with Opportunity: Your Gateway to Career Success
            </p>

            {/* Search Form */}
            <div className="flex flex-col md:flex-row max-w-4xl mx-auto rounded-lg overflow-hidden">
              <input
                type="text"
                placeholder="Job Title or Company"
                className="flex-1 h-12 bg-white text-black rounded-l-lg min-w-[180px] border-0 px-4"
              />
              <select className="h-12 bg-white text-black border-0 min-w-[180px] px-4">
                <option value="">Select Location</option>
                <option value="new-york">New York</option>
                <option value="los-angeles">Los Angeles</option>
                <option value="chicago">Chicago</option>
              </select>
              <select className="h-12 bg-white text-black border-0 min-w-[180px] px-4">
                <option value="">Select Category</option>
                <option value="it">IT & Software</option>
                <option value="marketing">Marketing</option>
                <option value="finance">Finance</option>
              </select>
              <button className="h-12 px-6 bg-teal-500 hover:bg-teal-600 text-white flex items-center justify-center">
                <Search className="mr-2 h-4 w-4" />
                Search Job
              </button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 mt-16">
              <div className="flex items-center gap-3">
                <div className="bg-teal-500/20 p-3 rounded-full">
                  <Briefcase className="h-6 w-6 text-teal-500" />
                </div>
                <div className="text-left">
                  <p className="text-2xl font-bold">25,850</p>
                  <p className="text-gray-300">Jobs</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-teal-500/20 p-3 rounded-full">
                  <Users className="h-6 w-6 text-teal-500" />
                </div>
                <div className="text-left">
                  <p className="text-2xl font-bold">10,250</p>
                  <p className="text-gray-300">Candidates</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-teal-500/20 p-3 rounded-full">
                  <Building2 className="h-6 w-6 text-teal-500" />
                </div>
                <div className="text-left">
                  <p className="text-2xl font-bold">18,400</p>
                  <p className="text-gray-300">Companies</p>
                </div>
              </div>
            </div>
          </div>

          {/* Company Logos */}
          <div className="flex flex-wrap justify-center gap-12 pb-12">
            <img src="/placeholder-logo.png" alt="Spotify" className="h-10" />
            <img src="/placeholder-logo.png" alt="Slack" className="h-10" />
            <img src="/placeholder-logo.png" alt="Adobe" className="h-10" />
            <img src="/placeholder-logo.png" alt="Asana" className="h-10" />
            <img src="/placeholder-logo.png" alt="Linear" className="h-10" />
          </div>
        </div>
      </section>

      {/* Recent Jobs Section */}
      <section className="py-12 container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Recent Jobs Available</h2>
          <Link to="/jobs" className="text-teal-500 hover:underline">
            View all
          </Link>
        </div>
        <p className="text-gray-500 mb-8">At eu lobortis pretium tincidunt amet lacus ut aenean aliquet...</p>

        <div className="space-y-4">
          <JobListingCard
            logo="/placeholder-company.png"
            title="Forward Security Director"
            company="Rauch, Schuppel and Schmidt Co"
            timeAgo="10 min ago"
            category="Hotels & Tourism"
            timeType="Full time"
            salary="$40000-$42000"
            location="New York, USA"
          />

          <JobListingCard
            logo="/placeholder-company.png"
            title="Regional Creative Facilitator"
            company="Wunsch - Becker Co"
            timeAgo="12 min ago"
            category="Media"
            timeType="Part time"
            salary="$12000-$22000"
            location="Los Angeles, USA"
          />

          <JobListingCard
            logo="/placeholder-company.png"
            title="Internal Integration Planner"
            company="Mraz, Quigley and Feesl Inc."
            timeAgo="15 min ago"
            category="Construction"
            timeType="Full time"
            salary="$48000-$50000"
            location="Texas, USA"
          />

          <JobListingCard
            logo="/placeholder-company.png"
            title="District Intranet Director"
            company="VonRueden - Weber Co"
            timeAgo="24 min ago"
            category="Commerce"
            timeType="Full time"
            salary="$52000-$58000"
            location="Florida, USA"
          />

          <JobListingCard
            logo="/placeholder-company.png"
            title="Corporate Tactics Facilitator"
            company="Conner, Turner and Flatley Inc"
            timeAgo="26 min ago"
            category="Commerce"
            timeType="Full time"
            salary="$38000-$40000"
            location="Boston, USA"
          />
        </div>
      </section>


      <CategorySection />

      {/* Good Life Section */}
      <section className="py-16 container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="rounded-xl overflow-hidden">
            <img src="/placeholder-image.jpg" alt="Good Company" className="w-full h-full object-cover" />
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-4">
              Good Life Begins With
              <br />A Good Company
            </h2>
            <p className="text-gray-600 mb-6">
              Adipisci purus dolor vitae in torrent et cursus justo. Ultrices purus diam egestas amet faucibus tempor
              blandit. Elit velit mauris eleifend elit diam. Leo sagittis consectetur diam morbi erat aenean. Vulputate
              praesent congue faucibus in suscipit feugiat euismod vulputat...
            </p>

            <div className="flex gap-4">
              <button className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded">Search Job</button>
              <button className="border border-teal-500 text-teal-500 hover:bg-teal-50 px-4 py-2 rounded">
                Learn more
              </button>
            </div>

            <div className="grid grid-cols-3 gap-6 mt-12">
              <div>
                <h3 className="text-2xl font-bold text-teal-500">12k+</h3>
                <p className="font-medium">Clients worldwide</p>
                <p className="text-sm text-gray-500 mt-2">
                  At eu lobortis pretium tincidunt amet lacus ut aenean aliquet. Blandit a massa elementum.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-teal-500">20k+</h3>
                <p className="font-medium">Active resume</p>
                <p className="text-sm text-gray-500 mt-2">
                  At eu lobortis pretium tincidunt amet lacus ut aenean aliquet. Blandit a massa elementum.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-teal-500">18k+</h3>
                <p className="font-medium">Companies</p>
                <p className="text-sm text-gray-500 mt-2">
                  At eu lobortis pretium tincidunt amet lacus ut aenean aliquet. Blandit a massa elementum.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Create Better Future Section */}
      <section className="py-8 container mx-auto px-4">
        <div className="relative rounded-xl overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-70"
            style={{ backgroundImage: "url('/placeholder-banner.jpg')" }}
          ></div>
          <div className="relative bg-black/50 text-white p-12">
            <div className="max-w-lg">
              <h2 className="text-3xl font-bold mb-4">
                Create A Better
                <br />
                Future For Yourself
              </h2>
              <p className="mb-6">
                At eu lobortis pretium tincidunt amet lacus ut aenean aliquet. Blandit a massa elementum id scelerisque
                rhoncus...
              </p>
              <button className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded">Search Job</button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}

      <section className="py-16 relative overflow-hidden bg-white">
        {/* Glassy overlay with 40% opacity teal */}
        <div className="absolute inset-0 bg-[#30968940] backdrop-blur-md rounded-xl z-0 border border-[#30968922] shadow-inner"></div>

        <div className="container relative z-10 mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">Testimonials from Our Customers</h2>
          <p className="text-gray-600 text-center mb-12">
            At eu lobortis pretium tincidunt amet lacus ut aenean aliquet. Blandit a massa elementum...
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <TestimonialCard
              name="Marco Kim"
              role="Happy Client"
              avatar="/placeholder-avatar.jpg"
              rating={5}
              testimonial="Amazing services"
              content="Morbi faucibus sed magna lectus feugiat tincidunt. Etiam sed tincidunt in dolor. Mea etiam et vestibulum elementis. Max etiam et vestibulum elementis"
            />

            <TestimonialCard
              name="Kristin Hexter"
              role="Happy Client"
              avatar="/placeholder-avatar.jpg"
              rating={5}
              testimonial="Everything simple"
              content="Max etiam et vestibulum elementis viverra aliquor faucibus. Vestibulum ullamcorper aliquor faucibus"
            />

            <TestimonialCard
              name="Zion Clemens"
              role="Happy Client"
              avatar="/placeholder-avatar.jpg"
              rating={5}
              testimonial="Awesome, thank you!"
              content="Pharetra and tincidunt in dolor. Max etiam et vestibulum elementis viverra aliquor faucibus. Nulla et aliquor maximus"
            />
          </div>
        </div>
      </section>





      {/* News and Blog Section */}
      <section className="py-12 container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">News and Blog</h2>
          <Link to="/blog" className="text-teal-500 hover:underline">
            View all
          </Link>
        </div>
        <p className="text-gray-500 mb-8">
          Morbi faucibus sed magna lectus feugiat tincidunt. Pharetra sed tincidunt in dolor
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <BlogCard
            image="/placeholder-blog.jpg"
            category="News"
            date="20 March 2024"
            title="Revitalizing Workplace Morale: Innovative Tactics For Boosting Employee Engagement In 2024"
          />

          <BlogCard
            image="/placeholder-blog.jpg"
            category="Tips"
            date="23 March 2024"
            title="How To Avoid The Top Six Most Common Job Interview Mistakes"
          />
        </div>
      </section>
    </main>
  )
}

export default HomePage
