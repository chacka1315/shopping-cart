import ShopPage from '../features/ShopPage';
import { render, screen, within } from '@testing-library/react';
import { expect, describe, vi, it, beforeEach } from 'vitest';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, RouterProvider, Outlet } from 'react-router';

//setup for a fake route.
let contextValue = {
  cart: [],
  updateCart: vi.fn(),
  items: [{ image: null, title: 'Bag', price: '200', id: '1a' }],
  loading: false,
  error: null,
};
const fakeRoutes = [
  {
    path: '/',
    element: <Outlet context={contextValue} />,
    children: [{ path: 'shoppage', element: <ShopPage /> }],
  },
];

//mockings
vi.mock('../features/Homepage', () => {
  return { default: () => <div>Mocked Home</div> };
});
vi.mock('../features/CartPage', () => {
  return { default: () => <div>Mocked cart page</div> };
});

import routes from '../routes';

//props setup
const router = createMemoryRouter(routes, { initialEntries: ['/shoppage'] });
const fakeRouter = createMemoryRouter(fakeRoutes, {
  initialEntries: ['/shoppage'],
});
const items = [
  {
    image: null,
    title: 'Bag',
    price: '100',
    id: '1a',
  },
  {
    image: null,
    title: 'Computer',
    price: '100',
    id: '2b',
  },
];

beforeEach(() => {
  window.fetch = vi.fn(() => {
    return Promise.resolve({ ok: true, json: () => Promise.resolve(items) });
  });
});

describe('ShopPage component', () => {
  it('renders items when fetch is in progress', () => {
    render(<RouterProvider router={router} />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('renders all items with ther informations', async () => {
    render(<RouterProvider router={router} />);

    const cards = await screen.findAllByTestId('item-card');

    expect(cards.length).toBe(2);
    expect(screen.getAllByText(/100/i)).toHaveLength(2);
    expect(screen.getByText(/computer/i)).toBeInTheDocument();
    expect(screen.getByText(/bag/i)).toBeInTheDocument();
    expect(within(cards[0]).getByRole('img')).toBeInTheDocument();
    expect(within(cards[1]).getByRole('img')).toBeInTheDocument();
  });

  it('renders the error message when failed to fetch', async () => {
    window.fetch.mockImplementationOnce(() => {
      return Promise.reject({ message: 'API is down' });
    });
    render(<RouterProvider router={router} />);
    const error = await screen.findByText('API is down');

    expect(error).toBeInTheDocument();
  });
});

//test button behavior
describe('ShopPage cards', () => {
  it('buttons increase and decrease the input value', async () => {
    render(<RouterProvider router={router} />);
    const user = userEvent.setup();
    const cards = await screen.findAllByTestId('item-card');
    const firstCard = cards[0];
    const incrBtn = within(firstCard).getByRole('button', {
      name: /increment/i,
    });
    const decrBtn = within(firstCard).getByRole('button', {
      name: /decrement/i,
    });
    const input = within(firstCard).getByRole('textbox');

    await user.click(incrBtn);
    await user.click(incrBtn);
    await user.click(incrBtn);
    expect(input.value).toBe('3');

    await user.click(decrBtn);
    await user.click(decrBtn);
    expect(input.value).toBe('1');
  });

  it('input value change when user type a valid number', async () => {
    render(<RouterProvider router={router} />);
    const user = userEvent.setup();
    const cards = await screen.findAllByTestId('item-card');
    const firstCard = cards[0];
    const input = within(firstCard).getByRole('textbox');

    await user.type(input, '3');

    expect(input.value).toBe('3');
  });

  it('handle correctly the bads input values', async () => {
    render(<RouterProvider router={router} />);
    const user = userEvent.setup();
    const cards = await screen.findAllByTestId('item-card');
    const firstCard = cards[0];
    const input = within(firstCard).getByRole('textbox');
    const decrBtn = within(firstCard).getByRole('button', {
      name: /decrement/i,
    });

    await user.type(input, '0');
    expect(input.value).toBe('');

    await user.type(input, '-1');
    expect(input.value).toBe('1');

    await user.click(decrBtn);
    await user.click(decrBtn);
    await user.click(decrBtn);
    expect(input.value).toBe('');
  });

  it('add to cart button calls the updateCart calbk to update the cart', async () => {
    render(<RouterProvider router={fakeRouter} />);
    const user = userEvent.setup();
    const cards = await screen.findAllByTestId('item-card');
    const firstCard = cards[0];
    const incrBtn = within(firstCard).getByRole('button', {
      name: /increment/i,
    });
    const addBtn = within(firstCard).getByRole('button', {
      name: /add to cart/i,
    });
    await user.click(incrBtn);
    await user.click(incrBtn);
    await user.click(addBtn);

    expect(contextValue.updateCart).toHaveBeenCalled();
  });

  it('reset the input value after click on add to cart button', async () => {
    render(<RouterProvider router={router} />);
    const user = userEvent.setup();
    const cards = await screen.findAllByTestId('item-card');
    const firstCard = cards[0];
    const incrBtn = within(firstCard).getByRole('button', {
      name: /increment/i,
    });
    const addBtn = within(firstCard).getByRole('button', {
      name: /add to cart/i,
    });
    const input = within(firstCard).getByRole('textbox');

    await user.click(incrBtn);
    await user.click(addBtn);

    expect(input.value).toBe('');
  });

  it('render the no items found for bad research', () => {
    contextValue.items = [];
    render(<RouterProvider router={fakeRouter} />);

    expect(screen.getByTestId(/no-search-results/i)).toBeInTheDocument();
  });
});
