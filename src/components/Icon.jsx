import PropTypes from 'prop-types';

import meal from '../images/icon-meal.png';
import drink from '../images/icon-drink.png';
import beef from '../images/icon-beef.png';
import goat from '../images/icon-goat.png';
import chicken from '../images/icon-chicken.png';
import breakfast from '../images/icon-breakfast.png';
import dessert from '../images/icon-dessert.png';
import ordinaryDrink from '../images/icon-ordinary-drink.png';
import cocktail from '../images/icon-cocktail.png';
import shake from '../images/icon-shake.png';
import otherDrink from '../images/icon-other-drink.png';
import cocoa from '../images/icon-cocoa.png';
import fastfood from '../images/icon-fast-food.png';
import done from '../images/icon-done.png';
import favorite from '../images/icon-favorite.png';
import profile from '../images/icon-profile.png';

const icons = {
  meal,
  drink,
  beef,
  goat,
  chicken,
  breakfast,
  dessert,
  'ordinary drink': ordinaryDrink,
  cocktail,
  shake,
  'other / unknown': otherDrink,
  cocoa,
  fastfood,
  done,
  favorite,
  profile,
};

const alts = {
  meal: 'Ícone de prato de comida',
  drink: 'Ícone de copo de bebida',
};

export default function Icon({ name, border = false, large = false }) {
  const classNames = [border ? 'icon-border' : '', large ? 'large' : ''].join(' ');

  return (
    <div className={ classNames }>
      <img
        src={ icons[name.toLowerCase()] || meal }
        alt={ alts[name.toLowerCase()] }
        className={ large ? 'large' : '' }
      />
    </div>
  );
}

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  border: PropTypes.bool,
  large: PropTypes.bool,
};
