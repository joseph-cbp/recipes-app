import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Icon from '../../components/Icon';
import { getDoneRecipes } from '../../utils/localStorage';
import './DoneRecipes.css';
import Share from '../../components/Share';

const filters = [
  { name: 'All', icon: 'fastfood', testid: 'filter-by-all-btn', type: 'all' },
  { name: 'Food', icon: 'meal', testid: 'filter-by-meal-btn', type: 'meal' },
  { name: 'Drinks', icon: 'drink', testid: 'filter-by-drink-btn', type: 'drink' },
];

function DoneRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    setRecipes(getDoneRecipes());
  }, []);

  const filteredRecipes = recipes.filter(({ type }) => (filter === 'all' ? true
    : type === filter));

  return (
    <div>
      <div className="header-filters">
        {filters.map(({ name, icon, testid, type }) => (
          <button key={ name } data-testid={ testid } onClick={ () => setFilter(type) }>
            <Icon name={ icon } large border />
            <span>{name}</span>
          </button>
        ))}
      </div>
      <div className="done-recipes">
        {filteredRecipes.map(
          (
            {
              name,
              image,
              doneDate,
              tags,
              nationality,
              category,
              id,
              type,
              alcoholicOrNot,
            },
            index,
          ) => (
            <div key={ name } className="done-card">
              <Link to={ `/${type}s/${id}` }>
                <img
                  data-testid={ `${index}-horizontal-image` }
                  src={ image }
                  alt={ name }
                />
              </Link>
              <div className="done-card-content">
                <div>
                  <div className="done-card-title">
                    <Link
                      to={ `/${type}s/${id}` }
                      data-testid={ `${index}-horizontal-name` }
                    >
                      {name}
                    </Link>
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
                <span className="done-card-time">
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

export default DoneRecipes;
