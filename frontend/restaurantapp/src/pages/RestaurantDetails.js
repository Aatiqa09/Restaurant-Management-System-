import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";

const categoryImages = {
    "Fast Food": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800",
    "Italian": "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800",
    "Cafe": "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800",
    "Chinese": "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800",
    "Mexican": "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=800",
    "Buffet": "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=800",
    "Indian": "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800",
    "Desserts": "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800",
    "Bakery": "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800"
};

function RestaurantDetails() {

    const { id } = useParams();
    const [restaurant, setRestaurant] = useState(null);

    const isRestaurantOpen = () => {
        if (!restaurant) return false;

        const now = new Date();

        const currentMinutes =
            now.getHours() * 60 + now.getMinutes();

        const [openHour, openMinute] =
            restaurant.opening_time.split(":").map(Number);

        const [closeHour, closeMinute] =
            restaurant.closing_time.split(":").map(Number);

        const openingMinutes = openHour * 60 + openMinute;
        const closingMinutes = closeHour * 60 + closeMinute;

        return (
            currentMinutes >= openingMinutes &&
            currentMinutes <= closingMinutes
        );
    };
    <div className="mb-3">
        {isRestaurantOpen() ? (
            <span className="badge bg-success fs-6">
                🟢 Open Now
            </span>
        ) : (
            <span className="badge bg-danger fs-6">
                🔴 Closed
            </span>
        )}

    </div>
    const openGoogleMaps = () => {
        const address = encodeURIComponent(restaurant.address);
        window.open(
            `https://www.google.com/maps/search/?api=1&query=${address}`,
            "_blank"
        );
    };
    const openWebsite = () => {
        if (restaurant.website) {
            window.open(restaurant.website, "_blank");
        } else {
            alert("Website not available.");
        }
    };

    useEffect(() => {
        fetchRestaurant();
    }, []);

    const fetchRestaurant = async () => {
        try {
            const response = await api.get(`/restaurants/${id}/`);
            setRestaurant(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    if (!restaurant) {
        return (
            <div className="container mt-5 text-center">
                <h3>Loading Restaurant...</h3>
            </div>
        );
    }

    return (
        <div className="container mt-5">

            <Link
                to="/restaurants"
                className="btn btn-secondary mb-4"
            >
                ← Back
            </Link>

            <div className="card shadow-lg">

                <img
                    src={
                        restaurant.image_url ||
                        categoryImages[restaurant.category] ||
                        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800"
                    }
                    alt={restaurant.name}
                    className="card-img-top"
                    style={{
                        height: "400px",
                        objectFit: "cover"
                    }}
                    onError={(e) => {
                        e.target.src =
                            "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800";
                    }}
                />

                <div className="card-body">

                    <h2 className="fw-bold">
                        {restaurant.name}
                    </h2>
                    <div className="d-flex align-items-center mb-3">
                        <span className="text-warning fs-4">⭐</span>
                        <strong className="ms-2">
                            {restaurant.rating} / 5
                        </strong>
                        <span className="text-muted ms-2">
                            ({restaurant.total_reviews} Reviews)
                        </span>
                    </div>

                    <div className="mb-3">
                        {isRestaurantOpen() ? (
                            <span className="badge bg-success fs-6">
                                🟢 Open Now
                            </span>
                        ) : (
                            <span className="badge bg-danger fs-6">
                                🔴 Closed
                            </span>
                        )}

                    </div>


                    <p className="text-muted">
                        {restaurant.description}
                    </p>

                    <hr />

                    <p><strong>🍽 Category:</strong> {restaurant.category}</p>

                    <p><strong>📍 Address:</strong> {restaurant.address}</p>
                    <button
                        className="btn btn-outline-primary btn-sm mb-3"
                        onClick={openGoogleMaps}
                    >
                        📍 View on Google Maps
                    </button>

                    <p><strong>📞 Phone:</strong> {restaurant.phone_number}</p>

                    <p><strong>📧 Email:</strong> {restaurant.email}</p>
                    <button
                        className="btn btn-outline-success btn-sm mb-3"
                        onClick={openWebsite}
                    >
                        🌐 Visit Website
                    </button>

                    <p><strong>🕒 Opening:</strong> {restaurant.opening_time}</p>

                    <p><strong>🕙 Closing:</strong> {restaurant.closing_time}</p>

                    <p><strong>💰 Price:</strong> {restaurant.price_range}</p>
                    <hr />

                    <h4 className="mt-4">🍴 Menu</h4>

                    {restaurant.menu_items && restaurant.menu_items.length > 0 ? (
                        <div className="list-group mt-3">
                            {restaurant.menu_items.map((item) => (
                                <div
                                    key={item.id}
                                    className="list-group-item d-flex justify-content-between align-items-center"
                                >
                                    <div>
                                        <h6 className="mb-1">{item.name}</h6>

                                        <small className="text-muted">
                                            {item.description}
                                        </small>
                                    </div>

                                    <span className="badge bg-success fs-6">
                                        ₹{item.price}
                                    </span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-muted mt-2">
                            No menu items available.
                        </p>
                    )}

                </div>

            </div>

        </div>
    );
}

export default RestaurantDetails;