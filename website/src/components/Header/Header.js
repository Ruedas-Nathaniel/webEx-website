import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li className={styles.logo}>
          <Link>QueerSafe</Link>
          </li>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/settings">Settings</Link>
          </li>
          <li>
            <Link to="/resources">Resources</Link>
          </li>
          <li>
            <Link to="/Analysis">Analysis</Link>
          </li>
          <li className={styles.rightItem}>
            <Link to="/message">
              <i className="bi bi-chat-right-dots"></i>
            </Link>
          </li>
          <li className={styles.rightItem}>
            <Link to="/contact">
              <button className={styles.contactButton}>CONTACT US</button>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
