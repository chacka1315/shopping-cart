import Root from './Root';
import Homepage from './features/Homepage';
import ShopPage from './features/ShopPage';
import CartPage from './features/CartPage';
import { ErrorPage } from './features/ErrorPage';

const routes = [
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Homepage /> },
      { path: 'shoppage', element: <ShopPage /> },
      { path: 'cart', element: <CartPage /> },
    ],
  },
];

export default routes;
