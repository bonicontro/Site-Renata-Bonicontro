import "../assets/css/components/Menu.css";
import RenataLogo from "../assets/imgs/renata-logo.png";
import { Link } from "react-router-dom";

interface MenuProps {
  theme: string;
  handleThemeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Menu = ({ theme, handleThemeChange }: MenuProps) => {
  // handle the menu-toggle click event
  const handleMenuToggle = () => {
    const menuToggle = document.querySelector("#menu-toggle");
    const menu = document.querySelector(".wrapper-menu");
    menuToggle?.classList.toggle("active");
    menu?.classList.toggle("active");
  };

  // close the menu when a link is clicked
  const closeMenu = () => {
    const menuToggle = document.querySelector("#menu-toggle");
    const menu = document.querySelector(".wrapper-menu");
    menuToggle?.classList.remove("active");
    menu?.classList.remove("active");
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
        <div className="wrapper-menu">
          <div className="logo-renata">
            <img src={RenataLogo} alt="Logo Renata Bonicontro" />
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
