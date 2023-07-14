import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import Login from '../pages/Login';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

describe('Componente Login', () => {
  test('renderiza o formulário de login corretamente', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>,
    );

    expect(screen.getByTestId('content-login')).toBeInTheDocument();
    expect(screen.getByTestId('email-input')).toBeInTheDocument();
    expect(screen.getByTestId('password-input')).toBeInTheDocument();
    expect(screen.getByTestId('login-submit-btn')).toBeInTheDocument();
  });

  test('manipula o envio do formulário corretamente', () => {
    const { history } = renderWithRouterAndRedux(<Login />, undefined, '/login');

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const submitButton = screen.getByTestId('login-submit-btn');
    act(() => {
      userEvent.type(emailInput, 'test@example.com');
      userEvent.type(passwordInput, 'password123');
      userEvent.click(submitButton);
    });

    const savedEmail = localStorage.getItem('user');
    expect(savedEmail).toBe(JSON.stringify({ email: 'test@example.com' }));

    expect(history.location.pathname).toBe('/meals');
  });
});
