import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.css";

import logo from "../assets/images/annex-logo.png";

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>

      <div className={styles.logo}>

        <img
          src={logo}
          alt="Annex Health AI"
          className={styles.logoImage}
        />

        <div>

          <h1>Annex</h1>

          <p>Health AI</p>

        </div>

      </div>

      <nav className={styles.nav}>

        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? styles.active : styles.link
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/chat"
          className={({ isActive }) =>
            isActive ? styles.active : styles.link
          }
        >
          Annex Assistant
        </NavLink>

        <NavLink
          to="/blood-report"
          className={({ isActive }) =>
            isActive ? styles.active : styles.link
          }
        >
          Blood Reports
        </NavLink>

        <NavLink
          to="/daily-log"
          className={({ isActive }) =>
            isActive ? styles.active : styles.link
          }
        >
          Daily Check-In
        </NavLink>

        <NavLink
          to="/progress"
          className={({ isActive }) =>
            isActive ? styles.active : styles.link
          }
        >
          Health Progress
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            isActive ? styles.active : styles.link
          }
        >
          Medical Profile
        </NavLink>

        <NavLink
          to="/goals"
          className={({ isActive }) =>
            isActive ? styles.active : styles.link
          }
        >
          Health Goals
        </NavLink>

      </nav>

    </aside>
  );
}