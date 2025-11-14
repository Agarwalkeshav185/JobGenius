import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { Search, Briefcase, Users, Building2 } from "lucide-react"
import homepage from "../../../Services/homeServices";
import Stats from "./HeroSection/stats";
import CompanyLogos from "./HeroSection/CompanyLogos";


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
              {/* <select className="h-12 bg-white text-black border-0 min-w-[180px] px-4">
                <option value="">Select Location</option>
                <option value="new-york">New York</option>
                <option value="los-angeles">Los Angeles</option>
                <option value="chicago">Chicago</option>
              </select> */}
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
            <Stats data = {data} />
          </div>
          <CompanyLogos />

        </div>
      </section>
    )
}

export default HeroSection;