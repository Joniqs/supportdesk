import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import TicketItem from '../components/TicketItem';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter for testing

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // Use actual implementation for all exports except Link
  Link: ({ to, children }) => <a href={to}>{children}</a>, // Mock Link component
}));

test('renders TicketItem component with correct link', () => {
  const ticket = {
    createdAt: '2024-01-11T07:25:30.757Z',
    product: 'iMac',
    status: 'new',
    _id: '659f97eab655a636c487c174',
  };

  const { getByText } = render(
    <Router>
      <TicketItem ticket={ticket} />
    </Router>
  );

  const viewLink = getByText('View');
  expect(viewLink).toHaveAttribute('href', `/ticket/${ticket._id}`);
});
