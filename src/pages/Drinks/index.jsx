import { useSelector } from 'react-redux';
import Footer from '../../components/Footer';

const MAX_RECIPES = 12;

function Drinks() {
  const recipes = useSelector((state) => state.recipe.recipes.slice(0, MAX_RECIPES));
  return (
    <div className="recipes">
      <div className="recipe-grid">
        {recipes.map(({ idDrink, strDrink, strDrinkThumb }, index) => (
          <div
            key={ idDrink }
            data-testid={ `${index}-recipe-card` }
            className="recipe-card"
          >
            <img
              data-testid={ `${index}-card-img` }
              src={ strDrinkThumb }
              alt={ strDrink }
            />
            <h4 data-testid={ `${index}-card-name` }>{strDrink}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Drinks;
