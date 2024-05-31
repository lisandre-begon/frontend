import React from 'react';
import RecipeCard from './RecipeCard';
import '../styles/Recipe.scss';

const RecipeList = ({ recipes }) => {
  return (
    <div className="recipe-list">
      {recipes.map(recipe => (
        <RecipeCard key={recipe.id_recipe} recipe={recipe} />
      ))}
    </div>
  );
};

export default RecipeList;
