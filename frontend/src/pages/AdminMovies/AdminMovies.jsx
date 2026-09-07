import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";
import Toast from "../../components/Toast/Toast";

import {
    getAdminMovies,
    deleteMovie
} from "../../services/movieServices";

import "./AdminMovies.css";


function AdminMovies() {

    const navigate = useNavigate();

    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        loadMovies();
    }, []);

    const [toast, setToast] = useState({
        message: "",
        type: "success"
    });

    const showToast = (message, type) => {

        setToast({
            message,
            type
        });

        setTimeout(() => {

            setToast({
                message: "",
                type: "success"
            });

        }, 3000);
    };

    const loadMovies = async () => {

        try {

            const data = await getAdminMovies();

            setMovies(data);

        } catch (error) {

            console.error(
                "Error loading movies:",
                error
            );

        } finally {

            setLoading(false);

        }
    };


    const handleDelete = async (movieId) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this movie?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            await deleteMovie(movieId);

            showToast(
                "Movie deleted successfully.",
                "success"
            );

            loadMovies();

        } catch (error) {

            console.error(
                "Error deleting movie:",
                error
            );

            showToast(
                "Failed to delete movie.",
                "error"
            );

        }
    };


    return (
        <>
            <Navbar />

            <Toast
                message={toast.message}
                type={toast.type}
                onClose={() =>
                    setToast({
                        message: "",
                        type: "success"
                    })
                }
            />

            <div className="admin-movies-page">

                <div className="admin-movies-header">

                    <div>

                        <h1>Manage Movies</h1>

                        <p>
                            Add, edit and manage movies.
                        </p>

                    </div>


                    <button
                        className="add-movie-btn"
                        onClick={() =>
                            navigate("/admin/movies/add")
                        }
                    >
                        + Add Movie
                    </button>

                </div>


                {loading ? (

                    <p className="loading-message">
                        Loading movies...
                    </p>

                ) : movies.length === 0 ? (

                    <p className="empty-message">
                        No movies available.
                    </p>

                ) : (

                    <div className="admin-movie-list">

                        {movies.map((movie) => (

                            <div className="admin-movie-card">

                                <div className="admin-movie-poster">

                                    {movie.poster ? (
                                        <img
                                            src={`http://127.0.0.1:8000${movie.poster}`}
                                            alt={movie.title}
                                        />
                                    ) : (
                                        <span>🎬</span>
                                    )}

                                </div>


                                <div className="movie-info">

                                    <h2>
                                        {movie.title}
                                    </h2>

                                    <p>
                                        <strong>
                                            Genre:
                                        </strong>{" "}
                                        {movie.genre}
                                    </p>

                                    <p>
                                        <strong>
                                            Language:
                                        </strong>{" "}
                                        {movie.language}
                                    </p>

                                    <p>
                                        <strong>
                                            Duration:
                                        </strong>{" "}
                                        {movie.duration} minutes
                                    </p>

                                    <p>
                                        <strong>
                                            Release Date:
                                        </strong>{" "}
                                        {movie.release_date}
                                    </p>

                                    <p>
                                        <strong>
                                            Status:
                                        </strong>{" "}

                                        {movie.is_active
                                            ? "Active"
                                            : "Inactive"
                                        }

                                    </p>

                                </div>


                                <div className="movie-actions">

                                    <button
                                        className="edit-btn"
                                        onClick={() =>
                                            navigate(
                                                `/admin/movies/edit/${movie.id}`
                                            )
                                        }
                                    >
                                        Edit
                                    </button>


                                    <button
                                        className="delete-btn"
                                        onClick={() =>
                                            handleDelete(movie.id)
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


export default AdminMovies;