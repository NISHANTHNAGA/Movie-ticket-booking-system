import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../../../components/Navbar/Navbar";

import { addTheatre } from "../../../services/theatreServices";

import "./AddTheatre.css";


function AddTheatre() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        city: "",
        address: ""
    });

    const [loading, setLoading] = useState(false);


    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });

    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        try {

            await addTheatre(formData);

            alert(
                "Theatre added successfully."
            );

            navigate("/admin/theatres");

        } catch (error) {

            console.error(
                "Error adding theatre:",
                error
            );

            console.log(
                "Backend error:",
                error.response?.data
            );

            alert(
                error.response?.data?.message ||
                "Failed to add theatre."
            );

        } finally {

            setLoading(false);

        }

    };


    return (
        <>
            <Navbar />

            <div className="add-theatre-page">

                <div className="add-theatre-card">

                    <h1>
                        Add Theatre
                    </h1>

                    <p className="add-theatre-subtitle">
                        Add a new theatre to CineBook.
                    </p>


                    <form
                        className="add-theatre-form"
                        onSubmit={handleSubmit}
                    >

                        {/* THEATRE NAME */}

                        <div className="form-group">

                            <label>
                                Theatre Name
                            </label>

                            <input
                                type="text"
                                name="name"
                                placeholder="Enter theatre name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />

                        </div>


                        {/* CITY */}

                        <div className="form-group">

                            <label>
                                City
                            </label>

                            <input
                                type="text"
                                name="city"
                                placeholder="Enter city"
                                value={formData.city}
                                onChange={handleChange}
                                required
                            />

                        </div>


                        {/* ADDRESS */}

                        <div className="form-group">

                            <label>
                                Address
                            </label>

                            <textarea
                                name="address"
                                placeholder="Enter complete theatre address"
                                value={formData.address}
                                onChange={handleChange}
                                rows="4"
                                required
                            />

                        </div>


                        {/* ACTIONS */}

                        <div className="form-actions">

                            <button
                                type="button"
                                className="cancel-btn"
                                onClick={() =>
                                    navigate(
                                        "/admin/theatres"
                                    )
                                }
                            >
                                Cancel
                            </button>


                            <button
                                type="submit"
                                className="save-theatre-btn"
                                disabled={loading}
                            >

                                {loading
                                    ? "Adding..."
                                    : "Add Theatre"
                                }

                            </button>

                        </div>

                    </form>

                </div>

            </div>
        </>
    );
}


export default AddTheatre;