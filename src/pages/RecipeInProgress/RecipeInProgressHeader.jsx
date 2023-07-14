import PropTypes from 'prop-types';

import { useState } from 'react';
import Icon from '../../components/Icon';
import favoriteIcon from '../../images/favorite.png';
import favoriteIconFull from '../../images/favoriteFull.png';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import { favoriteRecipe, isRecipeFavorite } from '../../utils/localStorage';
import Share from '../../components/Share';

export default function RecipeInProgressHeader({ recipe }) {
  const [isFavorite, setIsFavorite] = useState(isRecipeFavorite(recipe.id));

  const handleFavorite = () => {
    setIsFavorite((state) => !state);
    favoriteRecipe(recipe);
  };

  const { image, name, category, id, type } = recipe;
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
          <Share id={ id } type={ type } data-testid="share-btn" />
          <button
            data-testid="favorite-btn"
            onClick={ handleFavorite }
            src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
            aria-label={ isFavorite ? 'unfavorite' : 'favorite' }
          >
            <img
              src={ isFavorite ? favoriteIconFull : favoriteIcon }
              alt="favoritar receita"
            />
          </button>
        </div>
      </div>
      <h2 data-testid="recipe-title">{name}</h2>
    </header>
  );
}

RecipeInProgressHeader.propTypes = {
  recipe: PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
};
