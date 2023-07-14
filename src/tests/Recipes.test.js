import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Recipes from '../pages/Recipes/Recipes';
import store from '../redux/store';
import {
  fetchCategories,
  fetchFilterCategory,
  fetchMealOrDrink,
} from '../services';

jest.mock('../services');

describe('Página de Receitas', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('deve renderizar a página de receitas com categorias e receitas', async () => {
    const category1 = 'Ordinary Drink';
    const category2 = 'Cocktail';
    const category3 = 'Milk / Float / Shake';
    const category4 = 'Other/Unknown';
    const category5 = 'Cocoa';

    const categories = [
      { strCategory: category1 },
      { strCategory: category2 },
      { strCategory: category3 },
      { strCategory: category4 },
      { strCategory: category5 },
    ];

    const recipes = [
      {
        idDrink: '11007',
        strDrink: 'Margarita',
        strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg',
      },
      {
        idDrink: '11728',
        strDrink: 'Martini',
        strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/71t8581504353095.jpg',
      },
      {
        idDrink: '11000',
        strDrink: 'Mojito',
        strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/metwgh1606770327.jpg',
      },
    ];

    fetchCategories.mockResolvedValue(categories);
    fetchMealOrDrink.mockResolvedValue(recipes);

    render(
      <MemoryRouter initialEntries={ ['/recipes/drinks'] }>
        <Provider store={ store }>
          <Route path="/recipes/:recipeType">
            <Recipes />
          </Route>
        </Provider>
      </MemoryRouter>,
    );

    // Verificar se as categorias estão sendo exibidas corretamente
    await waitFor(() => {
      categories.forEach((category) => {
        expect(screen.getByText(category.strCategory)).toBeInTheDocument();
      });
    });

    // Verificar se as receitas estão sendo exibidas corretamente
    await waitFor(() => {
      recipes.forEach((recipe) => {
        expect(screen.getByText(recipe.strDrink)).toBeInTheDocument();
      });
    });
  });

  it('deve filtrar as receitas por categoria quando um botão de categoria é clicado', async () => {
    const category1 = 'Ordinary Drink';
    const category2 = 'Cocktail';
    const category3 = 'Milk / Float / Shake';
    const category4 = 'Other/Unknown';
    const category5 = 'Cocoa';

    const categories = [
      { strCategory: category1 },
      { strCategory: category2 },
      { strCategory: category3 },
      { strCategory: category4 },
      { strCategory: category5 },
    ];

    const recipes = [
      {
        idDrink: '11007',
        strDrink: 'Margarita',
        strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg',
      },
      {
        idDrink: '11728',
        strDrink: 'Martini',
        strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/71t8581504353095.jpg',
      },
      {
        idDrink: '11000',
        strDrink: 'Mojito',
        strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/metwgh1606770327.jpg',
      },
    ];

    fetchCategories.mockResolvedValue(categories);
    fetchMealOrDrink.mockResolvedValue(recipes);
    fetchFilterCategory.mockImplementation(async (type, category) => {
      if (category === category2) {
        return [recipes[1]];
      } if (category === category3) {
        return [recipes[2]];
      }
      return recipes;
    });

    render(
      <MemoryRouter initialEntries={ ['/recipes/drinks'] }>
        <Provider store={ store }>
          <Route path="/recipes/:recipeType">
            <Recipes />
          </Route>
        </Provider>
      </MemoryRouter>,
    );

    // Clicar no botão "Cocktail" para filtrar as receitas
    fireEvent.click(screen.getByTestId(`${category2}-category-filter`));

    // Verificar se apenas a receita "Martini" está sendo exibida
    await waitFor(() => {
      expect(screen.queryByText('Margarita')).not.toBeInTheDocument();
      expect(screen.getByText('Martini')).toBeInTheDocument();
      expect(screen.queryByText('Mojito')).not.toBeInTheDocument();
    });

    // Clicar no botão "Milk / Float / Shake" para filtrar as receitas
    fireEvent.click(screen.getByTestId(`${category3}-category-filter`));

    // Verificar se apenas a receita "Mojito" está sendo exibida
    await waitFor(() => {
      expect(screen.queryByText('Margarita')).not.toBeInTheDocument();
      expect(screen.queryByText('Martini')).not.toBeInTheDocument();
      expect(screen.getByText('Mojito')).toBeInTheDocument();
    });

    // Clicar no botão "All" para mostrar todas as receitas novamente
    fireEvent.click(screen.getByTestId('All-category-filter'));

    // Verificar se todas as receitas estão sendo exibidas novamente
    await waitFor(() => {
      recipes.forEach((recipe) => {
        expect(screen.getByText(recipe.strDrink)).toBeInTheDocument();
      });
    });
  });
});
