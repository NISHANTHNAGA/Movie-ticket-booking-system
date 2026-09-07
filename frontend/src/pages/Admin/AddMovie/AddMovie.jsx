import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../../../components/Navbar/Navbar";
import { addMovie } from "../../../services/movieServices";

import "./AddMovie.css";


function AddMovie() {

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

    const [loading, setLoading] = useState(false);


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

        setLoading(true);


        try {

            const data = new FormData();

            data.append("title", formData.title);
            data.append("genre", formData.genre);
            data.append("language", formData.language);
            data.append("duration", formData.duration);
            data.append("release_date", formData.release_date);
            data.append("description", formData.description);
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


            await addMovie(data);


            alert("Movie added successfully.");


            navigate("/admin/movies");


        } catch (error) {

            console.error(
                "Error adding movie:",
                error
            );


            if (error.response?.data) {

                console.log(
                    "Backend error:",
                    error.response.data
                );

            }


            alert(
                "Failed to add movie. Please check the details."
            );

        } finally {

            setLoading(false);

        }

    };


    return (
        <>
            <Navbar />

            <div className="add-movie-page">

                <div className="add-movie-card">

                    <h1>
                        Add Movie
                    </h1>

                    <p className="add-movie-subtitle">
                        Add a new movie to CineBook.
                    </p>


                    <form
                        onSubmit={handleSubmit}
                        className="add-movie-form"
                    >


                        {/* TITLE */}

                        <div className="form-group">

                            <label>
                                Movie Title
                            </label>

                            <input
                                type="text"
                                name="title"
                                placeholder="Enter movie title"
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
                                placeholder="Example: Action"
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
                                placeholder="Example: English"
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
                                placeholder="Duration in minutes"
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
                                placeholder="Enter movie description"
                                value={formData.description}
                                onChange={handleChange}
                                rows="4"
                            />

                        </div>


                        {/* POSTER */}

                        <div className="form-group">

                            <label>
                                Movie Poster
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
                                className="save-movie-btn"
                                disabled={loading}
                            >

                                {loading
                                    ? "Adding..."
                                    : "Add Movie"
                                }

                            </button>

                        </div>

                    </form>

                </div>

            </div>
        </>
    );
}


export default AddMovie;