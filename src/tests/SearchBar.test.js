import React from 'react';
import { screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from '../services/renderWithRouterAndRedux';

window.alert = jest.fn();
const getSearchTopBtn = () => screen.getByTestId('search-top-btn');
const getSearchInput = () => screen.getByTestId('search-input');
const getIngredientSearchRadio = () => screen.getByTestId('ingredient-search-radio');
const getExecSearchBtn = () => screen.getByTestId('exec-search-btn');

describe('Testes para o SearchBar', () => {
  it('Verifica se o ingredient search radio é selecionado', () => {
    renderWithRouterAndRedux(<App />, undefined, '/meals');

    act(() => {
      userEvent.click(getSearchTopBtn());
    });

    act(() => {
      userEvent.type(getSearchInput(), 'chicken');
      userEvent.click(getIngredientSearchRadio());
      userEvent.click(getExecSearchBtn());
    });

    expect(getIngredientSearchRadio()).toBeChecked();
  });

  it('Verifica se o name search radio é selecionado', () => {
    renderWithRouterAndRedux(<App />, undefined, '/meals');

    act(() => {
      userEvent.click(getSearchTopBtn());
    });

    const nameSearchRadio = screen.getByTestId('name-search-radio');
    act(() => {
      userEvent.type(getSearchInput(), 'chicken');
      userEvent.click(nameSearchRadio);
      userEvent.click(getExecSearchBtn());
    });

    expect(nameSearchRadio).toBeChecked();
  });

  it('Verifica se o first letter search radio é selecionado', () => {
    renderWithRouterAndRedux(<App />, undefined, '/meals');

    act(() => {
      userEvent.click(getSearchTopBtn());
    });

    const firstLetterSearchRadio = screen.getByTestId('first-letter-search-radio');
    act(() => {
      userEvent.type(getSearchInput(), 'c');
      userEvent.click(firstLetterSearchRadio);
      userEvent.click(getExecSearchBtn());
    });

    expect(firstLetterSearchRadio).toBeChecked();
  });

  it('Verifica se é chamada a API quando o botão Search é clicado', async () => {
    const mockFetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({ results: [] }),
    });

    global.fetch = mockFetch;

    renderWithRouterAndRedux(<App />, undefined, '/meals');

    act(() => {
      userEvent.click(getSearchTopBtn());
    });

    await waitFor(() => {
      userEvent.type(getSearchInput(), 'chicken');
      userEvent.click(getIngredientSearchRadio());
    });

    act(() => {
      userEvent.click(getExecSearchBtn());
    });

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalled();
    });
  });

  it('', () => {
    renderWithRouterAndRedux(<App />, undefined, '/meals');

    act(() => {
      userEvent.click(getSearchTopBtn());
    });

    const firstLetterSearchRadio = screen.getByTestId('first-letter-search-radio');
    act(() => {
      userEvent.click(firstLetterSearchRadio);
    });

    act(() => {
      userEvent.type(getSearchInput(), 'invalid First Letter');
    });

    act(() => {
      userEvent.click(getExecSearchBtn());
    });
    expect(window.alert).toHaveBeenCalledWith('Your search must have only 1 (one) character');
  });

  it('Verifica se é chamada a API quando o botão Search é clicado', async () => {
    const mockFetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({ meals: [{ idMeal: '123' }] }),
    });

    global.fetch = mockFetch;

    renderWithRouterAndRedux(<App />, undefined, '/meals');

    act(() => {
      userEvent.click(getSearchTopBtn());
    });

    act(() => {
      userEvent.type(getSearchInput(), 'chicken');
      userEvent.click(getIngredientSearchRadio());
    });

    act(() => {
      userEvent.click(getExecSearchBtn());
    });
    // expect(history.location.pathname).toBe('/meals/123');
  });
});
