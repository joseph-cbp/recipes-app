import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../../components/Footer';
import iconDone from '../../images/icon-done.png';
import iconFavorite from '../../images/icon-favorite.png';

function Profile() {
  const history = useHistory();
  const getUser = localStorage.getItem('user');
  const localUser = JSON.parse(getUser);
  const username = localUser ? localUser.email : '';

  const handleClickLogout = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div>
      <h4 data-testid="profile-email">{ username }</h4>
      <hr />
      <br />
      <button
        type="button"
        data-testid="profile-done-btn"
        onClick={ () => history.push('/done-recipes') }
      >
        <img
          src={ iconDone }
          alt="Icon Done"
        />
        Done Recipes
      </button>
      <hr />
      <br />
      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ () => history.push('/favorite-recipes') }
      >
        <img
          src={ iconFavorite }
          alt="Icon Favorite"
        />
        Favorite Recipes
      </button>
      <hr />
      <br />
      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ handleClickLogout }
      >
        Logout
      </button>
      <Footer />
    </div>
  );
}

export default Profile;
