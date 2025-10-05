import { getCartCount, getTotal, getfilteredShop } from '../utils';
import { expect, it, describe } from 'vitest';

const items = [
  { image: null, title: 'Bag', price: '100', id: '1a', quantity: 2 },
  { image: null, title: 'Computer', price: '100', id: '2b', quantity: 1 },
];

describe('utils', () => {
  it('getCartCount function return correct amount of items in cart', () => {
    const result = getCartCount(items);
    expect(result).toBe(3);
  });

  it('getTotal function return the correct total', () => {
    const result = getTotal(items);
    expect(result).toBe(300);
  });

  it('getFilteredShop function filter correctly the items', () => {
    const result1 = getfilteredShop(items, 'BAG');
    expect(result1).toEqual([
      { image: null, title: 'Bag', price: '100', id: '1a', quantity: 2 },
    ]);

    const result2 = getfilteredShop(items, 'badsearch');
    expect(result2.length).toBe(0);
  });
});
