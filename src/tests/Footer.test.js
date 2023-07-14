import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import Footer from '../components/Footer';

describe('Footer component', () => {
  test('renderiza o componente Footer corretamente', () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>,
    );

    expect(screen.getByTestId('footer')).toBeInTheDocument();
    expect(screen.getByTestId('drinks-bottom-btn')).toBeInTheDocument();
    expect(screen.getByTestId('meals-bottom-btn')).toBeInTheDocument();
  });

  test('é redirecionado para /drinks quando o botão drinks é clicado', () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>,
    );

    const drinksButton = screen.getByTestId('drinks-bottom-btn');
    act(() => {
      drinksButton.click();
    });

    expect(window.location.pathname).toBe('/drinks');
  });

  test('é redirecionado para /meals quando o botão meals é clicado', () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>,
    );

    const mealsButton = screen.getByTestId('meals-bottom-btn');
    act(() => {
      mealsButton.click();
    });

    expect(window.location.pathname).toBe('/meals');
  });
});
