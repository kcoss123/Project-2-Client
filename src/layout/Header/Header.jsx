import React from "react";
import logo from "../../assets/img/logo.png";
import { Link } from "react-router-dom";

export const Header = () => {

  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <Link to="/">
        <img src={logo} alt="logo" className="w-12" />
      </Link>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/ticketlists">Tickets</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
