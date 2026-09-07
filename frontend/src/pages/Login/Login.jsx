import "./Login.css";
import { useState, useEffect } from "react";
import { loginUser } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import Toast from "../../components/Toast/Toast";

function Login() {

    const navigate = useNavigate();

    const [loginType, setLoginType] = useState("CUSTOMER");

    const [showPassword, setShowPassword] = useState(false);

    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    });

    const [errors, setErrors] = useState({});

    const [toast, setToast] = useState({
        message: "",
        type: "success"
    });

    useEffect(() => {

        if (!toast.message) {
            return;
        }

        const timer = setTimeout(() => {

            setToast({
                message: "",
                type: "success"
            });

        }, 3000);

        return () => clearTimeout(timer);

    }, [toast]);


    const showToast = (message, type) => {

        setToast({
            message,
            type
        });

    };


    const closeToast = () => {

        setToast({
            message: "",
            type: "success"
        });

    };


    const handleChange = (e) => {

        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });

        setErrors({
            ...errors,
            [e.target.name]: ""
        });

    };


    const validateForm = () => {

        const newErrors = {};

        const usernamePattern = /^[a-zA-Z0-9_]+$/;
        if (!credentials.username.trim()) {

            newErrors.username =
                "Username is required.";

        } else if (credentials.username.length < 3) {

            newErrors.username =
                "Username must contain at least 3 characters.";

        } else if (credentials.username.length > 20) {

            newErrors.username =
                "Username cannot exceed 20 characters.";

        } else if (!usernamePattern.test(credentials.username)) {

            newErrors.username =
                "Username can contain only letters, numbers and underscore.";

        }

        if (!credentials.password) {

            newErrors.password =
                "Password is required.";

        }


        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;

    };


    const handleSubmit = async (e) => {

        e.preventDefault();


        if (!validateForm()) {

            return;

        }


        try {

            const response = await loginUser(
                credentials
            );

            console.log(
                "Login Response:",
                response
            );


            const actualRole =
                response.user.role;


            /*
                Check selected login type
                against actual backend role.
            */

            if (
                loginType === "ADMIN" &&
                actualRole !== "ADMIN"
            ) {

                showToast(
                    "This account is not an Admin account.",
                    "warning"
                );

                return;

            }


            if (
                loginType === "CUSTOMER" &&
                actualRole !== "CUSTOMER"
            ) {

                showToast(
                    "Please use Admin Login for this account.",
                    "warning"
                );

                return;

            }


            // Login is valid

            localStorage.setItem(
                "user",
                JSON.stringify(
                    response.user
                )
            );


            showToast(
                "Login successful! Welcome back.",
                "success"
            );


            /*
                Give the Toast a moment
                to appear before navigating.
            */

            setTimeout(() => {

                if (actualRole === "ADMIN") {

                    navigate("/admin");

                } else if (actualRole === "OWNER") {

                    navigate("/owner");

                } else if (actualRole === "STAFF") {

                    navigate("/staff");

                } else {

                    navigate("/movies");

                }

            }, 800);


        } catch (error) {

            console.error(
                "Login Error:",
                error
            );


            showToast(
                "Invalid Username or Password.",
                "error"
            );

        }

    };


    return (

        <div className="login-container">

            <Toast
                message={toast.message}
                type={toast.type}
                onClose={closeToast}
            />


            <div className="login-card">

                <h1 className="login-title">
                    🎬 CineBook
                </h1>


                <p className="login-subtitle">
                    Welcome Back! Login to continue.
                </p>


                <div className="login-type">

                    <button
                        type="button"
                        className={
                            loginType === "CUSTOMER"
                                ? "login-type-btn active"
                                : "login-type-btn"
                        }
                        onClick={() => {

                            setLoginType(
                                "CUSTOMER"
                            );

                            setErrors({});

                        }}
                    >
                        Customer Login
                    </button>


                    <button
                        type="button"
                        className={
                            loginType === "ADMIN"
                                ? "login-type-btn active"
                                : "login-type-btn"
                        }
                        onClick={() => {

                            setLoginType(
                                "ADMIN"
                            );

                            setErrors({});

                        }}
                    >
                        Admin Login
                    </button>

                </div>


                <form onSubmit={handleSubmit}>

                    <div className="input-group">

                        <label>
                            Username <span className="required-star">*</span>
                        </label>

                        <input
                            className="login-input"
                            type="text"
                            name="username"
                            placeholder="Enter your username"
                            value={credentials.username}
                            onChange={handleChange}
                        />

                        {errors.username && (

                            <p className="login-error">
                                {errors.username}
                            </p>

                        )}

                    </div>


                    <div className="input-group">

                        <label>
                            Password  <span className="required-star">*</span>
                        </label>

                        <div className="password-wrapper">

                            <input
                                className="login-input"
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }
                                name="password"
                                placeholder="Enter your password"
                                value={credentials.password}
                                onChange={handleChange}
                                required
                            />

                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() =>
                                    setShowPassword(!showPassword)
                                }
                                aria-label={
                                    showPassword
                                        ? "Hide password"
                                        : "Show password"
                                }
                            >
                                {showPassword ? "🙈" : "👁️"}
                            </button>

                        </div>

                        {errors.username && (

                            <p className="login-error">
                                {errors.username}
                            </p>

                        )}

                    </div>


                    <button
                        className="login-btn"
                        type="submit"
                    >
                        Login
                    </button>

                </form>


                <div className="login-footer">

                    Don't have an account?

                    <br />

                    <a href="/register">
                        Register
                    </a>

                </div>

            </div>

        </div>

    );

}

export default Login;