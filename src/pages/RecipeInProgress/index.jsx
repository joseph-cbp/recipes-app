import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { fetchRecipeById } from '../../services';
import './RecipeInProgress.css';
import getLocalStorage, { saveRecipe } from '../../utils/localStorage';

import RecipeInProgressHeader from './RecipeInProgressHeader';

const getIngredients = (recipe) => Object.entries(recipe)
  .filter(([key, value]) => key.includes('Ingredient') && value)
  .map(([, value]) => value);

const mapProperties = (recipe) => {
  const {
    strMealThumb,
    strDrinkThumb,
    strMeal,
    strDrink,
    strCategory,
    strInstructions,
    idMeal,
    idDrink,
    strArea,
    strAlcoholic,
    strTags,
  } = recipe;
  return {
    id: idMeal || idDrink,
    image: strMealThumb || strDrinkThumb,
    name: strMeal || strDrink,
    category: strCategory,
    instructions: strInstructions,
    ingredients: getIngredients(recipe),
    type: strMeal ? 'meals' : 'drinks',
    nationality: strArea || '',
    alcoholicOrNot: strAlcoholic || '',
    tags: strTags ? strTags.split(',') : [],
  };
};

export default function RecipeInProgress() {
  const location = useLocation();
  const [recipe, setRecipe] = useState({});
  const [ingredientsDone, setIngredientsDone] = useState([]);
  const history = useHistory();
  useEffect(() => {
    const [, recipeType, recipeId] = location.pathname.split('/');
    const fetchRecipe = async () => {
      const result = await fetchRecipeById(recipeId, recipeType);
      setRecipe(mapProperties(result));
    };
    fetchRecipe();
    const recipeIngredients = getLocalStorage.getItem('inProgressRecipes') || {};
    setIngredientsDone(recipeIngredients[recipeId] || []);
  }, [location]);

  useEffect(() => {
    const { id } = recipe;
    getLocalStorage.setItem('inProgressRecipes', { [id]: ingredientsDone });
  }, [ingredientsDone, recipe]);

  const handleIngredientChange = (event, ingredientIndex) => {
    const { checked } = event.target;
    ingredientsDone[ingredientIndex] = true;
    setIngredientsDone((state) => {
      state[ingredientIndex] = checked;
      return [...state];
    });
  };

  const handleFinishRecipe = () => {
    saveRecipe(recipe);
    history.push('/done-recipes');
  };

  if (!recipe.id) return <div>Loading...</div>;

  const { instructions, ingredients } = recipe;
  const isIngredientsAllDone = ingredientsDone.length === ingredients.length
    && ingredientsDone.every((ingredient) => ingredient);
  return (
    <div>
      <RecipeInProgressHeader recipe={ recipe } />
      <div className="progress-content">
        <div className="progress-ingredients">
          <h3>Ingredients</h3>
          <ul>
            {ingredients.map((ingredient, index) => (
              <li key={ index } data-testid={ `${index}-ingredient-step` }>
                <label>
                  <input
                    type="checkbox"
                    className="ingredient-input"
                    onChange={ (event) => handleIngredientChange(event, index) }
                    checked={ Boolean(ingredientsDone[index]) }
                  />
                  {ingredient}
                </label>
              </li>
            ))}
          </ul>
        </div>
        <h3>Instructions</h3>
        <p data-testid="instructions" className="progress-instructions">
          {instructions}
        </p>
        <button
          data-testid="finish-recipe-btn"
          disabled={ !isIngredientsAllDone }
          className="btn btn-primary"
          onClick={ handleFinishRecipe }
        >
          Finish recipe
        </button>
      </div>
    </div>
  );
}
