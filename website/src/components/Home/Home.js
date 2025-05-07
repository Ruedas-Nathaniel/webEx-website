import styles from "./Home.module.css";
import React from "react";
import aboutImage from "./homeImg2.png";
const Home = () => {


  return (
    <>
      {/* HERO SECTION */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <section className={styles.heroBanner}>
            <div className={styles.bannerContent}>
              <h1>
                QueerSafe: Empowering Gender Discussions with Opinion Mining in Online Community Forum
              </h1>
              <p>
                Exploring gender perspectives using opinion mining in QueerSafe's virtual community forum for inclusive dialogue.
              </p>
              <div className={styles.buttonGroup}>
                <a href="/resources" className={styles.filledButton}>LEARN MORE</a>
              </div>
            </div>
          </section>
        </div>

      </section>

      {/* ABOUT SECTION */}
      <section className={styles.aboutSection}>
        <h3>ABOUT US</h3>
        <h2 className={styles.aboutTitle}>Welcome</h2>
        <hr className={styles.underline} />
        <p className={styles.aboutText}>
          Welcome to QueerSafe, your online hub for gender-based discussions in our inclusive
          community forum using opinion mining technology. Enjoy loyalty programs, exceptional
          customer service, and a friendly atmosphere. Join us in creating a safe space for open
          dialogue. Let your voice be heard at QueerSafe.
        </p>
        <div className={styles.aboutImg}>
          <img src={aboutImage} alt="About section visual" />
        </div>
      </section>
      <section classname={styles.features}>
        <div className={styles.feature}>
          <h3>Gender-Based Forum Extension</h3>
          <p>Access our innovative web extension for engaging in constructive and insightful gender-based discussions within community forums, utilizing advanced opinion mining technology.</p>
          <h4>Inclusive Community Engagement</h4>
          <p>Participate in fostering an inclusive online community where diverse perspectives on gender-related topics are welcomed and respected, contributing to a more supportive and empathetic dialogue.</p>
        </div>

        <div className={styles.feature}>
          <h3>Opinion Mining Tool</h3>
          <p>Utilize our powerful opinion mining tool to analyze and understand the diverse viewpoints expressed within gender-based discussions, promoting informed discourse and understanding.</p>
          <h4>Data-Driven Insights</h4>
          <p>Gain valuable data-driven insights into the sentiments and opinions shared within gender-based discussions, empowering informed decision-making and content moderation.</p>
        </div>
      </section>

    </>
  );
};

export default Home;
