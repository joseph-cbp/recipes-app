import { SAVE_CATEGORIES, SAVE_RECIPES } from '../action';

const initialState = {
  recipes: [],
  categories: [],
};

const recipeReducer = (state = initialState, action) => {
  switch (action.type) {
  case SAVE_RECIPES: {
    return {
      ...state,
      recipes: action.payload,
    };
  }
  case SAVE_CATEGORIES: {
    return {
      ...state,
      categories: action.payload,
    };
  }
  default:
    return state;
  }
};

export default recipeReducer;
