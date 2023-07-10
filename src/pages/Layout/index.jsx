import PropTypes from 'prop-types';
import Header from '../../components/Header/Header';

function Layout({ children, search, pageTitle }) {
  return (
    <>
      <Header search={ search } pageTitle={ pageTitle } />
      {children}
    </>
  );
}

export default Layout;

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  search: PropTypes.bool.isRequired,
  pageTitle: PropTypes.string.isRequired,
};
