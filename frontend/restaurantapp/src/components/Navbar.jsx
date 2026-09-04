import { Link, useNavigate } from "react-router-dom";
import {
    FaUtensils,
    FaPlus,
    FaSignOutAlt,
    FaTachometerAlt,
    FaStore
} from "react-icons/fa";

import "../styles/navbar.css";

function Navbar() {

    const navigate = useNavigate();

    const logout = () => {

        localStorage.removeItem("access");
        localStorage.removeItem("refresh");

        sessionStorage.removeItem("access");
        sessionStorage.removeItem("refresh");

        navigate("/");
    };

    return (

        <nav className="restaurant-navbar">

            <div className="navbar-container">


                {/* Logo */}

                <Link
                    className="restaurant-brand"
                    to="/dashboard"
                >

                    <span className="brand-icon">
                        <FaUtensils />
                    </span>

                    <span>
                        RestaurantHub
                    </span>

                </Link>


                {/* Mobile Menu Button */}

                <button
                    className="navbar-toggle"
                    type="button"
                    onClick={() => {
                        const menu =
                            document.getElementById("restaurantNav");

                        menu.classList.toggle("show");
                    }}
                >

                    <span></span>
                    <span></span>
                    <span></span>

                </button>


                {/* Navigation */}

                <div
                    className="restaurant-nav"
                    id="restaurantNav"
                >

                    <div className="nav-links">

                        <Link
                            className="restaurant-nav-link"
                            to="/dashboard"
                        >

                            <FaTachometerAlt />

                            <span>
                                Dashboard
                            </span>

                        </Link>


                        <Link
                            className="restaurant-nav-link"
                            to="/restaurants"
                        >

                            <FaStore />

                            <span>
                                Restaurants
                            </span>

                        </Link>

                    </div>


                    {/* Right Side */}

                    <div className="nav-actions">

                        <Link
                            className="add-restaurant-btn"
                            to="/add"
                        >

                            <FaPlus />

                            <span>
                                Add Restaurant
                            </span>

                        </Link>


                        <button
                            className="logout-btn"
                            onClick={logout}
                        >

                            <FaSignOutAlt />

                            <span>
                                Logout
                            </span>

                        </button>

                    </div>

                </div>

            </div>

        </nav>
    );
}

export default Navbar;