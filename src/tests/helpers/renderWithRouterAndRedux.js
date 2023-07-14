import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { legacy_createStore as createStore } from 'redux';
import rootReducer from '../../redux/reducer';

const renderWithRouterAndRedux = (component, initialState, route = '/') => {
  const store = createStore(rootReducer, initialState);
  const history = createMemoryHistory({ initialEntries: [route] });

  return {
    ...render(
      <Router history={ history }>
        <Provider store={ store }>
          {component}
        </Provider>
      </Router>,
    ),
    history,
    store,
  };
};

export default renderWithRouterAndRedux;
