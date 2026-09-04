import { useEffect, useState } from "react";
import api from "../services/api";

function DashboardCards({ filter, setFilter }) {

    const [stats, setStats] = useState({
        total_restaurants: 0,
        delivery_restaurants: 0,
        vegetarian_restaurants: 0,
        non_vegetarian_restaurants: 0
    });

    useEffect(() => {
        fetchDashboardStats();
    }, []);

    const fetchDashboardStats = async () => {
        try {

            const response = await api.get("/dashboard/");
            setStats(response.data);

        } catch (error) {
            console.log(error);
        }
    };

    return (

        <div className="row mb-5">

            {/* Total Restaurants */}

            <div className="col-md-3">

                <div
                    className={`card shadow text-center p-4 ${
                        filter === "" ? "border-primary border-3" : ""
                    }`}
                    style={{
                        cursor: "pointer",
                        transition: "0.3s"
                    }}
                    onClick={() => setFilter("")}
                >

                    <h1>🍽️</h1>

                    <h2>{stats.total_restaurants}</h2>

                    <p>Total Restaurants</p>

                </div>

            </div>

            {/* Delivery */}

            <div className="col-md-3">

                <div
                    className={`card shadow text-center p-4 ${
                        filter === "delivery" ? "border-success border-3" : ""
                    }`}
                    style={{
                        cursor: "pointer",
                        transition: "0.3s"
                    }}
                    onClick={() => setFilter("delivery")}
                >

                    <h1>🚚</h1>

                    <h2>{stats.delivery_restaurants}</h2>

                    <p>Delivery Available</p>

                </div>

            </div>

            {/* Vegetarian */}

            <div className="col-md-3">

                <div
                    className={`card shadow text-center p-4 ${
                        filter === "vegetarian" ? "border-warning border-3" : ""
                    }`}
                    style={{
                        cursor: "pointer",
                        transition: "0.3s"
                    }}
                    onClick={() => setFilter("vegetarian")}
                >

                    <h1>🥗</h1>

                    <h2>{stats.vegetarian_restaurants}</h2>

                    <p>Vegetarian</p>

                </div>

            </div>

            {/* Non-Vegetarian */}

            <div className="col-md-3">

                <div
                    className={`card shadow text-center p-4 ${
                        filter === "nonveg" ? "border-danger border-3" : ""
                    }`}
                    style={{
                        cursor: "pointer",
                        transition: "0.3s"
                    }}
                    onClick={() => setFilter("nonveg")}
                >

                    <h1>🍗</h1>

                    <h2>{stats.non_vegetarian_restaurants}</h2>

                    <p>Non-Vegetarian</p>

                </div>

            </div>

        </div>

    );
}

export default DashboardCards;