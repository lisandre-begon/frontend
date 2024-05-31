import React, { useState } from 'react';
import axios from 'axios';
import RecipeCard from '../components/RecipeCard';
import '../styles/Mistery.scss';

const Mistery = () => {
    const [recipe, setRecipe] = useState(null);

    const fetchRandomRecipe = async () => {
        try {
            const response = await axios.get('http://localhost:5000/recipes/random');
            console.log(response.data);  // Vérifiez si le type de recette est inclus ici
            setRecipe(response.data);
        } catch (error) {
            console.error('Failed to fetch random recipe:', error);
        }
    };

    return (
        <div className="mystery-page">
            <button onClick={fetchRandomRecipe}>Get Random Recipe</button>
            {recipe && <RecipeCard recipe={recipe} />}
        </div>
    );
};

export default Mistery;
