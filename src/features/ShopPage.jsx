import styles from './ShopPage.module.css';
import { Button, Input } from '../shared/SharedComponents';
import { Minus, Plus } from 'lucide-react';
import { useState } from 'react';
import { useOutletContext } from 'react-router';
import { NoProductFound } from './ErrorPage';

function ShopPage() {
  const { cart, updateCart, items, loading, error } = useOutletContext();

  const handleAdd = (itemId, quantity) => {
    if (isNaN(quantity)) return;
    if (quantity < 0) return;

    //check if already in cart
    const itemIndex = cart.findIndex((item) => item.id === itemId);

    let newCart = [...cart];
    if (itemIndex !== -1) {
      newCart[itemIndex].quantity = quantity;
    } else {
      let newItem = items.find((item) => item.id === itemId);
      if (newItem) {
        newItem = { ...newItem, quantity };
        newCart.push(newItem);
      }
    }

    updateCart(newCart);
  };

  if (loading) {
    return <p className={styles.loading}>Loading items...</p>;
  }

  if (error) {
    return <p className={styles.error}>{error}</p>;
  }

  const ItemList = items.map((item) => {
    return (
      <Card key={item.id} itemId={item.id} handleAdd={handleAdd}>
        <Item item={item} />
      </Card>
    );
  });

  if (items) {
    return items.length > 0 ? (
      <div className={styles.shopPage}>{ItemList}</div>
    ) : (
      <NoProductFound />
    );
  }
}

function Item({ item }) {
  return (
    <div className={styles.item}>
      <img src={item.image} alt={item.title} />
      <hr />
      <div className={styles.itemInfos}>
        <p>
          {item.title.length > 50
            ? item.title.slice(0, 50) + '...'
            : item.title}
        </p>
        <p className={styles.price}>{'$' + item.price}</p>
      </div>
    </div>
  );
}

function Card({ children, itemId, handleAdd }) {
  const [inputVal, setInputVal] = useState(0);

  const handleIncrement = () => {
    setInputVal((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setInputVal((prev) => {
      return prev === 0 ? 0 : prev - 1;
    });
  };
  const onAddToCart = () => {
    handleAdd(itemId, inputVal);
    setInputVal(0);
  };

  const handleChange = (e) => {
    const value = Number(e.target.value);
    if (isNaN(value)) return;
    setInputVal(value);
  };

  return (
    <div className={styles.card} data-testid="item-card">
      {children}
      <div className={styles.manageItem}>
        <div>
          <Button
            onClick={handleDecrement}
            name={<Minus />}
            ariaLabel="decrement"
          />
          <Input
            onChange={handleChange}
            value={inputVal === 0 ? '' : inputVal}
          />
          <Button
            onClick={handleIncrement}
            name={<Plus />}
            ariaLabel="increment"
          />
        </div>
        <Button onClick={onAddToCart} name="Add to Cart" />
      </div>
    </div>
  );
}

export default ShopPage;
