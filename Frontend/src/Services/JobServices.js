import axiosInstance from "../api/axiosInstance";

const jobServices = {
    getRecentJobs : async (page = 1, limit = 10) =>{
        try{
            const response = await axiosInstance.get('/job/recent', {
                params : {page, limit}
            });
            return response.data;
        }
        catch(error){
            console.error("Error fetching recent jobs:", error);
            throw error;
        }
    },

    getJobsByFilter: async (page = 1, limit = 10, filters = {}) => {
        try {
            const params = { page, limit, ...filters };
            const response = await axiosInstance.get(`/job/getall`, { params });  
            return response.data;
        } catch (error) {
            console.error("Error fetching jobs by filter:", error);
            throw error;
        }
    },

    getJobById: async (jobId) => {
        try {
            const response = await axiosInstance.get(`job/get/${jobId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching job by ID:', error);
            throw error;
        }
    },

    createJob: async (jobData) => {
        try {
            const response = await axiosInstance.post('/job/post', jobData);          
            return response.data;
        } catch (error) {
            console.error('Error creating job:', error);
            throw error;
        }
    },

    getJobByIdForDescription : async(jobId) =>{
        try{
            console.log('JobId : ', jobId);
            const response = await axiosInstance.get(`job/get/${jobId}/description`);
            console.log(response.data);
            return response.data;
        }
        catch(error){
            console.error('Error fetching job by ID:', error);
            throw error;
        }
    },
}

export default jobServices;