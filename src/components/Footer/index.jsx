import { Link } from 'react-router-dom';
import mealCypress from '../../images/mealIcon.svg';
import drinkCypress from '../../images/drinkIcon.svg';
import mealIcon from '../../images/icon-meal.png';
import drinkIcon from '../../images/icon-drink.png';
import './footer.css';

function Footer() {
  return (
    <div
      className="footerFixed"
    >
      <div data-testid="footer" className="footerCypress" />
      <button>
        <Link to="/drinks">
          <img
            src={ drinkIcon }
            alt="drinkIcon"
          />
          <img
            data-testid="drinks-bottom-btn"
            src={ drinkCypress }
            alt="drinkIcon"
          />
        </Link>
      </button>
      <button>
        <Link to="/meals">
          <img
            src={ mealIcon }
            alt="mealIcon"
          />
          <img
            data-testid="meals-bottom-btn"
            src={ mealCypress }
            alt="drinkIcon"
          />
        </Link>
      </button>
    </div>
  );
}

export default Footer;
