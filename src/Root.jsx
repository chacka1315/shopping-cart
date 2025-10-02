import Header from './features/Header';
import Footer from './features/Footer';
import { Outlet } from 'react-router';
import styles from './Root.module.css';

function Root() {
  return (
    <div className={styles.container}>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Root;
