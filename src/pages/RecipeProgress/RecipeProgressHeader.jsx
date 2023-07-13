import PropTypes from 'prop-types';
import clipBoardCopy from 'clipboard-copy';

import { useState } from 'react';
import Icon from '../../components/Icon';
import shareIcon from '../../images/share.png';
import favoriteIcon from '../../images/favorite.png';
import favoriteIconFull from '../../images/favoriteFull.png';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import { favoriteRecipe, isRecipeFavorite } from '../../utils/localStorage';

export default function RecipeProgressHeader({ recipe }) {
  const [message, setMessage] = useState('');
  const [isFavorite, setIsFavorite] = useState(isRecipeFavorite(recipe.id));

  const handleShare = () => {
    const { id, type } = recipe;
    clipBoardCopy(`http://localhost:3000/${type}/${id}`);
    setMessage('Link copied!');
  };

  const handleFavorite = () => {
    setIsFavorite((state) => !state);
    favoriteRecipe(recipe);
  };

  const { image, name, category } = recipe;
  const iconName = category.toLowerCase();

  return (
    <header className="progress-header">
      <img data-testid="recipe-photo" src={ image } alt={ name } />
      <div className="progress-header-content">
        <div>
          <Icon name={ iconName } border buttonType />
          <span data-testid="recipe-category">{category}</span>
        </div>
        <div>
          <button data-testid="share-btn" onClick={ handleShare }>
            <img src={ shareIcon } alt="compartilhar receita" />
          </button>
          <button
            data-testid="favorite-btn"
            onClick={ handleFavorite }
            src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
          >
            <img
              src={ isFavorite ? favoriteIconFull : favoriteIcon }
              alt="favoritar receita"
            />
          </button>
        </div>
      </div>
      <h2 data-testid="recipe-title">{name}</h2>
      <div className={ message ? '' : 'invisible' }>{message}</div>
    </header>
  );
}

RecipeProgressHeader.propTypes = {
  recipe: PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
};
