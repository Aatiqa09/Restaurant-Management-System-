import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { FaEdit, FaTrash } from "react-icons/fa";
import Hero from "../components/Hero";
import DashboardCards from "../components/DashboardCards";
import CategoryFilter from "../components/CategoryFilter";


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
function RestaurantList() {
    const [restaurants, setRestaurants] = useState([]);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("");

    const [selectedCategory, setSelectedCategory] = useState("");
    const [categories, setCategories] = useState([]);

    const [nextPage, setNextPage] = useState(null);
    const [previousPage, setPreviousPage] = useState(null);

    // Load restaurants whenever filters change
    useEffect(() => {
        fetchRestaurants(search);
    }, [filter, selectedCategory]);

    // Load categories once when the page opens
    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchRestaurants = async (searchTerm = "", url = null) => {
        try {
            let response;

            if (url) {
                response = await api.get(url);
            } else {
                const params = {
                    search: searchTerm,
                };
                if (selectedCategory !== "") {
                    params.category = selectedCategory;
                }

                if (filter === "delivery") {
                    params.has_delivery = true;
                }

                if (filter === "vegetarian") {
                    params.is_vegetarian_friendly = true;
                }

                if (filter === "nonveg") {
                    params.is_vegetarian_friendly = false;
                }

                response = await api.get("/restaurants/", {
                    params,
                });
            }

            setRestaurants(response.data.results);
            setNextPage(response.data.next);
            setPreviousPage(response.data.previous);
        } catch (error) {
            console.log(error);
            alert("Failed to load restaurants");
        }
    };

    const changePage = (url) => {
        if (!url) return;
        fetchRestaurants(search, url);
    };

    const fetchCategories = async () => {

        try {

            const response = await api.get("/restaurants/");

            const uniqueCategories = [
                ...new Set(
                    response.data.results.map(
                        restaurant => restaurant.category
                    )
                )
            ];

            setCategories(uniqueCategories);

        } catch (error) {

            console.log(error);

        }

    };

    const deleteRestaurant = async (id) => {
        try {
            await api.delete(`/restaurants/${id}/`);
            alert("Restaurant deleted");
            fetchRestaurants(search);
        } catch (error) {
            console.log(error);
            alert("Delete failed");
        }
    };

    return (
        <div className="container mt-4">
            <Hero />
            <DashboardCards
                filter={filter}
                setFilter={setFilter}

            />
            <CategoryFilter
                categories={categories}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
            />

            <input
                type="text"
                className="form-control mb-4"
                placeholder="Search Restaurant..."
                value={search}
                onChange={(e) => {
                    const value = e.target.value;
                    setSearch(value);
                    fetchRestaurants(value);
                }}
            />

            <div className="row">

                {restaurants.map((restaurant) => (

                    <div
                        className="col-lg-4 col-md-6 mb-4"
                        key={restaurant.id}
                    >

                        <div className="card h-100 shadow border-0 rounded-4">

                            <img
                                src={
                                    restaurant.image_url ||
                                    categoryImages[restaurant.category] ||
                                    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800"
                                }
                                alt={restaurant.name}
                                className="card-img-top"
                                style={{
                                    height: "220px",
                                    objectFit: "cover"
                                }}
                                onError={(e) => {
                                    e.target.src =
                                        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800";
                                }}
                            />

                            <div className="card-body">

                                <h4 className="card-title fw-bold">
                                    {restaurant.name}
                                </h4>

                                <p className="text-muted">
                                    {restaurant.description}
                                </p>

                                <hr />

                                <p>
                                    🍽 <strong>Category:</strong> {restaurant.category}
                                </p>

                                <p>
                                    📍 <strong>Location:</strong> {restaurant.address}
                                </p>

                                <p>
                                    💰 <strong>Price:</strong> {restaurant.price_range}
                                </p>

                                <p>
                                    📞 <strong>Phone:</strong> {restaurant.phone_number}
                                </p>

                                <p>
                                    📧 <strong>Email:</strong> {restaurant.email}
                                </p>

                                <div className="mb-3">

                                    {restaurant.has_delivery ? (
                                        <span className="badge bg-success me-2">
                                            🚚 Delivery
                                        </span>
                                    ) : (
                                        <span className="badge bg-secondary me-2">
                                            No Delivery
                                        </span>
                                    )}

                                    {restaurant.is_vegetarian_friendly ? (
                                        <span className="badge bg-warning text-dark">
                                            🥗 Vegetarian
                                        </span>
                                    ) : (
                                        <span className="badge bg-danger">
                                            🍗 Non-Veg
                                        </span>
                                    )}

                                </div>

                                <div className="d-flex justify-content-between">

                                    <Link to={`/edit/${restaurant.id}`}>
                                        <button className="btn btn-primary">
                                            <FaEdit className="me-1" />
                                            Edit
                                        </button>
                                    </Link>

                                    <button
                                        className="btn btn-danger"
                                        onClick={() => deleteRestaurant(restaurant.id)}
                                    >
                                        <FaTrash className="me-1" />
                                        Delete
                                    </button>
                                    <Link to={`/restaurants/${restaurant.id}`}>
                                        <button className="btn btn-dark w-100 mb-2">
                                            View Details
                                        </button>
                                    </Link>

                                </div>

                            </div>

                        </div>

                    </div>

                ))}

            </div>

            <div className="d-flex justify-content-center gap-3 mt-4">

                <button
                    className="btn btn-secondary"
                    disabled={!previousPage}
                    onClick={() => changePage(previousPage)}
                >
                    Previous
                </button>

                <button
                    className="btn btn-secondary"
                    disabled={!nextPage}
                    onClick={() => changePage(nextPage)}
                >
                    Next
                </button>

            </div>

        </div>
    );
}

export default RestaurantList;