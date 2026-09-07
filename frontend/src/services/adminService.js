import axios from "axios";

const BASE_URL = "/api";


export const getAdminDashboard = async () => {

    const response = await axios.get(
        `${BASE_URL}/admin/dashboard/`,
        {
            withCredentials: true
        }
    );

    return response.data;
};