import PropTypes from 'prop-types';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';

function Header({ search = false, pageTitle }) {
  console.log('search', search);
  console.log('pageTitle', pageTitle);
  return (
    <header>
      <img data-testid="profile-top-btn" src={ profileIcon } alt="icone de perfil" />
      {search && <img data-testid="search-top-btn" src={ searchIcon } alt="pesquisar" />}
      <h1 data-testid="page-title">{pageTitle}</h1>
    </header>
  );
}

export default Header;

Header.propTypes = {
  search: PropTypes.bool.isRequired,
  pageTitle: PropTypes.string.isRequired,
};
