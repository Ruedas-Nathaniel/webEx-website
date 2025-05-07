import React, { useState } from "react";
import styles from "./Settings.module.css";
import Profile from "./menu/Profile.js";
import Links from "./menu/Link.js";
const Settings = () => {
  const topics = ["General", "Profile", "Preference", "Links"];
  const [activeTopic, setActiveTopic] = useState("General");

  const renderContent = (topic) => {
    switch (topic) {
      case "General":
        return <p>This is the General settings section.</p>;
      case "Profile":
        return <Profile />
      case "Preference":
        return <p>Set your Preferences here.</p>;
      case "Links":
        return <Links />
      default:
        return <p>Select a topic to view content.</p>;
    }
  };

  return (
    <section className={styles.settings}>
      <aside className={styles.menuOuter}>
        <ul className={styles.menu}>
          {topics.map((topic) => (
            <li
              key={topic}
              className={`${styles.menuItem} ${
                activeTopic === topic ? styles.active : ""
              }`}
              onClick={() => setActiveTopic(topic)}
            >
              {topic}
            </li>
          ))}
        </ul>
      </aside>

      <main className={styles.mainContent}>
        <h2>{activeTopic}</h2>
        {renderContent(activeTopic)}
      </main>
    </section>
  );
};

export default Settings;
