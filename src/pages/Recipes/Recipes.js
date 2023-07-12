import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { fetchMealOrDrink } from '../../services';
import { actionSaveRecipes } from '../../redux/action';

const MAX_RECIPES = 12;

function Recipes({ recipeType }) {
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipe.recipes.slice(0, MAX_RECIPES));

  useEffect(() => {
    const fetchRecipes = async () => {
      const data = await fetchMealOrDrink(recipeType);
      dispatch(actionSaveRecipes(data));
    };
    fetchRecipes();
  }, [recipeType, dispatch]);

  return (
    <div className="recipes">
      <div className="recipe-grid">
        {recipes.map(
          (
            { idDrink, strDrink, strDrinkThumb, idMeal, strMeal, strMealThumb },
            index,
          ) => (
            <Link
              key={ idDrink || idMeal }
              data-testid={ `${index}-recipe-card` }
              className="recipe-card"
              to={ `/${recipeType}/${idDrink || idMeal}` }
            >
              <img
                data-testid={ `${index}-card-img` }
                src={ strDrinkThumb || strMealThumb }
                alt={ strDrink || strMeal }
              />
              <h4 data-testid={ `${index}-card-name` }>{strDrink || strMeal}</h4>
            </Link>
          ),
        )}
      </div>
    </div>
  );
}

export default Recipes;

Recipes.propTypes = {
  recipeType: PropTypes.string.isRequired,
};
