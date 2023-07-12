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
  const categories = useSelector((state) => state.recipe
    .categories.slice(0, MAX_CATEGORIES));
  const [categoryState, setCategoryState] = useState('all');

  useEffect(() => {
    const fetchRecipes = async () => {
      const menuData = await fetchMealOrDrink(recipeType);
      const categoryData = await fetchCategories(recipeType);
      console.log(categoryData);
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
        {/* {
          categories.map(({ strCategory }, index) => (
            <button
              data-testid={ `${strCategory}-category-filter` }
              key={ strCategory }
              onClick={ () => handleCategoryClick(recipeType, strCategory) }
            >
              {strCategory}

            </button>
          ))
        } */}
        <div>
          <Icon
            name="drink"
            border
            onClick={ () => toAllRecipes() }
            testid="All-category-filter"
          />
          <span>All</span>
        </div>
        {
          categories.map(({ strCategory }) => (
            <div key={ strCategory }>
              <Icon
                name={ strCategory }
                border
                onClick={ () => handleCategoryClick(recipeType, strCategory) }
                testid={ `${strCategory}-category-filter` }
              />
              <span>{strCategory}</span>
            </div>
          ))
        }

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
