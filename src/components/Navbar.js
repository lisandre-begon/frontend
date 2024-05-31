import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Navbar.css'; // Ensure this path points to your CSS file

const Navbar = () => {
    const location = useLocation(); // Retrieves the current URL

    // Do not display the navbar on the home page
    if (location.pathname === '/') {
        return null;
    }

    return (
        <nav className="navbar">
            <Link to="/" className="button">Home</Link>
            <Link to="/recipes" className="button">Recipe</Link>
            <Link to="/profil" className="button">Profil</Link>
            <Link to="/mistery" className="button">Mistery</Link>
            <Link to="/login" className="button">Login</Link>
        </nav>
    );
};

export default Navbar;
