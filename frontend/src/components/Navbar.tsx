import styles from "./Navbar.module.css";

import assistantLogo from "../assets/images/annex-assistant.png";

export default function Navbar() {

  const today = new Date();

  const formattedDate = today.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header className={styles.navbar}>

      <div className={styles.left}>

        <img
          src={assistantLogo}
          alt="Annex Assistant"
          className={styles.logo}
        />

        <div>

          <h2>Annex Assistant</h2>

          <p>Your Personal Health Companion</p>

        </div>

      </div>

      <div className={styles.right}>

        <p className={styles.date}>

          {formattedDate}

        </p>

      </div>

    </header>
  );

}