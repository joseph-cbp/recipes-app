import PropTypes from 'prop-types';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';

function Header({ search = false, pageTitle }) {
  return (
    <header>
      <div data-testid="profile-top-btn">
        <img src={ profileIcon } alt="icone de perfil" />
      </div>
      {
        search
      && (
        <div data-testid="search-top-btn">
          <img src={ searchIcon } alt="pesquisar" />
        </div>
      )
      }
      <h1 data-testid="page-title">{pageTitle}</h1>
    </header>
  );
}

export default Header;

Header.propTypes = {
  search: PropTypes.bool.isRequired,
  pageTitle: PropTypes.string.isRequired,
};
