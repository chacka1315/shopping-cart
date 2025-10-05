import errorPageImg from '../assets/errorPageImg.gif';
import noFound from '../assets/binocular.svg';
import { Link } from 'react-router';
import styles from './ErrorPage.module.css';
export function ErrorPage() {
  return (
    <div className={styles.errorPage} data-testid="error-page">
      <div>
        <img src={errorPageImg} alt="error page" />
      </div>
      <div>
        <Link to="/">Go back to home</Link>
      </div>
    </div>
  );
}

export function NoProductFound() {
  return (
    <div className={styles.noProduct} data-testid="no-search-results">
      <img src={noFound} alt="" />
      <h1>No product found...</h1>
      <ul>
        <li>Check that you haven't made a typo: “bhag” instead of “bag”.</li>
        <li>Try another keyword or a synonym.</li>
        <li>
          You can also try a more general reasearch and then filter the results.
        </li>
      </ul>
    </div>
  );
}
