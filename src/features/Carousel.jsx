import styles from './Carousel.module.css';
import img1 from '../assets/homepageItems/bag.jpg';
import img2 from '../assets/homepageItems/computer.jpg';
import img3 from '../assets/homepageItems/laptop.jpg';
import img4 from '../assets/homepageItems/micro.jpg';
import img5 from '../assets/homepageItems/mouse.jpg';
import img6 from '../assets/homepageItems/phone.jpg';
import img7 from '../assets/homepageItems/sofa.jpg';
import img8 from '../assets/homepageItems/tv.jpg';
import img9 from '../assets/homepageItems/watch.jpg';
import { useEffect, useState } from 'react';

function Carousel() {
  const [translate, setTranslate] = useState(0);

  const handleCarousel = () => {
    setTranslate((prev) => {
      const next = (prev + 400) % (9 * 400);
      return next;
    });
  };

  useEffect(() => {
    const timeId = setInterval(handleCarousel, 5000);
    return () => clearInterval(timeId);
  }, []);

  return (
    <div className={styles.container} data-testid="carousel">
      <div
        className={styles.card}
        style={{ transform: `translateX(-${translate}px)` }}
      >
        <img src={img1} alt="" />
        <img src={img2} alt="" />
        <img src={img3} alt="" />
        <img src={img4} alt="" />
        <img src={img5} alt="" />
        <img src={img6} alt="" />
        <img src={img7} alt="" />
        <img src={img8} alt="" />
        <img src={img9} alt="" />
      </div>
    </div>
  );
}

export default Carousel;
