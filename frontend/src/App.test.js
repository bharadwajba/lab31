import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import App from './App';

jest.mock('axios');

beforeEach(() => {
  axios.get.mockResolvedValue({ data: [] });
});

test('renders MERN CRUD app heading', async () => {
  render(<App />);
  expect(screen.getByText(/MERN CRUD/i)).toBeInTheDocument();
  await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(4));
});
