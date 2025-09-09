import axiosInstance from "../api/axiosInstance";

const jobServices = {
    getRecentJobs : async (page = 1, limit = 6) =>{
        try{
            const response = await axiosInstance.get('/job/recent', {
                params : {page, limit}
            });
            return response.data;
        }
        catch(error){
            throw error;
        }
    },

    getJobsByFilter: async (page = 1, limit = 10, filters = {}) => {
        try {
            const params = { page, limit, ...filters };

            const response = await axiosInstance.get(`/job/getall`, { params });            
            return response.data;
        } catch(error) {
            console.error('❌ JobServices.getJobsByFilter error:', error);
            console.error('Error response:', error.response?.data);
            throw error;
        }
    }
}
export default jobServices;