import { SAVE_RECIPES } from '../action';

const initialState = {
  recipes: [],
};

const recipeReducer = (state = initialState, action) => {
  switch (action.type) {
  case SAVE_RECIPES: {
    return {
      ...state,
      recipes: action.payload,
    };
  }
  default:
    return state;
  }
};

export default recipeReducer;
