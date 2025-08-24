import axiosInstance from "../axiosInstance";


export async function fetchCategory(page, limit) {
    try {
        const response = await axiosInstance.get("/category/getAll",
            {
                params : {page, limit}
            }
        );
        console.log(response.data.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
    }
}