import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from '../services/renderWithRouterAndRedux';

describe('Testes para o Header', () => {
  it('Verifica os elementos presentes no componente na rota meals e se direciona para a rota profile ao clicar no icone do mesmo', () => {
    const { history } = renderWithRouterAndRedux(<App /> , undefined, '/meals');

    const pageTitle = screen.getByTestId('page-title');
    expect(pageTitle).toHaveTextContent('Meals');

    const searchTopBtn = screen.getByTestId('search-top-btn');
    expect(searchTopBtn).toBeInTheDocument();
    
    const profileBtn = screen.getByTestId('profile-top-btn');
    expect(profileBtn).toBeInTheDocument();

    act ( () => { 
        userEvent.click(profileBtn);
    });
    expect(history.location.pathname).toBe('/profile');
    expect(searchTopBtn).not.toBeInTheDocument();
  });

  it('Verifica os elementos presentes no componente na rota drinks e se direciona para a rota profile ao clicar no icone do mesmo', () => {
    const { history } = renderWithRouterAndRedux(<App /> , undefined, '/drinks');

    const pageTitle = screen.getByTestId('page-title');
    expect(pageTitle).toHaveTextContent('Drinks');

    const searchTopBtn = screen.getByTestId('search-top-btn');
    expect(searchTopBtn).toBeInTheDocument();

    const profileBtn = screen.getByTestId('profile-top-btn');
    expect(profileBtn).toBeInTheDocument();

    act ( () => { 
        userEvent.click(profileBtn);
    });
    expect(history.location.pathname).toBe('/profile');
    expect(searchTopBtn).not.toBeInTheDocument();
  });

  it('Verifica os elementos presentes no componente na rota profile', () => {
    renderWithRouterAndRedux(<App /> , undefined, '/profile');

    const pageTitle = screen.getByTestId('page-title');
    expect(pageTitle).toHaveTextContent('Profile');

    const profileBtn = screen.getByTestId('profile-top-btn');
    expect(profileBtn).toBeInTheDocument();
  });
  
  it('Verifica se o botão search exibe o input de pesquisa ao ser clicado atraves da rota meals', () => {
    renderWithRouterAndRedux(<App /> , undefined, '/meals');

    const searchTopBtn = screen.getByTestId('search-top-btn');
    act ( () => { 
        userEvent.click(searchTopBtn);
    });

    const searchInput = screen.getByTestId('search-input');

    expect(searchTopBtn).toBeInTheDocument();
    expect(searchInput).toBeInTheDocument();
  });

  it('Verifica se o botão search exibe o input de pesquisa ao ser clicado atraves da rota drinks', () => {
    renderWithRouterAndRedux(<App /> , undefined, '/drinks');

    const searchTopBtn = screen.getByTestId('search-top-btn');
    act ( () => { 
        userEvent.click(searchTopBtn);
    });

    const searchInput = screen.getByTestId('search-input');

    expect(searchTopBtn).toBeInTheDocument();
    expect(searchInput).toBeInTheDocument();
  });

  it('Verifica se o botão search oculta o input de pesquisa ao ser clicado novamente através da rota meals', () => {
    renderWithRouterAndRedux(<App /> , undefined, '/meals');

    const searchTopBtn = screen.getByTestId('search-top-btn');
    act ( () => { 
        userEvent.click(searchTopBtn);
    });

    const searchInput = screen.getByTestId('search-input');
    const ingredientSearchRadio = screen.getByTestId('ingredient-search-radio');
    const nameSearchRadio = screen.getByTestId('name-search-radio');
    const firstLetterSearchRadio = screen.getByTestId('first-letter-search-radio');
    const execSearchBtn =screen.getByTestId('exec-search-btn');

    expect(ingredientSearchRadio).toBeInTheDocument();
    expect(nameSearchRadio).toBeInTheDocument();
    expect(firstLetterSearchRadio).toBeInTheDocument();
    expect(execSearchBtn).toBeInTheDocument();
    
    act ( () => { 
        userEvent.click(searchTopBtn);
    });
    expect(searchInput).not.toBeInTheDocument();
  });

  it('Verifica se o botão search oculta o input de pesquisa ao ser clicado novamente através da rota drinks', () => {
    renderWithRouterAndRedux(<App /> , undefined, '/drinks');

    const searchTopBtn = screen.getByTestId('search-top-btn');
    act ( () => { 
        userEvent.click(searchTopBtn);
    });

    const searchInput = screen.getByTestId('search-input');
    const ingredientSearchRadio = screen.getByTestId('ingredient-search-radio');
    const nameSearchRadio = screen.getByTestId('name-search-radio');
    const firstLetterSearchRadio = screen.getByTestId('first-letter-search-radio');
    const execSearchBtn =screen.getByTestId('exec-search-btn');

    expect(ingredientSearchRadio).toBeInTheDocument();
    expect(nameSearchRadio).toBeInTheDocument();
    expect(firstLetterSearchRadio).toBeInTheDocument();
    expect(execSearchBtn).toBeInTheDocument();
    
    act ( () => { 
        userEvent.click(searchTopBtn);
    });
    expect(searchInput).not.toBeInTheDocument();
  });
});


