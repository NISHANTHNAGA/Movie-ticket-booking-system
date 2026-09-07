import { useLocation, useNavigate } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";

import Navbar from "../../components/Navbar/Navbar";

import "./ETicket.css";


function ETicket() {

    const location = useLocation();
    const navigate = useNavigate();

    const booking = location.state?.booking;


    if (!booking) {

        return (
            <>
                <Navbar />

                <div className="ticket-error">

                    <h2>
                        Ticket information not found.
                    </h2>

                    <button
                        onClick={() =>
                            navigate("/my-bookings")
                        }
                    >
                        Back to My Bookings
                    </button>

                </div>
            </>
        );
    }


    const show = booking.show_details;


    const verificationUrl =
        `${window.location.origin}/verify-ticket/${booking.ticket_code}`;


    return (
        <>
            <Navbar />

            <div className="ticket-page">

                <div className="ticket-card">

                    <div className="ticket-header">

                        <h1>
                            🎬 CineBook
                        </h1>

                        <p>
                            E-TICKET
                        </p>

                    </div>


                    <div className="ticket-movie">

                        <h2>
                            {show.movie}
                        </h2>

                    </div>


                    <div className="ticket-details">

                        <div className="ticket-row">

                            <span>
                                Theatre
                            </span>

                            <strong>
                                {show.theatre}
                            </strong>

                        </div>


                        <div className="ticket-row">

                            <span>
                                Date
                            </span>

                            <strong>
                                {show.show_date}
                            </strong>

                        </div>


                        <div className="ticket-row">

                            <span>
                                Time
                            </span>

                            <strong>
                                {show.show_time}
                            </strong>

                        </div>


                        <div className="ticket-row">

                            <span>
                                Seats
                            </span>

                            <strong>
                                {booking.seat_numbers}
                            </strong>

                        </div>


                        <div className="ticket-row">

                            <span>
                                Price / Seat
                            </span>

                            <strong>
                                ₹{show.price}
                            </strong>

                        </div>


                        <div className="ticket-row">

                            <span>
                                Total Amount
                            </span>

                            <strong>
                                ₹{booking.total_amount}
                            </strong>

                        </div>


                        <div className="ticket-row">

                            <span>
                                Booking ID
                            </span>

                            <strong>
                                #{booking.id}
                            </strong>

                        </div>

                    </div>


                    <div className="ticket-divider">
                    </div>


                    <div className="qr-section">

                        <h3>
                            Scan to Verify Ticket
                        </h3>


                        <QRCodeCanvas
                            value={verificationUrl}
                            size={180}
                            bgColor="#ffffff"
                            fgColor="#000000"
                            level="H"
                        />


                        <p className="ticket-code">

                            Ticket Code:

                            <br />

                            {booking.ticket_code}

                        </p>

                    </div>


                    <div className="ticket-footer">

                        <p>
                            Please show this QR code at the theatre.
                        </p>

                        <button
                            onClick={() =>
                                navigate("/my-bookings")
                            }
                        >
                            Back to My Bookings
                        </button>

                    </div>

                </div>

            </div>
        </>
    );
}


export default ETicket;