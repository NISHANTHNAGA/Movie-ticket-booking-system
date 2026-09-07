import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";

import "./VerifyTicket.css";


function VerifyTicket() {

    const { ticketCode } = useParams();

    const [booking, setBooking] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    useEffect(() => {

        verifyTicket();

    }, [ticketCode]);


    const verifyTicket = async () => {

        try {

            const response = await fetch(
                `http://127.0.0.1:8000/api/tickets/${ticketCode}/`
            );


            const data = await response.json();


            if (response.ok && data.valid) {

                setBooking(data.booking);

            } else {

                setError(
                    data.message || "Invalid ticket."
                );

            }

        } catch (error) {

            console.error(
                "Ticket verification error:",
                error
            );

            setError(
                "Unable to verify ticket."
            );

        } finally {

            setLoading(false);

        }

    };


    if (loading) {

        return (
            <>
                <Navbar />

                <div className="verify-page">

                    <h2>
                        Verifying ticket...
                    </h2>

                </div>
            </>
        );

    }


    if (error) {

        return (
            <>
                <Navbar />

                <div className="verify-page">

                    <div className="invalid-ticket">

                        <div className="verification-icon">
                            ❌
                        </div>

                        <h1>
                            Invalid Ticket
                        </h1>

                        <p>
                            {error}
                        </p>

                    </div>

                </div>
            </>
        );

    }


    const show = booking.show_details;


    return (
        <>
            <Navbar />

            <div className="verify-page">

                <div className="valid-ticket">

                    <div className="verification-icon">
                        ✅
                    </div>

                    <h1>
                        Valid Ticket
                    </h1>

                    <p className="verification-message">
                        This CineBook ticket is valid.
                    </p>


                    <div className="verified-details">

                        <div>
                            <span>
                                Booking ID
                            </span>

                            <strong>
                                #{booking.id}
                            </strong>
                        </div>


                        <div>
                            <span>
                                Movie
                            </span>

                            <strong>
                                {show.movie}
                            </strong>
                        </div>


                        <div>
                            <span>
                                Theatre
                            </span>

                            <strong>
                                {show.theatre}
                            </strong>
                        </div>


                        <div>
                            <span>
                                Date
                            </span>

                            <strong>
                                {show.show_date}
                            </strong>
                        </div>


                        <div>
                            <span>
                                Time
                            </span>

                            <strong>
                                {show.show_time}
                            </strong>
                        </div>


                        <div>
                            <span>
                                Seats
                            </span>

                            <strong>
                                {booking.seat_numbers}
                            </strong>
                        </div>


                        <div>
                            <span>
                                Total Amount
                            </span>

                            <strong>
                                ₹{booking.total_amount}
                            </strong>
                        </div>

                    </div>

                </div>

            </div>
        </>
    );
}


export default VerifyTicket;