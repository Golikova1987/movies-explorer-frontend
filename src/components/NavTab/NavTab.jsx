import React from "react";
import './NavTab.css';
import { Link } from 'react-scroll';


export default function NavTab() {
  return (
    <nav className="nav-tab">
      <ul className="nav-tab__list">
        <li>
          <Link className="nav-tab__link" to="about-project">О проекте</Link>
        </li>
        <li>
          <Link className="nav-tab__link" to="techs">Технологии</Link>
        </li>
        <li>
          <Link className="nav-tab__link" to="about-me">Студент</Link>
        </li>
      </ul>
    </nav>
  );
}