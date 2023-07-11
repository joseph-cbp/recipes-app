import React from 'react';
import { screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from '../services/renderWithRouterAndRedux';

describe('Testes para o SearchBar', () => {
    it('Verifica se o ingredient search radio é selecionado', () => {
    renderWithRouterAndRedux(<App /> , undefined, '/meals');

    const searchTopBtn = screen.getByTestId('search-top-btn');
    act ( () => { 
        userEvent.click(searchTopBtn);
    });


    const searchInput = screen.getByTestId('search-input');
    const ingredienteSearchRadio = screen.getByTestId('ingredient-search-radio');
    const execSearchBtn = screen.getByTestId('exec-search-btn');
    act ( () => {
        userEvent.type(searchInput, 'chicken');
        userEvent.click(ingredienteSearchRadio);
        userEvent.click(execSearchBtn);
    });

    expect(ingredienteSearchRadio).toBeChecked();

    });
    
    it('Verifica se o name search radio é selecionado', () => {
        renderWithRouterAndRedux(<App /> , undefined, '/meals');
        
        const searchTopBtn = screen.getByTestId('search-top-btn');
        act ( () => { 
            userEvent.click(searchTopBtn);
        });
        
        
        const searchInput = screen.getByTestId('search-input');
        const nameSearchRadio = screen.getByTestId('name-search-radio');
        const execSearchBtn = screen.getByTestId('exec-search-btn');
        act ( () => {
            userEvent.type(searchInput, 'chicken');
            userEvent.click(nameSearchRadio);
            userEvent.click(execSearchBtn);
        });
        
        expect(nameSearchRadio).toBeChecked();

    });

    it('Verifica se o first letter search radio é selecionado', () => {
        renderWithRouterAndRedux(<App /> , undefined, '/meals');
    
        const searchTopBtn = screen.getByTestId('search-top-btn');
        act ( () => { 
            userEvent.click(searchTopBtn);
        });
    
    
        const searchInput = screen.getByTestId('search-input');
        const firstLetterSearchRadio = screen.getByTestId('first-letter-search-radio');
        const execSearchBtn = screen.getByTestId('exec-search-btn');
        act ( () => {
            userEvent.type(searchInput, 'c');
            userEvent.click(firstLetterSearchRadio);
            userEvent.click(execSearchBtn);
        });
    
        expect(firstLetterSearchRadio).toBeChecked();
    });

    it('Verifica se é chamada a API quando o botão Search é clicado', async () => {
        const mockFetch = jest.fn().mockResolvedValue({
          json: jest.fn().mockResolvedValue({ results: [] }),
        });
    
        global.fetch = mockFetch;
    
        renderWithRouterAndRedux(<App /> , undefined, '/meals');
        const searchTopBtn = screen.getByTestId('search-top-btn');
        act ( () => {
        userEvent.click(searchTopBtn);
        });
        await waitFor(() => {
          const searchInput = screen.getByTestId('search-input');
          const ingredienteSearchRadio = screen.getByTestId('ingredient-search-radio');
    
          userEvent.type(searchInput, 'chicken');
          userEvent.click(ingredienteSearchRadio);
        });
        const execSearchBtn =screen.getByTestId('exec-search-btn');
        act ( () => {
        userEvent.click(execSearchBtn);
        });
        await waitFor(() => {
          expect(mockFetch).toHaveBeenCalled();
        });
      });
});
