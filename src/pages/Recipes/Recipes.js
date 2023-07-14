import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { fetchCategories, fetchFilterCategory, fetchMealOrDrink } from '../../services';
import { actionSaveCategories, actionSaveRecipes } from '../../redux/action';
import Icon from '../../components/Icon';

const MAX_RECIPES = 12;
const MAX_CATEGORIES = 5;

function Recipes({ recipeType }) {
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipe.recipes.slice(0, MAX_RECIPES));
  const categories = useSelector((state) => state
    .recipe.categories.slice(0, MAX_CATEGORIES));
  const [categoryState, setCategoryState] = useState('all');

  useEffect(() => {
    const fetchRecipes = async () => {
      const menuData = await fetchMealOrDrink(recipeType);
      const categoryData = await fetchCategories(recipeType);
      dispatch(actionSaveRecipes(menuData));
      dispatch(actionSaveCategories(categoryData));
    };
    fetchRecipes();
  }, [recipeType, dispatch]);

  const toAllRecipes = async () => {
    const menuData = await fetchMealOrDrink(recipeType);
    dispatch(actionSaveRecipes(menuData));
    setCategoryState('all');
  };

  const handleCategoryClick = async (type, category) => {
    if (categoryState !== category) {
      const data = await fetchFilterCategory(type, category);
      dispatch(actionSaveRecipes(data));
      setCategoryState(category);
    } else {
      await toAllRecipes();
    }
  };
  return (
    <div className="recipes">
      <div className="header-filters">
        <button data-testid="All-category-filter" onClick={ () => toAllRecipes() }>
          <Icon name="drink" border />
          <span>All</span>
        </button>
        {categories.map(({ strCategory }) => (
          <button
            key={ strCategory }
            data-testid={ `${strCategory}-category-filter` }
            onClick={ () => handleCategoryClick(recipeType, strCategory) }
          >
            <Icon name={ strCategory } border />
            <span>{strCategory}</span>
          </button>
        ))}
      </div>
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
