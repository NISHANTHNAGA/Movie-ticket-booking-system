import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";

import {
    getAdminShows,
    deleteShow
} from "../../services/showServices";

import "./AdminShows.css";


function AdminShows() {

    const navigate = useNavigate();

    const [shows, setShows] = useState([]);

    const [loading, setLoading] = useState(true);


    useEffect(() => {

        loadShows();

    }, []);


    const loadShows = async () => {

        try {

            const data = await getAdminShows();

            setShows(data);

        } catch (error) {

            console.error(
                "Error loading shows:",
                error
            );

        } finally {

            setLoading(false);

        }

    };


    const handleDelete = async (showId) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this show?"
        );

        if (!confirmDelete) {
            return;
        }


        try {

            await deleteShow(showId);

            alert(
                "Show deleted successfully."
            );

            loadShows();

        } catch (error) {

            console.error(
                "Error deleting show:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Failed to delete show."
            );

        }

    };


    return (
        <>
            <Navbar />

            <div className="admin-shows-page">

                <div className="admin-shows-header">

                    <div>

                        <h1>
                            Manage Shows
                        </h1>

                        <p>
                            Add, edit and manage movie shows.
                        </p>

                    </div>


                    <button
                        className="add-show-btn"
                        onClick={() =>
                            navigate(
                                "/admin/shows/add"
                            )
                        }
                    >
                        + Add Show
                    </button>

                </div>


                {loading ? (

                    <p className="shows-message">
                        Loading shows...
                    </p>

                ) : shows.length === 0 ? (

                    <p className="shows-message">
                        No shows available.
                    </p>

                ) : (

                    <div className="admin-show-list">

                        {shows.map((show) => (

                            <div
                                className="admin-show-card"
                                key={show.id}
                            >

                                <div className="show-info">

                                    <h2>
                                        {show.movie_title}
                                    </h2>

                                    <p>
                                        <strong>
                                            Theatre:
                                        </strong>{" "}
                                        {show.theatre_name}
                                    </p>

                                    <p>
                                        <strong>
                                            Date:
                                        </strong>{" "}
                                        {show.show_date}
                                    </p>

                                    <p>
                                        <strong>
                                            Time:
                                        </strong>{" "}
                                        {show.show_time}
                                    </p>

                                    <p>
                                        <strong>
                                            Price:
                                        </strong>{" "}
                                        ₹{show.price}
                                    </p>

                                </div>


                                <div className="show-actions">

                                    <button
                                        className="edit-show-btn"
                                        onClick={() =>
                                            navigate(
                                                `/admin/shows/edit/${show.id}`
                                            )
                                        }
                                    >
                                        Edit
                                    </button>


                                    <button
                                        className="delete-show-btn"
                                        onClick={() =>
                                            handleDelete(
                                                show.id
                                            )
                                        }
                                    >
                                        Delete
                                    </button>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>
        </>
    );
}


export default AdminShows;