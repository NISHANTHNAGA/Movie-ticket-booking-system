import "./MovieCard.css";
import { useNavigate } from "react-router-dom";

function MovieCard({ movie }) {
    const navigate = useNavigate();

    return (
        <div className="movie-card">

            <div className="movie-poster">

                {movie.poster ? (
                    <img
                        src={`http://127.0.0.1:8000${movie.poster}`}
                        alt={movie.title}
                    />
                ) : (
                    <span>🎬</span>
                )}

            </div>

            <div className="movie-content">

                <h2>{movie.title}</h2>

                <p>
                    <span>⭐ Genre:</span> {movie.genre}
                </p>

                <p>
                    <span>🌍 Language:</span> {movie.language}
                </p>

                <p>
                    <span>⏱ Duration:</span> {movie.duration} mins
                </p>

                <p>
                    <span>📅 Release:</span> {movie.release_date}
                </p>

                <button
                    className="book-btn"
                    onClick={() => navigate(`/movies/${movie.id}`)}
                >
                    🎟 Book Tickets
                </button>

            </div>

        </div>
    );
}

export default MovieCard;