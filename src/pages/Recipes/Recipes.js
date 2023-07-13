import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import {
  fetchCategories,
  fetchFilterCategory,
  fetchMealOrDrink,
} from '../../services';
import { actionSaveCategories, actionSaveRecipes } from '../../redux/action';

const MAX_RECIPES = 12;
const MAX_CATEGORIES = 5;

function Recipes({ recipeType }) {
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipe.recipes.slice(0, MAX_RECIPES));
  const categories = useSelector((state) => state.recipe.categories.slice(
    0,
    MAX_CATEGORIES,
  ));
  const [categoryState, setCategoryState] = useState('all');

  useEffect(() => {
    const getCategories = async () => {
      const fetchedCategories = await fetchCategories();
      dispatch(actionSaveCategories(fetchedCategories.slice(0, MAX_CATEGORIES)));
    };

    getCategories();
  }, [dispatch]);

  useEffect(() => {
    const getRecipes = async () => {
      const fetchedRecipes = await fetchMealOrDrink(recipeType);
      dispatch(actionSaveRecipes(fetchedRecipes.slice(0, MAX_RECIPES)));
    };

    getRecipes();
  }, [dispatch, recipeType]);

  const handleCategoryClick = async (category) => {
    setCategoryState(category);
    const filteredRecipes = await fetchFilterCategory(category, recipeType);
    dispatch(actionSaveRecipes(filteredRecipes.slice(0, MAX_RECIPES)));
  };

  return (
    <div>
      {/* Renderização das categorias */}
      {categories.map((category) => (
        <button
          key={ category.strCategory }
          data-testid={ `${category.strCategory}-category-filter` }
          onClick={ () => handleCategoryClick(category.strCategory) }
        >
          {category.strCategory}
        </button>
      ))}

      {/* Renderização das receitas */}
      {recipes.map((recipe) => (
        <div key={ recipe.idDrink } data-testid={ `${recipe.idDrink}-recipe-card` }>
          <h2>{recipe.strDrink}</h2>
          {/* Renderização das informações da receita */}
        </div>
      ))}
    </div>
  );
}

Recipes.propTypes = {
  recipeType: PropTypes.string.isRequired,
};

export default Recipes;
