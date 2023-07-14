import React from 'react';
import { useHistory } from 'react-router-dom';
import iconDone from '../../images/icon-done.png';
import iconFavorite from '../../images/icon-favorite.png';
import iconExit from '../../images/icon-exit.png';
import getLocalStorage from '../../utils/localStorage';
import './Profile.css';

function Profile() {
  const history = useHistory();
  const localUser = getLocalStorage.getItem('user');
  const username = localUser ? localUser.email : '';

  const handleClickLogout = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div className="profile">
      <h4 data-testid="profile-email">{ username }</h4>
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
      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ handleClickLogout }
      >
        <img src={ iconExit } alt="logout" />
        Logout
      </button>
    </div>
  );
}

export default Profile;
