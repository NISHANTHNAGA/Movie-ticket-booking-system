import { useNavigate, Link } from "react-router-dom";
import { logoutUser } from "../../services/authService";
import "./Navbar.css";


function Navbar() {

    const navigate = useNavigate();

    const user = JSON.parse(
        localStorage.getItem("user")
    );


    const handleLogout = async() => {

        try{
            await logoutUser();
        }catch(error){
            console.error(
                "Logout error:", error
            );
        } finally{
            localStorage.removeItem("user");
            navigate("/login");
        }
    };


    return (
        <nav className="navbar">

            <div
                className="navbar-logo"
                onClick={() => navigate("/movies")}
            >
                🎬 CineBook
            </div>


            <div className="navbar-links">

                {user?.role === "CUSTOMER" && (
                    <>
                        <Link to="/movies">
                            Movies
                        </Link>

                        <Link to="/my-bookings">
                            My Bookings
                        </Link>
                    </>
                )}


                {user?.role === "ADMIN" && (
                    <>
                        <Link to="/admin">
                            Dashboard
                        </Link>

                        <Link to="/movies">
                            Movies
                        </Link>

                        <Link to="/admin/users">
                            Users
                        </Link>

                        <Link to="/admin/theatres">
                            Theatres
                        </Link>
                    </>
                )}


                {user?.role === "OWNER" && (
                    <>
                        <Link to="/owner">
                            Dashboard
                        </Link>

                        <Link to="/owner/theatres">
                            Theatres
                        </Link>

                        <Link to="/owner/shows">
                            Shows
                        </Link>
                    </>
                )}


                {user?.role === "STAFF" && (
                    <>
                        <Link to="/staff">
                            Dashboard
                        </Link>

                        <Link to="/staff/bookings">
                            Bookings
                        </Link>
                    </>
                )}

            </div>


            <div className="navbar-user">

                {user && (
                    <span>
                        Hello, {user.username}
                    </span>
                )}

                <button
                    onClick={handleLogout}
                >
                    Logout
                </button>

            </div>

        </nav>
    );
}


export default Navbar;