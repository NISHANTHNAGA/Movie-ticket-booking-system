import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";

import { getAdminDashboard } from "../../services/adminService";

import "./Admin.css";


function Admin() {

    const navigate = useNavigate();


    const [stats, setStats] = useState({
        movies: 0,
        users: 0,
        theatres: 0,
        shows: 0
    });


    const [loading, setLoading] = useState(true);


    useEffect(() => {

        loadDashboard();

    }, []);


    const loadDashboard = async () => {

        try {

            const data = await getAdminDashboard();

            setStats(data);

        } catch (error) {

            console.error(
                "Error loading dashboard:",
                error
            );

        } finally {

            setLoading(false);

        }

    };


    return (
        <>
            <Navbar />

            <div className="admin-page">

                {/* HEADER */}

                <div className="admin-header">

                    <div>

                        <h1>
                            Admin Dashboard
                        </h1>

                        <p>
                            Welcome to the CineBook Admin Dashboard.
                        </p>

                    </div>

                </div>


                {/* STAT CARDS */}

                <div className="admin-stats">


                    {/* MOVIES */}

                    <div
                        className="stat-card"
                        onClick={() =>
                            navigate("/admin/movies")
                        }
                    >

                        <div className="stat-icon">
                            🎬
                        </div>

                        <div className="stat-info">

                            <h2>
                                {loading
                                    ? "..."
                                    : stats.movies
                                }
                            </h2>

                            <p>
                                Movies
                            </p>

                        </div>

                    </div>


                    {/* USERS */}

                    <div
                        className="stat-card"
                        onClick={() =>
                            navigate("/admin/users")
                        }
                    >

                        <div className="stat-icon">
                            👥
                        </div>

                        <div className="stat-info">

                            <h2>
                                {loading
                                    ? "..."
                                    : stats.users
                                }
                            </h2>

                            <p>
                                Users
                            </p>

                        </div>

                    </div>


                    {/* THEATRES */}

                    <div
                        className="stat-card"
                        onClick={() =>
                            navigate("/admin/theatres")
                        }
                    >

                        <div className="stat-icon">
                            🏢
                        </div>

                        <div className="stat-info">

                            <h2>
                                {loading
                                    ? "..."
                                    : stats.theatres
                                }
                            </h2>

                            <p>
                                Theatres
                            </p>

                        </div>

                    </div>


                    {/* SHOWS */}

                    <div
                        className="stat-card"
                        onClick={() =>
                            navigate("/admin/shows")
                        }
                    >

                        <div className="stat-icon">
                            🎟️
                        </div>

                        <div className="stat-info">

                            <h2>
                                {loading
                                    ? "..."
                                    : stats.shows
                                }
                            </h2>

                            <p>
                                Shows
                            </p>

                        </div>

                    </div>

                </div>


                {/* QUICK ACTIONS */}

                <div className="quick-actions-section">

                    <h2>
                        Quick Actions
                    </h2>

                    <p>
                        Quickly manage your CineBook system.
                    </p>


                    <div className="quick-actions">


                        <button
                            className="quick-action-btn"
                            onClick={() =>
                                navigate(
                                    "/admin/movies/add"
                                )
                            }
                        >
                            🎬 Add Movie
                        </button>


                        <button
                            className="quick-action-btn"
                            onClick={() =>
                                navigate(
                                    "/admin/theatres/add"
                                )
                            }
                        >
                            🏢 Add Theatre
                        </button>


                        <button
                            className="quick-action-btn"
                            onClick={() =>
                                navigate(
                                    "/admin/shows/add"
                                )
                            }
                        >
                            🎟️ Add Show
                        </button>


                    </div>

                </div>


                {/* MANAGEMENT */}

                <div className="management-section">

                    <h2>
                        Management
                    </h2>


                    <div className="management-grid">


                        <div
                            className="management-card"
                            onClick={() =>
                                navigate(
                                    "/admin/movies"
                                )
                            }
                        >

                            <span>
                                🎬
                            </span>

                            <div>

                                <h3>
                                    Manage Movies
                                </h3>

                                <p>
                                    Add, edit and delete movies.
                                </p>

                            </div>

                        </div>


                        <div
                            className="management-card"
                            onClick={() =>
                                navigate(
                                    "/admin/theatres"
                                )
                            }
                        >

                            <span>
                                🏢
                            </span>

                            <div>

                                <h3>
                                    Manage Theatres
                                </h3>

                                <p>
                                    Manage theatres and movie assignments.
                                </p>

                            </div>

                        </div>


                        <div
                            className="management-card"
                            onClick={() =>
                                navigate(
                                    "/admin/shows"
                                )
                            }
                        >

                            <span>
                                🎟️
                            </span>

                            <div>

                                <h3>
                                    Manage Shows
                                </h3>

                                <p>
                                    Manage movie schedules and prices.
                                </p>

                            </div>

                        </div>


                        <div
                            className="management-card"
                            onClick={() =>
                                navigate(
                                    "/admin/users"
                                )
                            }
                        >

                            <span>
                                👥
                            </span>

                            <div>

                                <h3>
                                    Manage Users
                                </h3>

                                <p>
                                    View and manage CineBook users.
                                </p>

                            </div>

                        </div>


                    </div>

                </div>

            </div>
        </>
    );
}


export default Admin;