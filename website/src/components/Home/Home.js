import React from "react";
import styles from "./Home.module.css";
const Home = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <h1>Welcome to Gender Forum</h1>
        <p>Promoting inclusivity and respect in online discussions.</p>
        <a href="/settings" className={styles.btn}>
          Configure Settings
        </a>
      </div>
    
    </section>
  );
};

export default Home;