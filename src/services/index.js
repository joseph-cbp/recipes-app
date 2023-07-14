export const fetchSearch = async (search, type, recipeType) => {
  const urlMeals = 'https://www.themealdb.com/api/json/v1/1/';
  const urlDrinks = 'https://www.thecocktaildb.com/api/json/v1/1/';
  const baseURL = recipeType === 'meals' ? urlMeals : urlDrinks;
  const types = {
    ingredient: 'filter.php?i=',
    name: 'search.php?s=',
    firstLetter: 'search.php?f=',
    categories: 'list.php?c=list',
    categoryFilter: 'filter.php?c=',
    id: 'lookup.php?i=',
  };
  const url = `${baseURL}${types[type]}${search}`;
  try {
    const result = await fetch(url).then((r) => r.json());
    return result[recipeType];
  } catch (err) {
    return [];
  }
};

export const fetchMealOrDrink = async (recipeType) => fetchSearch('', 'name', recipeType);

export const fetchRecipeById = async (id, recipeType) => {
  const result = await fetchSearch(id, 'id', recipeType);
  return result[0];
};

export const fetchCategories = async (type) => fetchSearch('', 'categories', type);

export const fetchFilterCategory = async (type, category) => fetchSearch(
  category,
  'categoryFilter',
  type,
);
