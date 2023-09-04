import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import Todo from '.';
import SettingFunction, { settingContext } from '../../Context/Settings/index';

describe('ToDo Component Tests', () => {
  test('render a header element as expected', () => {
    render(
      <SettingFunction>
        <settingContext.Provider value={{ list: [], setList: jest.fn() }}>
          <Todo />
        </settingContext.Provider>
      </SettingFunction>
    );

    const header = screen.getByTestId('todo-header');
    const h1 = screen.getByTestId('todo-h1');

    expect(header).toBeInTheDocument();
    expect(h1).toHaveTextContent('To Do List: 0 items pending');
  });
});
