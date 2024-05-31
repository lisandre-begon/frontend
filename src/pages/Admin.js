import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Admin = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState("");
    const [recipes, setRecipes] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState("");

    useEffect(() => {
        const checkAdmin = async () => {
            try {
                const response = await axios.get('http://localhost:5000/admin', { withCredentials: true });
                if (response.status === 200 && response.data.isAdmin) {
                    console.log('User is admin');
                    fetchUsers(); // Fetch the list of users when user is admin
                    fetchRecipes(); // Fetch the list of recipes when user is admin
                } else {
                    window.location.href = '/profil';
                }
            } catch (error) {
                console.error('Failed to check admin status', error);
                window.location.href = '/login';
            }
        };
        checkAdmin();
    }, []);

    const fetchUsers = async () => {
        try {
            console.log('Fetching users...');
            const response = await axios.get('http://localhost:5000/getUser', {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });
    
            // Check if the users array is empty
            if (response.data.user.length === 0) {
                console.log('No users found');
            } else {
                console.log('Response from getUser:', response.data);
                setUsers(response.data.user);
            }
        } catch (error) {
            console.error('Failed to fetch users', error);
        }
    };

    const fetchRecipes = async () => {
        try {
            console.log('Fetching recipes...');
            const response = await axios.get('http://localhost:5000/recipes');
    
            if (response.status === 200) {
                setRecipes(response.data);
            }
        } catch (error) {
            console.error(`Error fetching recipes: ${error}`);
        }
    };

    const deleteUser = async () => {
        try {
            const response = await axios.delete(`http://localhost:5000/${selectedUser}`);
            if (response.status === 200) {
                setUsers(users.filter(user => user.email !== selectedUser));
                setSelectedUser("");
            }
        } catch (error) {
            console.error(`Error deleting user: ${error}`);
        }
    };

    const deleteRecipe = async () => {
        try {
            const response = await axios.delete(`http://localhost:5000/recipes/${selectedRecipe}`);
            if (response.status === 200) {
                setRecipes(recipes.filter(recipe => recipe.id_recipe !== selectedRecipe));
                setSelectedRecipe("");
            }
        } catch (error) {
            console.error(`Error deleting recipe: ${error}`);
        }
    };

    return (
        <div>
            <h1>Admin Page</h1>
            <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
                <option value="">Select user to delete</option>
                {Array.isArray(users) && users.map((user, index) => (
                    <option key={index} value={user.email}>{user.email}</option>
                ))}
            </select>
            <button onClick={deleteUser}>Delete User</button>

            <select value={selectedRecipe} onChange={(e) => setSelectedRecipe(e.target.value)}>
                <option value="">Select recipe to delete</option>
                {Array.isArray(recipes) && recipes.map((recipe, index) => (
                    <option key={index} value={recipe.id_recipe}>{recipe.name}</option>
                ))}
            </select>
            <button onClick={deleteRecipe}>Delete Recipe</button>
        </div>
    );
};

export default Admin;