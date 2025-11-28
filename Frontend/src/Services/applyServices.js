import axiosInstance from "../api/axiosInstance";

const applyServices = {
    // getRecentApplication : async (page = 1, limit = 10) =>{
    //     try{
    //         const response = await axiosInstance.get('/job/recent', {
    //             params : {page, limit}
    //         });
    //         return response.data;
    //     }
    //     catch(error){
    //         console.error("Error fetching recent jobs:", error);
    //         throw error;
    //     }
    // },

    // getApplicationsByFilter: async (page = 1, limit = 10, filters = {}) => {
    //     try {
    //         const params = { page, limit, ...filters };
    //         const response = await axiosInstance.get(`/job/getall`, { params });  
    //         return response.data;
    //     } catch (error) {
    //         console.error("Error fetching jobs by filter:", error);
    //         throw error;
    //     }
    // },

    getSeekerApplicationsById: async () => {
        try {
            const response = await axiosInstance.get(`applications/get`);
            return response.data;
        } catch (error) {
            console.error('Error fetching job by ID:', error);
            throw error;
        }
    },

    applyJob: async (jobId, applicationData) => {
        try {
            const response = await axiosInstance.post(
                `/applications/post/${jobId}`,
                applicationData,
                {
                    headers : {
                        "Content-Type" : 'multipart/form-data'
                    }
                }
            );
            return response.data;
        } catch (error) {
            console.error("Error submitting application:", error);
            throw error;
        }
    },

    getJobByIdForApplication : async(jobId) =>{
        try{
            const response = await axiosInstance.get(`job/get/${jobId}/apply`);
            return response.data;
        }
        catch(error){
            console.error('Error fetching job by ID:', error);
            throw error;
        }
    },
}

export default applyServices;