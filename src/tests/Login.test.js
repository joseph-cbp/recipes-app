import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from '../pages/Login';

describe('Componente de Login', () => {
  it('renderiza os campos de email e senha', () => {
    render(<Login />, { wrapper: MemoryRouter });

    expect(screen.getByTestId('email-input')).toBeInTheDocument();
    expect(screen.getByTestId('password-input')).toBeInTheDocument();
  });

  it('renderiza o botão de login', () => {
    render(<Login />, { wrapper: MemoryRouter });

    expect(screen.getByTestId('login-submit-btn')).toBeInTheDocument();
  });

  it('atualiza o valor do campo de email', () => {
    render(<Login />, { wrapper: MemoryRouter });

    const emailInput = screen.getByTestId('email-input');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    expect(emailInput.value).toBe('test@example.com');
  });

  it('atualiza o valor do campo de senha', () => {
    render(<Login />, { wrapper: MemoryRouter });

    const passwordInput = screen.getByTestId('password-input');
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(passwordInput.value).toBe('password123');
  });

  it('desabilita o botão de login quando o email é inválido', () => {
    render(<Login />, { wrapper: MemoryRouter });

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const loginButton = screen.getByTestId('login-submit-btn');

    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(loginButton).toBeDisabled();
  });

  it('desabilita o botão de login quando a senha é inválida', () => {
    render(<Login />, { wrapper: MemoryRouter });

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const loginButton = screen.getByTestId('login-submit-btn');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'pass' } });

    expect(loginButton).toBeDisabled();
  });

  it('habilita o botão de login quando o email e a senha são válidos', () => {
    render(<Login />, { wrapper: MemoryRouter });

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const loginButton = screen.getByTestId('login-submit-btn');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(loginButton).toBeEnabled();
  });

  it('salva o email do usuário no localStorage após o envio do formulário', () => {
    render(<Login />, { wrapper: MemoryRouter });

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const loginButton = screen.getByTestId('login-submit-btn');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(loginButton);

    const user = JSON.parse(localStorage.getItem('user'));

    expect(user).toEqual({ email: 'test@example.com' });
  });

  it('redireciona o usuário para a página de refeições após o login bem-sucedido', () => {
    render(<Login />);
  
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const loginButton = screen.getByTestId('login-submit-btn');
  
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(loginButton);
  
    expect(window.location.pathname).toBe('/meals');
  });  
});
