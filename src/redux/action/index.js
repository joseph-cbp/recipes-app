export const SAVE_RECIPES = 'SAVE_RECIPES';
export const SAVE_CATEGORIES = 'SAVE_CATEGORIES';

export const actionSaveRecipes = (recipes) => ({
  type: SAVE_RECIPES,
  payload: recipes,
});

export const actionSaveCategories = (categories) => ({
  type: SAVE_CATEGORIES,
  payload: categories,
});
