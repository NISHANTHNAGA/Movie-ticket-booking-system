import { useState } from "react";
import "./Register.css";
import { registerUser } from "../../services/authService";

function Register() {

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: ""
    });

    const [errors, setErrors] = useState({});

    const [showPassword, setShowPassword] = useState(false);

    const [showConfirmPassword, setShowConfirmPassword] =
        useState(false);


    const handleChange = (e) => {

        setFormData({
            ...formData,
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


        // =========================
        // USERNAME
        // =========================

        if (!formData.username.trim()) {

            newErrors.username =
                "Username is required.";

        } else if (formData.username.length < 3) {

            newErrors.username =
                "Username must contain at least 3 characters.";

        } else if (formData.username.length > 20) {

            newErrors.username =
                "Username cannot exceed 20 characters.";

        } else if (!usernamePattern.test(
            formData.username
        )) {

            newErrors.username =
                "Username can contain only letters, numbers and underscore.";

        }


        // =========================
        // EMAIL
        // =========================

        if (!formData.email.trim()) {

            newErrors.email =
                "Email is required.";

        }


        // =========================
        // PHONE
        // =========================

        const phonePattern = /^[0-9]{10}$/;

        if (!formData.phone.trim()) {

            newErrors.phone =
                "Phone number is required.";

        } else if (!phonePattern.test(
            formData.phone
        )) {

            newErrors.phone =
                "Phone number must contain exactly 10 digits.";

        }


        // =========================
        // PASSWORD
        // =========================

        if (!formData.password) {

            newErrors.password =
                "Password is required.";

        } else if (formData.password.length < 8) {

            newErrors.password =
                "Password must contain at least 8 characters.";

        } else if (!/[A-Z]/.test(
            formData.password
        )) {

            newErrors.password =
                "Password must contain at least one uppercase letter.";

        } else if (!/[a-z]/.test(
            formData.password
        )) {

            newErrors.password =
                "Password must contain at least one lowercase letter.";

        } else if (!/[0-9]/.test(
            formData.password
        )) {

            newErrors.password =
                "Password must contain at least one number.";

        } else if (!/[!@#$%^&*(),.?":{}|<>_\-]/.test(
            formData.password
        )) {

            newErrors.password =
                "Password must contain at least one special character.";

        }


        // =========================
        // CONFIRM PASSWORD
        // =========================

        if (!formData.confirmPassword) {

            newErrors.confirmPassword =
                "Please confirm your password.";

        } else if (
            formData.password !==
            formData.confirmPassword
        ) {

            newErrors.confirmPassword =
                "Passwords do not match.";

        }


        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };


    // =========================
    // SUBMIT
    // =========================

    const handleSubmit = async (e) => {

        e.preventDefault();


        if (!validateForm()) {

            return;

        }


        try {

            /*
             * Do NOT send confirmPassword
             * to the Django backend.
             */

            const registrationData = {

                username:
                    formData.username,

                email:
                    formData.email,

                phone:
                    formData.phone,

                password:
                    formData.password

            };


            const response =
                await registerUser(
                    registrationData
                );


            console.log(
                "Registration Response:",
                response
            );


            setFormData({

                username: "",

                email: "",

                phone: "",

                password: "",

                confirmPassword: ""

            });


            setErrors({});

            setShowPassword(false);

            setShowConfirmPassword(false);


            console.log(
                response.message
            );


        } catch (error) {

            console.error(
                "Registration Error:",
                error.response?.data
            );


            if (error.response?.data) {

                setErrors(
                    error.response.data
                );

            } else {

                setErrors({

                    general:
                        "Registration failed. Please try again."

                });

            }

        }

    };


    return (

        <div className="register-container">

            <div className="register-card">


                <h1 className="register-title">
                    🎬 CineBook
                </h1>


                <p className="register-subtitle">
                    Create your account
                </p>


                {errors.general && (

                    <p className="register-error general-error">

                        {errors.general}

                    </p>

                )}


                <form onSubmit={handleSubmit}>


                    {/* =========================
                        USERNAME
                    ========================= */}

                    <div className="register-group">

                        <label>

                            Username{" "}

                            <span className="required-star">
                                *
                            </span>

                        </label>


                        <input
                            className="register-input"
                            type="text"
                            name="username"
                            placeholder="Enter username"
                            value={formData.username}
                            onChange={handleChange}
                        />


                        {errors.username && (

                            <p className="register-error">

                                {errors.username}

                            </p>

                        )}

                    </div>


                    {/* =========================
                        EMAIL
                    ========================= */}

                    <div className="register-group">

                        <label>

                            Email{" "}

                            <span className="required-star">
                                *
                            </span>

                        </label>


                        <input
                            className="register-input"
                            type="email"
                            name="email"
                            placeholder="Enter email"
                            value={formData.email}
                            onChange={handleChange}
                        />


                        {errors.email && (

                            <p className="register-error">

                                {errors.email}

                            </p>

                        )}

                    </div>


                    {/* =========================
                        PHONE
                    ========================= */}

                    <div className="register-group">

                        <label>

                            Phone{" "}

                            <span className="required-star">
                                *
                            </span>

                        </label>


                        <input
                            className="register-input"
                            type="text"
                            name="phone"
                            placeholder="Enter 10 digit phone number"
                            value={formData.phone}
                            onChange={handleChange}
                        />


                        {errors.phone && (

                            <p className="register-error">

                                {errors.phone}

                            </p>

                        )}

                    </div>


                    {/* =========================
                        PASSWORD
                    ========================= */}

                    <div className="register-group">

                        <label>

                            Password{" "}

                            <span className="required-star">
                                *
                            </span>

                        </label>


                        <div className="password-wrapper">

                            <input
                                className="register-input password-input"
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }
                                name="password"
                                placeholder="Enter password"
                                value={formData.password}
                                onChange={handleChange}
                            />


                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() =>
                                    setShowPassword(
                                        !showPassword
                                    )
                                }
                            >

                                {showPassword
                                    ? "🙈"
                                    : "👁️"
                                }

                            </button>

                        </div>


                        {errors.password && (

                            <p className="register-error">

                                {errors.password}

                            </p>

                        )}

                    </div>


                    {/* =========================
                        CONFIRM PASSWORD
                    ========================= */}

                    <div className="register-group">

                        <label>

                            Confirm Password{" "}

                            <span className="required-star">
                                *
                            </span>

                        </label>


                        <div className="password-wrapper">

                            <input
                                className="register-input password-input"
                                type={
                                    showConfirmPassword
                                        ? "text"
                                        : "password"
                                }
                                name="confirmPassword"
                                placeholder="Re-enter password"
                                value={
                                    formData.confirmPassword
                                }
                                onChange={handleChange}
                            />


                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() =>
                                    setShowConfirmPassword(
                                        !showConfirmPassword
                                    )
                                }
                            >

                                {showConfirmPassword
                                    ? "🙈"
                                    : "👁️"
                                }

                            </button>

                        </div>


                        {errors.confirmPassword && (

                            <p className="register-error">

                                {errors.confirmPassword}

                            </p>

                        )}

                    </div>


                    {/* =========================
                        REGISTER BUTTON
                    ========================= */}

                    <button
                        className="register-btn"
                        type="submit"
                    >

                        Create Account

                    </button>


                </form>


                {/* =========================
                    PASSWORD RULES
                ========================= */}

                <div className="login-rules">

                    <p>
                        Password must contain:
                    </p>

                    <span>
                        8+ characters
                    </span>

                    <span>
                        Uppercase
                    </span>

                    <span>
                        Lowercase
                    </span>

                    <span>
                        Number
                    </span>

                    <span>
                        Special character
                    </span>

                </div>


                {/* =========================
                    LOGIN LINK
                ========================= */}

                <div className="register-footer">

                    Already have an account?

                    <br />

                    <a href="/login">
                        Login
                    </a>

                </div>


            </div>

        </div>

    );

}


export default Register;