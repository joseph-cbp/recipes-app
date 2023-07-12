import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchRecipeById } from '../../services';
import './RecipeProgress.css';

const getIngredients = (recipe) => Object.entries(recipe)
  .filter(([key, value]) => key.includes('Ingredient') && value)
  .map(([, value]) => value);

const mapProperties = (recipe) => {
  const { strMealThumb,
    strDrinkThumb,
    strMeal,
    strDrink,
    strCategory,
    strInstructions } = recipe;

  return {
    image: strMealThumb || strDrinkThumb,
    title: strMeal || strDrink,
    category: strCategory,
    instructions: strInstructions,
    ingredients: getIngredients(recipe),
  };
};

export default function RecipeProgress() {
  const location = useLocation();
  const [recipe, setRecipe] = useState({});

  useEffect(() => {
    const fetchRecipe = async () => {
      const [, recipeType, recipeId] = location.pathname.split('/');
      const result = await fetchRecipeById(recipeId, recipeType);
      setRecipe(mapProperties(result));
    };
    fetchRecipe();
  }, [location]);
  const { image, title, category, instructions, ingredients } = recipe;
  return (
    <div>
      <header className="progress-header">
        <img data-testid="recipe-photo" src={ image } alt={ title } />
        <span data-testid="recipe-category">{category}</span>
        <span data-testid="recipe-category">{category}</span>
        <button data-testid="share-btn">Share</button>
        <button data-testid="favorite-btn">Favorite</button>
      </header>
      <div className="progress-content">
        <div className="progress-ingredients">
          <h3>Ingredients</h3>
          <ul className="progress-ingredients">
            {ingredients && ingredients.map((ingredient, index) => (
              <li key={ index } data-testid={ `${index}-ingredient-step` } className="">
                <label>
                  <input type="checkbox" className="ingredient-input" />
                  {ingredient}
                </label>
              </li>
            ))}
          </ul>
        </div>

        <h3 data-testid="recipe-title">{title}</h3>
        <p data-testid="instructions" className="progress-instructions">{instructions}</p>
        <button data-testid="finish-recipe-btn">Finish recipe</button>
      </div>
    </div>
  );
}
