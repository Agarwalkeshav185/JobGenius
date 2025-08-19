import Job from "../models/jobs.js";
import Company from "../models/company.js";
import User from "../models/user.js";
import { ErrorHandler } from "../middlewares/error-middlewares.js";


class StatsService{
    async getHomepageStats(){
        try {
            const totalJobs = await Job.countDocuments();
            const totalCompanies = await Company.countDocuments();
            const totalCandidates = await User.countDocuments({ role:"Job Seeker" });

            const sevenDaysAgo = new Date();
            sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
            const recentJobs = await Job.countDocuments({ createdAt: { $gte: sevenDaysAgo } });

            return {
                totalJobs,
                totalCompanies,
                totalCandidates,
                recentJobs
            };
        } catch (error) {
            throw new ErrorHandler('Failed to get job stats', 500);
        }
    }
};

export default StatsService;