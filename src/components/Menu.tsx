import "../assets/css/components/Menu.css";
import RenataLogo from "../assets/imgs/renata-logo.png";
import { Link } from "react-router-dom";

interface MenuProps {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
}

const Menu = ({ theme, setTheme }: MenuProps) => {
  const handleThemeToggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  return (
    <nav className="menu-topo">
      <div className="container-principal">
        <label htmlFor="theme-switch" className="switch">
          <input
            type="checkbox"
            id="theme-switch"
            checked={theme === "dark"}
            onChange={handleThemeToggle}
          />
          <span className="theme-switch-slider round">
            {theme === "dark" ? (
              <i className="fas fa-moon"></i>
            ) : (
              <i className="fas fa-sun"></i>
            )}
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
