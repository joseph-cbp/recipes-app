import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Drinks from '../Drinks';
import Meals from '../Meals';
import { fetchMealOrDrink } from '../../services';
import { actionSaveRecipes } from '../../redux/action';

function Recipes({ recipeType }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const justAwait = async () => {
      const data = await fetchMealOrDrink(recipeType);
      console.log(data);
      dispatch(actionSaveRecipes(data));
    };
    justAwait();
  }, [recipeType]);

  return (
    <>
      {recipeType === 'meal' ? <Meals /> : <Drinks />}
      ;
    </>
  );
}

export default Recipes;

Recipes.propTypes = {
  recipeType: PropTypes.string.isRequired,
};
