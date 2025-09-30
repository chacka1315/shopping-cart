import Header from './features/Header';
import Footer from './features/Footer';
import { Outlet } from 'react-router';
function Root() {
  return (
    <div className="container">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Root;
