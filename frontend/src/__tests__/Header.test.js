import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import Header from '../components/Header';

const mockStore = configureMockStore([]);

describe('Header component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      auth: {
        user: null,
      },
    });
  });

  test('renders logo and links correctly when user is not logged in', () => {
    const { getByTestId, queryByTestId } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </Provider>
    );

    expect(getByTestId('homepage')).toBeInTheDocument();
    expect(getByTestId('login-button')).toBeInTheDocument();
    expect(getByTestId('register-button')).toBeInTheDocument();
    expect(queryByTestId('logout-button')).not.toBeInTheDocument();
  });

  test('renders logout button when user is logged in', () => {
    store = mockStore({
      auth: {
        user: {
          _id: '659f97d9b655a636c487c16a',
          name: 'test',
          email: 'test@gmail.com',
          token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1OWY5N2Q5YjY1NWE2MzZjNDg3YzE2YSIsImlhdCI6MTcwODAxODYzNywiZXhwIjoxNzEwNjEwNjM3fQ.HHu1TctwNyYnIezaQYHd6oN5_FnXqkDGGhb-rAiucgA',
        },
      },
    });
  });
});
