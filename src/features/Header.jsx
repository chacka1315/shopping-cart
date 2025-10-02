import styles from './Header.module.css';
import { House, ShoppingBag, Store, Menu, X } from 'lucide-react';
import { Input, Button } from '../shared/SharedComponents';
import { useState } from 'react';
import { NavLink } from 'react-router';

const Header = function () {
  const [searchValue, setSearchValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <header>
      <div className={styles.logo}>
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
        <NavLink to="/" end>
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
      <button aria-label="Menu" onClick={toggleMenu} className={styles.openBtn}>
        <Menu />
      </button>

      <DropdownMenu isOpen={isOpen} toggleMenu={toggleMenu} />
    </header>
  );
};

function DropdownMenu({ isOpen, toggleMenu }) {
  return (
    <div
      className={`${styles.menu} ${isOpen ? styles.showMenu : styles.hideMenu}`}
    >
      <button
        aria-label="close"
        className={styles.closeBtn}
        onClick={toggleMenu}
      >
        <X />
      </button>

      <NavLink to="/" end>
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
    </div>
  );
}
export default Header;
