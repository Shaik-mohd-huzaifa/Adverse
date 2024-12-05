import axios from "axios";

const endpoint = "http://localhost:8000/AdGenie/getCampaignImages";

export const createAds = async (campaign_details, brand_details) => {
    try {
        // Making a POST request to the endpoint with the query and intent
        console.log({...campaign_details, ...brand_details})
        const res = await axios.post(endpoint,{"campaign_details": {...campaign_details, ...brand_details}});
        return res.data;
    } catch (error) {
        // Log any error that occurs during the request
        console.error("Error fetching chat response:", error);
        throw error;  // Optionally, re-throw the error for further handling
    }
};
