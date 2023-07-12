export const fetchSearch = async (search, type, recipeType) => {
  const urlMeals = 'https://www.themealdb.com/api/json/v1/1/';
  const urlDrinks = 'https://www.thecocktaildb.com/api/json/v1/1/';
  const baseURL = recipeType === 'meals' ? urlMeals : urlDrinks;
  const types = {
    ingredient: 'filter.php?i=',
    name: 'search.php?s=',
    firstLetter: 'search.php?f=',
  };
  const url = `${baseURL}${types[type]}${search}`;
  const result = await fetch(url).then((r) => r.json())
  return result[recipeType];
};
