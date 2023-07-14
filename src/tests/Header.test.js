import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import Header from '../components/Header/Header';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

const getSearchTopBtn = () => screen.getByTestId('search-top-btn');
const querySearchtopBtn = () => screen.queryByTestId('search-top-btn');
const getPageTitle = () => screen.getByTestId('page-title');
const getProfileBtn = () => screen.getByTestId('profile-top-btn');

describe('Testes para o Header', () => {
  it('Verifica os elementos presentes no componente na rota meals e se direciona para a rota profile ao clicar no icone do mesmo', () => {
    const { history } = renderWithRouterAndRedux(<App />, undefined, '/meals');

    expect(getPageTitle()).toHaveTextContent('Meals');
    expect(getSearchTopBtn()).toBeInTheDocument();
    expect(getProfileBtn()).toBeInTheDocument();

    act(() => {
      userEvent.click(getProfileBtn());
    });
    expect(history.location.pathname).toBe('/profile');
    expect(querySearchtopBtn()).not.toBeInTheDocument();
  });

  it('Verifica os elementos presentes no componente na rota drinks e se direciona para a rota profile ao clicar no icone do mesmo', () => {
    const { history } = renderWithRouterAndRedux(<App />, undefined, '/drinks');

    expect(getPageTitle()).toHaveTextContent('Drinks');
    expect(getSearchTopBtn()).toBeInTheDocument();
    expect(getProfileBtn()).toBeInTheDocument();

    act(() => {
      userEvent.click(getProfileBtn());
    });
    expect(history.location.pathname).toBe('/profile');
    expect(querySearchtopBtn()).not.toBeInTheDocument();
  });

  it('Verifica os elementos presentes no componente na rota profile', () => {
    renderWithRouterAndRedux(<App />, undefined, '/profile');

    expect(querySearchtopBtn()).not.toBeInTheDocument();
    expect(getPageTitle()).toHaveTextContent('Profile');
    expect(getProfileBtn()).toBeInTheDocument();
  });

  it('Verifica se o botão search oculta o input de pesquisa ao ser clicado novamente através da rota meals', () => {
    renderWithRouterAndRedux(<App />, undefined, '/meals');

    act(() => {
      userEvent.click(getSearchTopBtn());
    });

    const searchInput = screen.getByTestId('search-input');
    const ingredientSearchRadio = screen.getByTestId('ingredient-search-radio');
    const nameSearchRadio = screen.getByTestId('name-search-radio');
    const firstLetterSearchRadio = screen.getByTestId('first-letter-search-radio');
    const execSearchBtn = screen.getByTestId('exec-search-btn');

    expect(ingredientSearchRadio).toBeInTheDocument();
    expect(nameSearchRadio).toBeInTheDocument();
    expect(firstLetterSearchRadio).toBeInTheDocument();
    expect(execSearchBtn).toBeInTheDocument();

    act(() => {
      userEvent.click(getSearchTopBtn());
    });
    expect(searchInput).not.toBeInTheDocument();
  });

  it('Verifica se o botão search oculta o input de pesquisa ao ser clicado novamente através da rota drinks', () => {
    renderWithRouterAndRedux(<App />, undefined, '/drinks');

    act(() => {
      userEvent.click(getSearchTopBtn());
    });

    const searchInput = screen.getByTestId('search-input');
    const ingredientSearchRadio = screen.getByTestId('ingredient-search-radio');
    const nameSearchRadio = screen.getByTestId('name-search-radio');
    const firstLetterSearchRadio = screen.getByTestId('first-letter-search-radio');
    const execSearchBtn = screen.getByTestId('exec-search-btn');

    expect(ingredientSearchRadio).toBeInTheDocument();
    expect(nameSearchRadio).toBeInTheDocument();
    expect(firstLetterSearchRadio).toBeInTheDocument();
    expect(execSearchBtn).toBeInTheDocument();

    act(() => {
      userEvent.click(getSearchTopBtn());
    });
    expect(searchInput).not.toBeInTheDocument();
  });

  it('Deveria renderizar o header sem a search bar', () => {
    renderWithRouterAndRedux(<Header pageTitle="test" pageIcon="meal" />);
    expect(querySearchtopBtn()).not.toBeInTheDocument();
  });
});
