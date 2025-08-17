import axiosInstance from "../axiosInstance";


export async function fetchCategory() {
    try {
        const response = await axiosInstance.get("/category/getAll");
        return response.data;
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
    }
}