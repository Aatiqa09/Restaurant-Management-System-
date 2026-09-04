import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

import "../styles/addRestaurant.css";

function AddRestaurant() {

    const navigate = useNavigate();
    const { id } = useParams();

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        category: "",
        address: "",
        phone_number: "",
        email: "",
        opening_time: "",
        closing_time: "",
        price_range: "",
        is_vegetarian_friendly: false,
        has_delivery: false,
        website: "",
        image_url: ""
    });

    const [loading, setLoading] = useState(false);


    /* ==============================
       FETCH RESTAURANT FOR EDIT
    ============================== */

    useEffect(() => {

        if (id) {
            fetchRestaurant();
        }

    }, [id]);


    const fetchRestaurant = async () => {

        try {

            const response = await api.get(
                `/restaurants/${id}/`
            );

            const restaurant = response.data;

            setFormData({
                name: restaurant.name || "",
                description: restaurant.description || "",
                category: restaurant.category || "",
                address: restaurant.address || "",
                phone_number: restaurant.phone_number || "",
                email: restaurant.email || "",
                opening_time: restaurant.opening_time || "",
                closing_time: restaurant.closing_time || "",
                price_range: restaurant.price_range || "",
                is_vegetarian_friendly:
                    restaurant.is_vegetarian_friendly || false,
                has_delivery:
                    restaurant.has_delivery || false,
                website: restaurant.website || "",
                image_url: restaurant.image_url || ""
            });

        } catch (error) {

            console.error(error);

            alert("Failed to load restaurant");

        }
    };


    /* ==============================
       HANDLE INPUT CHANGE
    ============================== */

    const handleChange = (e) => {

        const {
            name,
            value,
            type,
            checked
        } = e.target;

        setFormData((previousData) => ({
            ...previousData,
            [name]:
                type === "checkbox"
                    ? checked
                    : value
        }));

    };


    /* ==============================
       SUBMIT FORM
    ============================== */

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!formData.name.trim()) {

            alert("Please enter restaurant name");

            return;
        }

        if (!formData.category) {

            alert("Please select a category");

            return;
        }

        setLoading(true);

        try {

            if (id) {

                await api.put(
                    `/restaurants/${id}/`,
                    formData
                );

                alert(
                    "Restaurant updated successfully!"
                );

            } else {

                await api.post(
                    "/restaurants/",
                    formData
                );

                alert(
                    "Restaurant added successfully!"
                );
            }

            navigate("/restaurants");

        } catch (error) {

            console.error(
                "Backend error:",
                error.response?.data || error
            );

            alert(
                "Operation failed. Please check the entered details."
            );

        } finally {

            setLoading(false);

        }
    };


    return (

        <div className="add-restaurant-page">

            <div className="add-restaurant-card">


                {/* ==============================
                    HEADER
                ============================== */}

                <div className="add-restaurant-header">

                    <h2>
                        {id
                            ? "Edit Restaurant"
                            : "Add Restaurant"}
                    </h2>

                    <p>
                        {id
                            ? "Update restaurant information"
                            : "Add a new restaurant to your system"}
                    </p>

                </div>


                {/* ==============================
                    FORM
                ============================== */}

                <form
                    className="add-restaurant-form"
                    onSubmit={handleSubmit}
                >


                    {/* ==============================
                        RESTAURANT INFORMATION
                    ============================== */}

                    <h5 className="form-section-title">
                        Restaurant Information
                    </h5>


                    {/* Restaurant Name */}

                    <div className="mb-3">

                        <label className="form-label">
                            Restaurant Name *
                        </label>

                        <input
                            type="text"
                            name="name"
                            className="form-control"
                            placeholder="Enter restaurant name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />

                    </div>


                    {/* Description */}

                    <div className="mb-3">

                        <label className="form-label">
                            Description
                        </label>

                        <textarea
                            name="description"
                            className="form-control"
                            rows="4"
                            placeholder="Describe the restaurant"
                            value={formData.description}
                            onChange={handleChange}
                        />

                    </div>


                    {/* Category + Price */}

                    <div className="row">

                        <div className="col-md-6 mb-3">

                            <label className="form-label">
                                Category *
                            </label>

                            <select
                                name="category"
                                className="form-select"
                                value={formData.category}
                                onChange={handleChange}
                                required
                            >

                                <option value="">
                                    Select category
                                </option>

                                <option value="Indian">
                                    Indian
                                </option>

                                <option value="Italian">
                                    Italian
                                </option>

                                <option value="Chinese">
                                    Chinese
                                </option>

                                <option value="Fast Food">
                                    Fast Food
                                </option>

                                <option value="Mexican">
                                    Mexican
                                </option>

                                <option value="Cafe">
                                    Cafe
                                </option>

                                <option value="Other">
                                    Other
                                </option>

                            </select>

                        </div>


                        <div className="col-md-6 mb-3">

                            <label className="form-label">
                                Price Range
                            </label>

                            <select
                                name="price_range"
                                className="form-select"
                                value={formData.price_range}
                                onChange={handleChange}
                            >

                                <option value="">
                                    Select price range
                                </option>

                                <option value="₹">
                                    ₹ - Budget
                                </option>

                                <option value="₹₹">
                                    ₹₹ - Moderate
                                </option>

                                <option value="₹₹₹">
                                    ₹₹₹ - Expensive
                                </option>

                                <option value="₹₹₹₹">
                                    ₹₹₹₹ - Premium
                                </option>

                            </select>

                        </div>

                    </div>


                    {/* ==============================
                        CONTACT INFORMATION
                    ============================== */}

                    <h5 className="form-section-title">
                        Contact Information
                    </h5>


                    {/* Address */}

                    <div className="mb-3">

                        <label className="form-label">
                            Address
                        </label>

                        <input
                            type="text"
                            name="address"
                            className="form-control"
                            placeholder="Enter restaurant address"
                            value={formData.address}
                            onChange={handleChange}
                        />

                    </div>


                    {/* Phone + Email */}

                    <div className="row">

                        <div className="col-md-6 mb-3">

                            <label className="form-label">
                                Phone Number
                            </label>

                            <input
                                type="tel"
                                name="phone_number"
                                className="form-control"
                                placeholder="Enter phone number"
                                value={formData.phone_number}
                                onChange={handleChange}
                            />

                        </div>


                        <div className="col-md-6 mb-3">

                            <label className="form-label">
                                Email
                            </label>

                            <input
                                type="email"
                                name="email"
                                className="form-control"
                                placeholder="restaurant@example.com"
                                value={formData.email}
                                onChange={handleChange}
                            />

                        </div>

                    </div>


                    {/* Website */}

                    <div className="mb-3">

                        <label className="form-label">
                            Restaurant Website
                        </label>

                        <input
                            type="url"
                            name="website"
                            className="form-control"
                            placeholder="https://example.com"
                            value={formData.website}
                            onChange={handleChange}
                        />

                    </div>


                    {/* Image URL */}

                    <div className="mb-3">

                        <label className="form-label">
                            Restaurant Image URL
                        </label>

                        <input
                            type="url"
                            name="image_url"
                            className="form-control"
                            placeholder="https://example.com/image.jpg"
                            value={formData.image_url}
                            onChange={handleChange}
                        />

                        <small className="text-muted">
                            Paste an online image URL for the restaurant.
                        </small>

                    </div>


                    {/* ==============================
                        OPENING HOURS
                    ============================== */}

                    <h5 className="form-section-title">
                        Opening Hours
                    </h5>


                    <div className="row">

                        <div className="col-md-6 mb-3">

                            <label className="form-label">
                                Opening Time
                            </label>

                            <input
                                type="time"
                                name="opening_time"
                                className="form-control"
                                value={formData.opening_time}
                                onChange={handleChange}
                            />

                        </div>


                        <div className="col-md-6 mb-3">

                            <label className="form-label">
                                Closing Time
                            </label>

                            <input
                                type="time"
                                name="closing_time"
                                className="form-control"
                                value={formData.closing_time}
                                onChange={handleChange}
                            />

                        </div>

                    </div>


                    {/* ==============================
                        RESTAURANT FEATURES
                    ============================== */}

                    <h5 className="form-section-title">
                        Restaurant Features
                    </h5>


                    <div className="restaurant-features">


                        {/* Vegetarian */}

                        <div className="form-check">

                            <input
                                type="checkbox"
                                name="is_vegetarian_friendly"
                                className="form-check-input"
                                id="vegetarian"
                                checked={
                                    formData.is_vegetarian_friendly
                                }
                                onChange={handleChange}
                            />

                            <label
                                className="form-check-label"
                                htmlFor="vegetarian"
                            >
                                Vegetarian Friendly
                            </label>

                        </div>


                        {/* Delivery */}

                        <div className="form-check">

                            <input
                                type="checkbox"
                                name="has_delivery"
                                className="form-check-input"
                                id="delivery"
                                checked={
                                    formData.has_delivery
                                }
                                onChange={handleChange}
                            />

                            <label
                                className="form-check-label"
                                htmlFor="delivery"
                            >
                                Home Delivery
                            </label>

                        </div>

                    </div>


                    {/* ==============================
                        BUTTONS
                    ============================== */}

                    <div className="form-buttons">

                        <button
                            type="submit"
                            className="restaurant-submit-btn"
                            disabled={loading}
                        >

                            {loading
                                ? "Saving..."
                                : id
                                    ? "Update Restaurant"
                                    : "Add Restaurant"}

                        </button>


                        <button
                            type="button"
                            className="restaurant-cancel-btn"
                            onClick={() =>
                                navigate("/restaurants")
                            }
                        >

                            Cancel

                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}

export default AddRestaurant;