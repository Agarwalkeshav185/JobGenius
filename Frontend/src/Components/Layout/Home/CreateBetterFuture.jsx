import React from "react";
import { Link } from "react-router-dom";
import bannerImage from "../../../assets/CreateBetterLife.png";

export default function CreateBetterFuture({
  titleTop = "Create A Better",
  titleBottom = "Future For Yourself",
  description = "Take the next step in your career journey. Explore thousands of job openings from leading companies that are looking for talent like you. Your dream job is just a click away.",
  ctaText = "Search Job",
  ctaLink = "/jobs",
  learnMoreText = "Learn more",
  learnMoreLink = "/about"
}) {
  return (
    <section className="py-8 container mx-auto px-4">
      <div className="grid md:grid-cols-2 gap-8 items-stretch bg-black rounded-2xl">
        {/* Left: Text / CTAs */}
        <div className="order-2 md:order-1 flex items-center px-10">
          <div className="max-w-lg">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight text-white">
              {titleTop}
              <br />
              {titleBottom}
            </h2>
            <p className="mb-6 text-sm md:text-base text-gray-400">
              {description}
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to={ctaLink}
                className="inline-flex items-center justify-center h-12 px-5 bg-teal-500 hover:bg-teal-600 text-white rounded-md"
                aria-label="Search jobs"
              >
                {ctaText}
              </Link>

              <Link
                to={learnMoreLink}
                className="inline-flex items-center justify-center h-12 px-5 border border-teal-500 text-teal-500 hover:bg-teal-50 rounded-md"
                aria-label="Learn more"
              >
                {learnMoreText}
              </Link>
            </div>
          </div>
        </div>

        {/* Right: Image - adjusted to match homepage sizing */}
        <div className="order-1 md:order-2 rounded-lg overflow-hidden shadow-sm flex items-stretch">
          <img
            src={bannerImage}
            alt="Create a better future banner"
            className="w-full h-full object-cover min-h-[220px] sm:min-h-[260px] md:min-h-[320px] lg:min-h-[420px] xl:min-h-[350px] px-2"
          />
        </div>
      </div>
    </section>
  );
}