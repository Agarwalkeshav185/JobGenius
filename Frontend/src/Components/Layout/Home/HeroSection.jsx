import react, { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { Search, Briefcase, Users, Building2 } from "lucide-react"
import homepage from "../../../Services/homeServices";



function HeroSection(){
    const [data, setData] = useState(null);
    useEffect(() => {

        try{
            const fetchHomePageStats = async ()=>{
                const stats = await homepage.getHomePageStats();
                setData(stats.data);
            }
            fetchHomePageStats();
        }
        catch(error){
            console.error("Error fetching home page stats:", error);
        }
    }, []);

    return (
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
                  <p className="text-2xl font-bold">{data?.totalJobs || 25_850}</p>
                  <p className="text-gray-300">Jobs</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-teal-500/20 p-3 rounded-full">
                  <Users className="h-6 w-6 text-teal-500" />
                </div>
                <div className="text-left">
                  <p className="text-2xl font-bold">{data?.totalCandidates || 10_250}</p>
                  <p className="text-gray-300">Candidates</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-teal-500/20 p-3 rounded-full">
                  <Building2 className="h-6 w-6 text-teal-500" />
                </div>
                <div className="text-left">
                  <p className="text-2xl font-bold">{data?.totalCompanies || 18_400}</p>
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
    )
}

export default HeroSection;