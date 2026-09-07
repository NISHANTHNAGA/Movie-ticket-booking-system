import axios from "axios";
const BASE_URL = "/api";


export const getMovies = async (filters = {}) => {

    try {

        const params = new URLSearchParams();


        if (filters.city) {
            params.append("city", filters.city);
        }


        if (filters.min_price) {
            params.append(
                "min_price",
                filters.min_price
            );
        }


        if (filters.max_price) {
            params.append(
                "max_price",
                filters.max_price
            );
        }


        const queryString = params.toString();


        const url = queryString
            ? `${BASE_URL}/movies/?${queryString}`
            : `${BASE_URL}/movies/`;


        const response = await axios.get(url);

        return response.data;

    } catch (error) {

        console.error(
            "Error fetching Movies:",
            error
        );

        return [];

    }
};

export const getMovieById = async (id) => {
    const response = await fetch(
        `http://127.0.0.1:8000/api/movies/${id}/`
    );

    return await response.json();
}

export const getTheatresByMovie = async (
    movieId,
    date
) => {

    const response = await fetch(
        `http://127.0.0.1:8000/api/movies/${movieId}/theatres/?date=${date}`
    );

    return await response.json();
};

export const getShows = async (
    movieId,
    theatreId,
    date
) => {

    const response = await fetch(
        `http://127.0.0.1:8000/api/movies/${movieId}/theatres/${theatreId}/shows/?date=${date}`
    );

    return await response.json();
};

export const getShowById = async (showId) => {
    const response = await fetch(`http://127.0.0.1:8000/api/shows/${showId}/`);

    return await response.json();
}

export const getAdminMovies = async () => {
    const response = await axios.get(
        `${BASE_URL}/admin/movies/`,
        {
            withCredentials: true
        }
    );
    return response.data;
}

export const deleteMovie = async (movieId) => {

    const response = await axios.delete(
        `${BASE_URL}/admin/movies/${movieId}/`,
        {
            withCredentials: true
        }
    );

    return response.data;
};

export const addMovie = async (movieData) => {

    const response = await axios.post(
        `${BASE_URL}/admin/movies/`,
        movieData,
        {
            withCredentials: true
        }
    );

    return response.data;
};

export const updateMovie = async (movieId, movieData) => {

    const response = await axios.put(
        `${BASE_URL}/admin/movies/${movieId}/`,
        movieData,
        {
            withCredentials: true
        }
    );

    return response.data;
};