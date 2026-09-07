import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { getMyBookings } from "../../services/bookingservice";

import "./MyBookings.css";

function MyBookings() {

    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        loadBookings();
    }, []);

    const loadBookings = async () => {

        try {

            const data = await getMyBookings();

            setBookings(data);

        } catch (error) {

            console.error(
                "Error fetching bookings:",
                error
            );

            setError(
                "Unable to load your bookings."
            );

        } finally {

            setLoading(false);

        }
    };

    return (
        <>
            <Navbar />

            <div className="my-bookings-page">

                <h1>My Bookings</h1>

                {loading && (
                    <p>Loading bookings...</p>
                )}

                {!loading && error && (
                    <p>{error}</p>
                )}

                {!loading &&
                    !error &&
                    bookings.length === 0 && (
                        <p>
                            You have no bookings yet.
                        </p>
                    )
                }

                {!loading &&
                    !error &&
                    bookings.length > 0 && (

                        <div className="bookings-list">

                            {bookings.map((booking) => (

                                <div
                                    className="booking-card"
                                    key={booking.id}
                                >

                                    <h2>
                                        Booking #{booking.id}
                                    </h2>

                                    <p>
                                        <strong>
                                            Movie:
                                        </strong>{" "}
                                        {booking.show_details.movie}
                                    </p>

                                    <p>
                                        <strong>
                                            Theatre:
                                        </strong>{" "}
                                        {booking.show_details.theatre}
                                    </p>

                                    <p>
                                        <strong>
                                            Date:
                                        </strong>{" "}
                                        {booking.show_details.show_date}
                                    </p>

                                    <p>
                                        <strong>
                                            Time:
                                        </strong>{" "}
                                        {booking.show_details.show_time}
                                    </p>

                                    <p>
                                        <strong>
                                            Seats:
                                        </strong>{" "}
                                        {booking.seat_numbers}
                                    </p>

                                    <p>
                                        <strong>
                                            Price per Seat:
                                        </strong>{" "}
                                        ₹{booking.show_details.price}
                                    </p>

                                    <p>
                                        <strong>
                                            Total Amount:
                                        </strong>{" "}
                                        ₹{booking.total_amount}
                                    </p>

                                    <p>
                                        <strong>
                                            Booked At:
                                        </strong>{" "}
                                        {new Date(
                                            booking.booked_at
                                        ).toLocaleString()}
                                    </p>

                                    <button
                                        className="view-ticket-btn"
                                        onClick={() =>
                                            navigate("/e-ticket", {
                                                state: {
                                                    booking: booking
                                                }
                                            })
                                        }
                                    >
                                        🎟️ View E-Ticket
                                    </button>

                                </div>

                            ))}

                        </div>
                    )}

            </div>
        </>
    );
}

export default MyBookings;