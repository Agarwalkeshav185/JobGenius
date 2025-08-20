import react from "react";
import JobListingCard from "../../Cards/JobListingCard";
import { Link } from "react-router-dom"

function RecentJobsSection() {

    return (
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
    )
}
export default RecentJobsSection;