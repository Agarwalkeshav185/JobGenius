import axiosInstance from "../api/axiosInstance";

const EmployerServices = {

    createJob: async (jobData) => {
        try {
            console.log("jobdATA" , jobData);
            const response = await axiosInstance.post('/job/post', jobData);
            console.log("response", response);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export default EmployerServices;