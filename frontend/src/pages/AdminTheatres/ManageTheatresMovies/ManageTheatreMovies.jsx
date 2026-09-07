import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Navbar from "../../../components/Navbar/Navbar";

import {
    getTheatreById,
    getTheatreMovies,
    assignMoviesToTheatre
} from "../../../services/theatreServices";

import { getMovies } from "../../../services/movieServices";

import "./ManageTheatreMovies.css";


function ManageTheatreMovies() {

    const { theatreId } = useParams();

    const navigate = useNavigate();


    const [theatre, setTheatre] = useState(null);

    const [movies, setMovies] = useState([]);

    const [selectedMovies, setSelectedMovies] = useState([]);

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);


    useEffect(() => {

        loadData();

    }, [theatreId]);


    const loadData = async () => {

        try {

            const theatreData =
                await getTheatreById(theatreId);

            const allMovies =
                await getMovies();

            const assignedMovies =
                await getTheatreMovies(theatreId);


            setTheatre(theatreData);

            setMovies(allMovies);

            setSelectedMovies(
                assignedMovies.map(
                    (movie) => movie.id
                )
            );

        } catch (error) {

            console.error(
                "Error loading theatre movies:",
                error
            );

            alert(
                "Unable to load theatre movies."
            );

            navigate("/admin/theatres");

        } finally {

            setLoading(false);

        }

    };


    const handleMovieChange = (movieId) => {

        setSelectedMovies(
            (current) => {

                if (current.includes(movieId)) {

                    return current.filter(
                        (id) => id !== movieId
                    );

                }

                return [
                    ...current,
                    movieId
                ];

            }
        );

    };


    const handleSave = async () => {

        setSaving(true);

        try {

            await assignMoviesToTheatre(
                theatreId,
                selectedMovies
            );

            alert(
                "Movies assigned successfully."
            );

        } catch (error) {

            console.error(
                "Error assigning movies:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Failed to assign movies."
            );

        } finally {

            setSaving(false);

        }

    };


    if (loading) {

        return (
            <>
                <Navbar />

                <div className="manage-theatre-movies-page">

                    <p>
                        Loading...
                    </p>

                </div>
            </>
        );

    }


    return (
        <>
            <Navbar />

            <div className="manage-theatre-movies-page">

                <div className="manage-theatre-movies-card">

                    <h1>
                        Manage Theatre Movies
                    </h1>

                    {theatre && (

                        <p className="theatre-name">
                            Theatre:
                            <strong>
                                {" "}
                                {theatre.name}
                            </strong>
                        </p>

                    )}


                    <p className="instruction">
                        Select the movies that should
                        be available at this theatre.
                    </p>


                    <div className="movie-selection-list">

                        {movies.length === 0 ? (

                            <p>
                                No movies available.
                            </p>

                        ) : (

                            movies.map((movie) => (

                                <label
                                    className="movie-selection-item"
                                    key={movie.id}
                                >

                                    <input
                                        type="checkbox"
                                        checked={selectedMovies.includes(
                                            movie.id
                                        )}
                                        onChange={() =>
                                            handleMovieChange(
                                                movie.id
                                            )
                                        }
                                    />

                                    <span>
                                        {movie.title}
                                    </span>

                                </label>

                            ))

                        )}

                    </div>


                    <div className="selection-summary">

                        Selected Movies:
                        {" "}
                        {selectedMovies.length}

                    </div>


                    <div className="manage-movies-actions">

                        <button
                            className="cancel-btn"
                            onClick={() =>
                                navigate(
                                    "/admin/theatres"
                                )
                            }
                        >
                            Cancel
                        </button>


                        <button
                            className="save-movies-btn"
                            onClick={handleSave}
                            disabled={saving}
                        >

                            {saving
                                ? "Saving..."
                                : "Save Movies"
                            }

                        </button>

                    </div>

                </div>

            </div>
        </>
    );
}


export default ManageTheatreMovies;