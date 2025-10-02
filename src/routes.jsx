import Root from './Root';
import Homepage from './features/Homepage';

const routes = [
  {
    path: '/',
    element: <Root />,
    children: [{ index: true, element: <Homepage /> }],
  },
];

export default routes;
