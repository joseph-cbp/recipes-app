import { useEffect, useState } from 'react';

import Icon from '../../components/Icon';
import { getDoneRecipes } from '../../utils/localStorage';
import './Done.css';
import Share from '../../components/Header/Share';

const filters = [
  { name: 'All', icon: 'fastfood', testid: 'filter-by-all-btn' },
  { name: 'Food', icon: 'meal', testid: 'filter-by-meal-btn' },
  { name: 'Drinks', icon: 'drink', testid: 'filter-by-drink-btn' },
];

function Done() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    setRecipes(getDoneRecipes());
  }, []);
  console.log(recipes);

  return (
    <div>
      <div className="header-filters">
        {filters.map(({ name, icon, testid }) => (
          <button key={ name } data-testid={ testid }>
            <Icon name={ icon } large border />
            <span>{name}</span>
          </button>
        ))}
      </div>
      <div className="done-recipes">
        {recipes.map(
          ({ name, image, doneDate, tags, nationality, category, id, type, alcoholicOrNot }, index) => (
            <div key={ name } className="done-card">
              <img
                data-testid={ `${index}-horizontal-image` }
                src={ image }
                alt={ name }
              />
              <div className="done-card-content">
                <div>
                  <div className="done-card-title">
                    <h4 data-testid={ `${index}-horizontal-name` }>{name}</h4>
                    <Share
                      data-testid={ `${index}-horizontal-share-btn` }
                      id={ id }
                      type={ type }
                    />
                  </div>
                  <span
                    data-testid={ `${index}-horizontal-top-text` }
                    className="done-card-subtitle"
                  >
                    {` ${alcoholicOrNot || nationality}  - ${category} `}
                  </span>
                </div>
                <span
                  className="done-card-time"
                >
                  {'Done in '}
                  <span data-testid={ `${index}-horizontal-done-date` }>{doneDate}</span>
                </span>
                <div className="done-card-tags">
                  {tags.map((tag) => (
                    <span data-testid={ `${index}-${tag}-horizontal-tag` } key={ tag }>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ),
        )}
      </div>
    </div>
  );
}

export default Done;
