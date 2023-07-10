export const SAVE_RECIPES = 'SAVE_RECIPES';

export const actionSaveRecipes = (recipes) => ({
  type: SAVE_RECIPES,
  payload: recipes,
});
