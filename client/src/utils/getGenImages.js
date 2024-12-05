import axios from "axios";

const endpoint = "http://localhost:8000/AdGenie/getBrandImages";

export const getBrandImages = async (brand_id) => {
    try {
        // Making a POST request to the endpoint with the query and intent
        const res = await axios.post(endpoint,{"id": brand_id});
        return res.data;
    } catch (error) {
        // Log any error that occurs during the request
        console.error("Error fetching chat response:", error);
        throw error;  // Optionally, re-throw the error for further handling
    }
};