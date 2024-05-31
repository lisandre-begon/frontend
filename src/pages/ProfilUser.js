import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/ProfilUser.css';

const Profil = () => {
    const [pseudo, setPseudo] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const checkAdmin = async () => {
            try {
                const response = await axios.get('http://localhost:5000/admin', { withCredentials: true });
                if (response.status === 200 && response.data.isAdmin) {
                    console.log('User is admin');
                    window.location.href = '/admin';
                }
            } catch (error) {
                console.error('Failed to check admin status', error);
                window.location.href = '/login';
            }
        };
        checkAdmin();
    }, []);

    const updatePseudoHandler = async () => {
        try {
            await axios.put('http://localhost:5000/updatePseudo', { pseudo }, { withCredentials: true });
            setMessage('Pseudo updated successfully');
        } catch (error) {
            console.error('Failed to update pseudo', error);
            setMessage('Failed to update pseudo');
        }
    };

    const updatePasswordHandler = async () => {
        try {
            await axios.put('http://localhost:5000/updatePassword', { password }, { withCredentials: true });
            setMessage('Password updated successfully');
        } catch (error) {
            console.error('Failed to update password', error);
            setMessage('Failed to update password');
        }
    };

    return (
        <div className="profile-page">
            <div className="button-container">
                <div className="button-row">
                    <input
                        type="text"
                        value={pseudo}
                        onChange={e => setPseudo(e.target.value)}
                        placeholder="Update pseudo"
                    />
                    <button onClick={updatePseudoHandler}>Update Pseudo</button>
                </div>
                <div className="button-row">
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Update password"
                    />
                    <button onClick={updatePasswordHandler}>Update Password</button>
                </div>
            </div>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Profil;
