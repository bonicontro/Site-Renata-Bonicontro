import "../assets/css/components/Menu.css";
import RenataLogo from "../assets/imgs/renata-logo.png";
import { Link } from "react-router-dom";

interface MenuProps {
  theme: string;
  handleThemeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Menu = ({ theme, handleThemeChange }: MenuProps) => {
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
        <ul>
          <div className="logo-renata">
            <img src={RenataLogo} alt="Logo Renata Bonicontro" />
          </div>
          <li>
            <Link to="/">Inicial</Link>
          </li>

          <div className="divisor-menu"></div>
          <li>
            <Link to="/blog">Blog</Link>
          </li>
          <div className="divisor-menu"></div>
          <li>
            <Link to="/tarot">Tarot</Link>
          </li>
          <div className="divisor-menu"></div>
          <li>
            <Link to="/sobre">Sobre</Link>
          </li>
          <div className="divisor-menu"></div>
          <li>
            <Link to="/contato">Contato</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Menu;
