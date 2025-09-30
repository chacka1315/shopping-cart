import { Mail, Phone } from 'lucide-react';
import styles from './Footer.module.css';
function Footer() {
  return (
    <footer>
      <div>
        <p>&copy; Shopy .Inc 2025, All rights reserved.</p>
        <p>Designed by siaka.d from The Odin Project</p>
        <hr />
        <a href="mailto:chacka1315@gmail.com">
          <Mail className={styles.icon} />
          chacka1315@gmail.com
        </a>
        <a href="tel:+2250778582891">
          <Phone className={styles.icon} />
          +2250778582891
        </a>
        <a href="https://github.com/chacka1315">
          <i className="devicon-github-original"></i>
        </a>
      </div>
      <div>
        <img src="/logo.png" alt="logo" />
      </div>
    </footer>
  );
}

export default Footer;
