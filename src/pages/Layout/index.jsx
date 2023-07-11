import PropTypes from 'prop-types';
import Header from '../../components/Header/Header';

function Layout({ children, search, pageTitle, filter = '', pageIcon = '' }) {
  return (
    <>
      <Header
        search={ search }
        pageTitle={ pageTitle }
        filter={ filter }
        pageIcon={ pageIcon }
      />
      {children}
    </>
  );
}

export default Layout;

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  search: PropTypes.bool.isRequired,
  pageTitle: PropTypes.string.isRequired,
  filter: PropTypes.oneOf(['meal', 'drink', 'all']),
  pageIcon: PropTypes.oneOf(['meal', 'drink', 'done', 'favorite', 'profile']),
};
