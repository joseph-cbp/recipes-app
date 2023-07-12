import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchRecipeById } from '../../services';

const mapProperties = (recipe) => {
  const { strMealThumb,
    strDrinkThumb,
    strMeal, strDrink,
    strCategory,
    strInstructions } = recipe;

  return {
    image: strMealThumb || strDrinkThumb,
    title: strMeal || strDrink,
    category: strCategory,
    instructions: strInstructions,
  };
};

export default function RecipeProgress() {
  const location = useLocation();
  const [recipe, setRecipe] = useState({});

  useEffect(() => {
    const fetchRecipe = async () => {
      const [recipeType, recipeId] = location.pathname.split('/').slice(1);
      const result = await fetchRecipeById(recipeId, recipeType);
      setRecipe(mapProperties(result));
    };
    fetchRecipe();
  }, [location]);
  const { image, title, category, instructions } = recipe;
  return (
    <div>
      <img data-testid="recipe-photo" src={ image } alt={ title } />
      <h4 data-testid="recipe-title">{title}</h4>
      <button data-testid="share-btn">Share</button>
      <button data-testid="favorite-btn">Favorite</button>
      <span data-testid="recipe-category">{category}</span>
      <p data-testid="instructions">{instructions}</p>
      <button data-testid="finish-recipe-btn">Finish recipe</button>
    </div>
  );
}
