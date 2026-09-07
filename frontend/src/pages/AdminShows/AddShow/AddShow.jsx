import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../../../components/Navbar/Navbar";

import { getMovies } from "../../../services/movieServices";

import { getAdminTheatresByMovie } from "../../../services/theatreServices";

import { addShow } from "../../../services/showServices";

import "./AddShow.css";


function AddShow() {

    const navigate = useNavigate();


    const [movies, setMovies] = useState([]);

    const [theatres, setTheatres] = useState([]);


    const [formData, setFormData] = useState({
        movie: "",
        theatre: "",
        show_date: "",
        show_time: "",
        price: ""
    });


    const [loadingMovies, setLoadingMovies] = useState(true);

    const [loadingTheatres, setLoadingTheatres] = useState(false);

    const [saving, setSaving] = useState(false);


    // =========================
    // LOAD MOVIES
    // =========================

    useEffect(() => {

        loadMovies();

    }, []);


    const loadMovies = async () => {

        try {

            const data = await getMovies();

            setMovies(data);

        } catch (error) {

            console.error(
                "Error loading movies:",
                error
            );

        } finally {

            setLoadingMovies(false);

        }

    };


    // =========================
    // LOAD THEATRES
    // =========================

    const loadTheatres = async (movieId) => {

        if (!movieId) {

            setTheatres([]);

            return;

        }


        setLoadingTheatres(true);


        try {

            const data =
                await getAdminTheatresByMovie(movieId);

            setTheatres(data);


        } catch (error) {

            console.error(
                "Error loading theatres:",
                error
            );

            setTheatres([]);

        } finally {

            setLoadingTheatres(false);

        }

    };


    // =========================
    // HANDLE CHANGE
    // =========================

    const handleChange = (e) => {

        const {
            name,
            value
        } = e.target;


        setFormData({
            ...formData,
            [name]: value
        });


        // When movie changes,
        // load its theatres.

        if (name === "movie") {

            setFormData({
                ...formData,
                movie: value,
                theatre: ""
            });

            loadTheatres(value);

        }

    };


    // =========================
    // SUBMIT
    // =========================

    const handleSubmit = async (e) => {

        e.preventDefault();

        setSaving(true);


        try {

            await addShow({
                movie: Number(formData.movie),

                theatre: Number(
                    formData.theatre
                ),

                show_date:
                    formData.show_date,

                show_time:
                    formData.show_time,

                price:
                    formData.price
            });


            alert(
                "Show added successfully."
            );


            navigate("/admin/shows");


        } catch (error) {

            console.error(
                "Error adding show:",
                error
            );

            console.log(
                "Backend error:",
                error.response?.data
            );


            alert(
                error.response?.data?.message ||
                "Failed to add show."
            );

        } finally {

            setSaving(false);

        }

    };


    return (
        <>
            <Navbar />

            <div className="add-show-page">

                <div className="add-show-card">

                    <h1>
                        Add Show
                    </h1>

                    <p className="add-show-subtitle">
                        Create a new movie show.
                    </p>


                    <form
                        className="add-show-form"
                        onSubmit={handleSubmit}
                    >

                        {/* MOVIE */}

                        <div className="form-group">

                            <label>
                                Movie
                            </label>

                            <select
                                name="movie"
                                value={formData.movie}
                                onChange={handleChange}
                                required
                            >

                                <option value="">
                                    {loadingMovies
                                        ? "Loading movies..."
                                        : "Select Movie"
                                    }
                                </option>


                                {movies.map(
                                    (movie) => (

                                        <option
                                            key={movie.id}
                                            value={movie.id}
                                        >
                                            {movie.title}
                                        </option>

                                    )
                                )}

                            </select>

                        </div>


                        {/* THEATRE */}

                        <div className="form-group">

                            <label>
                                Theatre
                            </label>

                            <select
                                name="theatre"
                                value={formData.theatre}
                                onChange={handleChange}
                                required
                                disabled={
                                    !formData.movie ||
                                    loadingTheatres
                                }
                            >

                                <option value="">

                                    {!formData.movie
                                        ? "Select a movie first"
                                        : loadingTheatres
                                            ? "Loading theatres..."
                                            : theatres.length === 0
                                                ? "No theatres available"
                                                : "Select Theatre"
                                    }

                                </option>


                                {theatres.map(
                                    (theatre) => (

                                        <option
                                            key={theatre.id}
                                            value={theatre.id}
                                        >
                                            {theatre.name}
                                            {" - "}
                                            {theatre.city}
                                        </option>

                                    )
                                )}

                            </select>

                        </div>


                        {/* DATE */}

                        <div className="form-group">

                            <label>
                                Show Date
                            </label>

                            <input
                                type="date"
                                name="show_date"
                                value={formData.show_date}
                                onChange={handleChange}
                                required
                            />

                        </div>


                        {/* TIME */}

                        <div className="form-group">

                            <label>
                                Show Time
                            </label>

                            <input
                                type="time"
                                name="show_time"
                                value={formData.show_time}
                                onChange={handleChange}
                                required
                            />

                        </div>


                        {/* PRICE */}

                        <div className="form-group">

                            <label>
                                Ticket Price
                            </label>

                            <input
                                type="number"
                                name="price"
                                placeholder="Enter ticket price"
                                value={formData.price}
                                onChange={handleChange}
                                min="0"
                                step="0.01"
                                required
                            />

                        </div>


                        {/* BUTTONS */}

                        <div className="form-actions">

                            <button
                                type="button"
                                className="cancel-btn"
                                onClick={() =>
                                    navigate(
                                        "/admin/shows"
                                    )
                                }
                            >
                                Cancel
                            </button>


                            <button
                                type="submit"
                                className="save-show-btn"
                                disabled={
                                    saving ||
                                    loadingMovies ||
                                    loadingTheatres
                                }
                            >

                                {saving
                                    ? "Adding..."
                                    : "Add Show"
                                }

                            </button>

                        </div>

                    </form>

                </div>

            </div>
        </>
    );
}


export default AddShow;