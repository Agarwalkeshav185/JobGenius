import React from "react";
import { Briefcase, Users, Building2 } from "lucide-react";

export default function Stats({ data = {} }) {
  // support multiple possible key names returned by API
  const totalJobs =
    Number(data?.totalJobs ?? data?.total_jobs ?? data?.jobs ?? data?.jobsCount ?? 25850) || 25850;
  const totalCandidates =
    Number(data?.totalCandidates ?? data?.total_candidates ?? data?.candidates ?? data?.candidatesCount ?? 10250) || 10250;
  const totalCompanies =
    Number(data?.totalCompanies ?? data?.total_companies ?? data?.companies ?? data?.companiesCount ?? 18400) || 18400;

  return (
    <div className="flex flex-wrap justify-center gap-8 mt-16">
      <div className="flex items-center gap-3">
        <div className="bg-teal-500/20 p-3 rounded-full">
          <Briefcase className="h-6 w-6 text-teal-500" />
        </div>
        <div className="text-left">
          <p className="text-2xl font-bold">{totalJobs.toLocaleString()}</p>
          <p className="text-gray-300">Jobs</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="bg-teal-500/20 p-3 rounded-full">
          <Users className="h-6 w-6 text-teal-500" />
        </div>
        <div className="text-left">
          <p className="text-2xl font-bold">{totalCandidates.toLocaleString()}</p>
          <p className="text-gray-300">Candidates</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="bg-teal-500/20 p-3 rounded-full">
          <Building2 className="h-6 w-6 text-teal-500" />
        </div>
        <div className="text-left">
          <p className="text-2xl font-bold">{totalCompanies.toLocaleString()}</p>
          <p className="text-gray-300">Companies</p>
        </div>
      </div>
    </div>
  );
}