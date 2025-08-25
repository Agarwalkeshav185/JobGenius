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
    },
    getCompanyById : async (id) =>{
        try{
            const response = await axiosInstance.get(`/company/get/${id}`);
            return response.data;
        }
        catch(error){
            throw error;
        }
    },
    updateCompanyDetails : async (id, companyData)=>{
        try{
            const response = await axiosInstance.put(`/company/update/${id}`, companyData);
            return response.data;
        }
        catch(error){
            throw error;
        }
    },
}

export default EmployerServices;