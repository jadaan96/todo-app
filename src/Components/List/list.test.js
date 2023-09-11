// import '@testing-library/jest-dom';
// import { render, screen } from '@testing-library/react';
// import React from 'react';
// import List from './List';
// import { settingContext } from '../../Context/Settings';

// describe('List Component Tests', () => {
//   test('renders a list of pending tasks', () => {
//     const mockList = [
//       { id: 1, text: 'Task 1', assignee: 'Assignee 1', difficulty: 2, complete: false },
//       { id: 2, text: 'Task 2', assignee: 'Assignee 2', difficulty: 3, complete: true },
//       { id: 3, text: 'Task 3', assignee: 'Assignee 3', difficulty: 1, complete: false },
//     ];

//     render(
//       <settingContext.Provider value={{ list: mockList, setList: jest.fn() }}>
//         <List />
//       </settingContext.Provider>
//     );

//     // Check if the pending tasks are displayed
//     expect(screen.getByText('pending Tasks')).toBeInTheDocument();
//     expect(screen.getByText('Task 1')).toBeInTheDocument();
//     expect(screen.getByText('Task 3')).toBeInTheDocument();

//   });

//   test('renders a list of completed tasks', () => {
//     const mockList = [
//       { id: 1, text: 'Task 1', assignee: 'Assignee 1', difficulty: 2, complete: false },
//       { id: 2, text: 'Task 2', assignee: 'Assignee 2', difficulty: 3, complete: true },
//       { id: 3, text: 'Task 3', assignee: 'Assignee 3', difficulty: 1, complete: false },
//     ];

//     render(
//       <settingContext.Provider value={{ list: mockList, setList: jest.fn() }}>
//         <List />
//       </settingContext.Provider>
//     );

//     // Check if the completed tasks are displayed
//     expect(screen.getByText('completed Tasks')).toBeInTheDocument();
//     expect(screen.getByText('Task 2')).toBeInTheDocument();

//   });
// });
