import { useState, useEffect } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";
import { getShows } from "../../services/movieServices";

import "./Shows.css";


function Shows() {

    const { id, theatreId } = useParams();

    const [searchParams] = useSearchParams();

    const navigate = useNavigate();


    const selectedDate = searchParams.get("date");


    const [shows, setShows] = useState([]);

    const [loading, setLoading] = useState(true);


    useEffect(() => {

        if (selectedDate) {

            loadShows();

        }

    }, [id, theatreId, selectedDate]);


    const loadShows = async () => {

        try {

            setLoading(true);


            const data = await getShows(
                id,
                theatreId,
                selectedDate
            );


            if (Array.isArray(data)) {

                setShows(data);

            } else {

                setShows([]);

                console.error(
                    "Shows API Error:",
                    data
                );

            }

        } catch (error) {

            console.error(
                "Error loading shows:",
                error
            );

            setShows([]);

        } finally {

            setLoading(false);

        }

    };


    const handleShowSelect = (showId) => {

        navigate(
            `/booking/${showId}/seats`
        );

    };


    return (
        <>
            <Navbar />

            <div className="shows-page">

                <h1>
                    Select Show
                </h1>


                {selectedDate && (

                    <p className="selected-date">

                        📅 Selected Date:{" "}

                        <strong>
                            {selectedDate}
                        </strong>

                    </p>

                )}


                {loading ? (

                    <p className="shows-message">
                        Loading shows...
                    </p>

                ) : shows.length === 0 ? (

                    <p className="shows-message">
                        No shows available for
                        the selected date.
                    </p>

                ) : (

                    <div className="shows-list">

                        {shows.map((show) => (

                            <div
                                className="show-card"
                                key={show.id}
                            >

                                <p>
                                    🕐{" "}
                                    <strong>
                                        {show.show_time}
                                    </strong>
                                </p>


                                <p>
                                    💰 ₹{show.price}
                                </p>


                                <button
                                    onClick={() =>
                                        handleShowSelect(
                                            show.id
                                        )
                                    }
                                >
                                    Select Show
                                </button>

                            </div>

                        ))}

                    </div>

                )}

            </div>
        </>
    );
}


export default Shows;