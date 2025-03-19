import React, { useState } from "react";
import styles from "./Settings.module.css";

const Settings = () => {
  const [pronouns, setPronouns] = useState("they/them");
  const [safeSpace, setSafeSpace] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Settings saved: Pronouns - ${pronouns}, Safe Space - ${safeSpace}`);
  };

  return (
    <section className={styles.settings}>
      <h2>Settings</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="pronouns">Select Pronouns:</label>
          <select
            id="pronouns"
            value={pronouns}
            onChange={(e) => setPronouns(e.target.value)}
          >
            <option value="they/them">They/Them</option>
            <option value="she/her">She/Her</option>
            <option value="he/him">He/Him</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label>
            <input
              type="checkbox"
              checked={safeSpace}
              onChange={(e) => setSafeSpace(e.target.checked)}
            />
            Enable Safe Space Mode
          </label>
        </div>
        <button type="submit" className={styles.btn}>
          Save
        </button>
      </form>
    </section>
  );
};

export default Settings;