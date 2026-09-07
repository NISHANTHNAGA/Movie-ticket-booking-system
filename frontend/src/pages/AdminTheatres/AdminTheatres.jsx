import { useEffect, useState } from "react";

import Navbar from "../../components/Navbar/Navbar";

import {
    getAdminTheatres,
    deleteTheatre
} from "../../services/theatreServices";

import "./AdminTheatres.css";


function AdminTheatres() {

    const [theatres, setTheatres] = useState([]);

    const [loading, setLoading] = useState(true);


    useEffect(() => {

        loadTheatres();

    }, []);


    const loadTheatres = async () => {

        try {

            const data = await getAdminTheatres();

            setTheatres(data);

        } catch (error) {

            console.error(
                "Error loading theatres:",
                error
            );

        } finally {

            setLoading(false);

        }

    };


    const handleDelete = async (theatreId) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this theatre?"
        );

        if (!confirmDelete) {
            return;
        }


        try {

            await deleteTheatre(theatreId);

            alert(
                "Theatre deleted successfully."
            );

            loadTheatres();

        } catch (error) {

            console.error(
                "Error deleting theatre:",
                error
            );

            alert(
                "Failed to delete theatre."
            );

        }

    };


    return (
        <>
            <Navbar />

            <div className="admin-theatres-page">

                <div className="admin-theatres-header">

                    <div>

                        <h1>
                            Manage Theatres
                        </h1>

                        <p>
                            Add, edit and manage theatres.
                        </p>

                    </div>


                    <button
                        className="add-theatre-btn"
                        onClick={() =>
                            window.location.href =
                            "/admin/theatres/add"
                        }
                    >
                        + Add Theatre
                    </button>

                </div>


                {loading ? (

                    <p className="theatres-message">
                        Loading theatres...
                    </p>

                ) : theatres.length === 0 ? (

                    <p className="theatres-message">
                        No theatres available.
                    </p>

                ) : (

                    <div className="admin-theatre-list">

                        {theatres.map((theatre) => (

                            <div
                                className="admin-theatre-card"
                                key={theatre.id}
                            >

                                <div className="theatre-info">

                                    <h2>
                                        {theatre.name}
                                    </h2>

                                    <p>
                                        <strong>
                                            City:
                                        </strong>{" "}
                                        {theatre.city}
                                    </p>

                                    <p>
                                        <strong>
                                            Address:
                                        </strong>{" "}
                                        {theatre.address}
                                    </p>

                                </div>


                                <div className="theatre-actions">

                                    <button
                                        className="edit-theatre-btn"
                                        onClick={() =>
                                            window.location.href =
                                            `/admin/theatres/edit/${theatre.id}`
                                        }
                                    >
                                        Edit
                                    </button>


                                    <button
                                        className="delete-theatre-btn"
                                        onClick={() =>
                                            handleDelete(
                                                theatre.id
                                            )
                                        }
                                    >
                                        Delete
                                    </button>

                                    <button
                                        className="manage-movies-btn"
                                        onClick={() =>
                                            window.location.href =
                                            `/admin/theatres/movies/${theatre.id}`
                                        }
                                    >
                                        Manage Movies
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


export default AdminTheatres;