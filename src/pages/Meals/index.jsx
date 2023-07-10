import { useSelector } from 'react-redux';

const MAX_RECIPES = 12;
function Meals() {
  const recipes = useSelector((state) => state.recipe.recipes.slice(0, MAX_RECIPES));
  return (
    <div>
      <h1>Tela principal</h1>
      {recipes.map(({ idMeal, strMeal, strMealThumb }, index) => (
        <div key={ idMeal } data-testid={ `${index}-recipe-card` }>
          <h4 data-testid={ `${index}-card-name` }>{strMeal}</h4>
          <img data-testid={ `${index}-card-img` } src={ strMealThumb } alt={ strMeal } />
        </div>
      ))}
    </div>
  );
}

export default Meals;
