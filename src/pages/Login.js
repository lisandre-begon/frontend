import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/LogReg.css';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (event) => {
        event.preventDefault(); // Prevent the form from being submitted normally

        const data = {
            email: email,
            password: password
        };

        try {
            const response = await axios.post('http://localhost:5000/login', data, {
                withCredentials: true
            });

            // handle successful login
            console.log(response.data);
            window.location.href = "/";
        } catch (error) {
            // handle error
            console.error(`Error: ${error}`);
        }
    };

    return (
        <div className="ring">
            <i style={{ "--clr": "#00ff0a" }}></i>
            <i style={{ "--clr": "#ff0057" }}></i>
            <i style={{ "--clr": "#fffd44" }}></i>
            <div className="login">
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="inputBx">
                        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
                    </div>
                    <div className="inputBx">
                        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
                    </div>
                    <div className="inputBx">
                        <input type="submit" value="Sign in" />
                        
                    </div>
                </form>
                <div className="inputBx">
                    <Link to="/register">
                        <button>Register</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;