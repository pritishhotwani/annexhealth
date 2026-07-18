import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">Annex Health</div>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/daily-log">Daily Log</Link>
        <Link to="/goals">Goals</Link>
        <Link to="/profile">Profile</Link>

        <a
          href="https://forms.gle/zuocRHCBeygcRGWZ8"
          target="_blank"
          rel="noopener noreferrer"
        >
          Feedback
        </a>
      </div>
    </nav>
  );
}

export default Navbar;