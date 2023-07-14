import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import Logo from '../Logo';
import './Header.css';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import Icon from '../Icon';

function Header({ search = false, pageTitle, pageIcon }) {
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
        <Icon
          name={ pageIcon }
        />
        <h1 data-testid="page-title">{pageTitle}</h1>
      </div>
      {searchBar && <SearchBar />}
    </header>
  );
}

export default Header;

Header.propTypes = {
  search: PropTypes.bool,
  pageTitle: PropTypes.string.isRequired,
  pageIcon: PropTypes.oneOf(['meal', 'drink', 'done', 'favorite', 'profile']).isRequired,
};
