export const fetchSearch = async (search, type, recipeType) => {
  const urlMeals = 'https://www.themealdb.com/api/json/v1/1/';
  const urlDrinks = 'https://www.thecocktaildb.com/api/json/v1/1/';
  const baseURL = recipeType === 'meals' ? urlMeals : urlDrinks;
  const types = {
    ingredient: 'filter.php?i=',
    name: 'search.php?s=',
    firstLetter: 'search.php?f=',
    categories: 'list.php?c=list',
  };
  const url = `${baseURL}${types[type]}${search}`;
  const result = await fetch(url).then((r) => r.json());
  return result[recipeType];
};

export const fetchMealOrDrink = async (type) => fetchSearch('', 'name', type);

export const fetchRecipeById = async (id, recipeType) => {
  const urlMeals = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
  const urlDrinks = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';
  const url = recipeType === 'meals' ? urlMeals : urlDrinks;
  const result = await fetch(`${url}${id}`).then((r) => r.json());
  return result[recipeType][0];
};

export const fetchCategories = async (type) => fetchSearch('', 'categories', type);
