import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchRecipeById } from '../../services';

function RecipeDetails() {
  const [recipe, setRecipe] = useState({});
  const location = useLocation();

  useEffect(() => {
    const recipeType = location.pathname.split('/')[1];
    const recipeId = location.pathname.split('/')[2];
    const getRecipe = async () => {
      const data = await fetchRecipeById(recipeId, recipeType);
      setRecipe(data);
    };
    getRecipe();
  }, [location]);
  const { strMeal, strDrink } = recipe;
  return (
    <div>
      {strMeal || strDrink}
    </div>
  );
}

export default RecipeDetails;
