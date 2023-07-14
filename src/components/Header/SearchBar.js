import { useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { fetchSearch } from '../../services';
import { actionSaveRecipes } from '../../redux/action';

function SearchBar() {
  const [inputs, setInputs] = useState({ searchInput: '', typeInput: '' });
  const { pathname } = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  const handleChangeInput = ({ target: { name, value } }) => {
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { searchInput, typeInput } = inputs;
    if (typeInput === 'firstLetter' && searchInput.length > 1) {
      global.alert('Your search must have only 1 (one) character');
      return;
    }
    const recipeType = pathname.replace(/\//, '');

    const recipes = await fetchSearch(searchInput, typeInput, recipeType);

    if (!recipes || recipes.length === 0) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
      return;
    }
    if (recipes.length === 1) {
      const id = recipes[0].idMeal || recipes[0].idDrink;
      history.push(`/${recipeType}/${id}`);
      return;
    }

    dispatch(actionSaveRecipes(recipes));
  };

  const { searchInput } = inputs;
  return (
    <form onSubmit={ handleSubmit } className="header-search">
      <input
        data-testid="search-input"
        type="text"
        name="searchInput"
        value={ searchInput }
        placeholder="Search"
        onChange={ handleChangeInput }
      />
      <div className="header-search-content">
        <div>
          <label>
            <input
              data-testid="ingredient-search-radio"
              type="radio"
              name="typeInput"
              value="ingredient"
              onChange={ handleChangeInput }
            />
            Ingredient
          </label>
          <label>
            <input
              data-testid="name-search-radio"
              type="radio"
              name="typeInput"
              value="name"
              onChange={ handleChangeInput }
            />
            Name
          </label>
          <label>
            <input
              data-testid="first-letter-search-radio"
              type="radio"
              name="typeInput"
              value="firstLetter"
              onChange={ handleChangeInput }
            />
            First letter
          </label>
        </div>
        <button data-testid="exec-search-btn" type="submit" className="btn btn-primary">
          SEARCH
        </button>
      </div>
    </form>
  );
}

export default SearchBar;
