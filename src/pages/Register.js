import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/LogReg.css';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Register = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        pseudo: ''
    });

    const { email, password, pseudo } = formData;
    const navigate = useNavigate();
    const isAuthenticated = Cookies.get('token');

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await axios.post('http://localhost:5000/register', formData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            // Handle the response from the server
            console.log(response.data);
            navigate('/');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="ring">
            <i style={{ "--clr": "#00ff0a" }}></i>
            <i style={{ "--clr": "#ff0057" }}></i>
            <i style={{ "--clr": "#fffd44" }}></i>
            <div className="login">
                <h2>Register</h2>
                {!isAuthenticated && (
                    <form onSubmit={handleSubmit}>
                        <div className="inputBx">
                            <input type="email" name="email" placeholder="Email" value={email} onChange={handleChange} required />
                        </div>
                        <div className="inputBx">
                            <input type="password" name="password" placeholder="Password" value={password} onChange={handleChange} required />
                        </div>
                        <div className="inputBx">
                            <input type="text" name="pseudo" placeholder="Pseudo" value={pseudo} onChange={handleChange} required />
                        </div>
                        <div className="inputBx">
                            <input type="submit" value="Sign up" />
                        </div>
                    </form>
                )}
                <div className="inputBx">
                    <Link to="/login">
                        <button>Login</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Register;