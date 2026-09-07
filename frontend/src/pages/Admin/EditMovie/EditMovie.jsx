import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Navbar from "../../../components/Navbar/Navbar";

import {
    getMovieById,
    updateMovie
} from "../../../services/movieServices";

import "./EditMovie.css";


function EditMovie() {

    const { movieId } = useParams();

    const navigate = useNavigate();


    const [formData, setFormData] = useState({
        title: "",
        genre: "",
        language: "",
        duration: "",
        release_date: "",
        description: "",
        is_active: true
    });


    const [poster, setPoster] = useState(null);

    const [currentPoster, setCurrentPoster] = useState("");

    const [loading, setLoading] = useState(true);

    const [updating, setUpdating] = useState(false);


    useEffect(() => {

        loadMovie();

    }, [movieId]);


    const loadMovie = async () => {

        try {

            const movie = await getMovieById(movieId);


            setFormData({
                title: movie.title || "",
                genre: movie.genre || "",
                language: movie.language || "",
                duration: movie.duration || "",
                release_date: movie.release_date || "",
                description: movie.description || "",
                is_active: movie.is_active
            });


            if (movie.poster) {

                setCurrentPoster(
                    `http://127.0.0.1:8000${movie.poster}`
                );

            }

        } catch (error) {

            console.error(
                "Error loading movie:",
                error
            );

            alert("Unable to load movie.");

            navigate("/admin/movies");

        } finally {

            setLoading(false);

        }

    };


    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });

    };


    const handlePosterChange = (e) => {

        setPoster(e.target.files[0]);

    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        setUpdating(true);


        try {

            const data = new FormData();


            data.append(
                "title",
                formData.title
            );

            data.append(
                "genre",
                formData.genre
            );

            data.append(
                "language",
                formData.language
            );

            data.append(
                "duration",
                formData.duration
            );

            data.append(
                "release_date",
                formData.release_date
            );

            data.append(
                "description",
                formData.description
            );

            data.append(
                "is_active",
                formData.is_active
            );


            if (poster) {

                data.append(
                    "poster",
                    poster
                );

            }


            await updateMovie(
                movieId,
                data
            );


            alert(
                "Movie updated successfully."
            );


            navigate("/admin/movies");


        } catch (error) {

            console.error(
                "Error updating movie:",
                error
            );

            console.log(
                "Backend error:",
                error.response?.data
            );


            alert(
                "Failed to update movie."
            );

        } finally {

            setUpdating(false);

        }

    };


    if (loading) {

        return (
            <>
                <Navbar />

                <div className="edit-movie-page">

                    <p className="loading-message">
                        Loading movie...
                    </p>

                </div>
            </>
        );

    }


    return (
        <>
            <Navbar />

            <div className="edit-movie-page">

                <div className="edit-movie-card">

                    <h1>
                        Edit Movie
                    </h1>

                    <p className="edit-movie-subtitle">
                        Update movie information.
                    </p>


                    <form
                        className="edit-movie-form"
                        onSubmit={handleSubmit}
                    >


                        {/* TITLE */}

                        <div className="form-group">

                            <label>
                                Movie Title
                            </label>

                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                            />

                        </div>


                        {/* GENRE */}

                        <div className="form-group">

                            <label>
                                Genre
                            </label>

                            <input
                                type="text"
                                name="genre"
                                value={formData.genre}
                                onChange={handleChange}
                                required
                            />

                        </div>


                        {/* LANGUAGE */}

                        <div className="form-group">

                            <label>
                                Language
                            </label>

                            <input
                                type="text"
                                name="language"
                                value={formData.language}
                                onChange={handleChange}
                                required
                            />

                        </div>


                        {/* DURATION */}

                        <div className="form-group">

                            <label>
                                Duration
                            </label>

                            <input
                                type="number"
                                name="duration"
                                value={formData.duration}
                                onChange={handleChange}
                                min="1"
                                required
                            />

                        </div>


                        {/* RELEASE DATE */}

                        <div className="form-group">

                            <label>
                                Release Date
                            </label>

                            <input
                                type="date"
                                name="release_date"
                                value={formData.release_date}
                                onChange={handleChange}
                                required
                            />

                        </div>


                        {/* DESCRIPTION */}

                        <div className="form-group">

                            <label>
                                Description
                            </label>

                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows="4"
                            />

                        </div>


                        {/* CURRENT POSTER */}

                        {currentPoster && (

                            <div className="current-poster">

                                <label>
                                    Current Poster
                                </label>

                                <img
                                    src={currentPoster}
                                    alt={formData.title}
                                />

                            </div>

                        )}


                        {/* NEW POSTER */}

                        <div className="form-group">

                            <label>
                                Replace Poster
                            </label>

                            <input
                                type="file"
                                accept="image/*"
                                onChange={handlePosterChange}
                            />

                            {poster && (

                                <p className="selected-file">
                                    Selected: {poster.name}
                                </p>

                            )}

                        </div>


                        {/* ACTIVE */}

                        <div className="active-group">

                            <input
                                type="checkbox"
                                checked={formData.is_active}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        is_active:
                                            e.target.checked
                                    })
                                }
                            />

                            <label>
                                Movie is Active
                            </label>

                        </div>


                        {/* BUTTONS */}

                        <div className="form-actions">

                            <button
                                type="button"
                                className="cancel-btn"
                                onClick={() =>
                                    navigate("/admin/movies")
                                }
                            >
                                Cancel
                            </button>


                            <button
                                type="submit"
                                className="update-movie-btn"
                                disabled={updating}
                            >

                                {updating
                                    ? "Updating..."
                                    : "Update Movie"
                                }

                            </button>

                        </div>

                    </form>

                </div>

            </div>
        </>
    );
}


export default EditMovie;