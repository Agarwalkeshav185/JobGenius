import axiosInstance from "../api/axiosInstance";


const homepage= {
    getHomePageStats : async () => {
        try {
            const response = await axiosInstance.get("/stats/homepage");
            return response.data;
        } catch (error) {
            throw new Error("Failed to fetch homepage stats");
        }
    },
    getRecentJobs: async (limit) => {
        try {
            const response = await axiosInstance.get(`/jobs/recent?limit=${limit}`);
            return response.data;
        } catch (error) {
            throw new Error("Failed to fetch recent jobs");
        }
    }
}
export default homepage;
