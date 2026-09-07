import { useEffect, useState } from "react";

import { getMovies } from "../../services/movieServices";

import Navbar from "../../components/Navbar/Navbar";

import MovieCard from "../../components/MovieCard/MovieCard";

import "./Movies.css";


function Movies() {

    const [movies, setMovies] = useState([]);

    const [loading, setLoading] = useState(true);


    const [filters, setFilters] = useState({
        city: "",
        min_price: "",
        max_price: ""
    });

    useEffect(() => {

        loadMovies();

    }, []);


    const loadMovies = async (
        currentFilters = {}
    ) => {

        setLoading(true);


        const data = await getMovies(
            currentFilters
        );


        setMovies(data);

        setLoading(false);

    };


    const handleFilterChange = (e) => {

        setFilters({
            ...filters,
            [e.target.name]: e.target.value
        });

    };

    const handleApplyFilters = () => {

        loadMovies(filters);

    };


    const handleClearFilters = () => {

        const emptyFilters = {
            city: "",
            min_price: "",
            max_price: ""
        };


        setFilters(emptyFilters);

        loadMovies(emptyFilters);

    };


    return (
        <>
            <Navbar />


            <div className="movies-page">


                <h1 className="movies-heading">
                    🎥 Now Showing
                </h1>

                <div className="movie-filters">

                    <div className="filter-group">

                        <label>
                            📍 Location
                        </label>

                        <input
                            type="text"
                            name="city"
                            placeholder="Enter city"
                            value={filters.city}
                            onChange={
                                handleFilterChange
                            }
                        />

                    </div>


                    <div className="filter-group">

                        <label>
                            💰 Min Price
                        </label>

                        <input
                            type="number"
                            name="min_price"
                            placeholder="Min ₹"
                            min="0"
                            value={
                                filters.min_price
                            }
                            onChange={
                                handleFilterChange
                            }
                        />

                    </div>


                    <div className="filter-group">

                        <label>
                            💰 Max Price
                        </label>

                        <input
                            type="number"
                            name="max_price"
                            placeholder="Max ₹"
                            min="0"
                            value={
                                filters.max_price
                            }
                            onChange={
                                handleFilterChange
                            }
                        />

                    </div>


                    <button
                        className="filter-btn"
                        onClick={
                            handleApplyFilters
                        }
                    >
                        🔍 Apply Filters
                    </button>


                    <button
                        className="clear-filter-btn"
                        onClick={
                            handleClearFilters
                        }
                    >
                        ✕ Clear
                    </button>

                </div>


                {loading ? (

                    <p className="movies-message">
                        Loading movies...
                    </p>

                ) : movies.length === 0 ? (

                    <p className="movies-message">
                        No movies found for the selected filters.
                    </p>

                ) : (

                    <div className="movie-grid">

                        {movies.map((movie) => (

                            <MovieCard
                                key={movie.id}
                                movie={movie}
                            />

                        ))}

                    </div>

                )}

            </div>
        </>
    );
}


export default Movies;