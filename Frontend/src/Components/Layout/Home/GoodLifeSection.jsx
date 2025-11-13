import React from "react";
import { Link } from "react-router-dom";
import goodLifeImage1 from "../../../assets/goodlifeimage1.jpg"; // added - adjust filename if needed

export default function GoodLifeSection({
  employersCount = "12k+",
  candidatesCount = "20k+",
  placementsCount = "18k+"
}) {
  return (
    <section className="py-16 container mx-auto px-4">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="rounded-xl overflow-hidden">
          <img
            src={goodLifeImage1}
            alt="Good Company"
            className="w-full h-64 md:h-80 lg:h-96 xl:h-[500px] object-cover"
          />
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-4">
            Good Life Begins With
            <br />A Good Company
          </h2>
          <p className="text-gray-600 mb-6">
            Discover thousands of opportunities from top employers. Whether you're starting your career or looking for your next big move, we connect talented professionals with companies that value growth, innovation, and impact.
          </p>

          <div className="flex gap-4">
            {/* Use react-router Link so buttons navigate client-side */}
            <Link
              to="/jobs"
              aria-label="Search jobs"
              className="h-12 inline-flex items-center justify-center bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded"
            >
              Search Jobs
            </Link>

            <Link
              to="/about"
              aria-label="Learn more about us"
              className="h-12 inline-flex items-center justify-center border border-teal-500 text-teal-500 hover:bg-teal-50 px-4 py-2 rounded"
            >
              Learn more
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-6 mt-12">
            <div>
              <h3 className="text-2xl font-bold text-teal-500">{employersCount}</h3>
              <p className="font-medium">Active Employers</p>
              <p className="text-sm text-gray-500 mt-2">
                Join thousands of trusted companies hiring skilled professionals across industries.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-teal-500">{candidatesCount}</h3>
              <p className="font-medium">Verified Candidates</p>
              <p className="text-sm text-gray-500 mt-2">
                Access a growing database of verified resumes from motivated job seekers worldwide.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-teal-500">{placementsCount}</h3>
              <p className="font-medium">Successful Placements</p>
              <p className="text-sm text-gray-500 mt-2">
                Empowering careers and helping businesses find the perfect match every day.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}