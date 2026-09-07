import axios from "axios";

const BASE_URL = "/api";


export const getAdminShows = async () => {

    const response = await axios.get(
        `${BASE_URL}/admin/shows/`,
        {
            withCredentials: true
        }
    );

    return response.data;
};


export const getAdminShowById = async (showId) => {

    const response = await axios.get(
        `${BASE_URL}/admin/shows/${showId}/`,
        {
            withCredentials: true
        }
    );

    return response.data;
};


export const addShow = async (showData) => {

    const response = await axios.post(
        `${BASE_URL}/admin/shows/`,
        showData,
        {
            withCredentials: true
        }
    );

    return response.data;
};


export const updateShow = async (
    showId,
    showData
) => {

    const response = await axios.put(
        `${BASE_URL}/admin/shows/${showId}/`,
        showData,
        {
            withCredentials: true
        }
    );

    return response.data;
};


export const deleteShow = async (showId) => {

    const response = await axios.delete(
        `${BASE_URL}/admin/shows/${showId}/`,
        {
            withCredentials: true
        }
    );

    return response.data;
};