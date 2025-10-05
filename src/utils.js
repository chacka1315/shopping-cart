export function getCartCount(cart) {
  const total = cart.reduce((acc, current) => acc + current.quantity, 0);

  return total;
}

export function getTotal(cart) {
  let total = cart.reduce(
    (acc, current) => acc + current.price * current.quantity,
    0
  );

  total = Math.round(total * 100) / 100;
  return total;
}

export function getfilteredShop(items, query) {
  const newItems = items.filter((item) => {
    return item.title.toLowerCase().includes(query.toLowerCase());
  });
  return newItems;
}
