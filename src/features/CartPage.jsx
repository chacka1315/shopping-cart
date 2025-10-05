import styles from './CartPage.module.css';
import { useOutletContext } from 'react-router';
import { Button, Input } from '../shared/SharedComponents';
import { useMemo, useState } from 'react';
import { Trash, Minus, Plus } from 'lucide-react';
import { getTotal } from '../utils';

function CartPage() {
  const { cart, updateCart, cartCount } = useOutletContext();
  const total = useMemo(() => getTotal(cart), [cart]);

  const handleDelete = (itemId) => {
    const newCart = cart.filter((item) => item.id !== itemId);
    updateCart(newCart);
  };

  const handleEdit = (itemId, quantity) => {
    if (isNaN(quantity)) return;
    if (quantity < 0) return;

    const itemIndex = cart.findIndex((item) => item.id === itemId);

    let newCart = [...cart];
    if (itemIndex !== -1) {
      const updatedItem = { ...newCart[itemIndex], quantity };
      newCart[itemIndex] = updatedItem;
      updateCart(newCart);
    }
  };

  const cartList = cart.map((item) => {
    return (
      <Card
        key={item.id}
        handleDelete={handleDelete}
        itemId={item.id}
        quantity={item.quantity}
        handleEdit={handleEdit}
      >
        <Item item={item} />
      </Card>
    );
  });

  const emptyCart = (
    <div className={styles.emptyCart}>
      <p>Your cart is empty!</p>
      <p>Go to the shop to add items...</p>
    </div>
  );

  return (
    <div className={styles.cartPage}>
      <div className={styles.itemList}>
        <h1>{`Cart (${cartCount})`}</h1>
        <hr />
        {cart.length === 0 ? emptyCart : <div>{cartList}</div>}
      </div>
      <Summary total={total} />
    </div>
  );
}

function Item({ item }) {
  return (
    <div className={styles.item}>
      <div>
        <img src={item.image} alt={item.name} />
        <div>
          <p>{item.title}</p>
          <p className={styles.price}>{'$' + item.price}</p>
        </div>
      </div>
    </div>
  );
}

function Summary({ total }) {
  return (
    <div className={styles.summary} data-testid="cart-summary">
      <h2>CART SUMMARY</h2>
      <hr />
      <div>
        <p>Total</p>
        <p>{'$' + total}</p>
      </div>
      <hr />
      <Button onClick={() => {}} name={`Order ($${total})`} />
    </div>
  );
}

function Card({ children, itemId, handleDelete, quantity, handleEdit }) {
  const [inputVal, setInputVal] = useState(quantity);

  const handleIncrement = () => {
    setInputVal((prev) => prev + 1);
    handleEdit(itemId, inputVal + 1);
  };

  const handleDecrement = () => {
    setInputVal((prev) => (prev === 0 ? 0 : prev - 1));
    handleEdit(itemId, inputVal - 1);
  };

  const handleChange = (e) => {
    const value = Number(e.target.value);
    if (isNaN(value)) return;
    setInputVal(value);
    handleEdit(itemId, value);
  };

  return (
    <>
      <div className={styles.card} data-testid="cart-item-card">
        {children}
        <div className={styles.manageItem}>
          <button onClick={() => handleDelete(itemId)}>
            <Trash /> Delete
          </button>
          <p className={styles.quantity}>{`Quantity: ${quantity}`}</p>
          <div>
            <Button
              onClick={handleDecrement}
              name={<Minus />}
              ariaLabel="decrement"
            />
            <Input onChange={handleChange} value={inputVal} />
            <Button
              onClick={handleIncrement}
              name={<Plus />}
              ariaLabel="increment"
            />
          </div>
        </div>
      </div>
      <hr />
    </>
  );
}
export default CartPage;
