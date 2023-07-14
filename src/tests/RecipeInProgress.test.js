import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import RecipeInProgress from '../pages/RecipeInProgress';
import renderWithRouter from './helpers/renderWithRouter';
import recipeMock from './recipeMock';
import App from '../App';

const globalFetch = global.fetch;
const mockFetch = (type = 'meals', data = recipeMock) => {
  global.fetch = jest.fn(() => Promise.resolve({
    json: () => {
      return Promise.resolve({ [type]: data });
    },
  }));
};

const savedRecipeMock = {
  alcoholicOrNot: 'Optional alcohol',
  category: 'Ordinary Drink',
  id: '54321',
  image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
  name: 'Drink Test',
  nationality: '',
  type: 'drink',
};

describe('<RecipeInProgress />', () => {
  beforeEach(() => {
    jest.useFakeTimers('modern');
    jest.setSystemTime(new Date(1999, 10, 1));
  });
  afterEach(() => {
    jest.useRealTimers();
    global.fetch = globalFetch;
    localStorage.clear();
  });

  it('Deveria renderizar a receita corretamente', async () => {
    mockFetch();
    renderWithRouter(<RecipeInProgress />, '/meals/12345/in-progress');
    const mockMeal = recipeMock[0];
    const recipePhoto = await screen.findByTestId('recipe-photo');
    expect(global.fetch).toHaveBeenCalledWith(
      'https://www.themealdb.com/api/json/v1/1/lookup.php?i=12345',
    );
    expect(recipePhoto).toHaveAttribute('src', mockMeal.strMealThumb);
    expect(screen.getByTestId('recipe-title')).toHaveTextContent(mockMeal.strMeal);
    expect(screen.getByTestId('instructions')).toHaveTextContent('test instructions');
    expect(screen.getAllByTestId(/ingredient-step/i)).toHaveLength(13);
  });

  it('Deveria salvar a receita no localStorage e redirecionar o usuário para receitas prontas', async () => {
    const mockDrink = recipeMock[1];
    mockFetch('drinks', recipeMock.slice().reverse());
    const { history } = renderWithRouter(<App />, '/drinks/54321/in-progress');
    const recipePhoto = await screen.findByTestId('recipe-photo');
    const finishButton = screen.getByTestId('finish-recipe-btn');
    expect(global.fetch).toHaveBeenCalledWith(
      'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=54321',
    );
    expect(recipePhoto).toHaveAttribute('src', mockDrink.strDrinkThumb);
    expect(finishButton).toBeDisabled();
    const ingredientsNames = [
      mockDrink.strIngredient1,
      mockDrink.strIngredient2,
      mockDrink.strIngredient3,
    ];
    ingredientsNames.forEach((name) => {
      act(() => {
        userEvent.click(
          screen.getByRole('checkbox', { name }),
        );
      });
    });
    act(() => {
      userEvent.click(finishButton);
    });

    const savedRecipe = JSON.parse(localStorage.getItem('doneRecipes'));
    expect(savedRecipe).toStrictEqual([{ ...savedRecipeMock, tags: [], doneDate: '1999-11-01T02:00:00.100Z' }]);
    expect(history.location.pathname).toBe('/done-recipes');
  });
  it('Deveria ser possível favoritar uma receita e salvar-la no localStorage', async () => {
    mockFetch('drinks', recipeMock.slice().reverse());
    renderWithRouter(<RecipeInProgress />, '/drinks/54321/in-progress');
    const favoriteButton = await screen.findByLabelText('favorite');
    act(() => {
      userEvent.click(favoriteButton);
    });
    const getSavedRecipe = () => JSON.parse(localStorage.getItem('favoriteRecipes'));
    expect(getSavedRecipe()).toStrictEqual([savedRecipeMock]);
    act(() => {
      userEvent.click(screen.getByLabelText('unfavorite'));
    });
    expect(getSavedRecipe()).toStrictEqual([]);
  });
});
