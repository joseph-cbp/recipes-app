import PropTypes from 'prop-types';
import Header from '../../components/Header/Header';

function Layout({ children, search=false, pageTitle }) {
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
  search: PropTypes.bool,
  pageTitle: PropTypes.string.isRequired,
};
