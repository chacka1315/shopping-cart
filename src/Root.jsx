import Header from './features/Header';
import Footer from './features/Footer';
import { Outlet } from 'react-router';
import styles from './Root.module.css';
import { useEffect, useMemo, useState } from 'react';
import { getCartCount } from './utils';
import getStoreItems from './features/APIHandler';

function Root() {
  const [cart, setCart] = useState([]);
  const [shopData, setShopData] = useState(null);
  const [items, setItems] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cartCount = useMemo(() => getCartCount(cart), [cart]);

  useEffect(() => {
    const fetchShopItems = async () => {
      try {
        const data = await getStoreItems();
        setItems(data);
        setShopData(data);
        setError(null);
      } catch (error) {
        setError(error.message);
        setItems(null);
        setShopData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchShopItems();
  }, []);

  return (
    <div className={styles.container}>
      <Header
        cartCount={cartCount}
        updateItems={setItems}
        shopData={shopData}
      />
      <Outlet
        context={{
          cart,
          updateCart: setCart,
          items,
          cartCount,
          loading,
          error,
        }}
      />
      <Footer />
    </div>
  );
}

export default Root;
