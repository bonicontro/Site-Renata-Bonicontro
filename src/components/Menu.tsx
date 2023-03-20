import "../assets/css/components/Menu.css";
import RenataLogo from "../assets/imgs/renata-logo.png";
import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <nav className="menu-topo">
      <div className="container-principal">
        <ul>
          <div className="logo-renata">
            <img src={RenataLogo} alt="Logo Renata Bonicontro" />
          </div>
          <li>
            <Link to="/">Inicial</Link>
          </li>

          <div className="divisor-menu"></div>
          <li>
            <Link to="/astrologia">Astrologia</Link>
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
