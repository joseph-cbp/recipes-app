import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Recipes from '../pages/Recipes/Recipes';

import { fetchCategories, fetchFilterCategory, fetchMealOrDrink } from '../services';
import { actionSaveCategories, actionSaveRecipes } from '../redux/action';

jest.mock('../services');

const mockStore = configureStore([]);

describe('Componente Recipes', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      recipe: {
        recipes: [],
        categories: [],
      },
    });
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

    fetchMealOrDrink.mockResolvedValueOnce(recipes);

    render(
      <Provider store={ store }>
        <Recipes recipeType="drinks" />
      </Provider>,
    );

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

    fetchCategories.mockResolvedValueOnce(categories);

    render(
      <Provider store={ store }>
        <Recipes recipeType="drinks" />
      </Provider>,
    );

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

    fetchFilterCategory.mockResolvedValueOnce(filteredRecipes);

    render(
      <Provider store={ store }>
        <Recipes recipeType="drinks" />
      </Provider>,
    );

    const categoryFilterButton = screen.getByTestId('Category-1-category-filter');
    categoryFilterButton.click();

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

    fetchMealOrDrink.mockResolvedValueOnce(allRecipes);

    render(
      <Provider store={ store }>
        <Recipes recipeType="drinks" />
      </Provider>,
    );

    const allCategoryFilterButton = screen.getByTestId('All-category-filter');
    allCategoryFilterButton.click();

    expect(fetchMealOrDrink).toHaveBeenCalledWith('drinks');
    expect(actionSaveRecipes).toHaveBeenCalledWith(allRecipes);
  });
});
