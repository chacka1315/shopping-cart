import Header from '../features/Header';
import { render, screen } from '@testing-library/react';
import { expect, describe, vi, it } from 'vitest';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, RouterProvider, createMemoryRouter } from 'react-router';

vi.mock('../features/Homepage', () => {
  return { default: () => <div>Mocked home page</div> };
});
vi.mock('../features/CartPage', () => {
  return { default: () => <div>Mocked cart page</div> };
});
vi.mock('../features/ShopPage', () => {
  return { default: () => <div>Mocked shop page</div> };
});
import routes from '../routes';

//props setup
const shopData = [
  {
    image: '',
    title: 'Bag',
    price: '12000',
    id: '1a',
  },
  {
    image: '',
    title: 'Computer',
    price: '12000',
    id: '2b',
  },
];

const updateItems = vi.fn();

describe('Header component', () => {
  it('renders the form for reaserching products', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    expect(
      screen.getByRole('form', { name: /search product/i })
    ).toBeInTheDocument();
  });

  it('renders all nav links  and th cart count', () => {
    render(
      <MemoryRouter>
        <Header cartCount={18} />
      </MemoryRouter>
    );
    expect(screen.getAllByRole('link').length).toBe(4);
    expect(screen.getByText('18')).toBeInTheDocument();
  });

  it('menu toggle buttons open and close the menu', async () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    const user = userEvent.setup();
    const openButton = screen.getByRole('button', { name: /menu opener/i });

    expect(screen.queryByTestId(/menu/i)).not.toBeInTheDocument();
    await user.click(openButton);
    expect(screen.getByTestId(/menu/i)).toBeInTheDocument();
    const closeButton = screen.getByRole('button', { name: /close/i });
    await user.click(closeButton);
    expect(screen.queryByTestId(/menu/i)).not.toBeInTheDocument();
  });

  it('upadte items  when user search something', async () => {
    render(
      <MemoryRouter>
        <Header shopData={shopData} updateItems={updateItems} />
      </MemoryRouter>
    );
    const user = userEvent.setup();
    const searchField = screen.getByPlaceholderText(/search a product/i);
    const searchButton = screen.getByRole('button', { name: /search/i });

    await user.type(searchField, 'bag');
    await user.click(searchButton);

    expect(updateItems).toHaveBeenCalled();
    expect(updateItems).not.toHaveBeenCalledWith(shopData);
    expect(updateItems).toHaveBeenCalledWith([
      {
        image: '',
        title: 'Bag',
        price: '12000',
        id: '1a',
      },
    ]);
  });

  it('navigate to the correct page after user click', async () => {
    window.fetch = vi.fn(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(['moched items']),
      });
    });
    const router = createMemoryRouter(routes, { initialEntries: ['/'] });
    render(<RouterProvider router={router} />);

    const user = userEvent.setup();
    const homeLink = screen.getByRole('link', { name: /home/i });
    const shopLink = screen.getByRole('link', { name: /shop/i });
    const cartLink = screen.getByRole('link', { name: /cart/i });

    expect(homeLink).toHaveAttribute('aria-current', 'page');
    await user.click(shopLink);
    expect(shopLink).toHaveAttribute('aria-current', 'page');
    await user.click(cartLink);
    expect(cartLink).toHaveAttribute('aria-current', 'page');
    expect(homeLink).not.toHaveAttribute('aria-current', 'page');
  });
});
