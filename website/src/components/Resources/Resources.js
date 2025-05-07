import React from "react";
import styles from "./Resources.module.css";

const Resources = () => {
  return (
    <main>
      <section >
        <h2>LGBTQ+ Support and Forums</h2>
        <ul className = {styles.Resources}>
          <li>
            <a href="https://www.glaad.org" target="_blank" rel="noopener noreferrer">
              GLAAD
            </a>
          </li>
          <li>
            <a href="https://www.thetrevorproject.org" target="_blank" rel="noopener noreferrer">
              The Trevor Project
            </a>
          </li>
          <li>
            <a href="https://pflag.org" target="_blank" rel="noopener noreferrer">
              PFLAG
            </a>
          </li>
          <li>
            <a href="https://www.hrc.org" target="_blank" rel="noopener noreferrer">
              Human Rights Campaign
            </a>
          </li>
        </ul>
      </section>
    </main>
  );
};

export default Resources;