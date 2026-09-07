import { useLocation, useNavigate, useParams } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";

import { createBooking } from "../../services/bookingservice";

import "./Booking.css";
import { useState } from "react";


function Booking() {

    const location = useLocation();
    const navigate = useNavigate();
    const { showId } = useParams();

    const {
        selectedSeats,
        totalAmount,
        price
    } = location.state;


    const handleConfirmBooking = async () => {

        try {

            const bookingData = {
                show: showId,
                seat_numbers: selectedSeats.join(","),
                total_amount: totalAmount
            };

            const response = await createBooking(bookingData);

            console.log("Booking response:", response);

            setBookingSuccess(true);

        } catch (error) {

            console.error(
                "Booking error:",
                error
            );

            if (error.response) {

                alert(
                    error.response.data.message ||
                    "Booking failed"
                );

            } else {

                alert(
                    "Unable to connect to the server."
                );
            }
        }
    };

    const [bookingSuccess, setBookingSuccess] = useState(false);
    return (
        <>
            <Navbar />

            <div className="booking-page">

                <div className="booking-card">

                    <h1>Booking Summary</h1>

                    <div className="booking-details">

                        <p>
                            <strong>Selected Seats:</strong>
                        </p>

                        <p className="selected-seats">
                            {selectedSeats.join(", ")}
                        </p>

                        <p>
                            <strong>
                                Number of Seats:
                            </strong>{" "}
                            {selectedSeats.length}
                        </p>

                        <p>
                            <strong>
                                Price per Seat:
                            </strong>{" "}
                            ₹{price}
                        </p>

                        <h2>
                            Total Amount: ₹
                            {totalAmount.toFixed(2)}
                        </h2>

                    </div>

                    {bookingSuccess ? (

                        <div className="booking-success">
                            🎉 Booking Successful!
                        </div>

                    ) : (

                        <button
                            className="confirm-booking-btn"
                            onClick={handleConfirmBooking}
                        >
                            Confirm Booking
                        </button>

                    )}

                </div>

            </div>
        </>
    );
}


export default Booking;