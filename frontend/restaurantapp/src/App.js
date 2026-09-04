import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import RestaurantList from "./pages/RestaurantList";
import AddRestaurant from "./pages/AddRestaurant";

import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";

import RestaurantDetails from "./pages/RestaurantDetails";

function App() {
    return (
        <BrowserRouter>

            <Routes>

                {/* Public Routes */}

                <Route path="/" element={<Login />} />

                <Route
                    path="/register"
                    element={<Register />}
                />

                {/* Protected Routes */}

                <Route
                    element={
                        <ProtectedRoute>
                            <Layout />
                        </ProtectedRoute>
                    }
                >

                    <Route
                        path="/dashboard"
                        element={<Dashboard />}
                    />

                    <Route
                        path="/restaurants"
                        element={<RestaurantList />}
                    />

                    <Route
                        path="/add"
                        element={<AddRestaurant />}
                    />
                    <Route
                        path="/edit/:id"
                      element={<AddRestaurant />}
                    />
                    


                </Route>
                <Route
                    path="/restaurants/:id"
                    element={
                        <ProtectedRoute>
                            <RestaurantDetails />
                        </ProtectedRoute>
                    }
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;