import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import Recipes from '../pages/Recipes/Recipes';
import rootReducer from '../redux/reducer';
import { fetchMealOrDrink, fetchCategories, fetchFilterCategory } from '../services';
import { actionSaveRecipes, actionSaveCategories } from '../redux/action';

jest.mock('../services');
jest.mock('../redux/action');

const mockState = {
  recipe: {
    recipes: [],
    categories: [],
  },
};

const mockStore = createStore(rootReducer, mockState, applyMiddleware(thunk));

describe('Componente Recipes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renderiza os cards de receitas', async () => {
    const recipes = [
      {
        idDrink: '15997',
        strDrink: 'GG',
        strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
      },
      {
        idDrink: '17222',
        strDrink: 'A1',
        strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/2x8thr1504816928.jpg',
      },
    ];

    fetchMealOrDrink.mockResolvedValue(recipes);

    await act(async () => {
      render(
        <Provider store={ mockStore }>
          <Recipes recipeType="drinks" />
        </Provider>,
      );
    });

    expect(fetchMealOrDrink).toHaveBeenCalledWith('drinks');
    expect(actionSaveRecipes).toHaveBeenCalledWith(recipes);
    expect(screen.getByTestId('0-recipe-card')).toBeInTheDocument();
    expect(screen.getByTestId('1-recipe-card')).toBeInTheDocument();
  });

  test('renderiza os filtros de categorias', async () => {
    const categories = [
      { strCategory: 'Ordinary Drink' },
      { strCategory: 'Cocktail' },
      { strCategory: 'Shot' },
    ];

    fetchCategories.mockResolvedValue(categories);

    await act(async () => {
      render(
        <Provider store={ mockStore }>
          <Recipes recipeType="drinks" />
        </Provider>,
      );
    });

    expect(fetchCategories).toHaveBeenCalledWith('drinks');
    expect(actionSaveCategories).toHaveBeenCalledWith(categories);
    expect(screen.getByTestId('Category-1-category-filter')).toBeInTheDocument();
    expect(screen.getByTestId('Category-2-category-filter')).toBeInTheDocument();
    expect(screen.getByTestId('Category-3-category-filter')).toBeInTheDocument();
  });

  test('ao clicar em um filtro de categoria, chama as ações corretas', async () => {
    const category = 'Ordinary Drink';
    const filteredRecipes = [
      {
        idDrink: '17225',
        strDrink: 'Ace',
        strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/l3cd7f1504818306.jpg',
      },
      {
        idDrink: '14229',
        strDrink: '747',
        strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/xxsxqy1472668106.jpg',
      },
    ];

    fetchFilterCategory.mockResolvedValue(filteredRecipes);

    await act(async () => {
      render(
        <Provider store={ mockStore }>
          <Recipes recipeType="drinks" />
        </Provider>,
      );
    });

    const categoryFilterButton = screen.getByTestId('Category-1-category-filter');
    await act(async () => {
      categoryFilterButton.click();
    });

    expect(fetchFilterCategory).toHaveBeenCalledWith('drinks', category);
    expect(actionSaveRecipes).toHaveBeenCalledWith(filteredRecipes);
  });

  test('ao clicar no filtro "All", chama as ações corretas', async () => {
    const allRecipes = [
      {
        idDrink: '17203',
        strDrink: 'Kir',
        strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/apneom1504370294.jpg',
      },
      {
        idDrink: '13501',
        strDrink: 'ABC',
        strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/tqpvqp1472668328.jpg',
      },
    ];

    fetchMealOrDrink.mockResolvedValue(allRecipes);

    await act(async () => {
      render(
        <Provider store={ mockStore }>
          <Recipes recipeType="drinks" />
        </Provider>,
      );
    });

    const allCategoryFilterButton = screen.getByTestId('All-category-filter');
    await act(async () => {
      allCategoryFilterButton.click();
    });

    expect(fetchMealOrDrink).toHaveBeenCalledWith('drinks');
    expect(actionSaveRecipes).toHaveBeenCalledWith(allRecipes);
  });
});
