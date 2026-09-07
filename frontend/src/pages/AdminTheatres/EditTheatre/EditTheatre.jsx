import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Navbar from "../../../components/Navbar/Navbar";

import {
    getTheatreById,
    updateTheatre
} from "../../../services/theatreServices";

import "./EditTheatre.css";


function EditTheatre() {

    const { theatreId } = useParams();

    const navigate = useNavigate();


    const [formData, setFormData] = useState({
        name: "",
        city: "",
        address: ""
    });


    const [loading, setLoading] = useState(true);

    const [updating, setUpdating] = useState(false);


    useEffect(() => {

        loadTheatre();

    }, [theatreId]);


    const loadTheatre = async () => {

        try {

            const theatre = await getTheatreById(
                theatreId
            );

            setFormData({
                name: theatre.name || "",
                city: theatre.city || "",
                address: theatre.address || ""
            });

        } catch (error) {

            console.error(
                "Error loading theatre:",
                error
            );

            alert(
                "Unable to load theatre."
            );

            navigate("/admin/theatres");

        } finally {

            setLoading(false);

        }

    };


    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });

    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        setUpdating(true);

        try {

            await updateTheatre(
                theatreId,
                formData
            );

            alert(
                "Theatre updated successfully."
            );

            navigate("/admin/theatres");

        } catch (error) {

            console.error(
                "Error updating theatre:",
                error
            );

            console.log(
                "Backend error:",
                error.response?.data
            );

            alert(
                error.response?.data?.message ||
                "Failed to update theatre."
            );

        } finally {

            setUpdating(false);

        }

    };


    if (loading) {

        return (
            <>
                <Navbar />

                <div className="edit-theatre-page">

                    <p className="loading-message">
                        Loading theatre...
                    </p>

                </div>
            </>
        );

    }


    return (
        <>
            <Navbar />

            <div className="edit-theatre-page">

                <div className="edit-theatre-card">

                    <h1>
                        Edit Theatre
                    </h1>

                    <p className="edit-theatre-subtitle">
                        Update theatre information.
                    </p>


                    <form
                        className="edit-theatre-form"
                        onSubmit={handleSubmit}
                    >

                        <div className="form-group">

                            <label>
                                Theatre Name
                            </label>

                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />

                        </div>


                        <div className="form-group">

                            <label>
                                City
                            </label>

                            <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                required
                            />

                        </div>


                        <div className="form-group">

                            <label>
                                Address
                            </label>

                            <textarea
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                rows="4"
                                required
                            />

                        </div>


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
                                className="update-theatre-btn"
                                disabled={updating}
                            >

                                {updating
                                    ? "Updating..."
                                    : "Update Theatre"
                                }

                            </button>

                        </div>

                    </form>

                </div>

            </div>
        </>
    );
}


export default EditTheatre;