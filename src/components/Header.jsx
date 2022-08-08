import React from "react";
import { Link } from "react-router-dom";
import Buscador from "./Buscador";

const Header = () => {
  return (
    <header>
      <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
          <Link to="/">Home</Link>
          <Link to="/Listado">Listado</Link>
          <Link to="/Favoritos">Favoritos</Link>
          <Link to="/Contacto">Contacto</Link>
          <Buscador />
        </div>
      </nav>
    </header>
  );
};

export default Header;
