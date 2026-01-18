import { NavLink, Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar({ hideAuth = false }) {
  return (
    <nav className="navbar">
      {/* LEFT */}
      <div className="nav-left">
        <Link to="/" className="brand-wrap">
          <div className="logo">💓</div>
          <span className="brand">MediAICDS</span>
        </Link>
      </div>

      {/* CENTER */}
      <div className="nav-center">
        <NavLink to="/" end className={({ isActive }) =>
          isActive ? "nav-pill" : "nav-link"
        }>
          Home
        </NavLink>

        <NavLink to="/dashboard" className={({ isActive }) =>
          isActive ? "nav-pill" : "nav-link"
        }>
          Dashboard
        </NavLink>

        <NavLink to="/new-case" className={({ isActive }) =>
          isActive ? "nav-pill" : "nav-link"
        }>
          New Case
        </NavLink>
      </div>

      {/* RIGHT */}
      {!hideAuth && (
        <div className="nav-right">
          <Link to="/login" className="signin">
            Sign In
          </Link>
          <Link to="/signup">
            <button className="get-started">Get Started</button>
          </Link>
        </div>
      )}
    </nav>
  );
}
