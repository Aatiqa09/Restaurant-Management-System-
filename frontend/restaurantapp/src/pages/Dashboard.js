import { Link, useNavigate } from "react-router-dom";
import {
    FaUtensils,
    FaPlus,
    FaSignOutAlt,
    FaStore
} from "react-icons/fa";

import "../styles/dashboard.css";

function Dashboard() {

    const navigate = useNavigate();

    const logout = () => {

        localStorage.removeItem("access");
        localStorage.removeItem("refresh");

        sessionStorage.removeItem("access");
        sessionStorage.removeItem("refresh");

        navigate("/");
    };

    return (

        <div className="dashboard-container">

            <div className="dashboard-box">

                {/* Restaurant Icon */}

                <div className="dashboard-logo">

                    <FaUtensils />

                </div>


                {/* Heading */}

                <h1>
                    Restaurant Dashboard
                </h1>

                <p className="dashboard-subtitle">
                    Manage your restaurants easily
                </p>


                {/* Buttons */}

                <div className="dashboard-actions">

                    <Link
                        to="/restaurants"
                        className="dashboard-btn view-btn"
                    >

                        <FaStore />

                        View Restaurants

                    </Link>


                    <Link
                        to="/add"
                        className="dashboard-btn add-btn"
                    >

                        <FaPlus />

                        Add Restaurant

                    </Link>

                </div>


                {/* Logout */}

                <button
                    onClick={logout}
                    className="dashboard-logout"
                >

                    <FaSignOutAlt />

                    Logout

                </button>

            </div>

        </div>
    );
}

export default Dashboard;