import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import RenataLogo from "../assets/imgs/renata-logo.png";
import "../assets/css/components/Menu.css";

interface MenuProps {
  theme: string;
  handleThemeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Menu = ({ theme, handleThemeChange }: MenuProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // close the menu when a link is clicked
  const closeMenu = () => {
    setMenuOpen(false);
  };

  // close the menu when clicking outside of it
  useEffect(() => {
    const handleClickOutsideMenu = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutsideMenu);

    return () => {
      document.removeEventListener("click", handleClickOutsideMenu);
    };
  }, []);

  // handle the menu-toggle click event
  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="menu-topo">
      <div className="container-principal">
        <label className="theme-switch">
          <input
            type="checkbox"
            checked={theme === "light"}
            onChange={handleThemeChange}
          />
          <span className="slider-theme-switch">
            <i className="fas fa-moon moon-icon"></i>
            <i className="fas fa-sun sun-icon"></i>
          </span>
        </label>
        <div
          className={`wrapper-menu ${menuOpen ? "active" : ""}`}
          ref={menuRef}
        >
          <div className="logo-renata">
            <Link to="/" onClick={closeMenu}>
              <img src={RenataLogo} alt="Logo Renata Bonicontro" />
            </Link>
          </div>
          <ul>
            <li>
              <Link to="/" onClick={closeMenu}>
                Inicial
              </Link>
            </li>

            <div className="divisor-menu"></div>
            <li>
              <Link to="/blog" onClick={closeMenu}>
                Blog
              </Link>
            </li>
            <div className="divisor-menu"></div>
            <li>
              <Link to="/tarot" onClick={closeMenu}>
                Tarot
              </Link>
            </li>
            <div className="divisor-menu"></div>
            <li>
              <Link to="/sobre" onClick={closeMenu}>
                Sobre
              </Link>
            </li>
            <div className="divisor-menu"></div>
            <li>
              <Link to="/contato" onClick={closeMenu}>
                Contato
              </Link>
            </li>
          </ul>
          <div
            id="menu-toggle"
            onClick={handleMenuToggle}
            className="menu-toggler"
          >
            <i className="fas fa-bars"></i>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Menu;
