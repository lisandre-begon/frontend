import React, { useState, useEffect } from 'react';
import '../styles/Recipe.scss';

function RecipeCard({ recipe }) {
  const [activeTab, setActiveTab] = useState('description');
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    async function fetchIngredients() {
      try {
        const response = await fetch(`http://localhost:5000/recipes/${recipe.id_recipe}/ingredients`);
        const data = await response.json();
        setIngredients(data);
        console.log(`Ingredients fetched for recipe ${recipe.id_recipe}:`, data);
      } catch (error) {
        console.error('Error fetching ingredients:', error);
      }
    }

    if (recipe.id_recipe) {
      fetchIngredients();
    }
  }, [recipe.id_recipe]);

  return (
    <div className="recipe-card">
      <div className="header">
        <h2 className="recipe-title">{recipe.name} - {recipe.recipetype?.name || 'Type non spécifié'}</h2>
      </div>
      <div className="content">
        <div className="image">
          <img src={recipe.photo} alt={recipe.name} style={{ maxHeight: '300px', width: 'auto' }} />
        </div>
        <div className="details">
          <div className="tabs">
            <button
              className={activeTab === 'description' ? 'active' : ''}
              onClick={() => setActiveTab('description')}
            >
              Description
            </button>
            <button
              className={activeTab === 'ingredients' ? 'active' : ''}
              onClick={() => setActiveTab('ingredients')}
            >
              Ingrédients
            </button>
          </div>
          <div className="tab-content">
            {activeTab === 'description' && (
              <p>{recipe.description}</p>
            )}
            {activeTab === 'ingredients' && (
              ingredients.length > 0 ? (
                <ul>
                  {ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient.ingredient.name} - {ingredient.quantity} {ingredient.unit}</li>
                  ))}
                </ul>
              ) : (
                <p>Aucun ingrédient listé pour cette recette.</p>
              )
            )}
          </div>
        </div>
      </div>
      <div style={{ paddingBottom: '20px' }}></div> {/* Ajout d'espace en bas */}
    </div>
  );
}

export default RecipeCard;
