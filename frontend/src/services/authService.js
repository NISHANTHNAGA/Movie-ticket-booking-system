import axios from "axios";

const BASE_URL = "/api";

export const registerUser = async (userData) => {
    const response = await axios.post(
        `${BASE_URL}/register/`,
        userData
    );

    return response.data;
};

export const loginUser = async (credentials) => {

    const response = await axios.post(
        `${BASE_URL}/login/`,
        credentials,
        {
            withCredentials: true
        }
    );

    return response.data;
};

export const logoutUser = async () =>{
    const response = await axios.post(
        `${BASE_URL}/logout/`,
        {},
        {
            withCredentials : true
        }
    );

    return response.data;
}

export const getAdminUsers = async () => {

    const response = await axios.get(
        `${BASE_URL}/admin/users/`,
        {
            withCredentials: true
        }
    );

    return response.data;
};

export const updateUserRole = async (userId, role) => {

    const response = await axios.put(
        `${BASE_URL}/admin/users/${userId}/`,
        {
            role: role
        },
        {
            withCredentials: true
        }
    );

    return response.data;
};

export const deleteUser = async (userId) => {

    const response = await axios.delete(
        `${BASE_URL}/admin/users/${userId}/`,
        {
            withCredentials: true
        }
    );

    return response.data;
};