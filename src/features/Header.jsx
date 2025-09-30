import styles from './Header.module.css';
import { House, ShoppingBag, Store } from 'lucide-react';
import { Input, Button } from '../shared/SharedComponents';
import { useState } from 'react';
import { NavLink } from 'react-router';

const Header = function () {
  const [searchValue, setSearchValue] = useState('');
  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <header>
      <div>
        <img src="/logo.png" alt="logo" />
      </div>

      <form aria-label="serch form">
        <Input
          onChange={handleChange}
          value={searchValue}
          id="search"
          type="search"
          placeholder="Search a product..."
        />
        <Button onClick={handleSubmit} name="Research" type="Submit" />
      </form>

      <nav>
        <NavLink to="#">
          <House className={styles.icon} />
          Home
        </NavLink>
        <NavLink to="#">
          <Store className={styles.icon} />
          Shop
        </NavLink>
        <NavLink to="#">
          <ShoppingBag className={styles.icon} />
          Cart
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
