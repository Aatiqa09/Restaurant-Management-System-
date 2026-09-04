import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import "../styles/login.css";

function Login() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {

        setLoading(true);

        try {

            const response = await axios.post(
                "http://127.0.0.1:8000/api/token/",
                {
                    username,
                    password,
                }
            );

            if (rememberMe) {

                localStorage.setItem("access", response.data.access);
                localStorage.setItem("refresh", response.data.refresh);

            } else {

                sessionStorage.setItem("access", response.data.access);
                sessionStorage.setItem("refresh", response.data.refresh);

            }

            navigate("/dashboard");

        } catch {

            alert("Invalid username or password");

        } finally {

            setLoading(false);

        }
    };

    return (

        <div className="login-container">

            {/* Background Glow */}
            <div className="bg-circle1"></div>
            <div className="bg-circle2"></div>

            <div className="login-card">

                <div className="text-center mb-4">

                    <i
                        className="bi bi-shop display-3"
                        style={{ color: "#d97706" }}
                    ></i>

                    <h2 className="mt-3">
                        Restaurant Manager
                    </h2>

                    <p>
                        Welcome Back! Login to manage your restaurants
                    </p>

                </div>

                <div className="mb-3">

                    <label className="form-label">
                        Username
                    </label>

                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        onKeyDown={(e) =>
                            e.key === "Enter" && handleLogin()
                        }
                    />

                </div>

                <div className="mb-3">

                    <label className="form-label">
                        Password
                    </label>

                    <div className="input-group">

                        <input
                            type={showPassword ? "text" : "password"}
                            className="form-control"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyDown={(e) =>
                                e.key === "Enter" && handleLogin()
                            }
                        />

                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={() =>
                                setShowPassword(!showPassword)
                            }
                        >

                            <i
                                className={
                                    showPassword
                                        ? "bi bi-eye-slash"
                                        : "bi bi-eye"
                                }
                            ></i>

                        </button>

                    </div>

                </div>

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <div className="form-check">

                        <input
                            className="form-check-input"
                            type="checkbox"
                            checked={rememberMe}
                            onChange={() =>
                                setRememberMe(!rememberMe)
                            }
                        />

                        <label className="form-check-label">
                            Remember Me
                        </label>

                    </div>

                    <button
                        className="btn btn-link p-0 forgot-btn"
                        onClick={() =>
                            alert(
                                "Please contact the administrator to reset your password."
                            )
                        }
                    >
                        Forgot Password?
                    </button>

                </div>

                <button
                    className="btn btn-success w-100"
                    onClick={handleLogin}
                    disabled={loading}
                >
                    {loading ? "Logging in..." : "Login"}
                </button>

                <div className="text-center mt-4">

                    <p className="mb-1">
                        Don't have an account?
                    </p>

                    <Link
                        to="/register"
                        className="register-link"
                    >
                        Create an Account
                    </Link>

                </div>

            </div>

        </div>
    );
}

export default Login;