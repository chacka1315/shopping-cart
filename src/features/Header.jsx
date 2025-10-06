import styles from './Header.module.css';
import { House, ShoppingBag, Store, Menu, X } from 'lucide-react';
import { Input, Button } from '../shared/SharedComponents';
import { useState } from 'react';
import { NavLink, Link } from 'react-router';
import { getfilteredShop } from '../utils';

const Header = function ({ cartCount, updateItems, shopData }) {
  const [searchValue, setSearchValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };
  const closeMenu = () => {
    setIsOpen(false);
  };
  const handleChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    if (value.trim() === '') {
      updateItems(shopData);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const filteredItems = getfilteredShop(shopData, searchValue);
    updateItems(filteredItems);
  };

  return (
    <header>
      <div className={styles.logo}>
        <Link to="/">
          <img src="/logo.png" alt="logo" />
        </Link>
      </div>
      <button
        aria-label="menu opener"
        onClick={toggleMenu}
        className={styles.openBtn}
      >
        <Menu />
      </button>
      <form aria-label="search product">
        <Input
          onChange={handleChange}
          value={searchValue}
          id="search"
          type="search"
          placeholder="Search a product..."
        />
        <Button onClick={handleSearchSubmit} name="Research" type="Submit" />
      </form>
      <nav>
        <NavLink
          to="/"
          end
          className={({ isActive }) => (isActive ? styles.activeLink : '')}
        >
          <House className={styles.icon} />
          Home
        </NavLink>
        <NavLink
          to="shoppage"
          className={({ isActive }) => (isActive ? styles.activeLink : '')}
        >
          <Store className={styles.icon} />
          Shop
        </NavLink>
        <div className={styles.cart}>
          <span className={styles.itemsCount}>
            {cartCount >= 100 ? '99+' : cartCount}
          </span>
          <NavLink
            to="cart"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) => (isActive ? styles.activeLink : '')}
          >
            <ShoppingBag className={styles.icon} />
            Cart
          </NavLink>
        </div>
      </nav>
      {isOpen && <DropdownMenu isOpen={isOpen} closeMenu={closeMenu} />}
    </header>
  );
};

function DropdownMenu({ isOpen, closeMenu }) {
  return (
    <div
      className={`${styles.menu} ${isOpen ? styles.showMenu : styles.hideMenu}`}
      data-testid="menu"
    >
      <button
        aria-label="close"
        className={styles.closeBtn}
        onClick={closeMenu}
      >
        <X />
      </button>

      <NavLink to="/" end onClick={closeMenu}>
        <House className={styles.icon} />
        Home
      </NavLink>
      <NavLink to="shoppage" onClick={closeMenu}>
        <Store className={styles.icon} />
        Shop
      </NavLink>
      <NavLink to="cart" onClick={closeMenu}>
        <ShoppingBag className={styles.icon} />
        Cart
      </NavLink>
    </div>
  );
}
export default Header;
