import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";
import { getBookedSeats } from "../../services/bookingservice";
import { getShowById } from "../../services/movieServices";

import "./SeatSelection.css";


function SeatSelection() {

    const { showId } = useParams();

    const navigate = useNavigate();


    const [bookedSeats, setBookedSeats] = useState([]);

    const [selectedSeats, setSelectedSeats] = useState([]);

    const [show, setShow] = useState(null);

    const [loadingSeats, setLoadingSeats] = useState(true);


    // =========================
    // LOAD SHOW + BOOKED SEATS
    // =========================

    useEffect(() => {

        loadBookedSeats();

        loadShow();

    }, [showId]);


    const loadBookedSeats = async () => {

        try {

            setLoadingSeats(true);

            const data = await getBookedSeats(
                showId
            );


            if (Array.isArray(data)) {

                setBookedSeats(data);

            } else {

                console.error(
                    "Invalid booked seats response:",
                    data
                );

                setBookedSeats([]);

            }

        } catch (error) {

            console.error(
                "Error loading booked seats:",
                error
            );

            setBookedSeats([]);

        } finally {

            setLoadingSeats(false);

        }

    };


    const loadShow = async () => {

        try {

            const data = await getShowById(
                showId
            );

            setShow(data);

        } catch (error) {

            console.error(
                "Error loading show:",
                error
            );

        }

    };


    // =========================
    // SELECT / DESELECT SEAT
    // =========================

    const handleSeatClick = (seat) => {

        // Never allow a booked seat
        if (bookedSeats.includes(seat)) {

            return;

        }


        setSelectedSeats((currentSeats) => {

            if (currentSeats.includes(seat)) {

                return currentSeats.filter(
                    (selectedSeat) =>
                        selectedSeat !== seat
                );

            }


            return [
                ...currentSeats,
                seat
            ];

        });

    };


    const rows = [
        "A",
        "B",
        "C",
        "D",
        "E"
    ];


    const totalAmount = show
        ? selectedSeats.length *
          parseFloat(show.price)
        : 0;


    // =========================
    // LOADING
    // =========================

    if (loadingSeats || !show) {

        return (
            <>
                <Navbar />

                <div className="seat-page">

                    <h2 className="seat-loading">
                        Loading seats...
                    </h2>

                </div>
            </>
        );

    }


    return (
        <>
            <Navbar />


            <div className="seat-page">


                <h1>
                    Select Your Seats
                </h1>


                <div className="screen">
                    SCREEN
                </div>


                {/* =========================
                    SEAT LAYOUT
                ========================= */}

                <div className="seat-layout">

                    {rows.map((row) => (

                        <div
                            className="seat-row"
                            key={row}
                        >

                            {Array.from(
                                { length: 8 },
                                (_, index) => {

                                    const seat =
                                        row +
                                        (index + 1);


                                    const isBooked =
                                        bookedSeats.includes(
                                            seat
                                        );


                                    const isSelected =
                                        selectedSeats.includes(
                                            seat
                                        );


                                    return (

                                        <button
                                            key={seat}

                                            className={`
                                                seat
                                                ${isBooked
                                                    ? "booked"
                                                    : ""
                                                }
                                                ${isSelected
                                                    ? "selected"
                                                    : ""
                                                }
                                            `}

                                            disabled={
                                                isBooked
                                            }

                                            onClick={() =>
                                                handleSeatClick(
                                                    seat
                                                )
                                            }
                                        >

                                            {seat}

                                        </button>

                                    );

                                }
                            )}

                        </div>

                    ))}

                </div>


                {/* =========================
                    LEGEND
                ========================= */}

                <div className="seat-legend">

                    <span>
                        🟩 Available
                    </span>

                    <span>
                        🟥 Booked
                    </span>

                    <span>
                        🟦 Selected
                    </span>

                </div>


                {/* =========================
                    SELECTION INFORMATION
                ========================= */}

                <div className="selection-info">

                    <h3>
                        Selected Seats
                    </h3>


                    {selectedSeats.length === 0 ? (

                        <p>
                            No seats selected
                        </p>

                    ) : (

                        <>

                            <p>
                                {selectedSeats.join(", ")}
                            </p>


                            <p>
                                Seats:{" "}
                                {selectedSeats.length}
                            </p>


                            <p>
                                Price per seat: ₹
                                {show.price}
                            </p>


                            <h2>
                                Total: ₹
                                {totalAmount}
                            </h2>

                        </>

                    )}

                </div>


                {/* =========================
                    CONTINUE BOOKING
                ========================= */}

                {selectedSeats.length > 0 && (

                    <button
                        className="continue-booking-btn"

                        onClick={() => {

                            const bookingData = {

                                selectedSeats:
                                    selectedSeats,

                                totalAmount:
                                    totalAmount,

                                price:
                                    show.price

                            };


                            console.log(
                                "SENDING BOOKING DATA:",
                                bookingData
                            );


                            navigate(
                                `/booking/${showId}`,
                                {
                                    state: {
                                        selectedSeats:
                                            selectedSeats,

                                        totalAmount:
                                            totalAmount,

                                        price:
                                            show.price
                                    }
                                }
                            );

                        }}
                    >

                        Continue to Booking

                    </button>

                )}

            </div>

        </>
    );
}


export default SeatSelection;