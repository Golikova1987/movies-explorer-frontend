import React from "react";
import './Portfolio.css';

export default function Portfolio () {
  return (
    <section className="portfolio">
      <h3 className="portfolio__title">Портфолио</h3>
      <ul className="portfolio__elements">
        <li className="portfolio__element">
          <a href="https://github.com/Golikova1987/how-to-learn" className="portfolio__link" target="_blank" rel="noreferrer">
            <p className="portfolio__link-text">Статичный сайт</p>
            <p className="portfolio__link-arrow">↗</p>
          </a>
        </li>
        <li className="portfolio__element">
          <a href="https://github.com/Golikova1987/russian-travel" className="portfolio__link" target="_blank" rel="noreferrer">
            <p className="portfolio__link-text">Адаптивный сайт</p>
            <p className="portfolio__link-arrow">↗</p>
          </a>
        </li>
        <li className="portfolio__element">
          <a href="https://github.com/Golikova1987/react-mesto-api-full-gha" className="portfolio__link" target="_blank" rel="noreferrer">
            <p className="portfolio__link-text">Одностраничное приложение</p>
            <p className="portfolio__link-arrow">↗</p>
          </a>
        </li>
      </ul>
    </section>
  );
}