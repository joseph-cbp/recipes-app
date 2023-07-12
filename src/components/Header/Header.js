import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import Logo from '../Logo';
import './Header.css';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import Icon from '../Icon';

const filters = {
  meal: [
    { name: 'All', icon: 'meal' },
    { name: 'Beef', icon: 'beef' },
    { name: 'Goat', icon: 'goat' },
    { name: 'Chicken', icon: 'chicken' },
    { name: 'Breakfast', icon: 'breakfast' },
    { name: 'Dessert', icon: 'dessert' },
  ],
  drink: [
    { name: 'All', icon: 'drink' },
    { name: 'Ordinary Drink', icon: 'ordinaryDrink' },
    { name: 'Cocktail', icon: 'cocktail' },
    { name: 'Shake', icon: 'shake' },
    { name: 'Other/ Unknown', icon: 'otherDrink' },
    { name: 'Cocoa', icon: 'cocoa' },
  ],
  all: [
    { name: 'All', icon: 'fastFood' },
    { name: 'Food', icon: 'meal' },
    { name: 'Drinks', icon: 'drink' },
  ],
};

function Header({ search = false, pageTitle, pageIcon, filter = '' }) {
  const [searchBar, setSearchBar] = useState(false);
  return (
    <header>
      <nav className="header-top">
        <Logo text />
        <div className="header-top-right">
          <Link to="/profile">
            <img
              data-testid="profile-top-btn"
              src={ profileIcon }
              alt="ícone de profile"
            />
          </Link>
          {search && (
            <button onClick={ () => setSearchBar((s) => !s) }>
              <img
                data-testid="search-top-btn"
                src={ searchIcon }
                alt="ícone de profile"
              />
            </button>
          )}
        </div>
      </nav>
      <div className="header-title">
        <Icon name={ pageIcon } />
        <h1 data-testid="page-title">{pageTitle}</h1>
      </div>
      {searchBar && <SearchBar />}
      {filter && (
        <div className="header-filters">
          {filters[filter].map(({ name, icon }) => (
            <div key={ name }>
              <Icon name={ icon } border large={ filter === 'all' } />
              <span>{name}</span>
            </div>
          ))}
        </div>
      )}
    </header>
  );
}

export default Header;

Header.propTypes = {
  search: PropTypes.bool.isRequired,
  pageTitle: PropTypes.string.isRequired,
  pageIcon: PropTypes.oneOf(['meal', 'drink', 'done', 'favorite', 'profile']).isRequired,
  filter: PropTypes.oneOf(['meal', 'drink', 'all']),
};
