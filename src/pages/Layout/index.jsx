import PropTypes from 'prop-types';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer';

function Layout({ children, search, pageTitle, footer }) {
  return (
    <>
      <Header search={ search } pageTitle={ pageTitle } />
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
  footer: PropTypes.bool.isRequired,
};
