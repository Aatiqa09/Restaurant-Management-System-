import React, { useState } from 'react';
import axios from 'axios';

function Register() {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {

        try {

            await axios.post(
                'http://127.0.0.1:8000/api/users/register/',
                {
                    username,
                    email,
                    password
                }
            );

            alert("Registration successful");

        } catch {

            alert("Registration failed");
        }
    };

    return (

        <div>

            <h1>Register</h1>

            <input
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
            />

            <br /><br />

            <input
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
            />

            <br /><br />

            <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
            />

            <br /><br />

            <button onClick={handleRegister}>
                Register
            </button>

        </div>

    );
}

export default Register;