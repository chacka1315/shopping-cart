import Root from '../Root';
import {
  render,
  screen,
  within,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { expect, describe, vi, it, beforeEach } from 'vitest';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, RouterProvider } from 'react-router';
import routes from '../routes';

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

  {
    image: null,
    title: 'Odin',
    price: '10000',
    id: '3c',
  },
];

//mocking API calls
window.fetch = vi.fn(() => {
  const response = new Promise((resolve) => {
    setTimeout(() => {
      resolve({ ok: true, json: () => Promise.resolve(items) });
    }, 600);
  });
  return response;
});

describe('Root component', () => {
  it('render initialy : Header, Homepage and Footer', async () => {
    const router = createMemoryRouter(routes, { initialEntries: ['/'] });
    render(<RouterProvider router={router} />);

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByTestId(/homepage/i)).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('renders ShopPage and CartPage and they behave as expected', async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ['/'],
    });
    render(<RouterProvider router={router} />);
    const user = userEvent.setup();
    const shopLink = screen.getByRole('link', { name: /shop/i });
    const cartLink = screen.getByRole('link', { name: /cart/i });

    await user.click(shopLink);
    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));

    const cards = await screen.findAllByTestId('shop-item-card');
    expect(cards.length).toBe(3);

    //go to the shop to add items
    await user.click(shopLink);
    const input1 = within(cards[1]).getByRole('textbox');
    const incrBtn0 = within(cards[0]).getByRole('button', {
      name: /increment/i,
    });
    const incrBtn2 = within(cards[2]).getByRole('button', {
      name: /increment/i,
    });
    const addToCartBtn0 = within(cards[0]).getByRole('button', {
      name: /add to cart/i,
    });
    const addToCartBtn1 = within(cards[1]).getByRole('button', {
      name: /add to cart/i,
    });
    const addToCartBtn2 = within(cards[2]).getByRole('button', {
      name: /add to cart/i,
    });

    //item1(total = 1)
    await user.type(input1, '1');
    await user.click(addToCartBtn1);

    //item2(tot = 3)
    await user.click(incrBtn0);
    await user.click(incrBtn0);
    await user.click(addToCartBtn0);
    await user.click(incrBtn0);
    await user.click(addToCartBtn0);

    //item3 (tot = 2)
    await user.click(addToCartBtn2);
    await user.click(incrBtn2);
    await user.click(incrBtn2);
    await user.click(addToCartBtn2);

    //go to the cart after adding items
    await user.click(cartLink);
    const cartItems = screen.getAllByTestId('cart-item-card');
    expect(cartItems.length).toBe(3);
    expect(
      screen.getByRole('heading', { name: 'Cart (6)' })
    ).toBeInTheDocument();
    expect(
      within(screen.getByTestId(/summary/i)).getAllByText(/20400/)
    ).toHaveLength(2);
  });
});
