import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../assets/logo.svg';

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link to="/" className="brand">
          <img src={logo} alt="Resan logo" className="logo" />
          <span className="brand-name">Resan</span>
        </Link>
        <nav className="nav-links">
          <Link to="/chat">Chat</Link>
          <a href="#recursos">Recursos</a>
          <a href="#ayuda">Ayuda</a>
        </nav>
      </div>
    </header>
  );
}
