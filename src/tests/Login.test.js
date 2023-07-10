import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from '../pages/Login';

describe('Componente de Login', () => {
  test('renderiza o formulário de login', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>,
    );
    const form = getByTestId('content-login');
    expect(form).toBeInTheDocument();
  });

  test('atualiza corretamente os campos de e-mail e senha', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>,
    );
    const emailInput = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: '123456' } });

    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('123456');
  });

  test('desabilita o botão de envio quando o comprimento da senha é menor ou igual a 6 caracteres', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>,
    );
    const passwordInput = getByTestId('password-input');
    const submitButton = getByTestId('login-submit-btn');

    fireEvent.change(passwordInput, { target: { value: '123456' } });
    expect(submitButton.disabled).toBe(true);
  });

  test('desabilita o botão de envio quando o e-mail é inválido', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>,
    );
    const emailInput = getByTestId('email-input');
    const submitButton = getByTestId('login-submit-btn');

    fireEvent.change(emailInput, { target: { value: 'invalid-email@example.com' } });
    expect(submitButton.disabled).toBe(true);
  });

  test('chama a função handleSubmit quando o formulário é enviado', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>,
    );
    const form = getByTestId('content-login');
    const handleSubmit = jest.fn();

    form.addEventListener('submit', handleSubmit);
    fireEvent.submit(form);

    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });
});
