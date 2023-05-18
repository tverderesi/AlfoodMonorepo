import estilos from "./NavBar.module.scss";
import { Link } from "react-router-dom";

export const NavBar = () => {
  return (
    <nav className={estilos.Link}>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/restaurantes">Restaurantes</Link>
        </li>
        <li>
          <Link to="/admin">Admin</Link>
        </li>
      </ul>
    </nav>
  );
};
