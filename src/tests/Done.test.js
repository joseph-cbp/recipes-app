import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import DoneRecipes from '../pages/DoneRecipes';
import renderWithRouter from './helpers/renderWithRouter';

const doneRecipesMock = [
  {
    name: 'Recipe 1',
    image: 'recipe1.jpg',
    doneDate: '2023-07-01',
    tags: ['tag1', 'tag2'],
    nationality: 'Italian',
    category: 'Main Course',
    id: 'recipe1',
    type: 'meal',
    alcoholicOrNot: '',
  },
  {
    name: 'Recipe 2',
    image: 'recipe2.jpg',
    doneDate: '2023-07-02',
    tags: ['tag3', 'tag4'],
    nationality: 'Brazilian',
    category: 'drink',
    id: 'recipe2',
    type: 'drink',
    alcoholicOrNot: 'alcoholic',
  },
];

const mockLocalStorage = (doneRecipes = doneRecipesMock) => {
  localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
};

describe('<Done />', () => {
  beforeEach(() => {
    mockLocalStorage();
  });
  afterEach(() => {
    localStorage.clear();
  });

  it('Deveria renderizar todas as receitas corretamente', async () => {
    renderWithRouter(<DoneRecipes />);
    expect(screen.getByTestId('0-horizontal-image')).toHaveAttribute('src', 'recipe1.jpg');
    expect(screen.getByTestId('0-horizontal-name')).toHaveAttribute('href', '/meals/recipe1');
    expect(screen.getByTestId('0-horizontal-name')).toHaveTextContent('Recipe 1');
    expect(screen.getByTestId('0-horizontal-share-btn')).toBeInTheDocument();
    expect(screen.getByTestId('0-horizontal-top-text')).toHaveTextContent('Italian - Main Course');
    expect(screen.getByTestId('0-horizontal-done-date')).toHaveTextContent('2023-07-01');
    expect(screen.getByTestId('0-tag1-horizontal-tag')).toHaveTextContent('tag1');
    expect(screen.getByTestId('0-tag2-horizontal-tag')).toHaveTextContent('tag2');
  });
  it('Deveria renderizar receitas filtradas por drink', () => {
    renderWithRouter(<DoneRecipes />);
    const drinkFilter = screen.getByTestId('filter-by-drink-btn');
    act(() => {
      userEvent.click(drinkFilter);
    });
    expect(screen.getByTestId('0-horizontal-image')).toHaveAttribute('src', 'recipe2.jpg');
    expect(screen.queryByText('Recipe 1')).not.toBeInTheDocument();
  });
  it('Deveria renderizar receitas filtradas por meal', () => {
    renderWithRouter(<DoneRecipes />);
    const mealFilter = screen.getByTestId('filter-by-meal-btn');
    act(() => {
      userEvent.click(mealFilter);
    });
    expect(screen.getByTestId('0-horizontal-top-text')).toHaveTextContent('Italian - Main Course');
    expect(screen.queryByText('Recipe 2')).not.toBeInTheDocument();
  });
});
