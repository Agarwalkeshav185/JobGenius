import axiosInstance from "../axiosInstance";


export async function fetchCategory(page, limit) {
    try {
        const response = await axiosInstance.get("/category/getAllJobCount",
            {
                params : {page, limit}
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
    }
}