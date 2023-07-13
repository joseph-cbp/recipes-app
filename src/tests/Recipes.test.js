import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import Recipes from '../pages/Recipes/Recipes';
import { fetchCategories, fetchFilterCategory, fetchMealOrDrink } from '../services';
import store from '../redux/store';

jest.mock('../services');

describe('Recipes', () => {
  const recipeType = 'drinks';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renderiza corretamente as categorias', async () => {
    const categories = [
      { strCategory: 'Ordinary Drink' },
      { strCategory: 'Cocktail' },
      { strCategory: 'Shake' },
      { strCategory: 'Other / Unknown' },
      { strCategory: 'Cocoa' },
      { strCategory: 'Shot' },
      { strCategory: 'Coffee / Tea' },
      { strCategory: 'Homemade Liqueur' },
      { strCategory: 'Punch / Party Drink' },
      { strCategory: 'Beer' },
      { strCategory: 'Soft Drink' },
    ];

    fetchCategories.mockResolvedValue(categories);

    render(
      <Provider store={ store }>
        <Router>
          <Recipes recipeType={ recipeType } />
        </Router>
      </Provider>,
    );

    await waitFor(() => {
      const categoryButtons = screen.getAllByTestId(/-category-filter$/);
      expect(categoryButtons).toHaveLength(categories.length);
      expect(categoryButtons[0]).toHaveTextContent('Ordinary Drink');
    });
  });

  test('exibe todas as receitas ao clicar no botão "All"', async () => {
    const recipes = [
      {
        idDrink: '15997',
        strDrink: 'GG',
        strCategory: 'Ordinary Drink',
        strAlcoholic: 'Optional alcohol',
        strGlass: 'Collins Glass',
        strInstructions: 'Pour the Galliano liqueur over ice...',
        strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
      },
      {
        idDrink: '17222',
        strDrink: 'A1',
        strCategory: 'Ordinary Drink',
        strAlcoholic: 'Alcoholic',
        strGlass: 'Cocktail glass',
        strInstructions: 'Pour all ingredients into a cocktail shaker...',
        strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/2x8thr1504816928.jpg',
      },
    ];

    fetchMealOrDrink.mockResolvedValue(recipes);

    render(
      <Provider store={ store }>
        <Router>
          <Recipes recipeType={ recipeType } />
        </Router>
      </Provider>,
    );

    await waitFor(() => {
      const allButton = screen.getByTestId('All-category-filter');
      fireEvent.click(allButton);
    });

    await waitFor(() => {
      const recipeCards = screen.getAllByTestId(/-recipe-card$/);
      expect(recipeCards).toHaveLength(recipes.length);
    });
  });

  test('filtra as receitas por categoria', async () => {
    const categories = [
      { strCategory: 'Ordinary Drink' },
      { strCategory: 'Cocktail' },
    ];

    const filteredRecipes = [
      {
        idDrink: '15997',
        strDrink: 'GG',
        strCategory: 'Ordinary Drink',
        strAlcoholic: 'Optional alcohol',
        strGlass: 'Collins Glass',
        strInstructions: 'Pour the Galliano liqueur over ice...',
        strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
      },
    ];

    fetchCategories.mockResolvedValue(categories);
    fetchFilterCategory.mockResolvedValue(filteredRecipes);

    render(
      <Provider store={ store }>
        <Router>
          <Recipes recipeType={ recipeType } />
        </Router>
      </Provider>,
    );

    await waitFor(() => {
      const categoryButtons = screen.getAllByTestId(/-category-filter$/);
      const cocktailButton = categoryButtons.find((button) => button.textContent === 'Cocktail');
      fireEvent.click(cocktailButton);
    });

    await waitFor(() => {
      const recipeCards = screen.getAllByTestId(/-recipe-card$/);
      expect(recipeCards).toHaveLength(filteredRecipes.length);
    });
  });

  test('chama corretamente a função handleCategoryClick', async () => {
    const categories = [
      { strCategory: 'Ordinary Drink' },
      { strCategory: 'Cocktail' },
    ];

    const filteredRecipes = [
      {
        idDrink: '17222',
        strDrink: 'A1',
        strCategory: 'Cocktail',
        strAlcoholic: 'Alcoholic',
        strGlass: 'Cocktail glass',
        strInstructions: 'Pour all ingredients into a cocktail shaker...',
        strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/2x8thr1504816928.jpg',
      },
    ];

    fetchCategories.mockResolvedValue(categories);
    fetchFilterCategory.mockResolvedValue(filteredRecipes);

    render(
      <Provider store={ store }>
        <Router>
          <Recipes recipeType={ recipeType } />
        </Router>
      </Provider>,
    );

    await waitFor(() => {
      const categoryButtons = screen.getAllByTestId(/-category-filter$/);
      const cocktailButton = categoryButtons.find((button) => button.textContent === 'Cocktail');
      fireEvent.click(cocktailButton);
    });

    expect(fetchFilterCategory).toHaveBeenCalledWith('Cocktail', recipeType);
  });
});
