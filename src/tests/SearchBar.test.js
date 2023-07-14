import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { wait } from '@testing-library/user-event/dist/utils';
import App from '../App';
import recipeMock from './recipeMock';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

const getSearchTopBtn = () => screen.getByTestId('search-top-btn');
const getSearchInput = () => screen.getByTestId('search-input');
const getIngredientSearchRadio = () => screen.getByTestId('ingredient-search-radio');
const getExecSearchBtn = () => screen.getByTestId('exec-search-btn');

const mockFetch = (data = recipeMock) => {
  const globalFetch = global.fetch;
  global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve({ meals: data }),
  }));
  return () => {
    global.fetch = globalFetch;
  };
};

describe('Testes para o SearchBar', () => {
  it('Verifica se o ingredient search radio é selecionado', async () => {
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
    renderWithRouterAndRedux(<App />, undefined, '/meals');
    const restoreFetch = mockFetch();

    act(() => {
      userEvent.click(getSearchTopBtn());
    });

    act(() => {
      userEvent.type(getSearchInput(), 'chicken');
      userEvent.click(getIngredientSearchRadio());
      userEvent.click(getExecSearchBtn());
    });

    await screen.findByText('Corba');

    expect(global.fetch).toHaveBeenCalled();
    restoreFetch();
  });

  it('Verifica se é emitido mensagem quando o usuário tenta procurar first letter com mais de uma letra', async () => {
    renderWithRouterAndRedux(<App />, undefined, '/meals');
    global.alert = jest.fn();

    act(() => {
      userEvent.click(getSearchTopBtn());
    });

    act(() => {
      const firstLetterSearchRadio = screen.getByTestId('first-letter-search-radio');
      userEvent.click(firstLetterSearchRadio);
      userEvent.type(getSearchInput(), 'invalid First Letter');
      userEvent.click(getExecSearchBtn());
    });

    expect(global.alert).toHaveBeenCalledWith('Your search must have only 1 (one) character');
  });

  it('Verifica se o usuário é redirecionado para página de detalhes se apenas uma recipe for encontrada', async () => {
    const { history } = renderWithRouterAndRedux(<App />, undefined, '/meals');
    const restoreFetch = mockFetch(recipeMock.slice(0, 1));

    act(() => {
      userEvent.click(getSearchTopBtn());
    });
    act(() => {
      userEvent.click(getIngredientSearchRadio());
      userEvent.type(getSearchInput(), 'chicken');
      userEvent.click(getExecSearchBtn());
    });
    await screen.findByText('Corba');
    expect(history.location.pathname).toBe('/meals/12345');
    restoreFetch();
  });

  it('Verifica se uma mensagem é emitida se nenhuma recipe for encontrada', async () => {
    renderWithRouterAndRedux(<App />, undefined, '/meals');
    const restoreFetch = mockFetch([]);
    global.alert = jest.fn();

    act(() => {
      userEvent.click(getSearchTopBtn());
    });

    act(() => {
      const nameSearchInput = screen.getByTestId('name-search-radio');
      userEvent.click(nameSearchInput);
      userEvent.type(getSearchInput(), 'invalid search');
      userEvent.click(getExecSearchBtn());
    });
    await screen.findByText('Corba');
    wait(() => expect(global.alert).toHaveBeenCalledWith('Sorry, we haven\'t found any recipes for these filters.'));
    restoreFetch();
  });
});
