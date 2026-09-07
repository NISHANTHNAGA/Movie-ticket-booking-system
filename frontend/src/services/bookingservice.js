import axios from "axios";


const BASE_URL = "/api";


const getCookie = (name) => {
    const cookies = document.cookie.split(";");

    for (let cookie of cookies) {
        cookie = cookie.trim();

        if (cookie.startsWith(name + "=")) {
            return decodeURIComponent(
                cookie.substring(name.length + 1)
            );
        }
    }

    return null;
};


export const getBookedSeats = async (showId) => {

    const response = await axios.get(
        `${BASE_URL}/shows/${showId}/booked-seats/`
    );

    return response.data;
};


export const createBooking = async (bookingData) => {

    const response = await axios.post(
        `${BASE_URL}/book/`,
        bookingData,
        {
            withCredentials: true
        }
    );

    return response.data;
};

export const getMyBookings = async () => {

    const response = await axios.get(
        "/api/bookings/",
        {
            withCredentials: true
        }
    );

    return response.data;
};