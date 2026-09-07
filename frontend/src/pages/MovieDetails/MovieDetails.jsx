import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Navbar from '../../components/Navbar/Navbar'
import { getMovieById } from "../../services/movieServices";

import "./MovieDetails.css"

function MovieDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [movie, setMovie] = useState(null);

    useEffect(() => {
        loadMovie();
    }, [id]);

    const loadMovie = async () => {
        const data = await getMovieById(id);
        setMovie(data);
    };

    if (!movie) {
        return <h2>Loading....</h2>
    }

    return (
        <>
            <Navbar />

            <div className="details-page">

                <div className="details-card">

                    <div className="poster">

                        {movie.poster ? (
                            <img
                                src={movie.poster.startsWith("http")
                                    ? movie.poster
                                    : `http://127.0.0.1:8000${movie.poster}`
                                }
                                alt={movie.title}
                            />
                        ) : (
                            <div className="movie-poster-placeholder">
                                🎬
                            </div>
                        )}

                    </div>

                    <div className="movie-info">

                        <h1>{movie.title}</h1>

                        <p><strong>Genre:</strong> {movie.genre}</p>

                        <p><strong>Language:</strong> {movie.language}</p>

                        <p><strong>Duration:</strong> {movie.duration} mins</p>

                        <p><strong>Release Date:</strong> {movie.release_date}</p>

                        <p>{movie.description}</p>

                        <button
                            className="continue-btn"
                            onClick={() =>
                                navigate(`/movies/${movie.id}/theatres`)
                            }
                        >

                            Continue Booking →

                        </button>

                    </div>

                </div>

            </div>

        </>

    );

}

export default MovieDetails;