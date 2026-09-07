import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";
import { getTheatresByMovie } from "../../services/movieServices";

import "./Theatres.css";


function Theatres() {

    const { id } = useParams();

    const navigate = useNavigate();


    const [theatres, setTheatres] = useState([]);

    const [selectedDate, setSelectedDate] = useState("");

    const [loading, setLoading] = useState(false);


    const getToday = () => {

        const today = new Date();

        const year = today.getFullYear();

        const month = String(
            today.getMonth() + 1
        ).padStart(2, "0");

        const day = String(
            today.getDate()
        ).padStart(2, "0");


        return `${year}-${month}-${day}`;
    };

    useEffect(() => {

        setSelectedDate(getToday());

    }, []);


    useEffect(() => {

        if (selectedDate) {

            loadTheatres();

        }

    }, [id, selectedDate]);


    const loadTheatres = async () => {

        try {

            setLoading(true);

            const data = await getTheatresByMovie(
                id,
                selectedDate
            );


            if (Array.isArray(data)) {

                setTheatres(data);

            } else {

                setTheatres([]);

                console.error(
                    "Theatre API Error:",
                    data
                );

            }

        } catch (error) {

            console.error(
                "Error loading theatres:",
                error
            );

            setTheatres([]);

        } finally {

            setLoading(false);

        }

    };
    const handleDateChange = (e) => {

        setSelectedDate(
            e.target.value
        );

    };

    const handleTheatreSelect = (theatreId) => {

        navigate(
            `/movies/${id}/shows/${theatreId}?date=${selectedDate}`
        );

    };


    return (
        <>
            <Navbar />


            <div className="theatre-page">


                <h1>
                    Select Theatre
                </h1>
                <div className="date-selector">

                    <label htmlFor="show-date">

                        📅 Select Date

                    </label>


                    <input
                        id="show-date"
                        type="date"
                        value={selectedDate}
                        min={getToday()}
                        onChange={
                            handleDateChange
                        }
                    />

                </div>
                {loading ? (

                    <p className="theatre-message">

                        Loading theatres...

                    </p>

                ) : theatres.length === 0 ? (

                    <p className="theatre-message">

                        No theatres have shows available
                        for the selected date.

                    </p>

                ) : (

                    <div className="theatre-list">

                        {theatres.map((theatre) => (

                            <div
                                className="theatre-card"
                                key={theatre.id}
                            >

                                <h2>
                                    {theatre.name}
                                </h2>


                                <p>
                                    📍 {theatre.city}
                                </p>


                                <p>
                                    {theatre.address}
                                </p>


                                <button
                                    onClick={() =>
                                        handleTheatreSelect(
                                            theatre.id
                                        )
                                    }
                                >

                                    Select Theatre

                                </button>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </>
    );
}


export default Theatres;