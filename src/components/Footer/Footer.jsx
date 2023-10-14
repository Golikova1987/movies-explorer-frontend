import { Link } from "react-router-dom";
import './Footer.css';

export default function Footer () {
  return (
    <footer className="footer">
      <h2 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
      <div className="footer__container">
        <p className="footer__copyright">&copy; 2023</p>
        <nav className="footer__nav">
          <ul className="footer__nav-list">
            <li className="footer__nav-item">
              <Link className="footer__nav-link" to="https://practicum.yandex.ru/" target="_blank" rel="noreferrer">Яндекс.Практикум</Link>
            </li>
            <li className="footer__nav-item">
              <Link className="footer__nav-link" to="https://github.com/Golikova1987" target="_blank" rel="noreferrer">Github</Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}