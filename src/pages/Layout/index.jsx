import PropTypes from 'prop-types';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer';

function Layout({
  children,
  search,
  pageTitle,
  filter = '',
  pageIcon = '',
  footer = false,
}) {
  return (
    <>
      <Header
        search={ search }
        pageTitle={ pageTitle }
        filter={ filter }
        pageIcon={ pageIcon }
      />
      {children}
      {footer && <Footer />}
    </>
  );
}

export default Layout;

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  search: PropTypes.bool.isRequired,
  pageTitle: PropTypes.string.isRequired,
  footer: PropTypes.bool,
  filter: PropTypes.oneOf(['meal', 'drink', 'all']),
  pageIcon: PropTypes.oneOf(['meal', 'drink', 'done', 'favorite', 'profile']),
};
