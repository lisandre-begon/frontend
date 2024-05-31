// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Cookies from 'js-cookie';
import AuthContext from './components/AuthContext';
import Home from './pages/Home';
import ProfilUser from './pages/ProfilUser';
import Login from './pages/Login';
import Register from './pages/Register';
import Admin from './pages/Admin';
import Recipe from './pages/Recipe';
import Mistery from './pages/Mistery';
import Navbar from './components/Navbar';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!Cookies.get('token')); 

  useEffect(() => {
    const checkAuth = () => {
      setIsAuthenticated(!!Cookies.get('token'));
    };
    window.addEventListener('auth', checkAuth);

    return () => {
      window.removeEventListener('auth', checkAuth);
    };
  }, []);

  return (
    <AuthContext.Provider value={isAuthenticated}>
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/recipes" element={<><Navbar /><Recipe /></>} />
                <Route path="/profil" element={<><Navbar /><ProfilUser /></>} />
                <Route path="/mistery" element={<><Navbar /><Mistery /></>} />
                <Route path="/admin" element={<><Navbar /><Admin /></>} />
            </Routes>
        </Router>
    </AuthContext.Provider>
    );
};

export default App;