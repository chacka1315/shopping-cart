import styles from './Homepage.module.css';
import homepageGIF from '../assets/homepageGIF.gif';
import Carousel from './Carousel';

function Homepage() {
  return (
    <div className={styles.homepage} data-testid="presentation">
      <div>
        <div className={styles.presentation}>
          <p className={styles.title}>Welcome to Shopy</p>
          <p className={styles.title}>
            ONLINE <span> SHOPPING</span>
          </p>
          <p>
            Welcome to our shopping website! Discover a wide range of products,
            enjoy exclusive deals, and experience fast, secure checkout. Start
            exploring now and find everything you need for a great shopping
            experience!
          </p>
        </div>
        <div className={styles.homepageGif}>
          <img src={homepageGIF} alt="decoration gif" />
        </div>
      </div>
      <Carousel />
    </div>
  );
}

export default Homepage;
