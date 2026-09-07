import axios from "axios";

const BASE_URL = "/api";

export const getAdminTheatres = async () => {

    const response = await axios.get(
        `${BASE_URL}/admin/theatres/`,
        {
            withCredentials: true
        }
    );

    return response.data;
};


export const addTheatre = async (theatreData) => {

    const response = await axios.post(
        `${BASE_URL}/admin/theatres/`,
        theatreData,
        {
            withCredentials: true
        }
    );

    return response.data;
};

export const getTheatreById = async (theatreId) => {

    const response = await axios.get(
        `${BASE_URL}/admin/theatres/${theatreId}/`,
        {
            withCredentials: true
        }
    );

    return response.data;
};

export const updateTheatre = async (
    theatreId,
    theatreData
) => {

    const response = await axios.put(
        `${BASE_URL}/admin/theatres/${theatreId}/`,
        theatreData,
        {
            withCredentials: true
        }
    );

    return response.data;
};

export const deleteTheatre = async (theatreId) => {

    const response = await axios.delete(
        `${BASE_URL}/admin/theatres/${theatreId}/`,
        {
            withCredentials: true
        }
    );

    return response.data;
};

export const getTheatreMovies = async (theatreId) => {

    const response = await axios.get(
        `${BASE_URL}/admin/theatres/${theatreId}/movies/`,
        {
            withCredentials: true
        }
    );

    return response.data;
};


export const assignMoviesToTheatre = async (
    theatreId,
    movieIds
) => {

    const response = await axios.put(
        `${BASE_URL}/admin/theatres/${theatreId}/movies/`,
        {
            movie_ids: movieIds
        },
        {
            withCredentials: true
        }
    );

    return response.data;
};

export const getTheatresByMovie = async (
    movieId,
    date
) => {

    const response = await fetch(
        `http://127.0.0.1:8000/api/movies/${movieId}/theatres/?date=${date}`
    );

    if (!response.ok) {

        throw new Error(
            "Failed to load theatres."
        );

    }

    return await response.json();
};


export const getAdminTheatresByMovie = async (
    movieId
) => {

    const response = await axios.get(
        `${BASE_URL}/admin/movies/${movieId}/theatres/`,
        {
            withCredentials: true
        }
    );

    return response.data;
};
