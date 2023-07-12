import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header({ search = false, pageTitle }) {
  const [searchBar, setSearchBar] = useState(false);
  return (
    <header>
      <Link to="/profile">
        <img data-testid="profile-top-btn" src={ profileIcon } alt="ícone de perfil" />
      </Link>
      {search && (
        <button onClick={ () => setSearchBar((s) => !s) }>
          <img data-testid="search-top-btn" src={ searchIcon } alt="pesquisar" />
        </button>
      )}
      <h1 data-testid="page-title">{pageTitle}</h1>
      {searchBar && <SearchBar />}
    </header>
  );
}

export default Header;

Header.propTypes = {
  search: PropTypes.bool,
  pageTitle: PropTypes.string.isRequired,
};
