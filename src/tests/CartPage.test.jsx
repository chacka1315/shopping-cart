import CartPage from '../features/CartPage';
import { render, screen, within } from '@testing-library/react';
import { expect, describe, vi, it, beforeEach } from 'vitest';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, RouterProvider, Outlet } from 'react-router';

let contextValue;
let fakeRouter;
beforeEach(() => {
  contextValue = {
    cart: [
      { image: null, title: 'Bag', price: '100', id: '1a', quantity: 2 },
      { image: null, title: 'Computer', price: '100', id: '2b', quantity: 1 },
    ],
    updateCart: vi.fn((newCart) => (contextValue.cart = newCart)),
    cartCount: 3,
  };

  const fakeRoutes = [
    {
      path: '/',
      element: <Outlet context={contextValue} />,
      children: [{ path: 'cart', element: <CartPage /> }],
    },
  ];
  fakeRouter = createMemoryRouter(fakeRoutes, { initialEntries: ['/cart'] });
});

describe('Cart component', () => {
  it('render all cart items.', () => {
    render(<RouterProvider router={fakeRouter} />);
    const cards = screen.getAllByTestId(/item-card/i);
    expect(cards.length).toBe(2);
  });

  it('render all cart items informations', () => {
    render(<RouterProvider router={fakeRouter} />);
    const cards = screen.getAllByTestId(/item-card/i);
    expect(within(cards[0]).getByText(/bag/i)).toBeInTheDocument();
    expect(within(cards[1]).getByText(/computer/i)).toBeInTheDocument();
    expect(within(cards[0]).getByText(/100/i)).toBeInTheDocument();
    expect(within(cards[1]).getByText(/100/i)).toBeInTheDocument();
  });

  it('renders the summary bloc with correct total price', () => {
    render(<RouterProvider router={fakeRouter} />);
    const summary = screen.getByTestId(/summary/i);
    expect(summary).toBeInTheDocument();
    expect(within(summary).getAllByText(/300/)).toHaveLength(2);
  });
});

describe('item card', () => {
  it('input display the correct item quantity', () => {
    render(<RouterProvider router={fakeRouter} />);
    const cards = screen.getAllByTestId(/item-card/i);
    const input = within(cards[0]).getByRole('textbox');
    expect(input.value).toBe('2');
  });

  it('increment and decrement button do their job', async () => {
    render(<RouterProvider router={fakeRouter} />);
    const user = userEvent.setup();
    const cards = screen.getAllByTestId(/item-card/i);
    const input = within(cards[0]).getByRole('textbox');
    const incrBtn = within(cards[0]).getByRole('button', {
      name: /increment/i,
    });
    const decrBtn = within(cards[0]).getByRole('button', {
      name: /decrement/i,
    });

    await user.click(incrBtn);
    await user.click(incrBtn);
    await user.click(decrBtn);

    expect(input.value).toBe('3');
  });

  it('input handles correct and bad values', async () => {
    render(<RouterProvider router={fakeRouter} />);
    const user = userEvent.setup();
    const cards = screen.getAllByTestId(/item-card/i);
    const input = within(cards[0]).getByRole('textbox');

    await user.type(input, '3');
    expect(input.value).toBe('23');

    await user.clear(input);
    await user.type(input, '-1');
    expect(input.value).toBe('1');

    await user.clear(input);
    await user.type(input, '5');
    expect(input.value).toBe('5');
  });

  it('input value cannot be decremented under 0', async () => {
    render(<RouterProvider router={fakeRouter} />);
    const user = userEvent.setup();
    const cards = screen.getAllByTestId(/item-card/i);
    const input = within(cards[0]).getByRole('textbox');
    const decrBtn = within(cards[0]).getByRole('button', {
      name: /decrement/i,
    });

    await user.click(decrBtn);
    await user.click(decrBtn);
    await user.click(decrBtn);

    expect(input.value).toBe('0');
  });

  it('updateCart callback update correctly the cart', async () => {
    render(<RouterProvider router={fakeRouter} />);
    const user = userEvent.setup();
    const cards = screen.getAllByTestId(/item-card/i);
    const incrBtn = within(cards[0]).getByRole('button', {
      name: /increment/i,
    });
    const decrBtn = within(cards[0]).getByRole('button', {
      name: /decrement/i,
    });

    await user.click(incrBtn);
    await user.click(incrBtn);
    await user.click(decrBtn);

    expect(contextValue.updateCart).toHaveBeenCalledTimes(3);
    expect(contextValue.cart).toEqual([
      { image: null, title: 'Bag', price: '100', id: '1a', quantity: 3 },
      { image: null, title: 'Computer', price: '100', id: '2b', quantity: 1 },
    ]);
  });

  it('delete button remove item from the cart', async () => {
    render(<RouterProvider router={fakeRouter} />);
    const user = userEvent.setup();
    const cards = screen.getAllByTestId(/item-card/i);
    const delBtn = within(cards[0]).getByRole('button', {
      name: /delete/i,
    });

    await user.click(delBtn);

    expect(contextValue.cart).toEqual([
      { image: null, title: 'Computer', price: '100', id: '2b', quantity: 1 },
    ]);
  });
});
