import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Navbar from "../../../components/Navbar/Navbar";

import {
    getAdminShowById,
    updateShow
} from "../../../services/showServices";

import { getMovies } from "../../../services/movieServices";

import {
    getAdminTheatresByMovie
} from "../../../services/theatreServices";

import "./EditShow.css";


function EditShow() {

    const { showId } = useParams();

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


    const [loading, setLoading] = useState(true);

    const [loadingTheatres, setLoadingTheatres] =
        useState(false);

    const [saving, setSaving] = useState(false);


    // =========================
    // LOAD SHOW
    // =========================

    useEffect(() => {

        loadShow();

    }, [showId]);


    const loadShow = async () => {

        try {

            // Get existing show
            const show =
                await getAdminShowById(showId);


            // Get all movies
            const movieData =
                await getMovies();

            setMovies(
                Array.isArray(movieData)
                    ? movieData
                    : []
            );


            // Set existing show information
            setFormData({

                movie: String(show.movie),

                theatre: String(show.theatre),

                show_date: show.show_date,

                show_time:
                    show.show_time
                        ? show.show_time.slice(0, 5)
                        : "",

                price: show.price

            });


            // IMPORTANT:
            // Admin endpoint does NOT apply
            // customer date restrictions.
            const theatreData =
                await getAdminTheatresByMovie(
                    show.movie
                );


            setTheatres(
                Array.isArray(theatreData)
                    ? theatreData
                    : []
            );


        } catch (error) {

            console.error(
                "Error loading show:",
                error
            );


            console.log(
                "Backend error:",
                error.response?.data
            );


            alert(
                error.response?.data?.message ||
                "Unable to load show."
            );


            navigate("/admin/shows");


        } finally {

            setLoading(false);

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
                await getAdminTheatresByMovie(
                    movieId
                );


            setTheatres(
                Array.isArray(data)
                    ? data
                    : []
            );


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
    // HANDLE FORM CHANGE
    // =========================

    const handleChange = (e) => {

        const {
            name,
            value
        } = e.target;


        // =========================
        // MOVIE CHANGED
        // =========================

        if (name === "movie") {

            setFormData((currentData) => ({

                ...currentData,

                movie: value,

                theatre: ""

            }));


            loadTheatres(value);


            return;

        }


        // =========================
        // DATE CHANGED
        // =========================

        if (name === "show_date") {

            setFormData((currentData) => ({

                ...currentData,

                show_date: value

            }));


            return;

        }


        // =========================
        // OTHER FIELDS
        // =========================

        setFormData((currentData) => ({

            ...currentData,

            [name]: value

        }));

    };


    // =========================
    // SUBMIT
    // =========================

    const handleSubmit = async (e) => {

        e.preventDefault();

        setSaving(true);


        try {

            await updateShow(

                showId,

                {

                    movie: Number(
                        formData.movie
                    ),

                    theatre: Number(
                        formData.theatre
                    ),

                    show_date:
                        formData.show_date,

                    show_time:
                        formData.show_time,

                    price:
                        formData.price

                }

            );


            alert(
                "Show updated successfully."
            );


            navigate("/admin/shows");


        } catch (error) {

            console.error(
                "Error updating show:",
                error
            );


            console.log(
                "Backend error:",
                error.response?.data
            );


            alert(

                error.response?.data?.message ||

                "Failed to update show."

            );


        } finally {

            setSaving(false);

        }

    };


    // =========================
    // LOADING
    // =========================

    if (loading) {

        return (

            <>

                <Navbar />

                <div className="edit-show-page">

                    <p className="loading-message">

                        Loading show...

                    </p>

                </div>

            </>

        );

    }


    // =========================
    // UI
    // =========================

    return (

        <>

            <Navbar />


            <div className="edit-show-page">

                <div className="edit-show-card">


                    <h1>
                        Edit Show
                    </h1>


                    <p className="edit-show-subtitle">

                        Update show information.

                    </p>


                    <form
                        className="edit-show-form"
                        onSubmit={handleSubmit}
                    >


                        {/* =========================
                            MOVIE
                        ========================= */}

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

                                    Select Movie

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


                        {/* =========================
                            THEATRE
                        ========================= */}

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

                                    {loadingTheatres

                                        ? "Loading theatres..."

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


                        {/* =========================
                            DATE
                        ========================= */}

                        <div className="form-group">

                            <label>
                                Show Date
                            </label>


                            <input

                                type="date"

                                name="show_date"

                                value={
                                    formData.show_date
                                }

                                onChange={
                                    handleChange
                                }

                                required

                            />

                        </div>


                        {/* =========================
                            TIME
                        ========================= */}

                        <div className="form-group">

                            <label>
                                Show Time
                            </label>


                            <input

                                type="time"

                                name="show_time"

                                value={
                                    formData.show_time
                                }

                                onChange={
                                    handleChange
                                }

                                required

                            />

                        </div>


                        {/* =========================
                            PRICE
                        ========================= */}

                        <div className="form-group">

                            <label>
                                Ticket Price
                            </label>


                            <input

                                type="number"

                                name="price"

                                value={
                                    formData.price
                                }

                                onChange={
                                    handleChange
                                }

                                min="0"

                                step="0.01"

                                required

                            />

                        </div>


                        {/* =========================
                            ACTIONS
                        ========================= */}

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

                                className="update-show-btn"

                                disabled={saving}

                            >

                                {saving

                                    ? "Updating..."

                                    : "Update Show"

                                }

                            </button>


                        </div>


                    </form>

                </div>

            </div>

        </>

    );

}


export default EditShow;